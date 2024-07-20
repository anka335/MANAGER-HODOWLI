document.addEventListener("DOMContentLoaded", function () {
    // Inicjalizacja pustego koszyka, jeśli nie istnieje w local storage
    var cartItems = getCartFromLocalStorage() || {};

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~shopping form~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');
    const closeButton = document.getElementById('close-btn');

    document.getElementById('cart').addEventListener('click', function () {
        openModal();
        updateCartTable();
        updateCartCount();
    });
    overlay.addEventListener('click', closeModal);
    closeButton.addEventListener('click', closeModal);

    // Function to open the modal
    function openModal() {
        overlay.style.display = 'block';
        modal.style.display = 'block';
    }

    // Function to close the modal
    function closeModal() {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }

    // Event listener to close the modal when clicking on the overlay
    overlay.addEventListener('click', closeModal);

    // Event listener to close the modal when clicking on the close button
    closeButton.addEventListener('click', closeModal);

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~add product~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    var addToCartButtons = document.querySelectorAll("button");

    addToCartButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var productContainer = button.closest("div");
            var productName = productContainer.querySelector("span[name='product_text']").innerText;
            var quantityInput = productContainer.querySelector("input");
            var quantity = parseInt(quantityInput.value);

            // Ograniczenie maksymalnej łącznej ilości danego produktu w koszyku do 10
            var currentQuantityInCart = cartItems[productName] || 0;
            var totalQuantityInCart = currentQuantityInCart + quantity;

            if (totalQuantityInCart > 10) {
                alert("Maksymalna łączna ilość danego produktu w koszyku to 10.");
            } else if (quantity > 0) {
                addToCart(productName, quantity);
                quantityInput.value = 0; // Ustawienie wartości na 0 po dodaniu do koszyka
                updateCartTable();
                updateCartCount();
            }
        });
    });

    function addToCart(productName, quantity) {
        if (cartItems.hasOwnProperty(productName)) {
            cartItems[productName] += quantity;
        } else {
            cartItems[productName] = quantity;
        }

        // Usuń produkt z koszyka, jeśli jego ilość wynosi zero
        if (cartItems[productName] === 0) {
            delete cartItems[productName];
        }

        setCartToLocalStorage(cartItems);
    }

    function updateCartTable() {
        var table = document.querySelector("#modal table");
        table.innerHTML = "";

        // Sprawdź, czy koszyk jest pusty
        if (Object.keys(cartItems).length === 0) {
            var emptyRow = table.insertRow(-1);
            var emptyCell = emptyRow.insertCell(0);
            emptyCell.textContent = "Brak produktów w koszyku";
            return;
        }

        for (var product in cartItems) {
            if (cartItems.hasOwnProperty(product)) {
                // Sprawdź, czy ilość produktu wynosi zero, jeśli tak, pomiń go
                if (cartItems[product] === 0) {
                    continue;
                }

                var row = table.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);

                cell1.textContent = product;

                // Dodaj pole do wprowadzania ilości z aktualną ilością przedmiotu
                var inputQuantity = document.createElement("input");
                inputQuantity.type = "number";
                inputQuantity.min = "0";
                inputQuantity.max = "10";  
                inputQuantity.value = cartItems[product];
                inputQuantity.addEventListener("input", function (currentProduct) {
                    return function () {
                        var newQuantity = parseInt(this.value);
                        if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= 10) {
                            cartItems[currentProduct] = newQuantity;

                            // Usuń produkt z koszyka, jeśli jego ilość wynosi zero
                            if (newQuantity === 0) {
                                delete cartItems[currentProduct];
                            }

                            setCartToLocalStorage(cartItems);
                            updateCartTable();
                            updateCartCount();
                        }
                    };
                }(product));  // Użyj funkcji IIFE, aby utworzyć zamykające się środowisko dla zmiennej product
                cell2.appendChild(inputQuantity);
            }
        }
    }

    function updateCartCount() {
        var title = document.getElementById("table_headers");
        var noProducts = document.getElementById("no_products");
        var submitBtn = document.getElementById("submit_btn");
        // Sprawdź, czy koszyk jest pusty
        if (Object.keys(cartItems).length === 0) {
            //koszyk jest pusty
            title.style.display = "none"; // Ukryj tytuł
            noProducts.style.display = "block";
            submitBtn.style.visibility = "hidden";
            return;
        }
        
        title.style.display = "flex"; // Pokaż tytuł
        noProducts.style.display = "none";
        submitBtn.style.visibility = "visible";

        var isEmpty = true; // Zmienna informująca o tym, czy koszyk jest pusty
    
        for (var product in cartItems) {
            if (cartItems.hasOwnProperty(product)) {
                if (cartItems[product] > 0) {
                    isEmpty = false; // Jeśli znajdziemy jakikolwiek produkt, to koszyk nie jest pusty
                }
            }
        }
    
        if (isEmpty) {
            // Koszyk jest pusty, ukryj tytuł
            title.style.display = "none"; // Ukryj tytuł
            noProducts.style.display = "block";
            submitBtn.style.visibility = "hidden";
        } else {
            // Koszyk nie jest pusty, pokaż tytuł
            title.style.display = "flex"; // Pokaż tytuł
            noProducts.style.display = "none";
            submitBtn.style.visibility = "visible";
        }        
        
    }
    

    // Przechwytujemy zdarzenie przed zamknięciem strony
    window.addEventListener('beforeunload', function () {
        setCartToLocalStorage(cartItems);
    });

    // Dodajemy event listener dla przycisku submit_btn
    document.getElementById('contact_form').addEventListener('submit', function (event) {
        event.preventDefault(); // Zapobieganie domyślnej akcji formularza (przeładowaniu strony)

        // Zmienna przechowująca informacje o produktach w koszyku
        var cartInfo = '';

        // Przejście przez elementy w koszyku i dodanie ich do zmiennej cartInfo
        for (var product in cartItems) {
            if (cartItems.hasOwnProperty(product) && cartItems[product] > 0) {
                // Dodanie nazwy produktu i jego ilości do zmiennej cartInfo
                cartInfo += product + ' - ' + cartItems[product] + ' szt.\n'; // \n to kod nowej linii
            }
        }

        // Zamiana spacji na znaki plus
        cartInfo = cartInfo.split(' ').join(' ');

        // Ustawienie treści wiadomości w polu body formularza
        var str = "";
		for (j = 0; j < cartInfo.length; j++)
		{
			switch (cartInfo.charAt(j))
			{
				case "ą": str += "a"; break;
				case "ć": str += "c"; break;
				case "ę": str += "e"; break;
				case "ł": str += "l"; break;
				case "ń": str += "n"; break;
				case "ó": str += "o"; break;
				case "ś": str += "s"; break;
				case "ź": str += "z"; break;
				case "ż": str += "z"; break;
				case "Ą": str += "a"; break;
				case "Ć": str += "c"; break;
				case "Ę": str += "e"; break;
				case "Ł": str += "l"; break;
				case "Ń": str += "n"; break;
				case "Ó": str += "o"; break;
				case "Ś": str += "s"; break;
				case "Ź": str += "z"; break;
				case "Ż": str += "z"; break;
				default: str += cartInfo.charAt(j); break;
			}
		}
		cartInfo = str;
                // Ustawienie treści wiadomości w polu body formularza
        var form = document.querySelector('form');
        form.elements.body.value = cartInfo;
        emailjs.sendForm('service_cv04apn', 'template_5k6ksfg', this)
            .then(() => {
                console.log('SUCCESS!');
            }, (error) => {
                console.log('FAILED...', error);
            });
    });

});

function getCartFromLocalStorage() {
    var storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : null;
}

function setCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}
