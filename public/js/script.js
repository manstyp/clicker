document.addEventListener("DOMContentLoaded", function () {
  let clicks = 0;
  let cookies = 0;
  let clickMultiplier = 1;

  const clickButton = document.getElementById("clickButton");
  clickButton.addEventListener("click", function () {
    clickCounter();
    const clickCounterElement = document.getElementById("clickCounter");
    const cookieElement = document.getElementById("cookieCounter");
    clickCounterElement.textContent = `Counter: ${clicks}`;
    cookieElement.textContent = `du har ${cookies} prillor`;
  });

  function clickCounter() {
    clicks += 1;
    cookies += 1 * clickMultiplier;
  }

  function amountOfCookies() {}
});
