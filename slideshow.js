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
      slideIndex = index+1;
      slides[index].style.width = "100vw";
      dots[index].className += " active";
  
      await new Promise(resolve => setTimeout(resolve, 15000));
  
        allowShowSlides = true;
        showSlides();
    });
  });

  let touchstartX = 0
  let touchendX = 0
      
  async function checkDirection() {
    if (touchendX < touchstartX){
      //console.log('swiped left!');
      allowShowSlides = false;
      for (i = 0; i < slides.length; i++) {
        slides[i].style.width = "0vw";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      if (slideIndex < slides.length){
        slideIndex += 1;
      }

      slides[slideIndex-1].style.width = "100vw";
      dots[slideIndex-1].className += " active";
  
      await new Promise(resolve => setTimeout(resolve, 15000));
  
        allowShowSlides = true;
        showSlides();
    }


    if (touchendX > touchstartX){
      //console.log('swiped right!', slideIndex);
      allowShowSlides = false;
      for (i = 0; i < slides.length; i++) {
        slides[i].style.width = "0vw";
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      //console.log(slideIndex);
      if (slideIndex >= 2){
        //console.log("zmniejszone");
        slideIndex -= 1;
      }

      slides[slideIndex-1].style.width = "100vw";
      dots[slideIndex-1].className += " active";
  
      await new Promise(resolve => setTimeout(resolve, 15000));
  
        allowShowSlides = true;
        showSlides();
    }
  }


  document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX
  })

  document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX
    checkDirection()
  })


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

      await new Promise(resolve => setTimeout(resolve, 10000));
    } finally {
      isFunctionCalled = false;
      showSlides();
    }
  }
  
});