const slider = document.getElementById("slider");
const sliderValueText = document.querySelector(".character_length");
const options = document.querySelectorAll(".option");
const form = document.querySelector(".password_generator");
const btnGenerate = document.getElementById("generate");
const passwordInput = document.getElementById("password");
const btnCopy = document.querySelector(".btn-copy");
const copiedText = document.querySelector(".copy_text");
const uppercaseCheckbox = document.getElementById("uppercase");
const lowercaseCheckbox = document.getElementById("lowercase");
const numbersCheckbox = document.getElementById("numbers");
const symbolsCheckbox = document.getElementById("symbols");
const strengthTitle = document.querySelector(".strength_value_title");
const strengthValueIcon = document.querySelector(".strength_value_icon");

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+=-{}[]<>?";

const STRENGTH_TYPE = ["TOO WEAK", "WEAK", "MEDIUM", "STRONG"];

function generatePassword(length) {
  let pool = "";

  if (uppercaseCheckbox.checked) pool += UPPERCASE;

  if (lowercaseCheckbox.checked) pool += LOWERCASE;

  if (numbersCheckbox.checked) pool += NUMBERS;

  if (symbolsCheckbox.checked) pool += SYMBOLS;

  let password = "";

  for (let i = 0; i < length; i++) {
    password += pool[Math.floor(Math.random() * pool.length)];
  }

  return password;
}

function getLengthBonusPoint(length) {
  if (length < 9) return 0;

  return (length - 8) * 3;
}

function containsUppercase(str) {
  return /[A-Z]/.test(str);
}

function containsLowercase(str) {
  return /[a-z]/.test(str);
}

function containsNumber(str) {
  return /\d/.test(str);
}

function containsSymbol(str) {
  return /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
}

function getPasswordBonusScore(password) {
  let points = getLengthBonusPoint(password.length);
  let countType = 0;

  if (containsUppercase(password)) {
    points += 10;
    countType++;
  }

  if (containsLowercase(password)) {
    points += 10;
    countType++;
  }

  if (containsNumber(password)) {
    points += 10;
    countType++;
  }

  if (containsSymbol(password)) {
    points += 10;
    countType++;
  }

  // add bonus points if the password contains more then 2 type of character
  if (countType > 2) points += 15;

  return points;
}

function getPasswordStrength(password) {
  const basePoint = 10;
  let points = basePoint + getPasswordBonusScore(password);
  console.log(points);

  if (points < 26) return 0;

  if (points > 25 && points < 51) return 1;

  if (points > 50 && points < 76) return 2;

  return 3;
}

const isAnyOptionsChecked = () =>
  Array.from(options).some((option) => option.checked);

const isPasswordInputEmpty = () => passwordInput.textContent === "";

const isSliderValueZero = () => parseInt(slider.value) !== 0;

const generateBntState = () => {
  btnGenerate.disabled = !(isAnyOptionsChecked() && isSliderValueZero());
};

const copyBtnState = () => {
  btnCopy.disabled = !isPasswordInputEmpty();
};

slider.addEventListener("input", function () {
  sliderValueText.textContent = this.value;
  const percent = Math.floor((parseInt(this.value) / 20) * 100);
  this.style.background = `linear-gradient(to right, hsl(127, 100%, 82%) 0%, 
                                        hsl(127, 100%, 82%) ${percent}%, 
                                        hsl(248, 15%, 11%) ${percent}%, 
                                        hsl(248, 15%, 11%) 100%)`;
});

slider.addEventListener("change", generateBntState);
options.forEach((option) =>
  option.addEventListener("change", generateBntState)
);

btnCopy.addEventListener("click", async function () {
  await navigator.clipboard.writeText(passwordInput.value);
  copiedText.classList.remove("hidden");

  setTimeout(() => {
    copiedText.classList.add("hidden");
  }, 2500);
});

btnGenerate.addEventListener("click", function () {
  let password = generatePassword(parseInt(slider.value));
  passwordInput.value = password;
  const strengthIndex = getPasswordStrength(password);
  strengthTitle.classList.remove("hidden");
  strengthTitle.textContent = STRENGTH_TYPE[strengthIndex];
  strengthValueIcon.setAttribute("data-state", `${strengthIndex + 1}`);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
});
