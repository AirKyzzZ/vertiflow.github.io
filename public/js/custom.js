
  (function ($) {
  
  "use strict";

    // PRE LOADER
    $(window).load(function(){
      $('.preloader').delay(500).slideUp('slow'); // set duration in brackets    
    });

    // NAVBAR
    $(".navbar").headroom();

    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    $('.slick-slideshow').slick({
      autoplay: true,
      infinite: true,
      arrows: false,
      fade: true,
      dots: true,
    });

    $('.slick-testimonial').slick({
      arrows: false,
      dots: true,
    });
    
  })(window.jQuery);


  $(document).ready(function() {
    $('#checkout-btn').click(function() {
        window.location.href = 'checkout.html'; // Replace 'checkout-form.html' with your desired checkout form page
    });
});

$(document).ready(function() {
  $('#cart-btn').click(function() {
      var quantity = $('#inputGroupSelect01').val();
      if (quantity == 'Quantity') {
          alert('Veuillez selectionner une quantitée.');
      }
  });
  $('#checkout-btn').click(function() {
      var quantity = $('#inputGroupSelect01').val();
      if (quantity !== 'Quantity') {
          window.location.href = 'checkout.html'; // Replace 'checkout-form.html' with your desired checkout form page
      } else {
          alert('Veuillez selectionner une quantitée.');
      }
  });


  // Add your JavaScript code here
  // For example, to update the total price in the cart modal:
  $('#inputGroupSelect01').change(function() {
      var quantity = $(this).val();
      var price = 24.99; // Replace with the actual price of the product
      var totalPrice = quantity * price;
      $('.product-p strong span').text('$' + totalPrice);
  });
});
$(document).ready(function() {
  let selectedSize = '';
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  $('.size-btn').click(function() {
      $('.size-btn').removeClass('active');
      $(this).addClass('active');
      selectedSize = $(this).data('size');
  });

  $('#add-to-cart-btn').click(function() {
      if (!selectedSize) {
          alert('Please select a size');
          return;
      }

      // Récupère la quantité sélectionnée
      const selectedQuantity = parseInt($('#inputGroupSelect01').val());

      const product = {
          id: 1, // Remplacez par un ID unique si nécessaire
          name: 'Tree pot',
          price: 25,
          size: selectedSize,
          quantity: selectedQuantity // Utilise la quantité sélectionnée
      };

      // Vérifie si le produit existe déjà
      const existingProductIndex = cart.findIndex(item => 
          item.id === product.id && 
          item.size === product.size
      );

      if (existingProductIndex > -1) {
          // Met à jour la quantité si le produit existe
          cart[existingProductIndex].quantity += selectedQuantity;
      } else {
          // Ajoute le nouveau produit
          cart.push(product);
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert('Product added to cart');
  });

  function updateCartCount() {
      const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
      $('.bi-bag').attr('data-count', cartCount);
  }

  updateCartCount();
});