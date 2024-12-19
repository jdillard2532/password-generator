const slider = document.querySelector(".slider");
const charLength = document.querySelector(".characterLength");
const password = document.querySelector(".password");
const btnGenerate = document.querySelector(".generate");
const checkbox = document.querySelectorAll(".checkbox");
const bars = document.querySelectorAll(".bar");
const strengthInfo = document.querySelector(".strength");
const copy = document.querySelector(".copy");
const copyStatus = document.querySelector(".copiedStatus");
let finalPassword = "";

reset();

//*****EVENT LISTENERS*****

copy.addEventListener("click", function () {
  navigator.clipboard.writeText(password.textContent);
  copyStatus.textContent = "COPIED";
});

// change color of slider
slider.addEventListener("input", function (e) {
  let x = slider.value * 5;
  let color =
    "linear-gradient(90deg, var(--green) " +
    x +
    "%" +
    ", var(--gray-400) " +
    x +
    "%)";
  slider.style.background = color;
  charLength.textContent = slider.value;
});

//checkbox event listener
checkbox.forEach((e) => {
  e.addEventListener("click", function () {
    e.classList.toggle("active");
    finalPassword = "";
    strengthBars();
  });
});

//generate button event listener
btnGenerate.addEventListener("click", function (e) {
  locateCheckbox();
  copyStatus.textContent = "";
  e.preventDefault();
});

//*****END OF EVENT LISTENERS */

//*****FUNCTIONS****** */

//reset slider and checkboxes
function reset() {
  slider.value = 0;
  checkbox.forEach((e) => {
    e.classList.remove("active");
    e.checked = false;
  });
}

//identify which checkboxes were checked
function locateCheckbox() {
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].classList.contains("active")) {
      checkBoxInfo(checkbox[i].id);
    }
  }
}
//compile all characters
function checkBoxInfo(x) {
  let uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
  let numbers = "0123456789";
  let symbols = "!@#$%^&*()|[]{}?";
  let result = "";

  switch (x) {
    case "uppercase":
      finalPassword = finalPassword + uppercaseLetters;
      break;

    case "lowercase":
      finalPassword = finalPassword + lowercaseLetters;
      break;

    case "numbers":
      finalPassword = finalPassword + numbers;
      break;

    case "symbols":
      finalPassword = finalPassword + symbols;
      break;

    default:
      break;
  }

  randomizeResult(finalPassword);
}
//randomize characters
function randomizeResult(x) {
  let result = "";
  for (let i = 0; i < slider.value; i++) {
    result = result + x.charAt(Math.floor(Math.random() * x.length));
  }
  password.style.opacity = "100%";
  password.textContent = result;
}

function strengthBars() {
  let counter = 0;
  resetBars();
  for (let i = 0; i < checkbox.length; i++) {
    if (checkbox[i].classList.contains("active")) {
      counter++;
    }
  }
  switch (counter) {
    case 0:
      resetBars();
      strengthInfo.textContent = "Too Weak!";
      break;
    case 1:
      bars[0].style.backgroundColor = "var(--red)";
      bars[0].style.border = "var(--red";
      strengthInfo.textContent = "Too Weak!";

      break;

    case 2:
      bars[0].style.backgroundColor = "var(--orange)";
      bars[0].style.border = "var(--orange";
      bars[1].style.backgroundColor = "var(--orange)";
      bars[1].style.border = "var(--orange";
      strengthInfo.textContent = "Weak";

      break;
    case 3:
      bars[0].style.backgroundColor = "var(--yellow)";
      bars[0].style.border = "var(--yellow";
      bars[1].style.backgroundColor = "var(--yellow)";
      bars[1].style.border = "var(--yellow";
      bars[2].style.backgroundColor = "var(--yellow)";
      bars[2].style.border = "var(--yellow";
      strengthInfo.textContent = "Medium";

      break;

    case 4:
      bars[0].style.backgroundColor = "var(--green)";
      bars[0].style.border = "var(--green";
      bars[1].style.backgroundColor = "var(--green)";
      bars[1].style.border = "var(--green";
      bars[2].style.backgroundColor = "var(--green)";
      bars[2].style.border = "var(--green";
      bars[3].style.backgroundColor = "var(--green)";
      bars[3].style.border = "var(--green";
      strengthInfo.textContent = "Strong";

      break;

    default:
      resetBars();

      break;
  }
}

function resetBars() {
  for (let i = 0; i < bars.length; i++) {
    bars[i].style.background = "none";
    bars[i].style.border = "1px solid white";
    strengthInfo.textContent = "";
  }
}
