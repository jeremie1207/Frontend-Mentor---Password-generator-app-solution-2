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


const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+=-{}[]<>?";


function generatePassword(length) {
  let pool = "";

  if(uppercaseCheckbox.checked) pool+= UPPERCASE;

  if(lowercaseCheckbox.checked) pool+= LOWERCASE;

  if(numbersCheckbox.checked) pool+= NUMBERS;

  if(symbolsCheckbox.checked) pool+= SYMBOLS;

  let password = "";

  for(let i = 0; i < length; i++) {
    password += pool[Math.floor(Math.random() * pool.length)];
  }

  return password;
}

const isAnyOptionsChecked = () =>
  Array.from(options).some((option) => option.checked);

const isPasswordInputEmpty = () => passwordInput.textContent === "";

const isSliderValueZero = () => parseInt(slider.value) !== 0;

const generateBntState = () => {
  btnGenerate.disabled = !(isAnyOptionsChecked() && isSliderValueZero());
};

const copyBtnState = () => {
  btnCopy.disabled = !(isPasswordInputEmpty());
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
options.forEach((option) => option.addEventListener("change", generateBntState));


btnCopy.addEventListener("click", async function() {
  await navigator.clipboard.writeText(passwordInput.value);
  copiedText.classList.remove("hidden");

  setTimeout(()=> {
    copiedText.classList.add("hidden");
  }, 2500);
});


form.addEventListener("submit", function (event) {
  event.preventDefault();
  let password = generatePassword(parseInt(slider.value));
  passwordInput.value = password;
});