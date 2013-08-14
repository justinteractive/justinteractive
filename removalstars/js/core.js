// Avoid `console` errors in browsers that lack a console.
(function() {
    var navtop = 135,
    itemLabel = "",
    root = $('html, body');

    $('#add-items').hide();

    $(window).scroll(function() {
        var wintop = $(window).scrollTop();
        
        if(wintop < navtop) {
            $(".nav-rooms").removeClass('nav-fixed');
            $("div.spacer").remove();
        }
        else {
            if( ! $('.nav-rooms').hasClass('nav-fixed') ) {
                $(".nav-rooms").addClass('nav-fixed');
                $(".nav-rooms").after('<div class="spacer">&nbsp;</div>');
            }
        }
        console.log("window scrolltop = "+wintop+" - navtop = "+navtop);
    }).resize(function() {
        //hero_height = $(".hero").height();
    });

    $('.nav-rooms a.button').click(function() {
        var roomName = $(this).attr('name');

        $('.nav-rooms a').addClass('secondary');
        $(this).removeClass('secondary');

        root.animate({
            scrollTop: ($('#'+roomName).offset().top) - 40
        }, 250);

        return false;
    });

    $('.add-item .panel').click(function() {
        $(this).closest('.row').after( $('#add-items').slideDown() );
    });

    $('#add-items a.close').click(function() {
        $('#add-items').slideUp();
    });

    $('#add-items a.button:not(.close)').click(function() {
        var label = $(this).attr('name');
        console.log(label);
        $('#add-items').prev('ul.row').find('li.add-item')
            .before('<li class="large-2 columns"><div class="panel"><h7>'+label+'</h7></div></li>');
    });

    $('li:not(li.add-item) .panel').on('click', function(event) {
        $(this).parent('li').fadeOut();
    });

}());

// Place any jQuery/helper plugins in here.