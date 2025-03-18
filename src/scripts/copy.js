export function copyToClipboard() {
    const content = document.getElementById("quote-content")?.innerText;
    if (!content || content.trim() === "") {
        showAlert("No content available to copy.");
        return;
    }
    navigator.clipboard.writeText(content)
        .then(() => showAlert("Kavithai Copied"))
        .catch((err) => {
            console.error("Failed to copy text:", err);
            showAlert("Failed to copy the quote. Please try again.");
        });
}

function showAlert(message) {
    const alertBox = document.createElement('div');
    alertBox.classList.add('notification', 'custom-notification');
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    setTimeout(() => {
      alertBox.classList.add('fade-out');
      setTimeout(() => alertBox.remove(), 500);
    }, 3000);
}
