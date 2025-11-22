const slider = document.getElementById("slider");
const sliderValueText = document.querySelector(".character_length");
const options = document.querySelectorAll(".option");
const form = document.querySelector(".password_generator");
const btnGenerate = document.getElementById("generate");

const isAnyOptionsChecked = () =>
  Array.from(options).some((option) => option.checked);

const isSliderValueZero = () => parseInt(slider.value) !== 0;

const checkValidity = () => {
  btnGenerate.disabled = !(isAnyOptionsChecked() && isSliderValueZero());
};

slider.addEventListener("input", function () {
  sliderValueText.textContent = this.value;
  const percent = Math.floor((parseInt(this.value) / 20) * 100);
  this.style.background = `linear-gradient(to right, hsl(127, 100%, 82%) 0%, 
                                        hsl(127, 100%, 82%) ${percent}%, 
                                        hsl(248, 15%, 11%) ${percent}%, 
                                        hsl(248, 15%, 11%) 100%)`;
});

slider.addEventListener("change", checkValidity);
options.forEach((option) => option.addEventListener("change", checkValidity));

form.addEventListener("submit", function (event) {
  event.preventDefault();
});
