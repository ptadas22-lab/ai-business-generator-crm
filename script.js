console.log("JS LOADED");
// Generate Ideas
function generateIdeas() {
  console.log("Button clicked!");
 const budget = document.getElementById("budget").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;
const output = document.getElementById("results");
  const count = document.getElementById("count").value;
 output.innerHTML = "⚡ Generating with AI...";
fetch("https://ai-backend-crm-6xh4.onrender.com/generate",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ budget, location, type, count })
  })
  .then(res => res.json())
  .then(data => {

  const text = data.result;

  // Split into ideas safely
  const ideas = text.split(/\n\n|Idea/i).filter(i => i.trim() !== "");

  // Show 3 cards max
  output.innerHTML = ideas.map((idea, index) => {

    const name = idea.split("\n")[0] || `Idea ${index + 1}`;

    const profitMatch = idea.match(/profit.*$/i);
    const profit = profitMatch  ? profitMatch[0].replace(/Profit:\s*/i, "") : "₹10K–₹30K/month";

    return createCard(name, location, profit);

  }).join("");
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
      <button onclick="startBusiness('${name}')">Start</button>
      <button onclick="saveIdea('${name}')">Save</button>
      <button onclick="shareIdea('${name}')">Share</button>
      <button class="copy" onclick="copyIdea('${name}')">Copy</button>
    </div>
  </div> `;
  }
// Start Business Plan
function startBusiness(name) {
  
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
window.deleteIdea = deleteIdea;
window.saveIdea = saveIdea;
window.shareIdea = shareIdea;
window.startBusiness = startBusiness;
function copyIdea(name) {
  navigator.clipboard.writeText(name);
  alert("Copied: " + name);
}
// Load on start
window.onload = loadSaved;
window.generateIdeas = generateIdeas;
