document.getElementById("start-btn").addEventListener("click", async () => {
    alert("🚀 Auto Booking Started!");

    // ดึงค่า hostname และตัด "www." ออก (ถ้ามี)
    const hostname = window.location.hostname.replace(/^www\./, "");
    console.log("🌍 Current hostname:", hostname);

    // ถ้าอยู่บน GitHub Pages → ให้เปลี่ยนหน้าไปเว็บ Booking
    if (hostname.includes("xarmeriumx.github.io")) {
        console.log("🔄 [1] อยู่บน GitHub Pages → กำลังเปลี่ยนหน้าไปยัง PopMart Booking...");
        alert("🔄 กำลังเปิดหน้า Booking...");
        localStorage.setItem("auto-booking-start", "true"); // บันทึกค่าไว้ว่าให้เริ่มทำงาน
        window.location.href = "https://popmartth.rocket-booking.app";
        return;
    }

    // ถ้าอยู่บนเว็บ Booking และเคยเปิดจาก GitHub Pages → เริ่มจอง
    if (hostname.includes("popmartth.rocket-booking.app")) {
        if (localStorage.getItem("auto-booking-start") === "true") {
            console.log("✅ [2] อยู่บนเว็บ PopMart → เริ่มกระบวนการจอง...");
            localStorage.removeItem("auto-booking-start"); // ลบค่าที่บันทึกไว้

            // รอ 2 วินาทีเพื่อให้หน้าเว็บโหลดก่อนทำงาน
            setTimeout(async () => {
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
            }, 2000); // รอ 2 วินาทีเพื่อให้หน้าเว็บโหลดก่อน
        }
    } else {
        console.warn("🚨 [ERROR] Website Not Allowed:", hostname);
        alert("⛔ กรุณาเปิดเว็บที่รองรับการจองก่อน");
    }
});
