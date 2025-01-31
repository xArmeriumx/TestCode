document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("start-btn");

    button.addEventListener("click", async () => {
        button.textContent = "Checking...";
        button.style.background = "#777";
        button.disabled = true;

        // ตรวจสอบว่าแท็บ Booking เปิดอยู่หรือไม่ (ใช้ localStorage)
        if (localStorage.getItem("bookingTabOpen") === "true") {
            console.log("✅ พบหน้า Booking ที่เปิดอยู่แล้ว");
            injectScriptToCurrentTab();
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

// ฟังก์ชัน Inject content.js เข้าไปในแท็บที่เปิดอยู่
function injectScriptToCurrentTab() {
    const script = document.createElement("script");
    script.src = "content.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
}

// ฟังก์ชันเปิด Booking Page และ Inject content.js
function openAndInjectBookingPage() {
    const newTab = window.open("https://popmartth.rocket-booking.app/booking", "_blank");

    if (newTab) {
        localStorage.setItem("bookingTabOpen", "true");

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
