(() => {
  console.log("🚀 เริ่มกระบวนการจอง...");

  if (!window.location.href.includes("popmartth.rocket-booking.app/booking")) {
    console.warn("⛔ คุณไม่ได้อยู่ในหน้าจอง! กรุณาเปิด https://popmartth.rocket-booking.app/booking");
    alert("⛔ กรุณาเปิดหน้า 'Booking' ก่อนเริ่มใช้งาน!");
    if (typeof completion === "function") completion("❌ ไม่ใช่หน้าจอง");
    return;
  }

  const waitForElementWithText = (selector, text) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const elements = Array.from(document.querySelectorAll(selector));
        const targetElement = elements.find(
          (el) => el.textContent.trim() === text
        );
        if (targetElement) {
          clearInterval(interval);
          resolve(targetElement);
        }
      }, 100);
    });
  };

  const waitForClickableElement = async (selector, text) => {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        const elements = Array.from(document.querySelectorAll(selector));
        const targetElement = elements.find(
          (el) =>
            (el.textContent.trim() === text ||
             el.getAttribute("aria-label") === text || 
             el.getAttribute("data-label") === text) &&
            !el.disabled &&
            !el.classList.contains("disabled")
        );
        if (targetElement) {
          clearInterval(interval);
          resolve(targetElement);
        }
      }, 100);
    });
  };

  const findAndClickElement = async (
    text,
    selector = 'button, a, div, span, td, li, th, label, input'
  ) => {
    console.log(`🔍 กำลังค้นหาองค์ประกอบที่มีข้อความ: "${text}"`);
    const element = await waitForClickableElement(selector, text);
    if (element) {
      if (element.onclick) {
        element.onclick();
        console.log(`✅ คลิก "${text}" ด้วย onclick สำเร็จ!`);
      } else {
        element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true }));
        element.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true }));
        element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        console.log(`✅ คลิก "${text}" ด้วย dispatchEvent สำเร็จ!`);
      }
    } else {
      console.warn(`⚠️ ไม่พบองค์ประกอบ "${text}" หรือองค์ประกอบไม่สามารถคลิกได้`);
    }
  };

  (async () => {
    try {
      console.log("📍 กำลังรอสาขา...");
      await findAndClickElement("Siam Square", 'div, span, td, li, th, label');
      await new Promise((resolve) => setTimeout(resolve, 100));

      console.log("📍 กำลังกด Next...");
      await findAndClickElement("Next", 'button, a');
      await new Promise((resolve) => setTimeout(resolve, 120));

      console.log("📍 กำลังรอวันที่...");
      await findAndClickElement("7", 'div, span, td, li, th, label, input , button , a');
      await new Promise((resolve) => setTimeout(resolve, 140));

      console.log("📍 กำลังรอเวลา...");
      await findAndClickElement("14:30", 'div, span, td, li, th, label, input , button , a');
      await new Promise((resolve) => setTimeout(resolve, 160));

      console.log("📍 กำลังรอปุ่ม Confirm...");
      await findAndClickElement("Confirm", 'button, a');
      await new Promise((resolve) => setTimeout(resolve, 180));

      console.log("📍 กำลังจอง...");
      await findAndClickElement("Confirm Booking", 'button, a');
      await new Promise((resolve) => setTimeout(resolve, 200));

      console.log("🎉 กระบวนการจองเสร็จสิ้น!");
      alert("🎉 การจองเสร็จสิ้น!");
      
      if (typeof completion === "function") completion("✅ Booking completed!");
    } catch (error) {
      console.error("🚨 เกิดข้อผิดพลาด:", error);
      alert("⚠️ เกิดข้อผิดพลาดระหว่างการจอง!");
      if (typeof completion === "function") completion("❌ Booking failed");
    }
  })();
})();
