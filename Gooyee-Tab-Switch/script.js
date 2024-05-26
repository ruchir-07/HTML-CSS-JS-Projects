/*
The transition seems to have some rendering/performance issues 
in Chrome due to GPU layers, but works 😚👌 in FireFox.

*/

// need a tiny bit of JS to make both menus activate together.
// feel free to comment if you figure out another way.

$(".menu li").on("mouseover touchstart", function() {
    let idx = $(this).index();
    $(".goo li").removeClass("hover");
    $("nav li").eq(idx).addClass("hover");
  }).on("mouseout touchend", function() {
    $("nav li").removeClass("hover");
  });