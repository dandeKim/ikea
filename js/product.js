var productList = [
  [
    {
      shop: "FRIHETEN 프리헤텐",
      name: "수납코너 소파베드",
      price: 499000,
      img: "img/products/best1_1.jpg"
    },
    {
      shop: "JANINGE 야닝에",
      name: "의자",
      price: 49900,
      img: "img/products/best1_2.jpg"
    },
    {
      shop: "SKARSTA 스카르스타",
      name: "높이조절책상",
      price: 239000,
      img: "img/products/best1_3.jpg"
    },
    {
      shop: "HOL 홀",
      name: "보조테이블",
      price: 39900,
      img: "img/products/best1_4.jpg"
    }
  ],
  [
    {
      shop: "DINERA 디네라",
      name: "파스타접시",
      price: 3900,
      img: "img/products/best2_1.jpg"
    },
    {
      shop: "SKOGHALL 스콕할",
      name: "샐러드집게",
      price: 1900,
      img: "img/products/best2_2.jpg"
    },
    {
      shop: "VARDAGEN 바르다겐",
      name: "우유/크림병",
      price: 5900,
      img: "img/products/best2_3.jpg"
    },
    {
      shop: "FASCINERA 파시네라",
      name: "도마",
      price: 9900,
      img: "img/products/best2_4.jpg"
    }
  ],
  [
    {
      shop: "BILLY 빌리",
      name: "책장",
      price: 79900,
      img: "img/products/best3_1.jpg"
    },
    {
      shop: "HEMNES 헴네스",
      name: "수납유닛",
      price: 249000,
      img: "img/products/best3_2.jpg"
    },
    {
      shop: "SOCKERBIT 소케르비트",
      name: "수납함+뚜껑",
      price: 9900,
      img: "img/products/best3_3.jpg"
    },
    {
      shop: "SVASP 스바스프",
      name: "정리대",
      price: 7900,
      img: "img/products/best3_4.jpg"
    }
  ],
  [
    {
      shop: "LERSTA 레르스타",
      name: "플로어스탠드/독서등",
      price: 14900,
      img: "img/products/best4_1.jpg"
    },
    {
      shop: "RANARP 라나르프",
      name: "플로어스탠드/독서등",
      price: 69900,
      img: "img/products/best4_2.jpg"
    },
    {
      shop: "RANARP 라나르프",
      name: "벽부착/집게형스폿조명",
      price: 39900,
      img: "img/products/best4_3.jpg"
    },
    {
      shop: "LAMPAN 람판",
      name: "탁상스탠드",
      price: 6000,
      img: "img/products/best4_4.jpg"
    }
  ],
  [
    {
      shop: "ANGSLILJA 엥슬릴리아",
      name: "이불커버+베개커버",
      price: 24900,
      img: "img/products/best5_1.jpg"
    },
    {
      shop: "STOENSE 스토엔세",
      name: "단모러그",
      price: 59900,
      img: "img/products/best5_2.jpg"
    },
    {
      shop: "TERESIA 테레시아",
      name: "속커튼 한쌍",
      price: 9900,
      img: "img/products/best5_3.jpg"
    },
    {
      shop: "TRATTVIVA 트라트비바",
      name: "베드스프레드",
      price: 34900,
      img: "img/products/best5_4.jpg"
    }
  ],
  [
    {
      shop: "GODTAGBAR 고드타그바르",
      name: "꽃병",
      price: 6900,
      img: "img/products/best6_1.jpg"
    },
    {
      shop: "LURVIG 루르비그",
      name: "그릇",
      price: 1900,
      img: "img/products/best6_2.jpg"
    },
    {
      shop: "FINANSIELL 피난시엘",
      name: "목마장식",
      price: 14900,
      img: "img/products/best6_3.jpg"
    },
    {
      shop: "LURVIG 루르비그",
      name: "반려견/반려묘 침대",
      price: 19900,
      img: "img/products/best6_4.jpg"
    }
  ]
];

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var bestSwiper;

$(".best_products li").click(function(e) {
  e.preventDefault();
  if (bestSwiper !== undefined) {
    bestSwiper.destroy();
  }
  var index = $(this).index();
  $(".best_products li").removeClass();
  $(this).addClass("active");
  $(".best_products_list .swiper-wrapper").empty();
  for (const i in productList[index]) {
    $(".best_products_list .swiper-wrapper").append(`
          <div class="best_product swiper-slide">
              <div class="product_img">
                  <a href="#!"><img src="${productList[index][i].img}" alt="">
                    <span class="blind">${productList[index][i].name}<span>
                  </a>
                  <div class="product_hover_bg">
                      <button class="material-icons like">favorite_border</button>
                      <button class="material-icons-outlined cart">shopping_cart</button>
                  </div>
              </div>
              <dl>
                <dt>${productList[index][i].shop}</dt>
                <dd>${productList[index][i].name}</dd>
                <dd>${numberWithCommas(productList[index][i].price)}원</dd>
              </dl>
          </div>
      `);
  }

  var windowW = $(window).width();
  if (windowW < 900) {
    bestSwiper = new Swiper(".best_products .swiper-container", mobileOption);
  }
});

