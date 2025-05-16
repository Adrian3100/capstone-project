document
  .getElementById("diceForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    form.classList.add("was-validated");

    const diceType = document.getElementById("diceType").value;
    const rollCount = parseInt(document.getElementById("rollCount").value);
    const mode = document.querySelector("input[name='mode']:checked").value;
    const showHistory = document.getElementById("showHistory").checked;

    const alertBox = document.getElementById("alertBox");
    const spinner = document.getElementById("spinner");
    const results = document.getElementById("results");

    if (!form.checkValidity()) return;

    // Reset output
    results.innerHTML = "";
    alertBox.classList.add("d-none");
    spinner.classList.remove("d-none");

    // Simulate loading delay
    await new Promise((res) => setTimeout(res, 1000));

    // Generate random rolls
    const rolls = [];
    for (let i = 0; i < rollCount; i++) {
      let roll = Math.floor(Math.random() * diceType) + 1;
      if (mode === "lucky") roll = Math.max(roll, Math.floor(diceType / 2));
      rolls.push(roll);
    }

    // Display results
    rolls.forEach((num, idx) => {
      const col = document.createElement("div");
      col.className = "col-md-4";
      col.innerHTML = `
<div class="card bg-light text-dark">
<div class="card-body text-center">
<h5 class="card-title">Roll ${idx + 1}</h5>
<p class="display-4">${num}</p>
</div>
</div>
`;
      results.appendChild(col);
    });

    if (showHistory) {
      localStorage.setItem("lastRolls", JSON.stringify(rolls));
    }

    alertBox.textContent = `Rolled ${rollCount} time(s) with a D${diceType}.`;
    alertBox.classList.remove("d-none");
    spinner.classList.add("d-none");
  });

document.getElementById("generateBtn").addEventListener("click", async () => {
  const type = document.getElementById("nameType").value;
  const nameResult = document.getElementById("nameResult");
  const avatar = document.getElementById("avatar");

  nameResult.textContent = "Loading...";

  try {
    // Call Drycodes name generator API
    const res = await fetch(
      `https://names.drycodes.com/1?nameOptions=${type}_names`
    );
    const data = await res.json();
    const name = data[0].replace(/_/g, " ");

    nameResult.innerHTML = `Generated Name: <strong>${name}</strong>`;

    // Call DiceBear Avatar API using the name as a seed
    const avatarUrl = `https://avatars.dicebear.com/api/adventurer/${data[0]}.svg`;
    avatar.src = avatarUrl;
    avatar.alt = `${name}'s Avatar`;
  } catch (err) {
    nameResult.textContent = "Error generating name.";
    avatar.src = "";
  }
});
