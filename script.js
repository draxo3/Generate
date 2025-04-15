document.getElementById("generateBtn").addEventListener("click", () => {
  fetch("https://your-api.com/generate", { method: "POST" }) // Replace with real backend
    .then((res) => res.json())
    .then((data) => {
      const keyBox = document.getElementById("keyOutput");
      keyBox.textContent = `Your key: ${data.key}`;
      navigator.clipboard.writeText(data.key);
    })
    .catch((err) => {
      alert("Failed to generate key. Please try again.");
      console.error(err);
    });
});
