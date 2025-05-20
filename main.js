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

  let autoSlide;

  function setSliderInterval() {
    autoSlide = setInterval(function () {
      console.log(currentIndex);
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlide();
    }, 5000);
  }

  setSliderInterval();

  allSlideContainer.addEventListener("mouseenter", function () {
    clearInterval(autoSlide);
    console.log("enter");
  });
  allSlideContainer.addEventListener("mouseleave", function () {
    setSliderInterval();
    console.log("leave");
  });

  nextButton.addEventListener("click", function () {
    clearInterval(autoSlide);
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide();
    setSliderInterval();
  });

  prevButton.addEventListener("click", function () {
    clearInterval(autoSlide);
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlide();
    setSliderInterval();
  });

  dots.forEach((dot) =>
    dot.addEventListener("click", function () {
      currentIndex = parseInt(this.getAttribute("data-index"));
      updateSlide();
    })
  );
});
