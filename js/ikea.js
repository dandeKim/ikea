// gnb
//all_products_list_child width
function changeListWidth() {
  var productListChild = $(
    ".all_products_list > li.active .all_products_list_child"
  );
  if ($(window).innerWidth() < 1120) {
    var listWidth = $(window).innerWidth() - 360;
    productListChild.css("width", listWidth);
  } else if ($(window).innerWidth() >= 1120 && $(window).innerWidth() < 1500) {
    productListChild.css("width", 780);
  } else {
    productListChild.css("width", 1110);
  }
}

// Mobile Menu
$("#m_menubtn").on("click", function () {
  $("body").toggleClass("open_m_menu");
  var windowH = window.innerHeight;
  $(".gnb .gnb_bg").height(windowH - 60);
  $(".all_products_list").height(windowH - 80);
  $(".all_products_list li").removeClass("active");
  $(".gnb .gnb_active_product").css("display", "none");
  mobileMenuActive();
});

// PC Menu
$(".gnb_active_menu").click(function (e) {
  e.preventDefault();
  $("body").toggleClass("open_menu");
  $(this)
    .find("i")
    .toggleClass("arrow_rotate");
  $(".all_products_list li").removeClass("active");
  $(".all_products_list li:first-of-type").addClass("active");
  $(".gnb_active_product").css({
    top: "25px"
  });
  pcMenuActive();
  changeListWidth();
});

$(window)
  .resize(function () {
    // reset click
    $(".all_products_list li").off("click");

    // gnb menu
    $(".all_products_list li").on("click", function (e) {
      e.preventDefault();
      if ($(this).hasClass("active") && $(window).innerWidth() < 767) {
        $(this).removeClass("active");
      } else {
        $(".all_products_list li").removeClass("active");
        $(this).addClass("active");
        var menuTop = $(this).position().top;
        var scrollTop = $(".all_products_list").scrollTop();
        $(".gnb_active_product").css({
          top: menuTop + scrollTop + 15
        });
      }
      changeListWidth();
    });

    // gnb mobile
    if ($(window).innerWidth() < 767) {
      $("body").removeClass("open_menu");
      $(".gnb .gnb_active_product").css("display", "none");
      $(".all_products_list li")
        .find("i.material-icons")
        .removeClass("active");
      $(".gnb_active_menu")
        .find("i")
        .removeClass("arrow_rotate");
      $(".all_products_list li").on("click", function () {
        if ($(this).hasClass("active")) {
          $(".gnb .gnb_active_product").css("display", "block");
          $(".all_products_list li i.material-icons").removeClass("active");
          $(this)
            .find("i.material-icons")
            .addClass("active");
        } else {
          $(".gnb .gnb_active_product").css("display", "none");
          $(this)
            .find("i.material-icons")
            .removeClass("active");
        }
      });
    } else {
      //gnb PC
      $("body").removeClass("open_m_menu");
      $(".gnb .gnb_bg").height(620);
      $(".all_products_list").height("initial");
    }
    mobileMenuActive();
    pcMenuActive();
    changeListWidth();
  })
  .resize();

function mobileMenuActive() {
  if ($("body").hasClass("open_m_menu")) {
    $("#m_menubtn").text("close");
    $(".all_products_list li").append(`
          <i class="material-icons">keyboard_arrow_down</i>
        `);
  } else {
    $("#m_menubtn").text("menu");
    $(".all_products_list li")
      .find("i.material-icons")
      .remove();
  }
}

//  search_keywords Rolling
function searchRolling() {
  $(".search_keyword_list")
    .stop(true)
    .animate(
      {
        "margin-top": -21
      },
      function () {
        $(".search_keyword_list li")
          .first()
          .appendTo(".search_keyword_list");
        $(".search_keyword_list li").removeClass("active");
        $(".search_keyword_list li")
          .first()
          .addClass("active");
        $(".search_keyword_list").css("margin-top", 0);
      }
    );
}

var play = setInterval(searchRolling, 3000);

function keywordShow() {
  clearInterval(play);
  var activeList = $(".search_keyword")
    .find(".search_keyword_list li.active span")
    .text();
  var activeHoverList = $(".search_keyword_hover").find(
    `span:contains(${activeList})`
  );
  activeHoverList.parents("li").addClass("active");

  $(".search_keyword").addClass("list_all");
  $(".search_keyword")
    .find(".search_keyword_list")
    .addClass("display_none");
  $(".search_keyword_hover").addClass("active");
}

function keywordHide() {
  play = setInterval(searchRolling, 3000);
  $(".search_keyword").removeClass("list_all");
  $(".search_keyword")
    .find(".search_keyword_list")
    .removeClass("display_none");
  $(".search_keyword_hover li").removeClass("active");
  $(".search_keyword_hover").removeClass("active");
}

$(".search_keyword").on({
  mouseenter: keywordShow,
  mouseleave: keywordHide
});

// main-slide
var swiper = new Swiper(".main-slide .swiper-container", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  loop: true
});
