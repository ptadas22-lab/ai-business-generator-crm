function generateIdeas() {
  const budget = document.getElementById("budget").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;

  const output = document.getElementById("output");

  output.innerHTML = "<p>⚡ Generating smart ideas...</p>";

  setTimeout(() => {
    output.innerHTML = `
    
    <div class="card">
      <h3>${type} Shop</h3>
      <p>High demand in ${location}</p>
      <p><b>Profit:</b> ₹15K/month</p>
      <button onclick="startBusiness('${type} Shop')">Start This</button>
      <button onclick="saveIdea('${type} Shop')">Save</button>
    </div>

    <div class="card">
      <h3>Home ${type} Business</h3>
      <p>Low cost, easy start</p>
      <p><b>Profit:</b> ₹20K/month</p>
      <button onclick="startBusiness('Home ${type}')">Start This</button>
      <button onclick="saveIdea('Home ${type}')">Save</button>
    </div>

    <div class="card">
      <h3>Street ${type} Stall</h3>
      <p>Fast cash flow</p>
      <p><b>Profit:</b> ₹10K/month</p>
      <button onclick="startBusiness('Street ${type}')">Start This</button>
      <button onclick="saveIdea('Street ${type}')">Save</button>
    </div>

    `;

    loadSaved(); // refresh saved ideas after generation

  }, 800);
}


function startBusiness(name) {
  const output = document.getElementById("output");

  output.innerHTML += `
  <div class="plan">
    <h3>📈 ${name} Plan</h3>

    <p><b>Step 1:</b> Research local market</p>
    <p><b>Step 2:</b> Buy materials</p>
    <p><b>Step 3:</b> Start small</p>
    <p><b>Step 4:</b> Promote via WhatsApp</p>
    <p><b>Step 5:</b> Grow gradually</p>

    <p><b>Profit:</b> ₹15K–₹30K/month</p>
  </div>
  `;
}


function saveIdea(name) {
  let saved = JSON.parse(localStorage.getItem("ideas")) || [];
  saved.push(name);
  localStorage.setItem("ideas", JSON.stringify(saved));

  alert("Saved!");
  loadSaved();
}


function loadSaved() {
  const savedDiv = document.getElementById("saved");
  if (!savedDiv) return;

  let saved = JSON.parse(localStorage.getItem("ideas")) || [];

  savedDiv.innerHTML = saved.map(i => `<p>✅ ${i}</p>`).join("");
}


window.onload = loadSaved;
