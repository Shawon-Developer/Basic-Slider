document.addEventListener("DOMContentLoaded", function () {
  const allSlideContainer = document.querySelector(".all-slide-container");
  const slides = document.querySelectorAll(".slide");
  const nextButton = document.querySelector(".next-btn");
  const prevButton = document.querySelector(".prev-btn");
  const dots = document.querySelectorAll(".dot");

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoSlide;
  let isDragging = false;
  let startDragPosition = 0;
  let currentTranslate = 0;
  let previousTranslate = 0;
  let animationID = 0;
  let allSlideContainerWidth = allSlideContainer.clientWidth;

  function getClientPositionX(event) {
    return event.type.includes("mouse")
      ? event.pageX
      : event.touches[0].clientX;
  }

  function setSliderPositionDrag() {
    allSlideContainer.style.transform = `translate(${currentTranslate}px)`;
  }

  function dragReleaseAnimation() {
    setSliderPositionDrag();
    if (isDragging) {
      requestAnimationFrame(dragReleaseAnimation);
    }
  }

  function dragStart(index) {
    return function (event) {
      isDragging = true;
      startDragPosition = getClientPositionX(event);
      animationID = requestAnimationFrame(dragReleaseAnimation);
      allSlideContainer.classList.add("grabbing");
    };
  }

  function dragMove(event) {
    if (isDragging) {
      const currentDragPosition = getClientPositionX(event);
      currentTranslate =
        previousTranslate + currentDragPosition - startDragPosition;
    }
  }

  function dragEnd() {
    isDragging = false;
    cancelAnimationFrame(animationID);
    allSlideContainer.classList.remove("grabbing");

    const movedBY = currentTranslate - previousTranslate;

    if (movedBY < -100 && currentIndex < totalSlides - 1) {
      currentIndex += 1;
    } else if (movedBY > 100 && currentIndex > 0) {
      currentIndex -= 1;
    }

    updateSlider();
  }

  function updateSlider() {
    currentTranslate = -currentIndex * allSlideContainerWidth;
    previousTranslate = currentTranslate;
    allSlideContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  function setSliderInterval() {
    autoSlide = setInterval(function () {
      currentIndex = (currentIndex + 1) % totalSlides;
      updateSlider();
    }, 5000);
  }

  setSliderInterval();

  allSlideContainer.addEventListener("mouseenter", function () {
    clearInterval(autoSlide);
  });
  allSlideContainer.addEventListener("mouseleave", function () {
    setSliderInterval();
  });

  nextButton.addEventListener("click", function () {
    clearInterval(autoSlide);
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
    setSliderInterval();
  });

  prevButton.addEventListener("click", function () {
    clearInterval(autoSlide);
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
    setSliderInterval();
  });

  dots.forEach((dot) =>
    dot.addEventListener("click", function () {
      clearInterval(autoSlide);
      currentIndex = parseInt(this.getAttribute("data-index"));
      updateSlider();
      setSliderInterval();
    })
  );

  slides.forEach(function (slide, index) {
    slide.addEventListener("mousedown", dragStart(index));
    slide.addEventListener("mousemove", dragMove);
    slide.addEventListener("mouseup", dragEnd);
    slide.addEventListener("mouseleave", dragEnd);

    slide.addEventListener("touchstart", dragStart(index));
    slide.addEventListener("touchmove", dragMove);
    slide.addEventListener("touchend", dragEnd);
  });

  window.addEventListener("resize", function () {
    allSlideContainerWidth = allSlideContainer.clientWidth;
    updateSlider();
  });
});
