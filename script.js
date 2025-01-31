document.getElementById("start-btn").addEventListener("click", async () => {
    alert("Auto Booking Started!");

    if (window.location.hostname.includes("popmartth.rocket-booking.app")) {
        console.log("✅ กำลังจองใน PopMart Booking...");

        await findAndClickElement("Siam Square", 'div, span, td, li, th, label');
        await findAndClickElement("Next", 'button, a');
        await findAndClickElement("7", 'div, span, td, li, th, label, input, button, a');
        await findAndClickElement("13:30", 'div, span, td, li, th, label, input, button, a');
        await findAndClickElement("Confirm", 'button, a');
        await findAndClickElement("Confirm Booking", 'button, a');

        console.log("🎉 การจองเสร็จสิ้น!");
    } else {
        alert("⛔ กรุณาเปิดเว็บที่รองรับการจองก่อน");
    }
});

const findAndClickElement = async (text, selector = 'button, a, div, span, td, li, th, label, input') => {
    console.log(`🔍 กำลังค้นหา: "${text}"`);
    
    const element = await waitForClickableElement(selector, text);
    if (element) {
        element.click();
        console.log(`✅ คลิกสำเร็จ: "${text}"`);
    } else {
        console.warn(`⚠️ ไม่พบปุ่มที่ต้องการ: "${text}"`);
    }
};

const waitForClickableElement = (selector, text) => {
    return new Promise((resolve) => {
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
    });
};