const slider = document.getElementById("slider");
const sliderValueText = document.querySelector(".character_length");
const options = document.querySelectorAll(".option");
const form = document.querySelector(".password_generator");
const btnGenerate = document.getElementById("generate");
const passwordInput = document.getElementById("password");
const btnCopy = document.querySelector(".btn-copy");
const copiedText = document.querySelector(".copy_text");

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
passwordInput.addEventListener("change", copyBtnState);

btnCopy.addEventListener("click", async function() {
  await navigator.clipboard.writeText(passwordInput.value);
  copiedText.classList.remove("hidden");

  setTimeout(()=> {
    copiedText.classList.add("hidden");
  }, 2500);
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
});