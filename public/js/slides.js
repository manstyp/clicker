document.addEventListener("DOMContentLoaded", function () {
  const slide1Element = document.getElementById("slide1");
  const slide2Element = document.getElementById("slide2");
  const slide1ContentElement = document.getElementById("slide1Content");
  const slide2ContentElement = document.getElementById("slide2Content");

  slide1Element.addEventListener("click", () => {
    slide1Element.classList.add("bg-rose-300");
    slide1Element.classList.remove("bg-rose-50");
    slide2Element.classList.add("bg-rose-50");
    slide2Element.classList.remove("bg-rose-300");
    slide1ContentElement.classList.remove("hidden");
    slide2ContentElement.classList.add("hidden");
  });

  slide2Element.addEventListener("click", () => {
    slide1Element.classList.add("bg-rose-50");
    slide1Element.classList.remove("bg-rose-300");
    slide2Element.classList.add("bg-rose-300");
    slide2Element.classList.remove("bg-rose-50");
    slide1ContentElement.classList.add("hidden");
    slide2ContentElement.classList.remove("hidden");
  });
});
