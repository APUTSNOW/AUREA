const mainScreens = ["foyer", "journey"];

function go(id) {
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.remove("active"));
  const next = document.getElementById(id);
  if (!next) return;
  next.classList.add("active");

  const showNavigation = mainScreens.includes(id);
  document.getElementById("tabs").style.display = showNavigation ? "flex" : "none";
  document.getElementById("mini-player").style.display = showNavigation ? "flex" : "none";

  document.querySelectorAll("#tabs button").forEach((button) => {
    button.classList.toggle("active", button.dataset.go === id);
  });
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-go]");
  if (target) go(target.dataset.go);
});

window.addEventListener("DOMContentLoaded", async () => {
  if (window.AureaTreasureEngine) await window.AureaTreasureEngine.load();
});
