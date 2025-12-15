$(document).ready(function()  {

	console.log('main.js loaded');
	var mega_menu_timer;

	$(document).on('mouseenter', '.tab', function(e) {
		clearTimeout(mega_menu_timer);
		var mega_menu_id = $(this).attr('data-mega-menu-id');

		mega_menu_timer = setTimeout( function() {
			$('.tab').removeClass('tab-selected');
			$(this).addClass('tab-selected');
			$('.mega-menu').hide();
			$('#'+mega_menu_id).show();
		}, 200);
		
		console.log('tab hover - mega-menu '+mega_menu_id);
	});
	$(document).on('mouseleave', '.tab', function(e) {
		clearTimeout(mega_menu_timer);
		var current_tab = $(this);
		mega_menu_timer = setTimeout( function() {
			$('.mega-menu').hide();
			$(current_tab).removeClass('tab-selected');
		}, 100);

		console.log('tab un-hover');
	});

	$(document).on('mouseenter', '.mega-menu', function(e) {
		clearTimeout(mega_menu_timer);
	});
	$(document).on('mouseleave', '.mega-menu', function(e) {
		mega_menu_timer = setTimeout( function() {
			$('.mega-menu').hide();
			$('.tab').removeClass('tab-selected');
		}, 100);
	});

	$(function () {
		$('[data-toggle="tooltip"]').tooltip();
		$('[data-toggle="datepicker"]').datepicker({
			zIndex		: 2050,
			autoHide 	: true
		});
	});

	/*
	|--------------------------------------------------------------------------
	| TOGGLE TOP NAV AND MEGAMENU
	|--------------------------------------------------------------------------
	*/

	var prevScroll = 0,
      	curDir = 'down',
      	prevDir = 'up';
  
	$(window).scroll( function() {
		if( ( $(this).scrollTop() >= prevScroll ) && ( $(this).scrollTop() > 160 ) ) {
			curDir = 'down';
			if(curDir != prevDir) {
				$('#header').stop();
				$('#header').animate({ top: '-160px' }, 300);
				prevDir = curDir;
			}
		} else {
			curDir = 'up';
			if(curDir != prevDir) { 
				$('#header').stop();
				$('#header').animate({ top: '0px' }, 300);
				prevDir = curDir;
			}
		}
		prevScroll = $(this).scrollTop();
	});

	/*
	|-----------------------------------------------
	| SHOW MORE CARDS
	|-----------------------------------------------
	*/

	$(document).on('click', '.btn-more-cards', function(e) {
		$(this).parent().siblings('.more-cards').fadeIn().css('display', 'flex');
		$(this).hide();
	});

	/*
	|-----------------------------------------------
	| USER FEEDBACK COMPONENT
	|-----------------------------------------------
	*/

	$(document).on('click', '.feedback .btn-yes', function(e) {
		alert('Nice');
	});
	$(document).on('click', '.feedback .btn-no', function(e) {
		alert('Tell us why...');
	});

	/*
	|-----------------------------------------------
	| SUBNAV JUMP TO NAMED ANCHORS
	|-----------------------------------------------
	*/
	$("#subnav ul li a[href^='#']").on('click', function(e) {
		e.preventDefault();

		// store hash
		var hash = this.hash;

		// animate
		$('html, body').animate({
			scrollTop: $(hash).offset().top
		}, 500, function(){
			// when done, add hash to url
			// (default click behaviour)
			window.location.hash = hash;
			$('#header').hide().css('top', '-160px').show();
		});

	});
});




