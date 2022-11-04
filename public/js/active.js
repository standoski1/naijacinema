
let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 20 ||
    document.documentElement.scrollTop > 20
  ) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// (function ($) {
//     'use strict';

//     var browserWindow = $(window);

//     // :: 1.0 Preloader Active Code
//     browserWindow.on('load', function () {
//         $('.preloader').fadeOut('slow', function () {
//             $(this).remove();
//         });
//     });

//      // Activate feather
//      feather.replace();
        
//      // Enable tooltips globally
//      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
//      var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//          return new bootstrap.Tooltip(tooltipTriggerEl);
//      });
 
//      // Enable popovers globally
//      var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
//      var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
//          return new bootstrap.Popover(popoverTriggerEl);
//      });
 
//      // Activate Bootstrap scrollspy for the sticky nav component
//      const stickyNav = document.body.querySelector('#stickyNav');
//      if (stickyNav) {
//          new bootstrap.ScrollSpy(document.body, {
//              target: '#stickyNav',
//              offset: 82,
//          });
//      }
 
//      // Close side navigation when width < LG
//      const sidenavContent = document.body.querySelector('#layoutSidenav_content');
//      if (sidenavContent) {
//          sidenavContent.addEventListener('click', event => {
//              const BOOTSTRAP_LG_WIDTH = 992;
//              if (window.innerWidth >= 992) {
//                  return;
//              }
//              if (document.body.classList.contains("sidenav-toggled")) {
//                  document.body.classList.toggle("sidenav-toggled");
//              }
//          });
//      }
 
//      // Add active state to sidbar nav links
//      let activatedPath = window.location.pathname.match(/([\w-]+\.html)/, '$1');
 
//      if (activatedPath) {
//          activatedPath = activatedPath[0];
//      } else {
//          activatedPath = 'index.html';
//      }
 
//      const targetAnchors = document.body.querySelectorAll('[href="' + activatedPath + '"].nav-link');
 
//      targetAnchors.forEach(targetAnchor => {
//          let parentNode = targetAnchor.parentNode;
//          while (parentNode !== null && parentNode !== document.documentElement) {
//              if (parentNode.classList.contains('collapse')) {
//                  parentNode.classList.add('show');
//                  const parentNavLink = document.body.querySelector(
//                      '[data-bs-target="#' + parentNode.id + '"]'
//                  );
//                  parentNavLink.classList.remove('collapsed');
//                  parentNavLink.classList.add('active');
//              }
//              parentNode = parentNode.parentNode;
//          }
//          targetAnchor.classList.add('active');
//      });

//     // :: 2.0 Nav Active Code
//     if ($.fn.classyNav) {
//         $('#newsboxNav').classyNav();
//     }

//     // :: 3.0 Newsticker Active Code
//     if ($.fn.simpleTicker) {
//         $.simpleTicker($("#breakingNewsTicker"), {
//             speed: 1000,
//             delay: 3000,
//             easing: 'swing',
//             effectType: 'roll'
//         });
//     }

//     // :: 4.0 Sliders Active Code
//     if ($.fn.owlCarousel) {

//         var welcomeSlide = $('.hero-post-slides');
//         var videoSlides = $('.video-slides');
//         var albumSlides = $('.albums-slideshow');

//         welcomeSlide.owlCarousel({
//             items: 1,
//             margin: 0,
//             loop: true,
//             nav: false,
//             dots: false,
//             autoplay: true,
//             autoplayTimeout: 7000,
//             smartSpeed: 1000,
//             animateIn: 'fadeIn',
//             animateOut: 'fadeOut'
//         });

//         welcomeSlide.on('translate.owl.carousel', function () {
//             var slideLayer = $("[data-animation]");
//             slideLayer.each(function () {
//                 var anim_name = $(this).data('animation');
//                 $(this).removeClass('animated ' + anim_name).css('opacity', '0');
//             });
//         });

//         welcomeSlide.on('translated.owl.carousel', function () {
//             var slideLayer = welcomeSlide.find('.owl-item.active').find("[data-animation]");
//             slideLayer.each(function () {
//                 var anim_name = $(this).data('animation');
//                 $(this).addClass('animated ' + anim_name).css('opacity', '1');
//             });
//         });

//         $("[data-delay]").each(function () {
//             var anim_del = $(this).data('delay');
//             $(this).css('animation-delay', anim_del);
//         });

//         $("[data-duration]").each(function () {
//             var anim_dur = $(this).data('duration');
//             $(this).css('animation-duration', anim_dur);
//         });

//         videoSlides.owlCarousel({
//             items: 3,
//             margin: 30,
//             loop: true,
//             dots: false,
//             autoplay: true,
//             nav: true,
//             navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
//             responsive: {
//                 0: {
//                     items: 1
//                 },
//                 576: {
//                     items: 2
//                 },
//                 992: {
//                     items: 3
//                 }
//             }
//         });
//     }
    
//     // :: 5.0 Video Active Code
//     if ($.fn.magnificPopup) {
//         $('.video-btn').magnificPopup({
//             disableOn: 0,
//             type: 'iframe',
//             mainClass: 'mfp-fade',
//             removalDelay: 160,
//             preloader: true,
//             fixedContentPos: false
//         });
//     }

//     // :: 6.0 ScrollUp Active Code
//     if ($.fn.scrollUp) {
//         browserWindow.scrollUp({
//             scrollSpeed: 1500,
//             scrollText: '<i class="fa fa-angle-up"></i>'
//         });
//     }

//     // :: 7.0 CounterUp Active Code
//     if ($.fn.counterUp) {
//         $('.counter').counterUp({
//             delay: 10,
//             time: 2000
//         });
//     }

//     // :: 8.0 Progress Bar Active Code
//     if ($.fn.circleProgress) {
//         $('#circle').circleProgress({
//             size: 160,
//             emptyFill: "rgba(0, 0, 0, .0)",
//             fill: '#a2a2a2',
//             thickness: '3',
//             reverse: true
//         });
//         $('#circle2').circleProgress({
//             size: 160,
//             emptyFill: "rgba(0, 0, 0, .0)",
//             fill: '#a2a2a2',
//             thickness: '3',
//             reverse: true
//         });
//         $('#circle3').circleProgress({
//             size: 160,
//             emptyFill: "rgba(0, 0, 0, .0)",
//             fill: '#a2a2a2',
//             thickness: '3',
//             reverse: true
//         });
//         $('#circle4').circleProgress({
//             size: 160,
//             emptyFill: "rgba(0, 0, 0, .0)",
//             fill: '#a2a2a2',
//             thickness: '3',
//             reverse: true
//         });
//     }

//     // :: 9.0 Tooltip Active Code
//     if ($.fn.tooltip) {
//         $('[data-toggle="tooltip"]').tooltip()
//     }

//     // :: 10.0 Prevent Default a Click
//     $('a[href="#"]').on('click', function ($) {
//         $.preventDefault();
//     });

//     // :: 11.0 Wow Active Code
//     if (browserWindow.width() > 767) {
//         new WOW().init();
//     }

    


// })(jQuery);



