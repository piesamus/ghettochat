const MAX_MESSAGES = 5;
const MESSAGE_LIFETIME = 1500; // 30 seconds

// Automatically scroll to bottom
function scrollToBottom() {
  const log = document.getElementById("log");
  log.scrollTop = log.scrollHeight;
}

// Remove oldest message if over limit
function enforceMessageLimit() {
  const messages = document.querySelectorAll(".chat-line");
  while (messages.length > MAX_MESSAGES) {
    const oldest = messages[0];
    oldest.classList.add("fade-out");
    oldest.addEventListener("animationend", () => oldest.remove(), { once: true });
  }
}

// Handle incoming message
document.addEventListener("onEventReceived", function (obj) {
  const event = obj.detail.event;
  const messageId = event.msgId;

  // Wait a tick for message to be in DOM
  setTimeout(() => {
    const el = document.querySelector(`[data-id="${messageId}"]`);
    if (!el) return;

    // Set auto-removal timer
    setTimeout(() => {
      el.classList.add("fade-out");
      el.addEventListener("animationend", () => el.remove(), { once: true });
    }, MESSAGE_LIFETIME);

    enforceMessageLimit();
    scrollToBottom();
  }, 50);
});
