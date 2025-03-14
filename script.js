document.getElementById("rollButton").addEventListener("click", function () {
  let diceType = parseInt(document.getElementById("diceType").value);
  let rollResult = Math.floor(Math.random() * diceType) + 1;

  // Display rolled number
  document.getElementById("rollResult").textContent = rollResult;

  // Store previous rolls
  let historyList = document.getElementById("rollHistory");
  let listItem = document.createElement("li");
  listItem.className = "list-group-item bg-dark text-light";
  listItem.textContent = rollResult;
  historyList.prepend(listItem);
});
