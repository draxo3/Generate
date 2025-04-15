const generateBtn = document.getElementById("generateBtn");
const keyPanel = document.getElementById("keyPanel");
const generatedKeyText = document.getElementById("generatedKey");
const copyBtn = document.getElementById("copyBtn");
const statusMessage = document.getElementById("statusMessage");

function generateKey() {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const part = () => Array.from({ length: 4 }, () => charset[Math.floor(Math.random() * charset.length)]).join('');
  return `CRUX-${part()}-${part()}`;
}

generateBtn.addEventListener("click", async () => {
  const newKey = generateKey();
  generatedKeyText.textContent = newKey;
  keyPanel.classList.remove("hidden");

  // Send key to backend
  try {
    const res = await fetch("https://your-backend.com/save-key", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key: newKey })
    });

    const result = await res.json();
    if (result.success) {
      statusMessage.textContent = "Key saved successfully.";
      statusMessage.style.color = "lightgreen";
    } else {
      statusMessage.textContent = "Key generation failed on server.";
      statusMessage.style.color = "red";
    }
  } catch (error) {
    statusMessage.textContent = "Error saving key.";
    statusMessage.style.color = "red";
    console.error(error);
  }
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(generatedKeyText.textContent);
  copyBtn.textContent = "Copied!";
  setTimeout(() => (copyBtn.textContent = "Copy to Clipboard"), 2000);
});
