
// 1.===Navbar collapse====
$('.navbar-nav>li>a').on('click', function(){
    $('.navbar-collapse').collapse('hide');
});


// 2.-------===Header sticky====------------
var stickyOffset = jQuery('#main-head').offset().top;
jQuery(window).scroll(function(){
  var sticky = jQuery('#main-head'),
	  scroll = jQuery(window).scrollTop();
  if (scroll > 175) sticky.addClass('header-fix');
  else sticky.removeClass('header-fix');
});
var stickyOffset = jQuery('body').offset().top;
jQuery(window).scroll(function(){
  var sticky = jQuery('body'),
	  scroll = jQuery(window).scrollTop();
  if (scroll > 175) sticky.addClass('body-fx');
  else sticky.removeClass('body-fx');
});



// 3.-------===Onclick Scroll Top Button====------------
var mybutton = document.getElementById("myBtn");
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
  if (document.body.scrollTop > 1200 || document.documentElement.scrollTop > 1200) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

$('#winner_carousel').owlCarousel({
  loop:true,
  margin:10,
  nav:false,
  autoplay:true,
  animateOut:true,
  autoplayHoverPause:true,
  autoplayTimeout: 4000,
  smartSpeed: 9500,
  dots:false,
  responsive:{
      0:{
          items:2
      },
      600:{
          items:3
      },
      768:{
          items:4
      },
      1199:{
          items:6
      },
      1399:{
          items:8
      }
  }
});

