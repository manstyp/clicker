document.addEventListener("DOMContentLoaded", function () {
  let clicks = parseInt(localStorage.getItem("clicks")) || 0;
  let cookies = parseFloat(localStorage.getItem("cookies")) || 0;
  let cookiesPerSecond =
    parseFloat(localStorage.getItem("cookiesPerSecond")) || 0;
  let clickMultiplier = 1;

  let upgrade1Cost = parseInt(localStorage.getItem("upgrade1Cost")) || 20;
  let upgrade2Cost = parseInt(localStorage.getItem("upgrade2Cost")) || 100;

  const clickButton = document.getElementById("clickButton");
  const cookieElement = document.getElementById("cookieCounter");
  const clickCounterElement = document.getElementById("clickCounter");
  const cookiesPerSecondElement = document.getElementById("cookiesPerSecond");
  const upgrade1Element = document.getElementById("upgrade1");
  const upgrade1CostElement = document.getElementById("upgrade1Cost");
  const upgrade2Element = document.getElementById("upgrade2");
  const upgrade2CostElement = document.getElementById("upgrade2Cost");

  //uppdatera text content
  clickCounterElement.textContent = `Totala Klicks: ${clicks}`;
  cookieElement.textContent = `${cookies.toFixed(0)} kr`;
  cookiesPerSecondElement.textContent = `${cookiesPerSecond.toFixed(
    1
  )} per sekund`;
  upgrade1CostElement.textContent = `${upgrade1Cost} kr`;
  upgrade2CostElement.textContent = `${upgrade2Cost} kr`;

  clickButton.addEventListener("click", () => {
    cookies += 1 * clickMultiplier;
    clicks += 1;
    localStorage.setItem("cookies", cookies);
    localStorage.setItem("clicks", clicks);

    cookieElement.textContent = `${cookies.toFixed(0)} kr`;
    clickCounterElement.textContent = `Totala Klicks: ${clicks}`;
  });

  // Uppgraderingar
  upgrade1Element.addEventListener("click", () => {
    if (cookies >= upgrade1Cost) {
      cookies -= upgrade1Cost;
      cookiesPerSecond += 0.1;
      upgrade1Cost += 5;
      cookiesPerSecondElement.textContent = `${cookiesPerSecond.toFixed(
        1
      )} per sekund`;
      upgrade1CostElement.textContent = `${upgrade1Cost} kr`;

      localStorage.setItem("cookies", cookies);
      localStorage.setItem("cookiesPerSecond", cookiesPerSecond);
      localStorage.setItem("upgrade1Cost", upgrade1Cost);
    } else {
      alert("Du är för fattig för dehär");
    }
  });

  upgrade2Element.addEventListener("click", () => {
    if (cookies >= upgrade2Cost) {
      cookies -= upgrade2Cost;
      cookiesPerSecond += 1;
      upgrade2Cost += 30;
      cookiesPerSecondElement.textContent = `${cookiesPerSecond.toFixed(
        1
      )} per sekund`;
      upgrade2CostElement.textContent = `${upgrade2Cost} kr`;

      localStorage.setItem("cookies", cookies);
      localStorage.setItem("cookiesPerSecond", cookiesPerSecond);
      localStorage.setItem("upgrade2Cost", upgrade2Cost);
    } else {
      alert("Du är för fattig för dehär");
    }
  });

  function updateCookiesPerSecond() {
    cookies += cookiesPerSecond / 10;
    cookieElement.textContent = `${cookies.toFixed(0)} kr`;
    localStorage.setItem("cookies", cookies);
  }

  setInterval(updateCookiesPerSecond, 100);
});
