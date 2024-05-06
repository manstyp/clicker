document.addEventListener("DOMContentLoaded", function () {
  // const appVersion = "1.0";
  const newAppVersion = "2.0";
  const storedAppVersion = localStorage.getItem("appVersion");

  if (storedAppVersion !== newAppVersion) {
    localStorage.clear();

    localStorage.setItem("appVersion", newAppVersion);
  }
});
