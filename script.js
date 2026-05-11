console.log("JS LOADED");

function generateIdeas() {
  const budget = document.getElementById("budget").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;

  const output = document.getElementById("output");

  output.innerHTML = "Generating...";

  setTimeout(() => {
    output.innerHTML = `
      <div class="card">
        <h3>${type} Shop</h3>
        <p>High demand in ${location}</p>
        <button onclick="startBusiness('${type} Shop')">Start</button>
      </div>
    `;
  }, 500);
}

function startBusiness(name) {
  alert("Starting " + name);
}
