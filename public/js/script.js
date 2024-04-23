document.addEventListener("DOMContentLoaded", function () {
  let clicks = parseInt(localStorage.getItem("clicks")) || 0;
  let cookies = parseInt(localStorage.getItem("cookies")) || 0;
  let clickMultiplier = 1;

  const clickButton = document.getElementById("clickButton");
  const cookieElement = document.getElementById("cookieCounter");
  const clickCounterElement = document.getElementById("clickCounter");

  clickCounterElement.textContent = `Counter: ${clicks}`;
  cookieElement.textContent = `du har ${cookies} prillor`;

  clickButton.addEventListener("click", () => {
    cookies += 1;
    clicks += 1;
    localStorage.setItem("cookies", cookies);
    localStorage.setItem("clicks", clicks);

    cookieElement.textContent = `du har ${cookies} prillor`;
    clickCounterElement.textContent = `Counter: ${clicks}`;
  });
});
