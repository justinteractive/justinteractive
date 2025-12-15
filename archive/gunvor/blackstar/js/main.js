$(document).ready(function()  {

	console.log('main.js loaded');

	$(document).on('click', '.grid.inbox table tbody tr', function(e) {
		console.log('tr clicked');

		if( $(this).hasClass('row-active') ) {
			$('.slave').hide();
			$('.master').addClass('full-width');
			$(this).removeClass('row-active');
		} else {
			$('.grid table tbody tr').removeClass('row-active');
			if( $('.master').hasClass('full-width') ) {
				console.log('open slave');
				$('.master').removeClass('full-width');
				$('.slave').show();
			} else {
				console.log('slave already open');
			}
			$(this).addClass('row-active');
		}
	});

	$(document).on('click', '.slave .footer .close', function(e) {
		console.log('close slave');
		$('.slave').hide();
		$('.master').addClass('full-width');
		$('.grid table tbody tr').removeClass('row-active');
	});

	$(document).on('click', '.menu-item', function(e) {
		e.preventDefault();
		$('.menu').hide();
	});

	$(document).on('click', '.logo', function(e) {
		console.log('clicked .logo');
		e.preventDefault();
		if( $('#menu-main').is(':visible') ) {
			$('#menu-main').hide();
		} else {
			$('#menu-main').show();
		}
	});

	$(document).on('click', '.top-nav .action.notifications', function(e) {
		e.preventDefault();
		console.log('action.notifications click');
		$('#side-panel').toggle();
	});

	$(document).on('click', '.side-panel .header .action.close', function(e) {
		$('.side-panel').hide();
	});

	$(document).on('click', '.transport-type .drop-down', function(e) {
		$('.transport-type-options').toggle();
	});
	$(document).on('click', '.transport-type-options li', function(e) {
		var label = $(this).attr('data-label');
		$('.transport-type .label.primary').text(label);
		$('.search input[type="text"]').val('Search '+label).select().focus();
		$('.transport-type-options').hide();
		console.log(label);
	});

	$(document).on('click', '.lot .drop-down', function(e) {
		$('.lot-options').toggle();
	});
	$(document).on('click', '.lot-options li', function(e) {
		var label = $(this).attr('data-label');
		$('.lot .label.primary').text(label);
		//$('.search input[type="text"]').val('Search '+label);
		$('.lot-options').hide();
		console.log(label);
	});

	$(document).on('click', '.uom .drop-down', function(e) {
		$('.uom-options').toggle();
	});
	$(document).on('click', '.uom-options li', function(e) {
		var label = $(this).attr('data-label');
		$('.uom .label.primary').text(label);
		//$('.search input[type="text"]').val('Search '+label);
		$('.uom-options').hide();
		console.log(label);
	});

	$(document).on('focus', 'input[type="text"]', function(e) {
		$(this).addClass('active').select();
	});

	$(document).on('click', '.match-button', function(e) {
		e.stopPropagation();
		var position = $(this).offset(),
			button_width = $(this).outerWidth(true),
			menu_width = $('.matching-module').width(),
			match_menu_top = parseInt(position.top) + 22,
			match_menu_left = ( parseInt( position.left ) - parseInt( menu_width ) ) + parseInt(button_width);

		console.log(match_menu_left);
		$('.matching-module').css('top', match_menu_top).css('left', match_menu_left).toggle();
	});
	$(document).on('click', '.matching-module-save', function(e) {
		$('.matching-module').hide();
		$('.grid').find('.row-active').fadeOut();
	});

	//============= MATCHING ================//
	$(document).on('click', '.grid.matching table tbody tr', function(e) {
		console.log('tr clicked');

		if( $(this).hasClass('row-active') ) {
			$('.slave').hide();
			$(this).removeClass('row-active');
		} else {
			$(this).addClass('row-active');
		}
	});

	$(document).on('click', '.button-match', function(e) {
		$('.grid.suppliers >table > tbody > tr.row-active').each( function(el) {
			var new_row 	= $('.grid.matched table tbody').find('tr:last-child').clone(),
				deal 		= $(this),
				deal_id 	= $(this).find('td.id').text(),
				quantity 	= $(this).find('td.quantity').text(),
				counterparty= $(this).find('td.counterparty').text(),
				product 	= $(this).find('td.product').text(),
				uom 		= $(this).find('td.uom').text();

			$(new_row).find('td.matching').html('IN').addClass('buy');
			$(new_row).find('td.id').html(deal_id).addClass('buy');
			$(new_row).find('td.counterparty').html(counterparty);
			$(new_row).find('td.product').html(product);
			$(new_row).find('td.uom').html(uom);
			
			$(new_row).find('td.out input').remove();
			$(new_row).find('td.in').addClass('editable').html('<input type="text" value="'+quantity+'" />');
			
			if( $(new_row).hasClass('row-light') ) {
				$(new_row).removeClass('row-light').addClass('row-dark');
			} else {
				$(new_row).addClass('row-light').removeClass('row-dark');
			}

			$(new_row).insertAfter('.grid.matched table tbody tr:last-child');
			console.log(new_row);
		});

		$('.grid.customers >table > tbody > tr.row-active').each( function(el) {
			var new_row 	= $('.grid.matched table tbody').find('tr:last-child').clone(),
				deal 		= $(this),
				deal_id 	= $(this).find('td.id').text(),
				quantity 	= $(this).find('td.quantity').text(),
				counterparty= $(this).find('td.counterparty').text(),
				product 	= $(this).find('td.product').text(),
				uom 		= $(this).find('td.uom').text();

			$(new_row).find('td.matching').html('OUT').addClass('sell');
			$(new_row).find('td.id').html(deal_id).addClass('sell');
			$(new_row).find('td.counterparty').html(counterparty);
			$(new_row).find('td.product').html(product);
			$(new_row).find('td.uom').html(uom);

			$(new_row).find('td.in input').remove();
			$(new_row).find('td.out').addClass('editable').html('<input type="text" value="'+quantity+'" />');
			if( $(new_row).hasClass('row-light') ) {
				$(new_row).removeClass('row-light').addClass('row-dark');
			} else {
				$(new_row).addClass('row-light').removeClass('row-dark');
			}
			$(new_row).insertAfter('.grid.matched table tbody tr:last-child');
			console.log(new_row);
		});

		$('.grid.matched table tbody tr:first-child').remove();
		$('.matched-deals').css('opacity', '1');
	});

	$(document).on('blur', 'td.editable input', function(e) {
		var row = $(this).parents('tr');

		$(this).parent('td').removeClass('editable').addClass('edited');
		$(row).find('td.matching-status').html('PARTIAL');
	});

	$(document).on('click', '.button.discard', function(e) {
		$('.matched-deals').find('tbody tr').remove();
	});

	$(document).on('click', '.button.create-match', function(e) {
		alert('Matched');
	});

	$(document).on('click', '.switch.logistics-estimates .slider', function(e) {
		console.log('switch');
		$('.grid tr.logistics-dates, .grid tr.measures').toggleClass('estimates');
	});

	$(document).on('click', '.row-header .toggle', function(e) {
		var section = $(this).parents('.row-header').attr('data-section');
		console.log('data-section = '+section);
		$(this).toggleClass('open').parents('.row-header').nextAll('.'+section).toggle();
	});

	$(document).on('click', '.add-event', function(e) {
		var menu_type = $(this).attr('data-menu-type'),
			menu_top  = $(this).offset().top + 20+'px',
			menu_left = $(this).offset().left - 80+'px';

		console.log('top = '+menu_top+', left = '+menu_left+', menu_type = '+menu_type);
		$('.menu.menu-'+menu_type).css('top', menu_top).css('left', menu_left).toggle();
	});

	$(document).on('click', '.menu-logistics .menu-item', function(e) {
		var value 	= $(this).children('span').text(),
			row 	= '<tr class="row-dark logistics-dates last-row"><td class="align-right">'+value+'</td><td></td><td></td><td></td><td></td></tr>';

		console.log('value = '+value);
		console.log(row);

		//$(row).children('td:first-child').text(value);
		$('.logistics-dates.last-row').removeClass('last-row').after(row);
	});

});





