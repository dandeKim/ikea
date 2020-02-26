// like & cart
$(document).on("click", ".product_hover_bg button", function() {
  if ($(this).hasClass("like")) {
    if ($(this).text() === "favorite_border") {
      $(this)
        .parents(".product_img")
        .append('<i class="material-icons click_like">favorite</i>');
      $(".click_like").animate(
        {
          "font-size": 0,
          opacity: 0
        },
        900
      );
      $(this).text("favorite");
    } else {
      $(this).text("favorite_border");
      $(this)
        .parents(".product_img")
        .find(".click_like")
        .remove();
    }
  } else {
    if ($(this).hasClass("material-icons-outlined")) {
      $(this)
        .parents(".product_img")
        .append('<i class="material-icons click_cart">shopping_cart</i>');
      $(".click_cart").animate(
        {
          "font-size": 0,
          opacity: 0
        },
        900
      );
      $(this)
        .removeClass("material-icons-outlined")
        .addClass("material-icons");
    } else {
      $(this)
        .removeClass("material-icons")
        .addClass("material-icons-outlined");
      $(this)
        .parents(".product_img")
        .find(".click_cart")
        .remove();
    }
  }
});
