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

window.onload = function () {
  const usernameElement = document.querySelector("#username");
  const username = usernameElement.getAttribute("href").split("/").pop();

  if (username.length <= 6) {
    usernameElement.classList.remove("w-32");
    usernameElement.classList.add("w-24");
  } else if (username.length > 6 && username.length <= 12) {
    usernameElement.classList.remove("w-32");
    usernameElement.classList.add("w-36");
  } else if (username.length > 12) {
    usernameElement.classList.remove("w-32");
    usernameElement.classList.add("w-48");
  }
};
