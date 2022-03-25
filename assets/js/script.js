$(document).ready(function () {
  if ($(".navbar-fixed").length) {
    const navBarHeight = $(".navbar-fixed").innerHeight();
    $(".padding-top").css({
      "padding-top": navBarHeight + "px",
    });
    // console.log("navBarHeight", navBarHeight);
  }

  if ($(".hero").length) {
    var swiper = new Swiper(".hero-swiper", {
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      speed: 800,
      autoplay: {
        disableOnInteraction: false,
        delay: 5000,
      },
      pagination: {
        el: ".hero-swiper .swiper-pagination",
        // type: "fraction",
        type: "custom",
        renderCustom: function (swiper, current, total) {
          return current + "<span class='line mx-2'></span>" + total;
        },
      },
      navigation: {
        nextEl: ".hero-swiper .swiper-button-next",
        prevEl: ".hero-swiper .swiper-button-prev",
      },
    });
  }
  if ($(".scroll-down")) {
    $(".scroll-down").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: $("#" + $(this).data("scroll")).offset().top,
        },
        1200
      );
    });
  }
});
