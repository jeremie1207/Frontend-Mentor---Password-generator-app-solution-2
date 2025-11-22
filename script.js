const slider = document.getElementById("slider");
const sliderValueText = document.querySelector(".character_length");

slider.addEventListener("input", function () {
  sliderValueText.textContent = this.value;
  const percent = Math.floor((parseInt(this.value) / 20) * 100);
  this.style.background = `linear-gradient(to right, hsl(127, 100%, 82%) 0%, 
                                        hsl(127, 100%, 82%) ${percent}%, 
                                        hsl(248, 15%, 11%) ${percent}%, 
                                        hsl(248, 15%, 11%) 100%)`;
});
