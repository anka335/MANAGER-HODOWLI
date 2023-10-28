document.addEventListener('DOMContentLoaded', function() {
    let buttons = document.getElementsByTagName("button");
    var buttonArray = Array.from(buttons);
    let arrows = document.getElementsByClassName("arrow");
    let imagesToShow = document.getElementsByClassName("dog_image");
    var imagesToShowArray = Array.from(imagesToShow).slice(1);
    var arrowsArray = Array.from(arrows);
    arrowsArray.forEach(function(element){
            element.classList.add("less");
    });
    let leftArrows = document.getElementsByClassName("arrow_left");
    var leftArrowsArray = Array.from(leftArrows);
    leftArrowsArray.forEach(function(element){
            element.classList.add("less");
    });
    let rightArrows = document.getElementsByClassName("arrow_right");
    var rightArrowsArray = Array.from(rightArrows);
    rightArrowsArray.forEach(function(element){
            element.classList.add("less");
    });
    let numberOfImgs = 4;
    if (window.screen.width > 1200){
        numberOfImgs = 4;
    } else if (window.screen.width > 1000) {
        numberOfImgs = 3;
    } else if (window.screen.width > 850){
        numberOfImgs = 2;
    } else {
        numberOfImgs = 1;
    }
    let overlay = null;
    
    window.addEventListener("resize", (event) => {
        console.log("ZMIANA WIELKOSC");
        if (window.screen.width > 1200){
            numberOfImgs = 4;
        } else if (window.screen.width > 1000) {
            numberOfImgs = 3;
        } else if (window.screen.width > 850){
            numberOfImgs = 2;
        } else {
            numberOfImgs = 1;
        }
    });

    buttonArray.forEach(element => {
        element.setAttribute("is_one", "1");
        let gallery = element.parentElement;
        let images = gallery.getElementsByClassName("dog_image");
        var imagesArray = Array.from(images).slice(1);
        imagesArray.forEach(function(element) {
            element.classList.add("less");
        });
        let thisArrows = gallery.getElementsByClassName("arrow");
        var thisArrowsArray = Array.from(thisArrows);
        thisArrowsArray.forEach(function(element){
            element.classList.add("less");
        });

        element.addEventListener("click", function() {
            console.log("numberOfImgs: ", numberOfImgs);
            gallery = element.parentElement;
            images = gallery.getElementsByClassName("dog_image");
            imagesArray = Array.from(images).slice(1);
            imagesArray.forEach(function(element) {
                element.classList.add("less");
            });
            
            let attribute = element.getAttribute("is_one");
            if (attribute === "1"){
                attribute = "0";
                element.textContent = "mniej";
                for (let i = 0; i < Math.min(imagesArray.length, numberOfImgs-1); i++) {
                    imagesArray[i].classList.add("more");
                    imagesArray[i].classList.remove("less");
                }
                if (imagesArray.length > numberOfImgs-1){
                    for (let i = numberOfImgs-1; i < imagesArray.length; i++) {
                        imagesArray[i].classList.add("less");
                        imagesArray[i].classList.remove("more");
                    }
                }
                thisArrowsArray.forEach(function(arrow) {
                    arrow.classList.replace("less", "more");
                });

            } else {
                attribute = "1";
                element.textContent = "więcej...";
                for (let i = 0; i < imagesArray.length; i++) {
                    imagesArray[i].classList.add("less");
                    imagesArray[i].classList.remove("more");
                }
                thisArrowsArray.forEach(function(arrow) {
                    arrow.classList.replace("more", "less");
                });
            }
            element.setAttribute("is_one", attribute);
            console.log(attribute);
        });
    });


    leftArrowsArray.forEach(element => {
        element.addEventListener("click", function(){
            let gallery = element.parentElement;
            let thisArrows = gallery.getElementsByClassName("arrow");
            let thisArrowsArray = Array.from(thisArrows);
            let images = gallery.getElementsByClassName("dog_image");
            var imagesArray = Array.from(images);
            gallery.innerHTML = '';

            gallery.appendChild(thisArrowsArray[0]);
            for (var i = 1; i < imagesArray.length; i++){
                gallery.appendChild(imagesArray[i]);
            }
            gallery.appendChild(imagesArray[0]);
            gallery.appendChild(thisArrowsArray[1]);
            console.log(gallery);

            images = gallery.getElementsByClassName("dog_image");
            imagesArray = Array.from(images);
            for (let i = 0; i < Math.min(imagesArray.length, numberOfImgs); i++) {
                imagesArray[i].classList.add("more");
                imagesArray[i].classList.remove("less");
                console.log("a1");
            }
            if (imagesArray.length > numberOfImgs){
                for (let i = numberOfImgs; i < imagesArray.length; i++) {
                    console.log("b1");
                    imagesArray[i].classList.add("less");
                    imagesArray[i].classList.remove("more");
                }
            }
        });
    });


    rightArrowsArray.forEach(element => {
        element.addEventListener("click", function(){
            let gallery = element.parentElement;
            let thisArrows = gallery.getElementsByClassName("arrow");
            let thisArrowsArray = Array.from(thisArrows);
            let images = gallery.getElementsByClassName("dog_image");
            var imagesArray = Array.from(images);
            gallery.innerHTML = '';

            gallery.appendChild(thisArrowsArray[0]);
            gallery.appendChild(imagesArray[imagesArray.length-1]);
            for (var i = 0; i < imagesArray.length-1; i++){
                gallery.appendChild(imagesArray[i]);
            }
            gallery.appendChild(thisArrowsArray[1]);
            console.log(gallery);

            images = gallery.getElementsByClassName("dog_image");
            imagesArray = Array.from(images);
            for (let i = 0; i < Math.min(imagesArray.length, numberOfImgs); i++) {
                console.log("a2");
                imagesArray[i].classList.add("more");
                imagesArray[i].classList.remove("less");
            }
            if (imagesArray.length > numberOfImgs){
                for (let i = numberOfImgs; i < imagesArray.length; i++) {
                    console.log("b2");
                    imagesArray[i].classList.add("less");
                    imagesArray[i].classList.remove("more");
                }
            }
        });
    });

    imagesToShowArray.forEach(element => {
        element.addEventListener("click", function(){
            console.log("kliknales obrazek ", element);
            let imageSrc = element.getAttribute('src');
            if (overlay) {
                overlay.remove(); // Usuń istniejący overlay, jeśli istnieje
            }
    
            overlay = document.createElement('div');
            overlay.classList.add('overlay');
            let closeButton = document.createElement('button');
            closeButton.textContent = 'X';
            closeButton.classList.add('close-button');
            overlay.appendChild(closeButton);
    
            let overlayImage = document.createElement('img');
            overlayImage.src = imageSrc;
            overlayImage.classList.add('overlay-image');
            overlay.appendChild(overlayImage);
            document.body.appendChild(overlay);
            document.body.style.overflow = 'hidden';
    
            overlay.addEventListener('click', function (event) {
                if (event.target === overlay) {
                    document.body.style.overflow = 'auto';
                    overlay.remove();
                    overlay = null; // Ustaw overlay z powrotem na null, gdy jest zamykany
                }
            });
    
            closeButton.addEventListener('click', function () {
                document.body.style.overflow = 'auto';
                overlay.remove();
                overlay = null; // Ustaw overlay z powrotem na null, gdy jest zamykany
            });
        });
    });
});