$(window).on("load", function () {
  const navBarHeight = $(".navbar-fixed").innerHeight();
  // if ($(".navbar-fixed").length) {
  $(".padding-top").css({
    "padding-top": navBarHeight + "px",
  });
  // console.log("navBarHeight", navBarHeight);
  // }
  $(".navbar .navbar-toggler").on("click", function () {
    $("body").toggleClass("open-menu");
    console.log("navBarHeight", navBarHeight);
  });
  if ($(".hero").length) {
    let swiperHero = new Swiper(".hero-swiper", {
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
  // Video Modek
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

  // Counter {
  if ($(".counter").length) {
    let nums = document.querySelectorAll(".counter .number");
    let sectionCount = document.querySelector(".counter");
    let started = false;
    window.onscroll = function () {
      // console.log("scrollY", window.scrollY);
      // console.log("sectionCount.offsetTop", sectionCount.offsetTop);
      if (window.outerWidth >= 768) {
        // console.log("DeskTop");
        if (window.scrollY >= sectionCount.offsetTop - navBarHeight - 400) {
          if (!started) {
            nums.forEach((num) => {
              startCount(num);
              // console.log("num", num);
            });
          }
          started = true;
        }
      } else {
        // console.log("Mobile");
        if (window.scrollY >= sectionCount.offsetTop - navBarHeight) {
          if (!started) {
            nums.forEach((num) => {
              startCount(num);
              // console.log("num", num);
            });
          }
          started = true;
        }
      }
    };

    function startCount(el) {
      let goal = el.dataset.goal;
      let count = setInterval(() => {
        el.textContent++;
        if (el.textContent == goal) {
          clearInterval(count);
        }
      }, 2000 / goal);
    }
  }

  // About
  if ($(".strategy-swiper").length) {
    let swiperStrategy = new Swiper(".strategy-swiper", {
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
        el: ".strategy-swiper .swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".strategy-swiper .swiper-button-next",
        prevEl: ".strategy-swiper .swiper-button-prev",
      },
    });
  }
  if ($(".values-swiper").length) {
    let swiperValues = new Swiper(".values-swiper", {
      spaceBetween: 15,
      centeredSlides: true,
      loop: true,
      speed: 800,
      autoplay: {
        disableOnInteraction: false,
        delay: 5000,
      },
      pagination: {
        el: ".values-swiper .swiper-pagination",
        clickable: true,
        // dynamicBullets: true,
      },
      navigation: {
        nextEl: ".values-swiper .swiper-button-next",
        prevEl: ".values-swiper .swiper-button-prev",
      },
      breakpoints: {
        0: {
          slidesPerView: 1.8,
        },
        768: {
          slidesPerView: 2.8,
        },
        1200: {
          slidesPerView: 3.8,
        },
      },
    });
  }
});
