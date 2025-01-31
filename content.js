const findAndClickElement = async (text, selector = 'button, a, div, span') => {
  console.log(`🔍 Searching for: "${text}"`);
  const element = await waitForClickableElement(selector, text);

  if (element) {
    element.click();
    console.log(`✅ Clicked: "${text}"`);
  } else {
    console.warn(`⚠️ Not Found: "${text}"`);
  }
};

// ฟังก์ชันรอปุ่มที่คลิกได้
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

// เริ่มกระบวนการจอง
(async () => {
  console.log("🚀 เริ่ม Auto Booking...");
  await findAndClickElement("Connect", 'button');
  await findAndClickElement("Siam Square", 'div');
  await findAndClickElement("Next", 'button');
  await findAndClickElement("7", 'div');
  await findAndClickElement("13:30", 'div');
  await findAndClickElement("Confirm", 'button');
  await findAndClickElement("Confirm Booking", 'button');
  console.log("🎉 จองสำเร็จ!");
})();
