$(window).on("load", function () {
  const navBarHeight = $(".navbar-fixed").innerHeight();
  // if ($(".navbar-fixed").length) {
  // $(".padding-top").css({
  //   "padding-top": navBarHeight + "px",
  // });
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
  // Video Model

  function playVideo() {
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
  if ($(".media-videos").length) {
    playVideo();
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

  function swiperCardNews() {
    let swiperValues = new Swiper(".swiper-card-news", {
      spaceBetween: 0,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      speed: 800,
      // autoplay: {
      //   disableOnInteraction: false,
      //   delay: 5000,
      // },
      navigation: {
        nextEl: ".swiper-card-news .swiper-button-next",
        prevEl: ".swiper-card-news .swiper-button-prev",
      },
    });
  }

  if ($(".swiper-card-news").length) {
    swiperCardNews();
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
              href="${data[current_index].url}"
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
          $(".btn-load-more").addClass("hidden");
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
          $(".btn-load-more").addClass("hidden");
        }, 100);
      }
    });
  }

  // Videos

  if ($(".videos-data").length) {
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

            
            <div
            videosrc="https://www.youtube.com/watch?v=DEEtSGusigQ"
            class="card-videos p-3 mb-4 d-flex justify-content-center align-items-end overlay hvr-img-wrap media-videos"
          >
            <div class="play-icon main-title color-white">
              <i class="bi bi-play-fill"></i>
            </div>
            <h3 class="card-title medium-title font-title font-bold">
              CUM QUASI NATUS
            </h3>
            <div class="card-img hvr-img">
              <img class="img-fit" src="${data[current_index].thumbnailUrl}" alt="" />
            </div>
          </div>
                      `;
            container.appendChild(postElement);
            console.log("data_url", postElement);
            current_index++;
            setTimeout(function () {
              playVideo();
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
          $(".btn-load-more").addClass("hidden");
        }, 100);
      }
    });
  }

  // Select
  if ($("#filter-office, #filter-type, #filter-eligibility").length) {
    $("#filter-office, #filter-type, #filter-eligibility").select2({
      theme: "bootstrap-5",
      placeholder: $(this).data("placeholder"),
    });

    // Handle Submit
    const form = document.forms.filterJob;

    function handleSubmit(event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      const asString = new URLSearchParams(formData).toString();
      // console.log("asString", asString);

      let currentURL = window.location.href;
      let afterDomain = currentURL.substring(currentURL.lastIndexOf("/") + 1);
      let beforeQueryString = afterDomain.split("?")[0];

      history.pushState({}, null, beforeQueryString + "?" + asString);
      location.reload();
    }

    form.addEventListener("submit", handleSubmit);
  }

  // ARTICLES

  if ($(".articles-data").length) {
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
            href="${data[current_index].url}"
            class="card-articles position-relative overflow-hidden overlay d-flex text-decoration-none mb-4 p-4 hvr-img-wrap"
          >
            <img
              class="hvr-img img-fit position-absolute"
              src="${data[current_index].thumbnailUrl}"
              alt="banner"
            />
            <article class="d-flex flex-column justify-content-end color-white">
              <h3 class="small-title font-bold">
              ${data[current_index].title}
              </h3>
              <p class="small-description">
              ${data[current_index].title}
              </p>
              <span class="btn_arrow white">
                <span>Read More</span>
                <i class="bi bi-arrow-right-short"></i>
              </span>
            </article>
          </a> `;
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
          $(".btn-load-more").addClass("hidden");
        }, 100);
      }
    });
  }

  // STUDIES

  if ($(".studies-data").length) {
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
            href="${data[current_index].url}"
            class="card-articles position-relative overflow-hidden overlay d-flex text-decoration-none mb-4 p-4 hvr-img-wrap"
          >
            <img
              class="hvr-img img-fit position-absolute"
              src="${data[current_index].thumbnailUrl}"
              alt="banner"
            />
            <article class="d-flex flex-column justify-content-end color-white">
              <h3 class="small-title font-bold">
              ${data[current_index].title}
              </h3>
              <p class="small-description">
              ${data[current_index].title}
              </p>
              <span class="btn_arrow white">
                <span>Read More</span>
                <i class="bi bi-arrow-right-short"></i>
              </span>
            </article>
          </a> `;
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
          $(".btn-load-more").addClass("hidden");
        }, 100);
      }
    });
  }

  // ARTICLES

  if ($(".news-data").length) {
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
            let imagesNews = "";
            let checkText = false;
            postElement.classList.add("col-lg-4");
            // getImages = data[current_index].images.forEach(
            //   (element) => element
            // );
            // console.log("Teeeeeeeeeeeeest", getImages);
            data[current_index].images.forEach((element) => {
              // console.log(element.img);
              if (element.img == "") {
                checkText = true;
              }
              imagesNews += `
              <div class="swiper-slide overlay">
                <img class="img-fit" src="${element.img}" alt="${element.imageTitle}" />
              </div>
              `;
            });
            console.log("checkText", checkText);

            if (checkText == true) {
              postElement.innerHTML = `
              <a href="${data[current_index].url}" class="card-news border-bottom-gray pb-3 mb-3">
              <h3
                class="card-title medium-title font-bold font-title text-uppercase"
              >
              ${data[current_index].title} ${data[current_index].id}
              </h3>
              <p class="card-text small-description">
              ${data[current_index].description}
              </p>
              
            </a> `;
            } else {
              postElement.innerHTML = `
              <a href="${data[current_index].url}" class="card-news border-bottom-gray pb-3 mb-3">

              <div class="swiper swiper-card-news mb-3">
                  <div class="swiper-wrapper">
                    ${imagesNews}
                  </div>
                  <div class="swiper-button-next section-title color-white">
                    <i class="bi bi-arrow-right-short"></i>
                  </div>
                  <div class="swiper-button-prev section-title color-white">
                    <i class="bi bi-arrow-left-short"></i>
                  </div>
              </div>
              

              <h3
                class="card-title medium-title font-bold font-title text-uppercase"
              >
              ${data[current_index].title} ${data[current_index].id}
              </h3>
              <p class="card-text small-description">
              ${data[current_index].description}
              </p>
  
              
            </a> `;
            }
            container.appendChild(postElement);
            console.log("data_url", postElement);
            current_index++;
            $(".news-data .more-data").masonry("destroy");
            swiperCardNews();
            setTimeout(function () {
              loading.classList.remove("show");
              $(".news-data .more-data").masonry();
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
          $(".btn-load-more").addClass("hidden");
        }, 100);
      }
    });
  }

  if ($(".swiper-inner").length) {
    let swiperInner = new Swiper(".swiper-inner", {
      loop: true,
      breakpoints: {
        0: {
          slidesPerView: 1.2,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2.8,
          spaceBetween: 30,
        },
        1200: {
          slidesPerView: 3.8,
          spaceBetween: 30,
        },
      },
    });
  }

  // MAP
  if ($(".map-svg").length) {
    $description = $(".description");

    $(".enabled").hover(
      function () {
        $(this).attr("class", "enabled active");
        $description.addClass("active");
        $description.html($(this).attr("name"));
      },
      function () {
        $description.removeClass("active");
      }
    );

    $(document).on("mousemove", function (e) {
      $description.css({
        left: e.pageX,
        top: e.pageY - 55,
      });
    });
  }

  // Scroll To Top
  if ($(".backToTop").length) {
    $(".backToTop").click(function (e) {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        1200
      );
    });
  }
  $(document).scroll(function (e) {
    if ($(window).scrollTop() >= 5) {
      $(".backToTop").addClass("show");
    } else {
      $(".backToTop").removeClass("show");
    }
  });
});

if ($("html")[0].lang == "ar") {
  // alert("ar");
  $(".swiper").attr("dir", "rtl");
} else {
  $(".swiper").attr("dir", "");
}
