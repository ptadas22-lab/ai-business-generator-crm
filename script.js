async function generateIdeas() {
  const budget = document.getElementById("budget").value;
  const location = document.getElementById("location").value;
  const type = document.getElementById("type").value;

  // Validate inputs
  if (!budget || !location || !type) {
    document.getElementById("output").innerText = "Please fill in all fields: Budget, Location, and Type.";
    return;
  }

  const output = document.getElementById("output");
  output.innerText = "Generating...";

  const prompt = `
Act as an expert startup mentor.

Suggest 3 business ideas based on:
Budget: ₹${budget}
Location: ${location}
Type: ${type}

For each idea provide:
1. Idea Name
2. Why it works
3. Steps to start
4. Earning potential
Also suggest the best idea among the three.
`;

  try {
    // Call backend API instead of directly calling Google API
    const response = await fetch("/api/generate-ideas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`Server error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      output.innerText = `Error: ${data.error}`;
    } else {
      output.innerText = data.ideas || "No ideas generated. Please try again.";
    }

  } catch (err) {
    console.error("Full error details:", err);
    output.innerText = `Error generating ideas: ${err.message}. Please check console for details.`;
  }
}
