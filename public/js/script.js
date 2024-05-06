document.addEventListener("DOMContentLoaded", function () {
  const appVersion = "1.0";
  const newAppVersion = "2.0";
  const storedAppVersion = localStorage.getItem("appVersion");

  if (storedAppVersion !== newAppVersion) {
    localStorage.clear();

    localStorage.setItem("appVersion", newAppVersion);
  }

  //MILKBAR
  let count = 0;
  let incrementAmount = 100 / (3 * 60 * 100);
  let milkMultiplier = 1;
  const milkBarElement = document.getElementById("milkBar");

  //CPS räkning
  let clickCount = 0;
  let cps = 0;

  //UPGRADES
  let cursorUpgradeCost =
    parseInt(localStorage.getItem("cursorUpgradeCost")) || 1000;
  let cursorUpgradeAmount =
    parseInt(localStorage.getItem("cursorUpgradeAmount")) || 0;

  let upgrade1Cost = parseInt(localStorage.getItem("upgrade1Cost")) || 20;
  let upgrade1Amount = parseInt(localStorage.getItem("upgrade1Amount")) || 0;

  let upgrade2Cost = parseInt(localStorage.getItem("upgrade2Cost")) || 100;
  let upgrade2Amount = parseInt(localStorage.getItem("upgrade2Amount")) || 0;

  let upgrade3Cost = parseInt(localStorage.getItem("upgrade3Cost")) || 1000;
  let upgrade3Amount = parseInt(localStorage.getItem("upgrade3Amount")) || 0;

  let upgrade4Cost = parseInt(localStorage.getItem("upgrade4Cost")) || 12000;
  let upgrade4Amount = parseInt(localStorage.getItem("upgrade4Amount")) || 0;

  let upgrade5Cost = parseInt(localStorage.getItem("upgrade5Cost")) || 40000;
  let upgrade5Amount = parseInt(localStorage.getItem("upgrade5Amount")) || 0;

  const clickButton = document.getElementById("clickButton");
  const cookieElement = document.getElementById("cookieCounter");
  const clickCounterElement = document.getElementById("clickCounter");
  const cookiesPerSecondElement = document.getElementById("cookiesPerSecond");
  const clickMultiplierElement = document.getElementById("clickMultiplier");

  const cursorUpgradeElement = document.getElementById("cursorUpgrade");
  const cursorUpgradeCostElement = document.getElementById("cursorUpgradeCost");
  const cursorUpgradeAmountElement = document.getElementById(
    "cursorUpgradeAmount"
  );

  const upgrade1Element = document.getElementById("upgrade1");
  const upgrade1CostElement = document.getElementById("upgrade1Cost");
  const upgrade1AmountElement = document.getElementById("upgrade1Amount");

  const upgrade2Element = document.getElementById("upgrade2");
  const upgrade2CostElement = document.getElementById("upgrade2Cost");
  const upgrade2AmountElement = document.getElementById("upgrade2Amount");

  const upgrade3Element = document.getElementById("upgrade3");
  const upgrade3CostElement = document.getElementById("upgrade3Cost");
  const upgrade3AmountElement = document.getElementById("upgrade3Amount");

  const upgrade4Element = document.getElementById("upgrade4");
  const upgrade4CostElement = document.getElementById("upgrade4Cost");
  const upgrade4AmountElement = document.getElementById("upgrade4Amount");

  const upgrade5Element = document.getElementById("upgrade5");
  const upgrade5CostElement = document.getElementById("upgrade5Cost");
  const upgrade5AmountElement = document.getElementById("upgrade5Amount");

  let clicksNonSave = parseInt(0);
  let clicks = parseInt(localStorage.getItem("clicks")) || 0;
  let cookies = parseFloat(localStorage.getItem("cookies")) || 0;
  let cookiesPerSecond =
    parseFloat(localStorage.getItem("cookiesPerSecond")) || 0;
  let clickMultiplier =
    parseFloat(localStorage.getItem("clickMultiplier")) || 1;

  //uppdatera text content
  clickCounterElement.textContent = `Totala Klicks: ${clicks}`;
  clickMultiplierElement.textContent = `Klickstyrka: ${clickMultiplier} mg`;
  cookieElement.textContent = `${cookies.toFixed(0)} kr`;
  cookiesPerSecondElement.textContent = `${
    parseFloat(cps.toFixed(1)) + parseFloat(cookiesPerSecond.toFixed(1))
  } per sekund`;

  //klick grej
  clickButton.addEventListener("click", () => {
    cookies += 1 * clickMultiplier * milkMultiplier;
    clicks += 1;
    clickCount++;
    cpsCap();
    setTimeout(() => {
      clicksNonSave = 0;
    }, 3000);
    localStorage.setItem("cookies", cookies);
    localStorage.setItem("clicks", clicks);

    cookieElement.textContent = `${cookies.toFixed(0)} kr`;
    clickCounterElement.textContent = `Totala Klicks: ${clicks}`;
  });

  // Uppgraderingar
  cursorUpgradeCostElement.textContent = `${cursorUpgradeCost} kr`;
  cursorUpgradeAmountElement.textContent = `${cursorUpgradeAmount} st`;

  upgrade1CostElement.textContent = `${upgrade1Cost} kr`;
  upgrade1AmountElement.textContent = `${upgrade1Amount} st`;

  upgrade2CostElement.textContent = `${upgrade2Cost} kr`;
  upgrade2AmountElement.textContent = `${upgrade2Amount} st`;

  upgrade3CostElement.textContent = `${upgrade3Cost} kr`;
  upgrade3AmountElement.textContent = `${upgrade3Amount} st`;

  upgrade4CostElement.textContent = `${upgrade4Cost} kr`;
  upgrade4AmountElement.textContent = `${upgrade4Amount} st`;

  upgrade5CostElement.textContent = `${upgrade5Cost} kr`;
  upgrade5AmountElement.textContent = `${upgrade5Amount} st`;

  cursorUpgradeElement.addEventListener("click", () => {
    if (cookies >= cursorUpgradeCost) {
      cookies -= cursorUpgradeCost;
      clickMultiplier *= 2;
      cursorUpgradeAmount += 1;
      cursorUpgradeCost += 1000 * Math.pow(2, cursorUpgradeAmount);
      clickMultiplierElement.textContent = `Klickstyrka: ${clickMultiplier} mg`;
      cursorUpgradeCostElement.textContent = `${cursorUpgradeCost.toFixed(
        0
      )} kr`;
      cursorUpgradeAmountElement.textContent = `${cursorUpgradeAmount} st`;

      localStorage.setItem("cookies", cookies);
      localStorage.setItem("clickMultiplier", clickMultiplier);
      localStorage.setItem("cursorUpgradeCost", cursorUpgradeCost);
      localStorage.setItem("cursorUpgradeAmount", cursorUpgradeAmount);
    } else {
      cursorUpgradeElement.classList.add("shake-animation");
      cursorUpgradeElement.classList.add("border-red-600");
      setTimeout(() => {
        cursorUpgradeElement.classList.remove("shake-animation");
        cursorUpgradeElement.classList.remove("border-red-600");
      }, 500);
    }
  });

  upgrade1Element.addEventListener("click", () => {
    if (cookies >= upgrade1Cost) {
      cookies -= upgrade1Cost;
      cookiesPerSecond += 0.1;
      upgrade1Amount += 1;
      upgrade2Element.classList.remove("hidden");
      upgrade1Cost += 6 * Math.pow(1.05, upgrade1Amount);
      cookiesPerSecondElement.textContent = `${cookiesPerSecond.toFixed(
        1
      )} per sekund`;
      upgrade1CostElement.textContent = `${upgrade1Cost.toFixed(0)} kr`;
      upgrade1AmountElement.textContent = `${upgrade1Amount} st`;

      localStorage.setItem("cookies", cookies);
      localStorage.setItem("cookiesPerSecond", cookiesPerSecond);
      localStorage.setItem("upgrade1Cost", upgrade1Cost);
      localStorage.setItem("upgrade1Amount", upgrade1Amount);
    } else {
      upgrade1Element.classList.add("shake-animation");
      upgrade1Element.classList.add("border-red-600");
      setTimeout(() => {
        upgrade1Element.classList.remove("shake-animation");
        upgrade1Element.classList.remove("border-red-600");
      }, 500);
    }
  });

  upgrade2Element.addEventListener("click", () => {
    if (cookies >= upgrade2Cost) {
      cookies -= upgrade2Cost;
      cookiesPerSecond += 1;
      upgrade2Amount += 1;
      upgrade3Element.classList.remove("hidden");
      upgrade2Cost += 25 * Math.pow(1.05, upgrade2Amount);
      cookiesPerSecondElement.textContent = `${cookiesPerSecond.toFixed(
        1
      )} per sekund`;
      upgrade2CostElement.textContent = `${upgrade2Cost.toFixed(0)} kr`;
      upgrade2AmountElement.textContent = `${upgrade2Amount} st`;

      localStorage.setItem("cookies", cookies);
      localStorage.setItem("cookiesPerSecond", cookiesPerSecond);
      localStorage.setItem("upgrade2Cost", upgrade2Cost);
      localStorage.setItem("upgrade2Amount", upgrade2Amount);
    } else {
      upgrade2Element.classList.add("shake-animation");
      upgrade2Element.classList.add("border-red-600");
      setTimeout(() => {
        upgrade2Element.classList.remove("shake-animation");
        upgrade2Element.classList.remove("border-red-600");
      }, 500);
    }
  });

  upgrade3Element.addEventListener("click", () => {
    if (cookies >= upgrade3Cost) {
      cookies -= upgrade3Cost;
      cookiesPerSecond += 8;
      upgrade3Amount += 1;
      upgrade4Element.classList.remove("hidden");
      upgrade3Cost += 200 * Math.pow(1.05, upgrade3Amount);
      cookiesPerSecondElement.textContent = `${cookiesPerSecond.toFixed(
        1
      )} per sekund`;
      upgrade3CostElement.textContent = `${upgrade3Cost.toFixed(0)} kr`;
      upgrade3AmountElement.textContent = `${upgrade3Amount} st`;

      localStorage.setItem("cookies", cookies);
      localStorage.setItem("cookiesPerSecond", cookiesPerSecond);
      localStorage.setItem("upgrade3Cost", upgrade3Cost);
      localStorage.setItem("upgrade3Amount", upgrade3Amount);
    } else {
      upgrade3Element.classList.add("shake-animation");
      upgrade3Element.classList.add("border-red-600");
      setTimeout(() => {
        upgrade3Element.classList.remove("shake-animation");
        upgrade3Element.classList.remove("border-red-600");
      }, 500);
    }
  });

  upgrade4Element.addEventListener("click", () => {
    if (cookies >= upgrade4Cost) {
      cookies -= upgrade4Cost;
      cookiesPerSecond += 40;
      upgrade4Amount += 1;
      upgrade4Cost += 2000 * Math.pow(1.05, upgrade4Amount);
      cookiesPerSecondElement.textContent = `${cookiesPerSecond.toFixed(
        1
      )} per sekund`;
      upgrade4CostElement.textContent = `${upgrade4Cost.toFixed(0)} kr`;
      upgrade4AmountElement.textContent = `${upgrade4Amount} st`;

      localStorage.setItem("cookies", cookies);
      localStorage.setItem("cookiesPerSecond", cookiesPerSecond);
      localStorage.setItem("upgrade4Cost", upgrade4Cost);
      localStorage.setItem("upgrade4Amount", upgrade4Amount);
    } else {
      upgrade4Element.classList.add("shake-animation");
      upgrade4Element.classList.add("border-red-600");
      setTimeout(() => {
        upgrade4Element.classList.remove("shake-animation");
        upgrade4Element.classList.remove("border-red-600");
      }, 500);
    }
  });

  upgrade5Element.addEventListener("click", () => {
    if (cookies >= upgrade5Cost) {
      cookies -= upgrade5Cost;
      cookiesPerSecond += 150;
      upgrade5Amount += 1;
      //upgrade6Element.classList.remove("hidden");
      upgrade5Cost += 7000 * Math.pow(1.05, upgrade5Amount);
      cookiesPerSecondElement.textContent = `${cookiesPerSecond.toFixed(
        1
      )} per sekund`;
      upgrade5CostElement.textContent = `${upgrade5Cost.toFixed(0)} kr`;
      upgrade5AmountElement.textContent = `${upgrade5Amount} st`;

      localStorage.setItem("cookies", cookies);
      localStorage.setItem("cookiesPerSecond", cookiesPerSecond);
      localStorage.setItem("upgrade5Cost", upgrade5Cost);
      localStorage.setItem("upgrade5Amount", upgrade5Amount);
    } else {
      upgrade5Element.classList.add("shake-animation");
      upgrade5Element.classList.add("border-red-600");
      setTimeout(() => {
        upgrade5Element.classList.remove("shake-animation");
        upgrade5Element.classList.remove("border-red-600");
      }, 500);
    }
  });

  function updateCookiesPerSecond() {
    cookies += cookiesPerSecond / 100;
    cookieElement.textContent = `${cookies.toFixed(0)} kr`;
    localStorage.setItem("cookies", cookies);
  }

  setInterval(updateCookiesPerSecond, 10);

  function updateUpgradeStatus() {
    localStorage.setItem(
      "upgrade2Unlocked",
      upgrade1Amount >= 1 ? "true" : "false"
    );
    localStorage.setItem(
      "upgrade3Unlocked",
      upgrade2Amount >= 1 ? "true" : "false"
    );
    localStorage.setItem(
      "upgrade4Unlocked",
      upgrade3Amount >= 1 ? "true" : "false"
    );
    localStorage.setItem(
      "upgrade5Unlocked",
      upgrade4Amount >= 1 ? "true" : "false"
    );
  }

  function showUpgrades() {
    if (localStorage.getItem("upgrade2Unlocked") === "true") {
      upgrade2Element.classList.remove("hidden");
    }
    if (localStorage.getItem("upgrade3Unlocked") === "true") {
      upgrade3Element.classList.remove("hidden");
    }
    if (localStorage.getItem("upgrade4Unlocked") === "true") {
      upgrade4Element.classList.remove("hidden");
    }
    if (localStorage.getItem("upgrade5Unlocked") === "true") {
      upgrade5Element.classList.remove("hidden");
    }
  }

  function cpsCap() {
    clicksNonSave += 1;
    if (clicksNonSave > 50) {
      alert("Sluta snusa!!!!!");
      clicksNonSave = 0; // Återställ clickCount
    }
  }

  function milkBar() {
    let widthPercentage = 0;

    const interval = setInterval(() => {
      widthPercentage += incrementAmount;
      document.documentElement.style.setProperty(
        "--width-variable",
        widthPercentage + "%"
      );

      if (widthPercentage >= 100) {
        clearInterval(interval);
        resetBar();
      }
    }, 10);

    function resetBar() {
      widthPercentage = 0;
      document.documentElement.style.setProperty(
        "--width-variable",
        widthPercentage + "%"
      );

      if (count % 2 === 0) {
        milkMultiplier = 3;
        incrementAmount = 1000 / (3 * 60 * 100);
        milkBarElement.classList.add("bg-blue-500");
        milkBarElement.classList.remove("bg-red-600");
        clickMultiplierElement.textContent = `Klickstyrka: ${
          clickMultiplier * milkMultiplier
        } mg`;
      } else {
        incrementAmount = 100 / (3 * 60 * 100);
        milkMultiplier = 1;
        milkBarElement.classList.remove("bg-blue-500");
        milkBarElement.classList.add("bg-red-600");
        clickMultiplierElement.textContent = `Klickstyrka: ${
          clickMultiplier * milkMultiplier
        } mg`;
      }

      count += 1;
      milkBar();
    }
  }

  function logCPS() {
    cps = clickCount * clickMultiplier * milkMultiplier;
    clickCount = 0;
    cookiesPerSecondElement.textContent = `${
      parseFloat(cps.toFixed(1)) + parseFloat(cookiesPerSecond.toFixed(1))
    } per sekund`;
  }
  setInterval(logCPS, 1000);

  //call functions
  updateUpgradeStatus();
  showUpgrades();
  milkBar();
  logCPS();
});
