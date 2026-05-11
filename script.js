console.log("JS LOADED");

// Generate Ideas
function generateIdeas() {
  console.log("Button clicked!");

  const budget = document.getElementById("budget").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;

  const output = document.getElementById("output");

  output.innerHTML = "⚡ Generating with AI...";

  fetch("http://localhost:3000/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ budget, location, type })
  })
  .then(res => res.json())
  .then(data => {
    output.innerHTML = `
      <div class="card">
        <h3>🤖 AI Generated Ideas</h3>
        <pre style="white-space: pre-wrap;">${data.result}</pre>
      </div>
    `;
  })
  .catch(err => {
    output.innerHTML = "❌ Error: " + err.message;
  });
}
// Create Card (clean reusable)
function createCard(name, location, profit) {
  return `
  <div class="card">
    <h3>${name}</h3>
    <p>High demand in ${location}</p>
    <p><b>Profit:</b> ${profit}</p>

    <div class="actions">
      <button class="start" onclick="startBusiness('${name}')">Start</button>
      <button class="save" onclick="saveIdea('${name}')">Save</button>
      <button class="share" onclick="shareIdea('${name}')">Share</button>
    </div>
  </div>
  `;
}

// Start Business Plan
function startBusiness(name) {
  const output = document.getElementById("output");

  output.innerHTML += `
    <div class="plan">
      <h3>📈 ${name} Plan</h3>
      <p>Step 1: Research market</p>
      <p>Step 2: Buy materials</p>
      <p>Step 3: Start small</p>
      <p>Step 4: Promote via WhatsApp</p>
      <p>Step 5: Grow gradually</p>
    </div>
  `;
}

// Save Idea
function saveIdea(name) {
  let saved = JSON.parse(localStorage.getItem("ideas")) || [];

  if (!saved.includes(name)) {
    saved.push(name);
    localStorage.setItem("ideas", JSON.stringify(saved));
  }

  loadSaved();
}

// Load Saved Ideas
function loadSaved() {
  const savedDiv = document.getElementById("saved");
  if (!savedDiv) return;

  let saved = JSON.parse(localStorage.getItem("ideas")) || [];

  if (saved.length === 0) {
    savedDiv.innerHTML = "<p>No saved ideas yet</p>";
    return;
  }

  savedDiv.innerHTML = saved.map((item, index) => `
    <div class="saved-card">
      <span>✅ ${item}</span>

      <div class="actions">
        <button class="delete" onclick="deleteIdea(${index})">Delete</button>
        <button class="share" onclick="shareIdea('${item}')">Share</button>
      </div>
    </div>
  `).join("");
}

// Delete Idea
function deleteIdea(index) {
  let saved = JSON.parse(localStorage.getItem("ideas")) || [];

  saved.splice(index, 1);
  localStorage.setItem("ideas", JSON.stringify(saved));

  loadSaved();
}

// Share Idea (WhatsApp)
function shareIdea(name) {
  const appLink = "https://your-username.github.io/your-repo-name/";

  const text = `🚀 Business Idea:

${name}

Try this app 👉 ${appLink}`;

  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;

  window.open(url, "_blank");
}

// Load on start
window.onload = loadSaved;
