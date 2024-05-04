document.addEventListener("DOMContentLoaded", () => {
  let count = 0;
  let incrementAmount = 100 / (3 * 60 * 100);
  const milkBarElement = document.getElementById("milkBar");

  const clickButton = document.getElementById("clickButton");
  const cookieElement = document.getElementById("cookieCounter");
  const clickCounterElement = document.getElementById("clickCounter");
  const cookiesPerSecondElement = document.getElementById("cookiesPerSecond");
  const clickMultiplierElement = document.getElementById("clickMultiplier");

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
        clickMultiplier = clickMultiplier * 3;
        incrementAmount = 1000 / (3 * 60 * 100);
        milkBarElement.classList.add("bg-blue-500");
        milkBarElement.classList.remove("bg-red-600");
      } else {
        incrementAmount = 100 / (3 * 60 * 100);
        clickMultiplier = clickMultiplier / 3;
        milkBarElement.classList.remove("bg-blue-500");
        milkBarElement.classList.add("bg-red-600");
      }
      localStorage.setItem("clickMultiplier", clickMultiplier);
      clickMultiplierElement.textContent = `Klickstyrka: ${clickMultiplier} mg`;
      count += 1;
      milkBar();
    }
  }
  //CALL FUNCTION!!!
  milkBar();
});
