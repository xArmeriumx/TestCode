document.getElementById("start-btn").addEventListener("click", async () => {
    alert("🚀 Auto Booking Started!");

    // ดึงค่า hostname และตัด "www." ออก (ถ้ามี)
    const hostname = window.location.hostname.replace(/^www\./, "");
    console.log("🌍 Current hostname:", hostname);

    // ถ้าอยู่บน GitHub Pages → ให้เปลี่ยนหน้าไปเว็บ Booking
    if (hostname.includes("xarmeriumx.github.io")) {
        console.log("🔄 [1] อยู่บน GitHub Pages → กำลังเปลี่ยนหน้าไปยัง PopMart Booking...");
        alert("🔄 กำลังเปิดหน้า Booking...");
        window.location.href = "https://popmartth.rocket-booking.app";
        return;
    }

    // ถ้าอยู่บนเว็บ Booking → เริ่มกระบวนการจอง
    if (hostname.includes("popmartth.rocket-booking.app")) {
        console.log("✅ [2] อยู่บนเว็บ PopMart → เริ่มกระบวนการจอง...");

        try {
            console.log("🛠️ [3] กำลังค้นหาปุ่ม 'Used'...");
            await findAndClickElement("Used", 'div, span, td, li, th, label');

            console.log("🛠️ [4] กำลังค้นหาปุ่ม 'Next'...");
            await findAndClickElement("Next", 'button, a');

            console.log("🛠️ [5] กำลังเลือกวันที่ '7'...");
            await findAndClickElement("7", 'div, span, td, li, th, label, input, button, a');

            console.log("🛠️ [6] กำลังเลือกเวลาที่ '13:30'...");
            await findAndClickElement("13:30", 'div, span, td, li, th, label, input, button, a');

            console.log("🛠️ [7] กำลังกดยืนยัน 'Confirm'...");
            await findAndClickElement("Confirm", 'button, a');

            console.log("🛠️ [8] กำลังกดปุ่ม 'Confirm Booking'...");
            await findAndClickElement("Confirm Booking", 'button, a');

            console.log("🎉 [9] การจองเสร็จสิ้น!");
            alert("🎉 การจองเสร็จสิ้น!");
        } catch (error) {
            console.error("🚨 [ERROR] เกิดข้อผิดพลาดระหว่างการจอง:", error);
            alert("⚠️ มีปัญหาระหว่างการจอง โปรดลองใหม่!");
        }

    } else {
        console.warn("🚨 [ERROR] Website Not Allowed:", hostname);
        alert("⛔ กรุณาเปิดเว็บที่รองรับการจองก่อน");
    }
});

// ฟังก์ชันช่วยค้นหาและคลิกปุ่มอัตโนมัติ
const findAndClickElement = async (text, selector = 'button, a, div, span, td, li, th, label, input') => {
    console.log(`🔍 [SEARCH] กำลังค้นหา: "${text}"...`);
    
    const element = await waitForClickableElement(selector, text);
    if (element) {
        element.click();
        console.log(`✅ [CLICKED] คลิกสำเร็จ: "${text}"`);
    } else {
        throw new Error(`⚠️ [ERROR] ไม่พบปุ่ม: "${text}"`);
    }
};

// ฟังก์ชันรอจนกว่าจะพบปุ่มที่สามารถกดได้
const waitForClickableElement = (selector, text) => {
    return new Promise((resolve, reject) => {
        const checkElement = () => {
            const elements = Array.from(document.querySelectorAll(selector));
            return elements.find(el => el.textContent.trim() === text && !el.disabled);
        };

        let targetElement = checkElement();
        if (targetElement) return resolve(targetElement);

        const observer = new MutationObserver(() => {
            targetElement = checkElement();
            if (targetElement) {
                observer.disconnect();
                resolve(targetElement);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // ตั้ง Timeout ให้หยุดค้นหาหลัง 10 วินาที (กัน Loop ค้าง)
        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`⏳ [TIMEOUT] ไม่พบปุ่ม "${text}" ภายใน 10 วินาที`));
        }, 10000);
    });
};
