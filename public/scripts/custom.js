$(window).scroll(function () {
  var winScrollTop = $(window).scrollTop();
  var winHeight = $(window).height();
  var fromBottom = (winHeight * 50) / 100;
  var top = winScrollTop + fromBottom;
  $("#floater").css({
    top: top + "px",
  });
});

$(function () {
  $.getJSON("https://api.ipify.org?format=jsonp&callback=?", function (json) {
    IP_ADDRESS = json.ip;
    localStorage.setItem("clientAddr", json.ip);
  });
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 6) {
    $(".right-sidebar").addClass("sticky");
  }
  if ($(this).scrollTop() < 6) {
    $(".right-sidebar").removeClass("sticky");
  }
});

$(document).on("click", ".nav-tabs .nav-item", function () {
  centerItFixedWidth($(this), $(this).parent());
});

$(document).on("click", ".nav-pills .nav-item", function () {
  centerItFixedWidth($(this), $(this).parent());
});

function centerItFixedWidth(target, outer) {
  var out = $(outer);
  var tar = $(target);
  var x = out.width();
  var y = tar.outerWidth(true);
  var z = tar.index();
  var q = 0;
  var m = out.find("li");
  //Just need to add up the width of all the elements before our target.
  for (var i = 0; i < z; i++) {
    q += $(m[i]).outerWidth(true);
  }
  out.animate(
    {
      scrollLeft: Math.max(0, q - (x - y) / 2),
    },
    300
  );
}

$(document).click(function (e) {
  if (!$(e.target).is(".user-dropdown")) {
    $(".user-dropdown.collapse").collapse("hide");
  }
});

$(document).click(function (e) {
  if (
    !$(e.target).is(".casino-search i") &&
    !$(e.target).is(".casino-search .search-icon") &&
    !$(e.target).is(".casino-search .form-control")
  ) {
    $(".casino-search").removeClass("open-search");
    $(".casino-search").addClass("close-search");
  }
});

$(document).on("mouseenter", ".ifTooltip", function () {
  var $this = $(this);
  //- console.log($this.text())
  //- console.log(this.offsetWidth, this.scrollWidth)
  if (this.offsetWidth < this.scrollWidth) {
    //- console.log('here')
    $this.tooltip({
      title: $this.text(),
      placement: "bottom",
    });
    $this.tooltip("show");
  }
});

$(".home-new .menu-button-mobile").click(function () {
  $(".login-mobile-menu").show();
});

$(".home-new .close-mobile-menu").click(function () {
  $(".login-mobile-menu").hide();
});
