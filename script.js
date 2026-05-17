console.log("JS LOADED");
// Generate Ideas
function generateIdeas() {
  const btn = document.getElementById("generateBtn");
btn.disabled = true;
btn.innerText = "⏳ Generating...";
  console.log("Button clicked!");
 const budget = document.getElementById("budget").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;
const output = document.getElementById("results");
  const count = document.getElementById("count ? .value || 10;
  document.getElementById("emptyMsg")?.remove();
 output.innerHTML = "<div class='loading'>⚡ Generating ideas...</div>";
fetch("https://ai-backend-crm-6xh4.onrender.com/generate",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ budget, location, type, count })
  })
  .then(res => res.json())
  .then(data => {
btn.disabled = false;
btn.innerText = "✨ Generate Smart Ideas";
  const text = data.result;

  // Split into ideas safely
  const ideas = text.split(/\n\n|Idea/i).filter(i => i.trim() !== "");

  // Show 3 cards max
  output.innerHTML = ideas.map((idea, index) => {

    const lines = idea.trim().split("\n");
const name = lines[0] || `Idea ${index + 1}`;
    const details = lines.slice(1).join("<br>");
    const profitMatch = idea.match(/profit.*$/i);
    const profit = profitMatch  ? profitMatch[0].replace(/Profit:\s*/i, "") : "₹10K–₹30K/month";
    return `
  <div class="card">
    <h3>${name}</h3>
    <p>${details}</p>

    <div class="actions">
      <button onclick="startBusiness('${name}', '${location}', '${profit}')">Start</button>
      <button onclick="saveIdea('${name}', '${location}', '${profit}')">Save</button>
      <button onclick="shareIdea('${name}')">Share</button>
      <button class="copy" onclick="copyIdea('${name}')">Copy</button>
    </div>
  </div>
`;
}).join("");
})
  .catch(err => {
    btn.disabled = false;
btn.innerText = "✨ Generate Smart Ideas";
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
      <button onclick="startBusiness('${name}', '${location}', '${profit}')">Start</button>
      <button onclick="saveIdea('${name}', '${location}', '${profit}')">Save</button>
      <button onclick="shareIdea('${name}')">Share</button>
      <button class="copy" onclick="copyIdea('${name}')">Copy</button>
    </div>
  </div> `;
  }
// Start Business Plan
function startBusiness(name, location, profit) {
  const output = document.getElementById("results");

  output.innerHTML = `
    <div class="plan">
      <h3>📈 ${name} Plan</h3>

      <p><b>📍 Location:</b> ${location}</p>
      <p><b>💰 Expected Profit:</b> ${profit}</p>

      <p><b>Step 1:</b> Analyze demand for "${name}" in ${location}</p>
      <p><b>Step 2:</b> Start with low budget setup</p>
      <p><b>Step 3:</b> Buy raw materials or stock</p>
      <p><b>Step 4:</b> Promote via WhatsApp & Instagram</p>
      <p><b>Step 5:</b> Get first 10 customers</p>
      <p><b>Step 6:</b> Improve based on feedback</p>

      <p style="margin-top:10px;"><b>Tip:</b> Focus on quality & repeat customers</p>
    </div>
  `;
}
// Save Idea
function saveIdea() {
  let saved = JSON.parse(localStorage.getItem("ideas")) || [];

  let newIdea = {
    name: document.getElementById("type").value,
    location: document.getElementById("location").value,
    profit: document.getElementById("budget").value
  };

  let editIndex = localStorage.getItem("editIndex");

  if (editIndex !== null) {
    saved[editIndex] = newIdea;
    localStorage.removeItem("editIndex");
  } else {
    saved.push(newIdea);
  }

  localStorage.setItem("ideas", JSON.stringify(saved));
  loadSaved();
}
  loadSaved();
// Load Saved Ideas
function loadSaved() {
  let saved = JSON.parse(localStorage.getItem("ideas")) || [];
  renderSaved(saved);
}
// Delete Idea
function deleteIdea(index) {
  let saved = JSON.parse(localStorage.getItem("ideas")) || [];
saved.splice(index, 1);
  localStorage.setItem("ideas", JSON.stringify(saved));
  loadSaved();
}
// Share Idea (WhatsApp)
function shareIdea(name, location, profit) {
  const appLink = "https://your-username.github.io/your-repo-name/";

  const text = `🚀 Business Idea:
${name}

📍 Location: ${location}
💰 Profit: ${profit}

Try this app 👉 ${appLink}`;

  const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
}
window.deleteIdea = deleteIdea;
window.saveIdea = saveIdea;
window.shareIdea = shareIdea;
window.startBusiness = startBusiness;
function copyIdea(name) {
  navigator.clipboard.writeText(name);
  alert("Copied: " + name);
}
function searchIdeas() {
  const query = document.getElementById("searchInput").value.toLowerCase();

  let saved = JSON.parse(localStorage.getItem("ideas")) || [];

  const filtered = saved.filter(item =>
    item.name.toLowerCase().includes(query)
  );

  renderSaved(filtered);
}
function renderSaved(data) {
  const savedDiv = document.getElementById("saved");
  const allData = JSON.parse(localStorage.getItem("ideas")) || [];

  if (data.length === 0) {
    savedDiv.innerHTML = "<p style='opacity:0.6;'>No ideas found 🚫</p>";
    return;
  }

  savedDiv.innerHTML = data.map((item) => {
    const realIndex = allData.findIndex(
      x =>
        x.name === item.name &&
        x.location === item.location &&
        x.profit === item.profit
    );

    return `
      <div class="saved-card">
        <h4>✅ ${item.name}</h4>
        <p>📍 ${item.location}</p>
        <p>💰 ${item.profit}</p>

        <div class="actions">
          <button onclick="editIdea(${realIndex})">Edit</button>
          <button onclick="deleteIdea(${realIndex})">Delete</button>
        </div>
      </div>
    `;
  }).join("");
}
function clearAll() {
  if (confirm("Delete all saved ideas?")) {
    localStorage.removeItem("ideas");
    loadSaved();
  }
}
  
function editIdea(index) {
     console.log("EDIT CLICKED:", index);
  let saved = JSON.parse(localStorage.getItem("ideas")) || [];
  let idea = saved[index];

  document.getElementById("type").value = idea.name;
  document.getElementById("location").value = idea.location;
  document.getElementById("budget").value = idea.profit;

  localStorage.setItem("editIndex", index);

  document.getElementById("editStatus").innerText = "✏️ Editing mode active";
}
function cancelEdit() {
  localStorage.removeItem("editIndex");
document.getElementById("type").value = "";
  document.getElementById("location").value = "";
  document.getElementById("budget").value = "";

  document.getElementById("editStatus").innerText = "";
}
// Load on start
window.onload = loadSaved;
window.generateIdeas = generateIdeas;
window.startBusiness = startBusiness;

