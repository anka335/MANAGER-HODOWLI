document.addEventListener('DOMContentLoaded', function() {
  let slideIndex = 0;
  let allowShowSlides = true;
  let slides = document.getElementsByClassName("slide");
  slides = Array.from(slides);
  let dots = document.getElementsByClassName("dot");
  dots = Array.from(dots);
  let isFunctionCalled = false;

  dots.forEach((dot, index) => {
    dot.addEventListener("click", async function () {
      allowShowSlides = false;
      for (i = 0; i < slides.length; i++) {
        slides[i].style.width = "0vw";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[index].style.width = "100vw";
      dots[index].className += " active";
  
      await new Promise(resolve => setTimeout(resolve, 10000));
  
        allowShowSlides = true;
        showSlides();
    });
});


  showSlides(); // call showslide method

  async function showSlides() {
    if (isFunctionCalled){
      return;
    }

    isFunctionCalled = true;

    try {
      if (!allowShowSlides) {
        return;
      }
      console.log("siup");
      let i;

      for (i = 0; i < slides.length; i++) {
        // initially set the display to
        // none for every image.
        slides[i].style.width = "0vw";
      }

      // increase by 1, Global variable
      slideIndex++; //obecny slajd

      // check for boundary
      if (slideIndex > slides.length) {
        slideIndex = 1;
      }

      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }

      slides[slideIndex - 1].style.width = "100vw";
      dots[slideIndex - 1].className += " active";

      await new Promise(resolve => setTimeout(resolve, 8000));
    } finally {
      isFunctionCalled = false;
      showSlides();
    }
  }
  
});