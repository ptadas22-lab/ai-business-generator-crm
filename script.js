function generateIdeas() {
  const budget = document.getElementById("budget").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;

  const output = document.getElementById("output");

  output.innerText = "Generating...";

  setTimeout(() => {
    output.innerText = `
Top 3 Business Ideas for ${location} under ₹${budget}:

1. ${type} Shop
- Low investment
- High demand
- Profit: ₹15,000/month

2. Home-based ${type} Service
- Start from home
- Easy marketing
- Profit: ₹20,000/month

3. Street ${type} Stall
- High footfall
- Fast cash flow
- Profit: ₹10,000/month

Best Idea: Start with Home-based ${type} Service 🚀
`;
  }, 1000);
}
