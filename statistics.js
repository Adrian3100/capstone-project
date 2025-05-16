window.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.getElementById("historyTable");
  const rolls = JSON.parse(localStorage.getItem("lastRolls")) || [];

  if (rolls.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="3">No roll history found.</td></tr>`;
  } else {
    rolls.forEach((num, index) => {
      const status =
        num >= Math.max(...rolls)
          ? `<span class="badge bg-success">Highest</span>`
          : num <= Math.min(...rolls)
          ? `<span class="badge bg-danger">Lowest</span>`
          : `<span class="badge bg-secondary">Normal</span>`;

      const row = document.createElement("tr");
      row.innerHTML = `<td>${index + 1}</td><td>${num}</td><td>${status}</td>`;
      tableBody.appendChild(row);
    });
  }

  // Fetch quote from API
  try {
    const res = await fetch("https://api.quotable.io/random?tags=wisdom");
    const data = await res.json();
    document.getElementById("quoteCard").innerHTML = `
<blockquote class="blockquote mb-0">
“${data.content}”
<footer class="blockquote-footer mt-2">${data.author}</footer>
</blockquote>
`;
  } catch (err) {
    document.getElementById("quoteCard").innerText = "Could not load quote.";
  }
});
