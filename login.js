// Login JS

async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}

document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username").value.trim();
  const passwordInput = document.getElementById("password").value;

  const hashedPassword = await sha256(passwordInput);

  try {
    const res = await fetch("premium.json");
    const users = await res.json();

    const match = users.find(u =>
      u.Username === usernameInput && u.Password === hashedPassword
    );

    const msg = document.getElementById("message");
    if (match) {
      msg.textContent = "✅ Login successful!";
      msg.style.color = "green";
      // You can redirect or load premium content here

    } else {
      msg.textContent = "❌ Invalid username or password.";
      msg.style.color = "red";
    }
  } catch (err) {
    console.error("Error loading user file", err);
  }
});
