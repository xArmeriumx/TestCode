document.getElementById("start-bot").addEventListener("click", () => {
    console.log("🚀 Sending Command to Booking Page...");
    
    const iframe = document.getElementById("booking-frame");
    
    if (iframe) {
        iframe.contentWindow.postMessage({ action: "startBooking" }, "https://popmartth.rocket-booking.app");
    }
});

// ฟังก์ชันรับข้อความจาก Booking Page และแสดงผลใน Console
window.addEventListener("message", (event) => {
    if (event.origin === "https://popmartth.rocket-booking.app") {
        console.log("📩 Response from Booking Page:", event.data);
    }
});
