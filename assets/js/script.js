$(window).on("load", function () {
  // if ($(".navbar-fixed").length) {
  const navBarHeight = $(".navbar-fixed").innerHeight();
  $(".padding-top").css({
    "padding-top": navBarHeight + "px",
  });
  // console.log("navBarHeight", navBarHeight);
  // }

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
          scrollTop:
            $("#" + $(this).data("scroll")).offset().top - navBarHeight,
        },
        1200
      );
    });
  }

  if ($(".media-videos").length) {
    function getId(url) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);

      return match && match[2].length === 11 ? match[2] : null;
    }
    $(".media-videos").on("click", function () {
      var videosrc = $(this).attr("videosrc");
      var empededLink = getId(videosrc);
      $(".videoModal").modal("show");

      $(".videoModal iframe").attr(
        "src",
        "https://www.youtube.com/embed/" +
          empededLink +
          "?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1&autoplay=1"
      );
      console.log("videosrc", videosrc);
      console.log("empededLink", empededLink);
    });

    $(".videoModal").on("hidden.bs.modal", function (e) {
      $(".videoModal iframe").attr("src", "");
    });
  }
});
