window.addEventListener("message", async (event) => {
    if (event.origin !== "https://xarmeriumx.github.io") return;

    if (event.data.action === "startBooking") {
        console.log("🤖 Auto Booking Started!");
        
        try {
            await findAndClickElement("Used", 'div, span, td, li, th, label');
            await findAndClickElement("Next", 'button, a');
            await findAndClickElement("7", 'div, span, td, li, th, label, input, button, a');
            await findAndClickElement("13:30", 'div, span, td, li, th, label, input, button, a');
            await findAndClickElement("Confirm", 'button, a');
            await findAndClickElement("Confirm Booking", 'button, a');

            console.log("🎉 Booking Complete!");
            event.source.postMessage({ status: "success", message: "Booking Complete!" }, event.origin);
        } catch (error) {
            console.error("🚨 Booking Failed:", error);
            event.source.postMessage({ status: "error", message: error.toString() }, event.origin);
        }
    }
});

const findAndClickElement = async (text, selector) => {
    console.log(`🔍 Searching: "${text}"`);
    
    const element = await waitForClickableElement(selector, text);
    if (element) {
        element.click();
        console.log(`✅ Clicked: "${text}"`);
    } else {
        throw new Error(`⚠️ Not Found: "${text}"`);
    }
};

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

        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`⏳ Timeout: "${text}" not found within 10 seconds`));
        }, 10000);
    });
};
