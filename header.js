document.addEventListener('DOMContentLoaded', function() {
    var text = document.getElementsByName("tags");
    var ourAnimals = document.getElementsByClassName("page_tag");
    
    for (var i = 0; i < ourAnimals.length; i++) {
        (function(index) {
            ourAnimals[index].addEventListener("mouseover", function() {
                text[index].classList.remove("hidden");
                text[index].classList.add("not_hidden");
            });

            ourAnimals[index].addEventListener("mouseout", function() {
                text[index].classList.remove("not_hidden");
                text[index].classList.add("hidden");
            });
        })(i);
    }
});