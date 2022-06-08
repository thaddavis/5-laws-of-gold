var forwardButton = document.getElementById("slide-forward");
var backButton = document.getElementById("slide-back");

forwardButton.addEventListener(
  "click",
  function (e) {
    console.log("SLIDE Forward");
    console.log("window.experience", window.experience);
    window.experience.forward();
  },
  false
);

backButton.addEventListener(
  "click",
  function (e) {
    console.log("SLIDE Back");
    console.log("window.experience", window.experience);
    window.experience.backward();
  },
  false
);