// New product slide
var pcOption = {
  slidesPerView: 3,
  slidesPerGroup: 3,
  spaceBetween: 40,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  breakpoints: {
    1121: {
      slidesPerView: 6,
      spaceBetween: 20,
      slidesPerGroup: 6
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
      slidesPerGroup: 4
    }
  }
};

var mobileOption = {
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 20,
  loop: true,
  loopFillGroupWithBlank: true
};

var newSwiper = new Swiper(".new_products .swiper-container", pcOption);
bestSwiper = new Swiper(".best_products .swiper-container", mobileOption);

$(window).resize(function() {
  var windowW = $(this).width();
  if (bestSwiper !== undefined) {
    bestSwiper.destroy();
    newSwiper.destroy();
  }
  if (windowW < 900) {
    mobileOption.simulateTouch = true;
    newSwiper = new Swiper(".new_products .swiper-container", mobileOption);
    bestSwiper = new Swiper(".best_products .swiper-container", mobileOption);
  } else {
    newSwiper = new Swiper(".new_products .swiper-container", pcOption);
  }
});
$(".best_products li")
  .eq(0)
  .click();

// todays_place
function placeProduct(id) {
  $.ajax({
    url: "js/place_product.json",
    success: function(data) {
      for (const i in data) {
        if (data[i].id === id) {
          $(".place_product").empty();
          $(".place_product").prepend(`
            <div class="product_img">
              <a href="#"><img src=${data[i].img} alt=""><span class="blind">${data[i].product}<span></a>
              <div class="product_hover_bg">
                  <button class="material-icons like">favorite_border</button>
                  <button class="material-icons-outlined cart">shopping_cart</button>
              </div>
            </div>
            <dl>
              <dt>${data[i].name}</dt>
              <dd>${data[i].product}</dd>
              <dd>${data[i].price}원</dd>
            </dl>
            <button class="material-icons close">close</button>
          `);
          break;
        }
      }
    }
  });
}

$(".thumb_img a").click(function(e) {
  e.preventDefault();
  $(".thumb_img img").removeClass();
  $(this)
    .find("img")
    .addClass("active");

  var imgSrc = $(this)
    .find("img")
    .attr("id");
  $(".place_box .place_img img").attr("src", `img/today/${imgSrc}.jpg`);
  $(".place_img object").attr("data", `img/today/${imgSrc}.svg`);
});

$("object").on("load", function() {
  var svg = $("object")[0].contentDocument.documentElement;
  var activeCircle = svg.querySelector(".active");
  var activeId = activeCircle.parentNode.id;
  placeProduct(activeId);

  $(".svg")
    .contents()
    .find("a")
    .on("click", function(e) {
      e.preventDefault();
      var id = $(this)
        .find("g")
        .attr("id");
      // active product
      placeProduct(id);
      // circle active
      if (
        !$(this)
          .find("circle")
          .hasClass("active")
      ) {
        $(".svg")
          .contents()
          .find("circle")
          .removeClass("active");
        $(this)
          .find("circle")
          .addClass("active");
      }
      if ($(window).innerWidth() < 1120) {
        $(".place_product").addClass("active");
        $("body").append('<div class="bg_cover"></div>');
        $(".place_product").on("click", ".close", function() {
          $("body .bg_cover").remove();
          $(".place_product").removeClass("active");
        });
      } else {
        $(".svg")
          .contents()
          .find("circle")
          .css("stroke", "#fffbf3");
        $(".svg")
          .contents()
          .find("circle.active")
          .css("stroke", "#ffee5a");
      }
    });
  $(window)
    .resize(placeCircle)
    .resize();
});

function placeCircle() {
  if ($(window).innerWidth() < 1120) {
    $(".svg")
      .contents()
      .find("circle")
      .css("stroke", "#fffbf3");
    $(".svg")
      .contents()
      .find("circle.active")
      .css("stroke", "#fffbf3");
    if ($(window).innerWidth() < 500) {
      $(".svg")
        .contents()
        .find("circle")
        .css({
          "stroke-width": 15,
          r: 17
        });
    } else {
      $(".svg")
        .contents()
        .find("circle")
        .css({
          "stroke-width": 5,
          r: 7.5
        });
    }
  } else {
    $(".svg")
      .contents()
      .find("circle")
      .css("stroke", "#fffbf3");
    $(".svg")
      .contents()
      .find("circle.active")
      .css("stroke", "#ffee5a");
  }
}
