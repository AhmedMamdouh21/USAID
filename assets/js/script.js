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

  if ($(".swiper-card-news").length) {
    let swiperValues = new Swiper(".swiper-card-news", {
      spaceBetween: 0,
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
      navigation: {
        nextEl: ".swiper-card-news .swiper-button-next",
        prevEl: ".swiper-card-news .swiper-button-prev",
      },
    });
  }
  if ($(".photo-gallery-data").length) {
    // Load More Get Data
    const container = document.querySelector(".more-data");
    const loading = document.querySelector(".loading-scroll");
    const data_url = $("#containerLoadMore").attr("data-url");
    let page_number = 1;
    let current_index = 0;
    const items_per_page = 6;
    let total = 0;

    function loadIteams() {
      $.ajax({
        type: "GET",
        url: data_url,
        dataType: "json",
        success: (data) => {
          current_index = (page_number - 1) * items_per_page;
          upper_limit_index = current_index + items_per_page - 1;
          console.log("page_number", page_number);
          console.log("current_index", current_index);
          console.log("upper_limit_index", upper_limit_index);
          total = data.length;
          console.log("total", total);
          while (current_index <= upper_limit_index) {
            console.log("data", data[current_index]);
            const postElement = document.createElement("div");
            postElement.classList.add("col-lg-4");
            postElement.innerHTML = `

            <a
              href="photo-gallery-details.html"
              class="card-photo-gallery p-4  mb-5 d-flex align-items-end overlay hvr-img-wrap"
            >
              <h3 class="card-title medium-title font-title font-bold">
               ${data[current_index].title}
              </h3>
              <div class="card-img hvr-img">
                <img class="img-fit" src=" ${data[current_index].thumbnailUrl}" alt="" />
              </div>
            </a>
                      `;
            container.appendChild(postElement);
            console.log("data_url", postElement);
            current_index++;
            setTimeout(function () {
              loading.classList.remove("show");
            }, 200);
          }
          page_number++;
        },
      });
    }
    loadIteams();
    loading.classList.remove("show");

    $(".btn-load-more").on("click", function () {
      if (current_index < total) {
        loading.classList.add("show");
        loadIteams();
      } else if (upper_limit_index == total - 1) {
        setTimeout(function () {
          loading.classList.remove("show");
          $(".btn-load-more").classList.remove("hidden");
        }, 100);
      }
    });
  }

  if ($(".photo-gallery-album-data").length) {
    // Load More Get Data
    const container = document.querySelector(".more-data");
    const loading = document.querySelector(".loading-scroll");
    const data_url = $("#containerLoadMore").attr("data-url");
    let page_number = 1;
    let current_index = 0;
    const items_per_page = 6;
    let total = 0;

    function loadIteams() {
      $.ajax({
        type: "GET",
        url: data_url,
        dataType: "json",
        success: (data) => {
          current_index = (page_number - 1) * items_per_page;
          upper_limit_index = current_index + items_per_page - 1;
          console.log("page_number", page_number);
          console.log("current_index", current_index);
          console.log("upper_limit_index", upper_limit_index);
          total = data.length;
          console.log("total", total);
          while (current_index <= upper_limit_index) {
            console.log("data", data[current_index]);
            const postElement = document.createElement("div");
            postElement.classList.add("image-grid");
            postElement.innerHTML = `

            
          <div class="image">
            <img class="img-fit" src="${data[current_index].thumbnailUrl}"" alt="" />
          </div>
                      `;
            container.appendChild(postElement);
            console.log("data_url", postElement);
            current_index++;
            setTimeout(function () {
              loading.classList.remove("show");
            }, 200);
          }
          page_number++;
        },
      });
    }
    loadIteams();
    loading.classList.remove("show");

    $(".btn-load-more").on("click", function () {
      if (current_index < total) {
        loading.classList.add("show");
        loadIteams();
      } else if (upper_limit_index == total - 1) {
        setTimeout(function () {
          loading.classList.remove("show");
          $(".btn-load-more").classList.remove("hidden");
        }, 100);
      }
    });
  }
});
