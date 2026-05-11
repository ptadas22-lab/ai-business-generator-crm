console.log("JS LOADED");

// 🔹 Generate Ideas
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
      <button onclick="startBusiness('${type} Shop')">Start</button>
      <button onclick="saveIdea('${type} Shop')">Save</button>
    </div>

    <div class="card">
      <h3>Home ${type} Business</h3>
      <p>Low cost, easy start</p>
      <p><b>Profit:</b> ₹20K/month</p>
      <button onclick="startBusiness('Home ${type}')">Start</button>
      <button onclick="saveIdea('Home ${type}')">Save</button>
    </div>

    <div class="card">
      <h3>Street ${type} Stall</h3>
      <p>Fast cash flow</p>
      <p><b>Profit:</b> ₹10K/month</p>
      <button onclick="startBusiness('Street ${type}')">Start</button>
      <button onclick="saveIdea('Street ${type}')">Save</button>
    </div>

    `;

    loadSaved(); //

  }, 600);
}

// 🔹 Start Business Flow
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


// 🔹 Save Idea
function saveIdea(name) {
  let saved = JSON.parse(localStorage.getItem("ideas")) || [];

  if (!saved.includes(name)) {
    saved.push(name);
    localStorage.setItem("ideas", JSON.stringify(saved));
  }

  loadSaved();
}


// 🔹 Load Saved Ideas
function loadSaved() {
  const savedDiv = document.getElementById("saved");
  if (!savedDiv) return;

  let saved = JSON.parse(localStorage.getItem("ideas")) || [];

  console.log("Saved Data:", saved); // DEBUG

  if (saved.length === 0) {
    savedDiv.innerHTML = "<p>No saved ideas yet</p>";
    return;
  }

  savedDiv.innerHTML = saved.map((item, index) => {
    return `
      <div style="
        background:#1e293b;
        padding:10px;
        margin:8px 0;
        border-radius:8px;
        display:flex;
        justify-content:space-between;
        align-items:center;
      ">
        <span>✅ ${item}</span>

        <button 
          onclick="deleteIdea(${index})"
          style="
            background:red;
            color:white;
            border:none;
            padding:6px 10px;
            border-radius:6px;
            cursor:pointer;
          "
        >
          Delete
        </button>
      </div>
    `;
  }).join("");
}


// 🔹 Delete Idea
function deleteIdea(index) {
  let saved = JSON.parse(localStorage.getItem("ideas")) || [];

  saved.splice(index, 1);

  localStorage.setItem("ideas", JSON.stringify(saved));

  loadSaved();
}


// 🔹 Load on start
window.onload = loadSaved;
