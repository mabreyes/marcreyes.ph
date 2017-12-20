// JS

$(document).ready(function(){

	// Hamburger Icon

  $('.hamburger.hamburger--spin').on('click', function(e) {
	 	e.preventDefault();
		$(this).toggleClass('is-active');
		$('.nav-overlay').fadeToggle(200);
		$('body').toggleClass('no-scroll');
		$(".nav-inner ul li:visible").fadeOut(1).removeClass('animated fadeInRight');
		$(".nav-inner ul li").each(function(index) {
	    $(this).delay(300*index).fadeIn(200).addClass('animated fadeInRight');
		});
	});

	// Nav Close Modal - Home page

	$('.nav-inner ul li a').on('click', function(e) {
		$('.hamburger.hamburger--spin').toggleClass('is-active');
		$('body').toggleClass('no-scroll');
		$('.nav-overlay').fadeToggle(200);
		$('html, body').animate({
 			scrollTop: $( $(this).attr('href') ).offset().top
 			}, 500);
 	 return false;

	});


	// Mouse Scroll Icon

	$('.mouse-scroll-icon a').click(function(){
	 $('html, body').animate({
			scrollTop: $( $(this).attr('href') ).offset().top
			}, 500);
	 return false;
	});


});


$(window).bind("load", function() {

	// Hide Loading - Show Page

	$('.page-wrapper').css('opacity', '1');
	$('.loading').fadeOut(500);
  $('body').removeClass('no-scroll');

});
