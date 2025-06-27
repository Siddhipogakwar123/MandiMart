function addToCart(productId) {
  alert("Added product " + productId + " to cart!");
  // Later: use fetch() to send to backend
}
document.addEventListener("DOMContentLoaded", function () {
    new Swiper('.swiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    });
  });
