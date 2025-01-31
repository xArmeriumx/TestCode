document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("start-btn");

    button.addEventListener("click", async () => {
        button.textContent = "Processing...";
        button.style.background = "#777";
        button.disabled = true;

        // เปิดเว็บไซต์เป้าหมาย
        const bookingPage = window.open("https://popmartth.rocket-booking.app/booking", "_blank");

        // ตรวจสอบว่าเว็บเปิดสำเร็จหรือไม่
        if (!bookingPage) {
            alert("⚠️ กรุณาอนุญาตให้เว็บเปิดหน้าต่างใหม่!");
            button.textContent = "Start";
            button.style.background = "#ff3d3d";
            button.disabled = false;
            return;
        }

        // รอให้เว็บโหลดเสร็จแล้ว Inject โค้ด
        setTimeout(() => {
            bookingPage.document.body.appendChild(createScriptInjection("content.js"));
        }, 5000); // รอให้หน้าเว็บโหลดเสร็จ

        setTimeout(() => {
            button.textContent = "Start";
            button.style.background = "#ff3d3d";
            button.disabled = false;
        }, 10000);
    });
});

// ฟังก์ชันสร้าง <script> สำหรับ Inject โค้ด
function createScriptInjection(scriptSrc) {
    const script = document.createElement("script");
    script.src = scriptSrc;
    script.type = "text/javascript";
    return script;
}
