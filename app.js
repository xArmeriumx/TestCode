let bookingWindow = null; // เก็บอ้างอิงแท็บที่เปิดอยู่

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-btn");
    const injectButton = document.getElementById("inject-btn");

    // กด Start เพื่อเปิด Booking หรือ Inject ถ้ามีแท็บอยู่แล้ว
    startButton.addEventListener("click", () => {
        startButton.textContent = "Checking...";
        startButton.style.background = "#777";
        startButton.disabled = true;

        // ตรวจสอบว่าแท็บ Booking เปิดอยู่หรือไม่
        if (bookingWindow && !bookingWindow.closed) {
            console.log("✅ พบหน้า Booking ที่เปิดอยู่แล้ว");
            bookingWindow.focus();
            injectScriptToExistingTab();
        } else {
            console.log("🔍 ไม่พบหน้า Booking, กำลังเปิดใหม่...");
            openAndInjectBookingPage();
        }

        setTimeout(() => {
            startButton.textContent = "Start";
            startButton.style.background = "#ff3d3d";
            startButton.disabled = false;
        }, 5000);
    });

    // ปุ่ม Inject Script (กรณีผู้ใช้เปิด Booking เอง)
    injectButton.addEventListener("click", () => {
        injectScriptToCurrentTab();
    });

    // เช็คทุก ๆ 2 วินาที ว่าผู้ใช้เปิดหน้า Booking อยู่หรือไม่
    setInterval(() => {
        if (checkIfUserOpenedBooking()) {
            injectButton.style.display = "inline-block"; // แสดงปุ่ม Inject
        } else {
            injectButton.style.display = "none"; // ซ่อนปุ่ม
        }
    }, 2000);
});

// ฟังก์ชัน Inject content.js เข้าไปในแท็บที่เปิดอยู่
function injectScriptToExistingTab() {
    const script = document.createElement("script");
    script.src = "content.js";
    script.type = "text/javascript";
    bookingWindow.document.body.appendChild(script);
}

// ฟังก์ชันเปิด Booking Page และ Inject content.js
function openAndInjectBookingPage() {
    bookingWindow = window.open("https://popmartth.rocket-booking.app/booking", "_blank");

    if (bookingWindow) {
        setTimeout(() => {
            bookingWindow.document.body.appendChild(createScriptInjection("content.js"));
        }, 5000); // รอให้หน้าโหลดเสร็จ
    } else {
        alert("⚠️ กรุณาอนุญาตให้เว็บเปิดหน้าต่างใหม่!");
    }
}

// ฟังก์ชันตรวจสอบว่าผู้ใช้เปิดหน้า Booking เองหรือไม่
function checkIfUserOpenedBooking() {
    return document.referrer.includes("popmartth.rocket-booking.app/booking");
}

// ฟังก์ชัน Inject script ถ้าผู้ใช้เปิดเว็บเอง
function injectScriptToCurrentTab() {
    const script = document.createElement("script");
    script.src = "content.js";
    script.type = "text/javascript";
    document.body.appendChild(script);
}

// ฟังก์ชันสร้าง <script> สำหรับ Inject
function createScriptInjection(scriptSrc) {
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.type = "text/javascript";
    return script;
}
