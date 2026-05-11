function generateIdeas() {
  const budget = document.getElementById("budget").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;

  const output = document.getElementById("output");

  output.innerHTML = "Generating ideas...";

  setTimeout(() => {

    output.innerHTML = `
    
    <div class="card">
      <h3>${type} Shop</h3>
      <p>High demand in ${location}</p>
      <p><b>Profit:</b> ₹15K/month</p>
      <button onclick="startBusiness('Shop')">Start This</button>
    </div>

    <div class="card">
      <h3>Home ${type} Business</h3>
      <p>Low cost, easy start</p>
      <p><b>Profit:</b> ₹20K/month</p>
      <button onclick="startBusiness('Home')">Start This</button>
    </div>

    <div class="card">
      <h3>Street ${type} Stall</h3>
      <p>Fast cash flow</p>
      <p><b>Profit:</b> ₹10K/month</p>
      <button onclick="startBusiness('Stall')">Start This</button>
    </div>

    `;

  }, 800);
}


function startBusiness(type) {
  const output = document.getElementById("output");

  output.innerHTML += `

  <div class="plan">
    <h3>📈 ${type} Business Plan</h3>

    <p><b>Step 1:</b> Research your local market</p>
    <p><b>Step 2:</b> Buy basic materials</p>
    <p><b>Step 3:</b> Start small from home or street</p>
    <p><b>Step 4:</b> Promote via WhatsApp & Instagram</p>
    <p><b>Step 5:</b> Reinvest profits to grow</p>

    <p><b>Expected Monthly Profit:</b> ₹15K–₹30K</p>
  </div>

  `;
}
