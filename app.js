document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("start-btn");

    button.addEventListener("click", async () => {
        button.textContent = "Checking...";
        button.style.background = "#777";
        button.disabled = true;

        // ตรวจสอบว่าแท็บที่เปิดอยู่มี Booking Page หรือไม่
        const existingTab = await checkExistingBookingTab();

        if (existingTab) {
            console.log("✅ พบหน้า Booking ที่เปิดอยู่แล้ว");
            injectScriptToTab(existingTab);
        } else {
            console.log("🔍 ไม่พบหน้า Booking, กำลังเปิดใหม่...");
            openAndInjectBookingPage();
        }

        setTimeout(() => {
            button.textContent = "Start";
            button.style.background = "#ff3d3d";
            button.disabled = false;
        }, 5000);
    });
});

// ฟังก์ชันตรวจสอบว่ามีแท็บ Booking เปิดอยู่หรือไม่
async function checkExistingBookingTab() {
    return new Promise((resolve) => {
        chrome.tabs.query({}, (tabs) => {
            const bookingTab = tabs.find(tab => tab.url && tab.url.includes("https://popmartth.rocket-booking.app/booking"));
            resolve(bookingTab ? bookingTab.id : null);
        });
    });
}

// ฟังก์ชัน Inject content.js เข้าไปในแท็บที่เปิดอยู่
function injectScriptToTab(tabId) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["content.js"]
    });
}

// ฟังก์ชันเปิด Booking Page และ Inject content.js
function openAndInjectBookingPage() {
    const newTab = window.open("https://popmartth.rocket-booking.app/booking", "_blank");

    if (newTab) {
        setTimeout(() => {
            newTab.document.body.appendChild(createScriptInjection("content.js"));
        }, 5000); // รอให้หน้าโหลดเสร็จ
    } else {
        alert("⚠️ กรุณาอนุญาตให้เว็บเปิดหน้าต่างใหม่!");
    }
}

// ฟังก์ชันสร้าง <script> สำหรับ Inject
function createScriptInjection(scriptSrc) {
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.type = "text/javascript";
    return script;
}
