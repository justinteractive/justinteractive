$(document).ready(function()  {
	
	console.log('jquery is wired up');

	$('li.menu a').on('click', function() {
		console.log('click menu');
		$('.mobile-menu').toggleClass('show');
	});

	$('#owl-carousel').owlCarousel({
		items : 3,
		itemsDesktop : [1024,4],
		itemsTablet : [768,2],
		itemsMobile : [568,1],
		navigation : false,
		pagination : true,
		responsiveRefreshRate : 50
	});

	$('#owl-subnav').owlCarousel({
		items : 5,
		itemsDesktop : [1024,5],
		itemsTablet : [768,3],
		itemsMobile : [568,1],
		navigation : false,
		pagination : false,
		responsiveRefreshRate : 50
	});

	$('.filters p').on('click', function( n ) {
		$('.filters p').removeClass('active');
		$(this).addClass('active');
		
		var content = '.content-'+$(this).attr('data-name');
		$('.content').hide();
		$( content ).show();
	});

	$('.sub-filters p').on('click', function( n ) {
		$('.sub-filters p').removeClass('active');
		$(this).addClass('active');
		
		var content = '.content-'+$(this).attr('data-name');
		$('.content').hide();
		$( content ).show();
	});

	$('.subnav a').on('click', function(e) {
		if( !$(this).hasClass('active') ) {
			$('.subnav a').removeClass('active');
			$(this).addClass('active');
		}
	});

	$('a[href*=#]:not([href=#])').click(function() {
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
	        || location.hostname == this.hostname) {

	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	             $('html,body').animate({
	                 scrollTop: ( target.offset().top ) - 100
	            }, 1000);
	            return false;
	        }
	    }
	});

	$('.show-more').on('click', function(n) {
		$(this).parent().siblings('.more').slideToggle('fast');
		$(this).toggleClass('collapse');
	});

	var $window = 	$(window),
       				$stickyEl = $('#sticky-nav'),
       				elTop = $stickyEl.offset().top;

   	$window.scroll(function() {
        $stickyEl.toggleClass('sticky', $window.scrollTop() > elTop);
    });

});












