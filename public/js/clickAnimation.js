document.addEventListener("DOMContentLoaded", function () {
  const clickButtonElement = document.getElementById("clickButton");
  const textContentElement = document.getElementById("textContent");
  let clickMultiplier =
    parseFloat(localStorage.getItem("clickMultiplier")) || 1;

  clickButtonElement.addEventListener("click", (event) => {
    let clickMultiplier =
      parseFloat(localStorage.getItem("clickMultiplier")) || 1;

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    console.log("X:", mouseX, "Y:", mouseY);

    const animatedTextElement = document.createElement("p");
    const textNodeElement = document.createTextNode(`+${clickMultiplier}`);

    animatedTextElement.classList.add("slide-fade-animation");
    animatedTextElement.classList.add("animatedText");

    animatedTextElement.appendChild(textNodeElement);

    animatedTextElement.style.left = mouseX + "px";
    animatedTextElement.style.top = mouseY + "px";

    textContentElement.appendChild(animatedTextElement);
    console.dir(textContentElement);
  });
});
