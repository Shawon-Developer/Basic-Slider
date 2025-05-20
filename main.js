document.addEventListener("DOMContentLoaded", function () {
  const allSlideContainer = document.querySelector(".all-slide-container");
  const slides = document.querySelectorAll(".slide");
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlide() {
    allSlideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  nextButton.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
  });

  prevButton.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
  });

  dots.forEach((dot) =>
    dot.addEventListener("click", function () {
      currentIndex = parseInt(this.getAttribute("data-index"));
      updateSlide();
    })
  );
});
