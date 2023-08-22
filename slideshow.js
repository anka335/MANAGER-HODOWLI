document.addEventListener('DOMContentLoaded', function() {
  let slideIndex = 0;
  let allowShowSlides = true;
  let slides = document.getElementsByClassName("slide");
  slides = Array.from(slides);
  let dots = document.getElementsByClassName("dot");
  dots = Array.from(dots);

  dots[0].addEventListener("click", async function(){
    allowShowSlides = false;
    console.log("slide: 0");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[0].style.display = "block";
    dots[0].className += " active";

    await new Promise(resolve => setTimeout(resolve, 10000));

      allowShowSlides = true;
      showSlides();
  });

  dots[1].addEventListener("click", async function(){
    allowShowSlides = false;
    console.log("slide: 1");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[1].style.display = "block";
    dots[1].className += " active";

    await new Promise(resolve => setTimeout(resolve, 10000));

    slideIndex = 1;
    allowShowSlides = true;
    showSlides();
  });

  dots[2].addEventListener("click", async function(){
    allowShowSlides = false;
    console.log("slide: 2");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[2].style.display = "block";
    dots[2].className += " active";

    await new Promise(resolve => setTimeout(resolve, 10000));

    slideIndex = 2;
    allowShowSlides = true;
    showSlides();
  });

  dots[3].addEventListener("click", async function(){
    allowShowSlides = false;
    console.log("slide: 3");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[3].style.display = "block";
    dots[3].className += " active";

    await new Promise(resolve => setTimeout(resolve, 8000));

    slideIndex = 3;
    allowShowSlides = true;
    showSlides();
  });

  showSlides(); // call showslide method

  function showSlides() {
    if (!allowShowSlides) {
      return;
    }
    let i;

    for (i = 0; i < slides.length; i++) {
      // initially set the display to
      // none for every image.
      slides[i].style.display = "none";
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

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";

    // Change image every 2 seconds
    setTimeout(showSlides, 4000);
  }
});