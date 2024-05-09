document.addEventListener("DOMContentLoaded", function () {
  const clickButtonElement = document.getElementById("clickButton");
  const textContentElement = document.getElementById("textContent");

  clickButtonElement.addEventListener("click", (event) => {
    let clickMultiplier =
      parseFloat(localStorage.getItem("clickMultiplier")) || 1;
    let milkMultiplierElement =
      parseFloat(localStorage.getItem("milkMultiplierElement")) || 1;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const animatedTextElement = document.createElement("p");
    const textNodeElement = document.createTextNode(
      `+${clickMultiplier * milkMultiplierElement}`
    );

    animatedTextElement.classList.add("slide-fade-animation");
    animatedTextElement.classList.add("animatedText");

    animatedTextElement.appendChild(textNodeElement);

    animatedTextElement.style.left = mouseX + "px";
    animatedTextElement.style.top = mouseY + "px";

    textContentElement.appendChild(animatedTextElement);
  });
});
