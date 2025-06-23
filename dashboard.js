// Dashboard JS

function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}

async function loadDashboard() {
  const username = localStorage.getItem("username");
  if (!username) return logout();

  document.getElementById("welcome").textContent = `👋 Hello, ${username}`;

  try {
    const res = await fetch("purchases.json");
    const data = await res.json();

    const userData = data.find(u => u.Username === username);

    if (userData && userData.Items.length > 0) {
      userData.Items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        document.getElementById("purchaseList").appendChild(li);
      });
    } else {
      document.getElementById("purchaseList").innerHTML = "<li>No purchases yet.</li>";
    }
  } catch (err) {
    console.error("Error loading purchase data", err);
  }
}

loadDashboard();
