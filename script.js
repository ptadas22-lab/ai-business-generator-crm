async function generateIdeas() {
  const budget = document.getElementById("budget").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;

  const output = document.getElementById("output");
  output.innerText = "Generating...";

  const prompt = `
Act as an expert startup mentor.

Suggest 3 business ideas based on:
Budget: ₹${budget}
Location: ${location}
Type: ${type}

For each:
1. Idea Name
2. Why it works
3. Steps
4. Earning
Also suggest best idea.
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data); // DEBUG

    if (!data.candidates) {
      output.innerText = "Error: " + JSON.stringify(data);
      return;
    }

    output.innerText =
      data.candidates[0].content.parts[0].text;

  } catch (error) {
    output.innerText = "Error generating ideas: " + error.message;
  }
}
