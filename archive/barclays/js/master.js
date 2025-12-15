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





// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
    console.log('plugins.js loaded');
}());

// Place any jQuery/helper plugins in here.

$(document).ready(function()  {  

    console.log('chatbot.js loaded fufufu');

    var typed3 = new Typed('#search-box', {
        strings: ['How do I log my return to work?'],
        typeSpeed: 30,
        backSpeed: 30,
        smartBackspace: true, // this is a default
        loop: false,
        showCursor: false
      });

      setTimeout(function() {
        $('.results').fadeIn();
        setTimeout(function() {
            $('.welcome-messages').append('<i style="cursor:pointer;" onclick="$(\'.welcome-messages\').empty();" class="fa fa-times pull-right"></i><p onclick="openChat();" class="welcome-message">Hi Jane ✋ welcome to Barclays HR!</p>');
        }, 2000);
        setTimeout(function() {
            $('.welcome-messages').append('<p onclick="openChat();" class="welcome-message">I\'ve noticed you want to find out how to log your <b>return to work.</b> I can help you with this. Do you want to start the process now?</p>');
        }, 3000);
      }, 3000);

      /**
      //FUNCTIONS
      **/
      // scroller for cards 
      $(document).on("click", ".next-button", function() {
          var leftPos=$('.card-container').scrollLeft();
          $('.card-container').animate(
              {scrollLeft: leftPos + 248}, 
              400
          );
      });

      $(document).on("click", ".previous-button", function() {
          var leftPos = $('.card-container').scrollLeft();
          $('.card-container').animate({
              scrollLeft: leftPos - 248
          }
          , 400);
      }

      );
      // Resize chat box body dynamically on screen heigh:
      $( document).ready(function() {
          var heightdiv=$(window).height() - 110;
          $(".chat-body").css("height", heightdiv);
      }

      );

      $(window).resize(function() {
          var heightdiv=$(window).height() - 110;
          $(".chat-body").css("height", heightdiv);
      });




      //Open Chat box
      $(".chat-head").click(function() { openChat(); });

      // Close chat box
      $("#close-button").click(function() { closeChat(); });

      $('.send').on('click keypress', function() {
          input = $('.text-input').val();
          if (input) {
              processOutgoingMessage(input);
          } else {
        $('.text-input').blur().focus();
      }   
      });
    
    
    $(document).on('keypress', 'input', function(e) {
      if(e.keyCode == 13 && e.target.type !== 'submit') {
        e.preventDefault();
        if ($('.text-input').val() === "") {
          return $(e.target).blur().focus();
        } else {
          processOutgoingMessage($('.text-input').val());
          return $(e.target).blur().focus();
        }
      }
    });
    


        function openChat() {
          $('.welcome-messages').empty();
          $('.outerbox').slideToggle("fast");
          $(".chat-head").hide();
          $('.text-input').blur().focus();
          start();  
        }

        function closeChat() {
          $(".chat-head").show();
          $(".outerbox").hide(); 
          $(".input-field").show();
          $(".chat-body").empty();
        }

      /**
      //Quickbuttons 
      **/
      function start() {
          setInputProcessor(false, false);
          appendResponseMessage('Hi! Welcome to the Barclays ChatBot.', 500);
          appendResponseMessage('I can help you with the following:', 1000);
          appendMainMenuSlider(1500);
      }

      //1001
      function qbMainMenu() {
        setInputProcessor(false, false);
        appendMainMenuSlider(1000);
      }

      function qbPayrollDates() {
          appendResponseMessage('The following payroll dates are accurate as of the 05/02/2018', 500);
          //show image here
          appendResponseImage('img/payrolldates.png', 1000, 'The following payroll dates are accurate as of the 05/02/2018');
          setTimeout(
            function() {
              appendQuickButton('What is `Business Cut-Off`', 'qbBusinessCutOff();');
              appendQuickButton('See Live Payroll Dates', 'qbLivePayrollDates();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
          
      }

      function qbPayrollExpl() {
          window.open("http://home.barclays.intranet/sites/myhr/pay/Pages/your-payroll-explained-uk-00.aspx", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          //Main Display of quickbuttons
          //Main Menu
          setTimeout(
            function() {
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );    
      }

      function qbBusinessCutOff() {
          appendResponseMessage('Payroll deadline dates are the deadlines by which instructions must be received by the Payroll team in order for them to be reflected in salary for that month. Instructions received after the deadline date will usually not be reflected until the following month.', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );  
      }

      function qbLivePayrollDates() {
          window.open("http://home.barclays.intranet/sites/myhr/pay/Pages/payroll-dates-uk-00.aspx", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          ); 
      }



      //1002
      function payslipMail(email, name, brid, date) {
          $.get('http://46.101.77.5/mailer.php?email='+email+'&name='+name+'&brid='+brid+'&date='+date+'&flow=payslip');
      }

      function qbPayslipView() {
        appendResponseMessage('Payslip`s can be viewed online via MyHR SelfService tasks, under the action and then Personal actions tab.', 500);
        appendResponseMessage('If you need further support with a query about your payslip please use Contact HR (under Quick Links) or call HR Operations UK on 0800 145 6013 (dialling from outside the UK - 00 44 2036 843 747).', 1000);
        setTimeout(
          function() {
            appendQuickButton('Navigate to MyHR Self-Service', 'qbPayslipSelfServe();');
            appendQuickButton('Send me the payslip', 'qbPayslipSend();');
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1500
        );
      }

      function qbPayslipSelfServe(bool) {
          if (!bool) {
            window.open("https://sap-hrp.intranet.barcapint.com/gateway/sap(bD1lbiZjPTQwMA==)/bc/gallus/bspalias/z_gallus_sso/index_search.do#/homeSearch", "_blank");
          }
         appendResponseMessage('Is there anything else I can help you with?', 500);
          //Main Display of quickbuttons
          //Main Menu
          setTimeout(
            function() {
              appendQuickButton('Main Menu', 'qbMainMenu();');
              appendQuickButton('My Payslip Explained', 'qbPayslipExpl();');
            }, 1000
          ); 
      }

      function qbPayslipExpl() {
        window.open("http://home.barclays.intranet/sites/myhr/pay/Documents/your-payslip-explained-uk-00.pdf", "_blank");
        appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );

      }

      function qbBridHelp(func) {
        appendResponseMessage('Your BRID is the set of 9 alphanumeric characters that you use to log into your Barclays machine. This number can be found in your IT log-in starter pack issued to you when you first joined Barclays. It will also be available on your MyHR portal.', 500);
          setTimeout(
            function() {
              appendQuickButton('Back 1 step', func);
            }, 1000
          );
      }

      function qbPayslipSend() {
        appendResponseMessage('How would you like to receive your payslip?', 500);
        setTimeout(
          function() {
            appendQuickButton('Via Email', 'qbPayslipSendEmail();');
            appendQuickButton('Via Post', 'qbPayslipSendPost();');
            appendQuickButton('View Online', 'qbPayslipView();');
          }, 1500
        );
      }

      function qbPayslipSendEmail() {
          appendResponseMessage('OK, lets start by providing me with your full name.', 500);
          setInputProcessor(true, 'qbPayslipSendEmail__full_name');
      }

      function qbPayslipSendEmail_Step2() {
          appendResponseMessage('Please provide your BRID.', 500);
          setTimeout(
            function() {
              appendQuickButton('What is BRID and where can you find it?', 'qbBridHelp(\'qbPayslipSendEmail_Step2();\');');
            }, 1000
          );
          setInputProcessor(true, 'qbPayslipSendEmail_Step2__brid');
      }

      function qbPayslipSendEmail_Step3() {
          appendResponseMessage('Please provide us with your email address. This can be either a personal email or your Barclays email address.', 500);
          setInputProcessor(true, 'qbPayslipSendEmail_Step3__email');
      }

      function qbPayslipSendEmail_Step4() {
          appendResponseMessage('Thank you, what month and year do you require your payslip from?', 500);
          setInputProcessor(true, 'qbPayslipSendEmail_Step4__date');
      }

      function qbPayslipSendEmail_Finish() { 
          appendResponseMessage('Please check if the following are correct: <br>Full name: '+window.full_name+'<br>BRID: '+window.brid+'<br>Email address: '+window.email+'<br>Payslip Required: '+window.date, 500);
          setTimeout(
            function() {
              appendQuickButton('Correct', 'qbPayslipSendEmailComplete();');
              appendQuickButton('Amend details', 'qbPayslipSendEmail();');
            }, 1000
          );
      }

      function qbPayslipSendEmailComplete() { 
          var short_name = window.full_name.split(/(\s+)/).filter(function(e) { return e.trim().length > 0; });
          //mailhere
          payslipMail(window.email, window.full_name, window.brid, window.date);

          appendResponseMessage('Thank you '+short_name[0]+', your payslip for '+window.date+' will be sent to the following email address : '+window.email+' within the next five working days. The reference ID for this request is 8735543', 500);
          qbPayslipSelfServe(true);
      }


      function qbPayslipSendPost() {
          appendResponseMessage('OK, lets start by providing me with your full name.', 500);
          setInputProcessor(true, 'qbPayslipSendPost__full_name');
      }

      function qbPayslipSendPost_Step2() {
          appendResponseMessage('Please provide your BRID.', 500);
          setTimeout(
            function() {
              appendQuickButton('What is BRID and where can you find it?', 'qbBridHelp(\'qbPayslipSendPost_Step2();\');');
            }, 1000
          );
          setInputProcessor(true, 'qbPayslipSendPost_Step2__brid');
      }

      function qbPayslipSendPost_Step3() {
          appendResponseMessage('Please provide us with your full address and postcode you would like your payslip mailed to.', 500);
          setInputProcessor(true, 'qbPayslipSendPost_Step3__address');
      }

      function qbPayslipSendPost_Step4() {
          appendResponseMessage('Thank you, what month and year do you require your payslip from?', 500);
          setInputProcessor(true, 'qbPayslipSendPost_Step4__date');
      }

      function qbPayslipSendPost_Step5() {
          appendResponseMessage('Would you like your document(s) notarised?', 500);
          setTimeout(
            function() {
              appendQuickButton('Yes', 'qbPayslipSendPost_Finish(true);');
              appendQuickButton('No', 'qbPayslipSendPost_Finish(false);');
              appendQuickButton('What is `notarised` service?', 'qbPayslipNotarised();');
            }, 1000
          );
      }

      function qbPayslipNotarised() {
          appendResponseMessage('A notarised document is a document that has been certified by an official who verifies the identities of everybody signing the document, witnesses the signatures, and marks the document with a stamp (or “seal”). In the case of your payslip, they are able to attest it as a true copy.', 500);
          setTimeout(
            function() {
              appendQuickButton('Back 1 Step', 'qbPayslipSendPost_Step5();');
            }, 1000
          );
      }

      function qbPayslipSendPost_Finish(notarised) { 
          var nota = 'no';
          if (notarised) { nota = 'yes'; }
          appendResponseMessage('Please check if the following are correct: <br>Full name: '+window.full_name+'<br>BRID: '+window.brid+'<br>Address: '+window.address+'<br>Payslip Required: '+window.date+'<br>Notarised: '+nota, 500);
          setTimeout(
            function() {
              appendQuickButton('Correct', 'qbPayslipSendPostComplete();');
              appendQuickButton('Amend details', 'qbPayslipSendPost();');
            }, 1000
          );
      }

      function qbPayslipSendPostComplete() { 
          var short_name = window.full_name.split(/(\s+)/).filter(function(e) { return e.trim().length > 0; });
          appendResponseMessage('Thank you '+short_name[0]+', your payslip for '+window.date+' will be sent to the following physical address : '+window.address+' within the next five working days. The reference ID for this request is 0735543', 500);
          qbPayslipSelfServe(true);
      }

      //1003
      function qbLeaveTimeAway() {
          window.open("http://home.barclays.intranet/sites/myhr/er/Documents/time-away-from-work-policy-uk-01.pdf", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {
              appendQuickButton('Other types of Parental Leave', 'qbLeaveOther();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          ); 
      }

      function qbLeaveTimeMyHR() {
          window.open("http://home.barclays.intranet/sites/myhr/er/Documents/time-away-from-work-policy-uk-01.pdf", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {
              appendQuickButton('Other types of Parental Leave', 'qbLeaveOther();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          ); 
      }

      function qbLeaveOther() {
        appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {
              appendQuickButton('Maternity Leave', 'qbLeaveMaternity();');
              appendQuickButton('Paternity Leave', 'qbLeavePaternity();');
              appendQuickButton('Adoption Leave', 'qbLeaveAdoption();');
              appendQuickButton('Shared Parental Leave', 'qbLeaveSharedParental();');
            }, 1000
          );
      }

      function qbLeaveMaternity() {
          appendResponseMessage('Irrespective of your length of service, you are entitled to take up to 52 weeks of Maternity Leave, consisting of 26 weeks of Ordinary Maternity Leave, plus 26 weeks of Additional Maternity Leave (for details, please see page five of the Maternity Policy). This may be further extended by making a request for Parental Leave or a Career Break (refer to Career Break in the TIme Away From Work Policy).', 500);
          setTimeout(
            function() {
              appendQuickButton('View Maternity Policy', 'qbLeaveMaternityPolicy();');
              appendQuickButton('Career Break in the Time Away From Work policy', 'qbLeaveCareerBreak();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbLeaveMaternityPolicy() {
          window.open("http://home.barclays.intranet/sites/myhr/er/Documents/maternity-policy-uk-00.pdf", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbLeavePaternity() {
          appendResponseMessage('If you have 26 weeks of service or more by the 15th week before the Expected Week of Childbirth you are entitled to two weeks of paid Paternity Leave (see page 4 of Paternity Policy for further details on entitlement). However, parents may be eligible for Shared Parental Leave, please refer to the Shared Parental Leave Policy for further details.', 500);
          setTimeout(
            function() {
              appendQuickButton('View Paternity Policy', 'qbLeavePaternityPolicy();');
              appendQuickButton('Career Break in the Time Away From Work policy', 'qbLeaveCareerBreak();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbLeavePaternityPolicy() {
          window.open("http://home.barclays.intranet/sites/myhr/er/Documents/paternity-policy-uk-00.pdf", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          ); 
      }

      function qbLeaveCareerBreak() {
          appendResponseMessage('You may wish to take an extended period away from work for a range of reasons if you have at least two years continuous service and your last Performance Management rating was Strong or above on both the "What" and the "How" you can apply to take a Career Break of between three and 12 months. However, Career Breaks are decided at the discretion of your Line Manager. For full details, please the full Time Away From Work Policy.');
          setTimeout(
            function() {
              appendQuickButton('View Time Away from Work Policy online', 'qbLeaveTimeMyHR();');
            }, 1000
          );
      }

      function qbLeaveAdoption() {
          appendResponseMessage('All employees, irrespective of length of service, are entitled to up to 52 weeks Adoption Leave and this maybe further extended by making request for Parental Leave or a career break. What pay you will receive during the leave depends on your length of service and when your child is matched for adoption.', 500);
          setTimeout(
            function() {
              appendQuickButton('View on MyHR', 'qbLeaveMyHRAdoption();');
              appendQuickButton('Know more about the Adoption Policy', 'faq1006();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );

      }

      function qbLeaveMyHRAdoption() {
          window.open("http://home.barclays.intranet/sites/myhr/er/Pages/adoption-uk-00.aspx", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }


      function qbLeaveAdoptionPolicyMore() {
        //redirect to 1006
      }

      function qbLeaveSharedParental() {
          appendResponseMessage('The Shared Parental Leave policy provides eligible parents with more flexibility and choice in over how they look after their children in the first year. Eligible employees and their partners are entitle the share out standing leave and some pay by bringing maternity/ adoption leave and pay to end early. Up to 50 weeks leave and 37 weeks statutory pay can be shared between parents. For a summary of the leave and pay available, please refer to the Share Parental Leave and Pay Provision documents in the Related Content section in the right hand side of MyHR page.', 500);
          setTimeout(
            function() {
              appendQuickButton('View on MyHR', 'qbLeaveMyHRParental();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbLeaveMyHRParental() {
        window.open("http://home.barclays.intranet/sites/myhr/er/Pages/shared-parental-leave-uk-00.aspx", "_blank");
        appendResponseMessage('Is there anything else I can help you with?', 500);
        setTimeout(
          function() {
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1000
        ); 
      }

      //1004
      //Online Applications
      function qbApplicationOnline() {
          appendResponseMessage('Please have all the necessary information relevant to your application ready by hand before continuing. We can process the following forms here: Maternity Leave Form; or Paternity Leave Form; or Additional Paternity Leave Form.', 500);
          setTimeout(
            function() {
                appendQuickButton('Begin application', 'qbApplicationBegin();');
                appendQuickButton('View application forms online', 'qbApplicationView();');
            }, 1000
          );
      }

      function qbApplicationBegin() {
          appendResponseMessage('Online application is available for the following applications: Maternity Leave; Paternity Leave; Additional Paternity Leave.', 500);
          appendResponseMessage('Please give me your full name.', 1000);
          setTimeout(function() { appendQuickButton('Main menu', 'qbMainMenu();'); }, 1500);
          setInputProcessor(true, 'qbApplicationBegin__full_name');
      }

      function qbApplicationBegin_Step1() {
          appendResponseMessage('Please provide your BRID.', 500);
          setInputProcessor(true, 'qbApplicationBegin_Step1__brid');
      }

      function qbApplicationBegin_Step2() {
          appendResponseMessage('Please give me the start and end date of leave (DD/MM/YYYY - DD/MM/YYYY). Please ensure you enter the calendar week(s) applicable to the leave period; a full seven day period must be entered per week. E.g. Monday-Sunday.', 1000);
          setInputProcessor(true, 'qbApplicationBegin_Step2__startend_date');
      }

      function qbApplicationBegin_Step3() {
          appendResponseMessage('Please select the leave type:', 500);
          setTimeout(function() { 
            appendQuickButton('Maternity Leave', 'qbApplicationMaternityLeave();'); 
            appendQuickButton('Paternity Leave', 'qbApplicationPaternityLeave();'); 
            appendQuickButton('Add. Paternity Leave', 'qbApplicationAddPaternityLeave();'); 
            appendQuickButton('Exit application', 'faq1004();'); 
          }, 1000);
          //setInputProcessor(true, 'qbApplicationBegin_Step3__leave_type');
      }

      function qbApplicationMaternityLeave() {
          window.leave_type = 'Maternity';
          appendResponseMessage('Please provide a Notification Date', 500);
          setInputProcessor(true, 'qbApplicationMaternityLeave__notif_date');
      }

      function qbApplicationMaternityLeave_Step1() {
          appendResponseMessage('Please provide the Certification Provided Date', 500);
          setInputProcessor(true, 'qbApplicationMaternityLeave_Step1__cert_date');
      }

      function qbApplicationMaternityLeave_Step2() {
          appendResponseMessage('Please provide the MATB1 Stated Due Date', 500);
          setInputProcessor(true, 'qbApplicationMaternityLeave_Step2__matb_date');
      }

      function qbApplicationMaternityLeave_Step3() {
          appendResponseMessage('Please provide the MATB1 issue Date', 500);
          setInputProcessor(true, 'qbApplicationMaternityLeave_Step3__matb_issue_date');
      }  

      function qbApplicationMaternityLeave_Step4() {
          appendResponseMessage('If you have any validation documents, please send them to HR services using existing procedure.', 500);
          window.leave_subtype = 'Statutory Maternity';
          appendResponseMessage('Finally, please confirm the following details are correct: <br>Name: '+window.full_name+' <br>BRID: '+window.brid+' <br>Start Date - End Date (DD/MM/YYYY): '+window.startenddate+' <br>Leave Type: '+window.leave_type+' <br>Leave Sub-type: Statutory Maternity <br>Pay Notification Date: '+window.notifdate+' <br>Certification Provided Date: '+window.certdate+' <br>MATB1 Stated Due Date: '+window.matbdate+' <br>MATB1 Issue Date: '+window.matbissuedate, 500);
          setTimeout(function() { 
            appendQuickButton('Correct', 'qbApplicationMaternityLeaveFinish();'); 
            appendQuickButton('Amend Details', 'qbApplicationBegin();');
          }, 1000);
      }

      function qbApplicationMaternityLeaveFinish() {
            //mailhere
          $.get('http://46.101.77.5/mailer.php'+
            '?name='+window.full_name+
            '&brid='+window.brid+
            '&sedate='+window.startenddate+
            '&leavetype='+window.leave_type+
            '&leavesubtype='+window.leave_subtype+
            '&pndate='+window.notifdate+
            '&cpdate='+window.certdate+
            '&matb1='+window.matbdate+
            '&matb1id='+window.matbissuedate+
            '&flow=maternity'
          );
          appendResponseMessage('Thank you. Your Maternity Leave application has been logged and a member of staff will get in touch with you within ten working days. The reference I.D. for this request is: 986436.', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }


      function qbApplicationPaternityLeave() {
          window.leave_type = 'Paternity';
          appendResponseMessage('Please select the subtype:', 500);
          setTimeout(function() { 
            appendQuickButton('Statutory Paternity Pay (Adoption)', 'qbApplicationPaternityLeaveAdoption();'); 
            appendQuickButton('Statutory Paternity Pay (Birth)', 'qbApplicationPaternityLeaveBirth();');
          }, 1000);
      }

      function qbApplicationPaternityLeaveAdoption() {
          window.leave_subtype = 'Adoption';
          qbApplicationPaternityLeave_Step1();
      }

      function qbApplicationPaternityLeaveBirth() {
          window.leave_subtype = 'Birth';
          qbApplicationPaternityLeave_Step1();
      }

      function qbApplicationPaternityLeave_Step1() {
          appendResponseMessage('Please provide a Notification Date', 500);
          setInputProcessor(true, 'qbApplicationPaternityLeave_Step1__notif_date');
      }

      function qbApplicationPaternityLeave_Step2() {
          appendResponseMessage('Please provide an intended Start Date.', 500);
          setInputProcessor(true, 'qbApplicationPaternityLeave_Step2__start_date');
      }

      function qbApplicationPaternityLeave_Step3() {
          appendResponseMessage('Finally, please confirm your details: <br>Name: '+window.full_name+' <br>BRID: '+window.brid+' <br>Start Date - End Date (DD/MM/YYYY): '+window.startenddate+' <br>Leave Type: '+window.leave_type+' <br>Leave Sub-type: '+window.leave_subtype+' <br>Notification Date: '+window.notifdate+' <br>Intended Start Date: '+window.startdate, 500);
          setTimeout(function() { 
            appendQuickButton('Correct', 'qbApplicationPaternityLeaveFinish();');
            appendQuickButton('Amend Details', 'qbApplicationBegin();');
          }, 1000);
      }

      function qbApplicationPaternityLeaveFinish() {
            //mailhere paternity
           $.get('http://46.101.77.5/mailer.php'+
            '?name='+window.full_name+
            '&brid='+window.brid+
            '&sedate='+window.startenddate+
            '&leavetype='+window.leave_type+
            '&leavesubtype='+window.leave_subtype+
            '&pndate='+window.notifdate+
            '&isdate='+window.startdate+
            '&flow=paternity'
          );
          appendResponseMessage('Thank you. Your Paternity Leave application has been logged and a member of staff will get in touch with you within ten working days. The reference I.D. for this request is: 542332.', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }


      function qbApplicationAddPaternityLeave() { 
          window.leave_type = 'Paternity';
          appendResponseMessage('Please tell me your employment start date.', 500);
          setInputProcessor(true, 'qbApplicationAddPaternityLeave__start_date');
      }

      function qbApplicationAddPaternityLeave_Step1() {
          appendResponseMessage('What is your department?', 500);
          setInputProcessor(true, 'qbApplicationAddPaternityLeave_Step1__department');
      }

      function qbApplicationAddPaternityLeave_Step2() {
          appendResponseMessage('Who is your Line Manager?', 500);
          setInputProcessor(true, 'qbApplicationAddPaternityLeave_Step2__linemgr');
      }

      function qbApplicationAddPaternityLeave_Step3() {
          appendResponseMessage('What is your national insurance number?', 500);
          setInputProcessor(true, 'qbApplicationAddPaternityLeave_Step3__natinsurance');
      }

      function qbApplicationAddPaternityLeave_Step4() {
          appendResponseMessage('Childs actual or expected date of birth or date of placement?', 500);
          setInputProcessor(true, 'qbApplicationAddPaternityLeave_Step4__childdate');
      }

      function qbApplicationAddPaternityLeave_Step5() {
          appendResponseMessage('Please confirm that you are either: The baby`s biological father OR Married to the baby`s mother OR In a partnership or civil partnership with the baby`s mother; AND The purpose of my APL is to care for the child; AND Apart from the mother, I will have main responsibility for bringing up the child.', 500);
           setTimeout(function() { 
            appendQuickButton('Correct', 'qbApplicationAddPaternityLeaveFinish_Step1();');
            appendQuickButton('Exit Application', 'qbMainMenu();');
          }, 1000);
      }

      function qbApplicationAddPaternityLeaveFinish_Step1() {
          appendResponseMessage('I confirm that i will inform Barclays Capital as soon as is reasonably practicable if I no longer satisfy the conditions outline above, or if my partner no longer satisfies the conditions outlined in the Return to Work Declaration. If I wish to cancel my leave request I confirm that I will provide written notice to Barclays Capital as soon as is reasonably practicable.', 500);
          setTimeout(function() { 
            appendQuickButton('Correct', 'qbApplicationAddPaternityLeaveFinish_Step2();');
            appendQuickButton('Exit Application', 'faq1004();');
          }, 1000);
      }

      function qbApplicationAddPaternityLeaveFinish_Step2() {
        appendResponseMessage('Please confirm your application: <br>Name: '+window.full_name+' <br>BRID: '+window.brid+' <br>Start Date - End Date (DD/MM/YYYY): '+window.startenddate+' <br>Leave type: '+window.leave_type+' <br>Employment Start Date: '+window.startdate+' <br>Department: '+window.department+' <br>Line Manager: '+window.linemgr+' <br>National Insurance No.: '+window.nins+' <br>Child`s DOB or Date Of Placement: '+window.dob+' <br>The baby`s biological father OR Married to the baby`s mother OR In a partnership or civil partnership with the baby`s mother. <br> YES <br>The purpose of my APL is to care for the child. <br> YES <br>Apart from the mother, I will have main responsibility for bringing up the child. <br> YES <br>I confirm that i will inform Barclays Capital as soon as is reasonably practicable if I no longer satisfy the conditions outline above, or if my partner no longer satisfies the conditions outlined in the Return to Work Declaration. If I wish to cancel my leave request I confirm that I will provide written notice to Barclays Capital as soon as is reasonably practicable.<br>CONFIRMED', 500);
        setTimeout(function() { 
            appendQuickButton('Correct', 'qbApplicationAddPaternityLeaveFinish_Step3();');
            appendQuickButton('Amend Details', 'qbApplicationBegin();');
        }, 1000);
      }

      function qbApplicationAddPaternityLeaveFinish_Step3() {
        appendResponseMessage('Declaration The information that I have provided on this form is correct and true. I acknowledge that if I have provided false, incomplete or misleading information this may result in disciplinary actions.', 500);
        setTimeout(function() { 
            appendQuickButton('Exit Application', 'faq1004();');
        }, 1500);
        appendResponseMessage('****By clicking on the button "DIGITAL SIGNAGE OF DECLARATION" below, you declare to the application for "Additional Paternity Leave".****', 1000);
                setTimeout(function() { 
            appendQuickButton('DIGITAL SIGNAGE OF DECLARATION', 'qbApplicationAddPaternityLeaveFinishLast();');
        }, 1500);
      }

      function qbApplicationAddPaternityLeaveFinishLast() {
        //mailhere
          $.get('http://46.101.77.5/mailer.php'+
            '?name='+window.full_name+
            '&brid='+window.brid+
            '&sedate='+window.startenddate+
            '&leavetype='+window.leave_type+
            '&startdate='+window.startdate+
            '&nins='+window.nins+
            '&department='+window.department+
            '&linemgr='+window.linemgr+
            '&dob='+window.dob+
            '&flow=addpaternity'
          );
        appendResponseMessage('Thank you. Your Additional Paternity Leave application has been logged and a member of staff will get in touch with you within ten working days. The reference I.D. for this request is: 93828', 500);
        appendResponseMessage('Is there anything else I can help you with?', 500);
        setTimeout(
          function() {
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1000
        ); 
      }  

      //View application forms online
      function qbApplicationView() {
        appendResponseMessage('Which of the application forms would you like to view?', 500);
        setTimeout(
          function() {
            appendQuickButton('Parental Leave', 'qbApplicationViewParentalLeave();');
            appendQuickButton('Maternity / Paternity / Adoption Leave', 'qbApplicationViewMaternityPaternityAdoptionLeave();');
            appendQuickButton('Shared Parental Leave and Pay Application Record', 'qbApplicationViewSharedParentalLeave();');
            appendQuickButton('Add. Paternity Leave', 'qbApplicationViewAddPaternityLeave();');
            appendQuickButton('Online Application', 'qbApplicationViewOnlineApplication();');
            appendQuickButton('Go to main menu', 'qbMainMenu();');
          }, 1000
        ); 
      }

      function qbApplicationViewParentalLeave() {
        appendResponseMessage('You should request Parental Leave in writing to you and your Line Manager at least 21 working days before you want the leave to start via MyHR Portal.', 500);
        setTimeout(
          function() {
            appendQuickButton('View Policy (p.7)', 'qbApplicationViewParentalLeavePolicy();');
            appendQuickButton('MyHR Portal', 'qbApplicationViewParentalLeavePortal();');
          }, 1000
        );
      }

      function qbApplicationViewParentalLeavePolicy() {
            window.open("http://home.barclays.intranet/sites/myhr/er/Document/time-away-from-work-policy-uk-01.pdf", "_blank");
            appendResponseMessage('Is there anything else I can help you with?', 500);
            setTimeout(
              function() {
                appendQuickButton('Main Menu', 'qbMainMenu();');
              }, 1000
            ); 
      }

      function qbApplicationViewParentalLeavePortal() {
            window.open("https://sap-hrp.intranet.barcapint.com/gateway/sap(bD1lbiZjPTQwMA==)/bc/gallus/bspalias/z_gallus_sso/index_search.do#/homeSearch", "_blank");
            appendResponseMessage('Is there anything else I can help you with?', 500);
            setTimeout(
              function() {
                appendQuickButton('Main Menu', 'qbMainMenu();');
              }, 1000
            ); 
      }

      function qbApplicationViewMaternityPaternityAdoptionLeave() {
        appendResponseMessage('You can manage your paternity leave or adoption leave using the online form via MyHR Portal. Click "personal action" and select "Becoming a parent" to initiate the application form.', 500);
        setTimeout(
          function() {
            appendQuickButton('MyHR Portal', 'qbApplicationViewMaternityPaternityAdoptionLeavePortal();');
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1000
        );
      } 

      function qbApplicationViewMaternityPaternityAdoptionLeavePortal() {
            window.open("https://sap-hrp.intranet.barcapint.com/gateway/sap(bD1lbiZjPTQwMA==)/bc/gallus/bspalias/z_gallus_sso/index_search.do#/homeSearch", "_blank");
            appendResponseMessage('Is there anything else I can help you with?', 500);
            setTimeout(
              function() {
                appendQuickButton('Main Menu', 'qbMainMenu();');
              }, 1000
            ); 
      }

      function qbApplicationViewSharedParentalLeave() {
        window.open("http://home.barclays.intranet/sites/myhr/er/Document/shared-parental-and-leave-and-pay-application-record-uk-00.docx", "_blank");
        appendResponseMessage('Is there anything else I can help you with ?', 500);
        setTimeout(
          function() {
            appendQuickButton('Shared Parental Leave Policy', 'qbApplicationViewSharedParentalLeavePolicy();');
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1000
        );
      }

      function qbApplicationViewSharedParentalLeavePolicy() {
        window.open("http://home.barclays.intranet/sites/myhr/er/Document/shared-parental-leave-policy-uk-00.pdf", "_blank");
        appendResponseMessage('Is there anything else I can help you with ?', 500);
        setTimeout(
          function() {
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1000
        );
      }

      function qbApplicationViewAddPaternityLeave() {
        window.open("http://home.barclays.intranet/sites/myhr/er/Documents/additional-paternity-leave-request-form-uk-04.doc", "_blank");
        appendResponseMessage('Is there anything else I can help you with ?', 500);
        setTimeout(
          function() {
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1000
        );
      }


      function qbApplicationViewOnlineApplication() {
             qbApplicationOnline();
      }

      //Send to me via post
      function qbApplicationSend() {
        appendResponseMessage('What is your full name ?', 500);
        setInputProcessor(true, 'qbApplicationSend__name');
      }

      function qbApplicationSendStep1() {
        appendResponseMessage('Pleae provide your postal address including postcode.', 500);
        setInputProcessor(true, 'qbApplicationSend_Step1__address');
      }

      function qbApplicationSendStep2() {
        appendResponseMessage('Which of the application forms would you like to recieve?', 500);
        setTimeout(
          function() {
            appendQuickButton('Parental Leave', 'qbApplicationSendParentalLeave();');
            appendQuickButton('Maternity / Paternity / Adoption Leave', 'qbApplicationSendMaternityPaternityAdoptionLeave();');
            appendQuickButton('Shared Parental Leave and Pay Application Record', 'qbApplicationSendSharedParentalLeave();');
            appendQuickButton('Add. Paternity Leave', 'qbApplicationSendAddPaternityLeave();');
            appendQuickButton('Online Application', 'qbApplicationSendOnlineApplication();');
            appendQuickButton('Go to main menu', 'qbMainMenu();');
          }, 1000
        );
      }

      function qbApplicationSendParentalLeave() {
        appendResponseMessage('Unfortunately Parental Leave Application form cannot be found online. However, you should request Parental Leave in writing to your Line Manager at least 21 working days before you want the leave to start via MyHR Portal.', 500);
        setTimeout(
          function() {
            appendQuickButton('View policy (p.7)', 'qbApplicationViewParentalLeavePolicy();');
            appendQuickButton('MyHR Portal', 'qbApplicationViewParentalLeavePortal();');
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1000
        );
      }

      function qbApplicationSendMaternityPaternityAdoptionLeave() {
        appendResponseMessage('Unfortunately Parental Leave Application form cannot be found. However, You can manage your paternity leave or adoption leave using the online form via MyHR Portal. Click "personal action" and select "Becoming a parent" to initiate the application form.', 500);
        setTimeout(
          function() {
            appendQuickButton('MyHR Portal', 'qbApplicationViewMaternityPaternityAdoptionLeavePortal();');
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1000
        );
      }

      function qbApplicationSendSharedParentalLeave() {
        window.applicationform = "Shared Parental Leave and Pay Application Record";
        appendResponseMessage('Your postal address is '+window.address+' and you would like to receive application forms for '+window.applicationform+'. Is that correct?', 500);
        setTimeout(
          function() {
            appendQuickButton('Correct', 'qbApplicationSendSharedParentalLeaveFinish();');
            appendQuickButton('Amend details', 'qbApplicationSend();');
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1000
        );
      }

      function qbApplicationSendSharedParentalLeaveFinish() {
        //mailhere
          $.get('http://46.101.77.5/mailer.php'+
            '?applicationform='+window.applicationform+
            '&address='+window.address+
            '&name='+window.full_name+
            '&brid='+window.brid+
            '&flow=sharedparentalleave'
          );

        appendResponseMessage('Thank you. Your request has been logged and a member of staff will process your request within five working days.', 500);
        appendResponseMessage('Is there anything else I can help you with ?', 1000);
        setTimeout(
          function() {
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1500
        );
      }

      function qbApplicationSendAddPaternityLeave() {
        window.applicationform = "Add Paternity Leave";
        appendResponseMessage('Your postal address is '+window.address+' and you would like to receive application forms for '+window.applicationform+'. Is that correct?', 500);
        setTimeout(
          function() {
            appendQuickButton('Correct', 'qbApplicationSendAddPaternityLeaveFinish();');
            appendQuickButton('Amend details', 'qbApplicationSend();');
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1000
        );
      }

      function qbApplicationSendAddPaternityLeaveFinish() {
        //mailhere
          $.get('http://46.101.77.5/mailer.php'+
            '?applicationform='+window.applicationform+
            '&address='+window.address+
            '&name='+window.full_name+
            '&brid='+window.brid+
            '&flow=sendpaternityleave'
          );
        appendResponseMessage('Thank you. Your request has been logged and a member of staff will process your request within five working days.', 500);
        appendResponseMessage('Is there anything else I can help you with ?', 1000);
        setTimeout(
          function() {
            appendQuickButton('Main Menu', 'qbMainMenu();');
          }, 1500
        );
      }

      function qbApplicationSendOnlineApplication() {
        qbApplicationOnline();
      }


      //1005
      function qbHealthPolicy() {
          window.open("http://home.barclays.intranet/sites/myhr/er/Documents/ill-health-policy-uk-00.pdf", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbHealthProcedure() {
          appendResponseMessage('Upon return to work, regardless of the length of time, both employees and Line Manager should ensure that they discuss their health and absence in a sensitive and appropriate way and any support that can be given in relation to their on-going attendance at work. Employees are also required to provide a Fit Note or equivalent for absences of seven days or more; attending appropriate medical appointments and referrals in the interest of rehabilitation or support. Failure to provide proper notification and to cooperate with the Ill Health Policy and provisions may result in an absence being unauthorised which could result in disciplinary action and/or sick pay not being payable.', 500);
          appendResponseMessage('For more information on the related topic, please refer to the Ill Health Policy.', 500);
          setTimeout(
            function() {
              appendQuickButton('Ill health Policy', 'qbHealthPolicy();');
              appendQuickButton('Main menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbSickProcedure() {
          window.open("http://home.barclays.intranet/sites/myhr/rb/Pages/sickness-za-08.aspx", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }      

      function qbSickLongterm() {
          appendResponseMessage('When an employee is absent for 28 calendar days or where the Line Manager is aware that the absence is likely to last longer than four weeks, the Line Manager, whilst remaining accountable for managing the employee’s absence, must seek expert advice from ER Direct and OH. Employees and Line Managers must ensure that they keep in regular and appropriate contact throughout the absence.', 500);
          appendResponseMessage('For more information on the related topic, please refer to the Ill Health Policy.', 500);
          setTimeout(
            function() {
              appendQuickButton('Ill health Policy', 'qbHealthPolicy();');
              appendQuickButton('Main menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbSickProvisions() {
          appendResponseMessage('To assist your recovery from ill-health and your return to work, Barclays may provide payments (Barclays Company Sick Pay) during sickness absence. Payments will include your entitlement to statutory sick pay where appropriate. Please ensure you refer to the relevant table in relation to service date and business area and the Ill Health Policy.', 500);
          setTimeout(
            function() {
              appendQuickButton('Sick Pay Provisions tables', 'qbSickPayProvisionsTables();');
              appendQuickButton('Main menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbSickPayProvisionsTables() {
        window.open("http://home.barclays.intranet/sites/myhr/er/Documents/sick-pay-provisions-uk-00.doc", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }


      //1006
      function qbAdoptionPolicyUK() {
          appendResponseMessage('The Adoption Policy outlines the arrangements for Leave and Pay and the treatment benefits during Adoption Leave. It also provides guidance to help you at each stage, including keeping in touch while on leave and making arrangements for your return to work.', 500);
          setTimeout(
            function() {
              appendQuickButton('View Adoption Policy', 'qbAdoptionPolicyUKMyHR();');
              appendQuickButton('Adoption Timeline', 'qbAdoptionTimeline();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbAdoptionViewTimeline() {
          window.open("http://home.barclays.intranet/sites/myhr/er/Documents/adoption-timeline-uk-00.pdf", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbAdoptionTimeline() {
          appendResponseMessage('This timeline has been developed as a quick reference guide for you and your Line Manager to understand the key dates and support that Barclays provides you before, during and after you leave.', 500);
          setTimeout(
            function() {
              appendQuickButton('View Timeline', 'qbAdoptionViewTimeline();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbAdoptionPolicyUKMyHR() {
          window.open("http://home.barclays.intranet/sites/myhr/er/Documents/adoption-policy-uk-00.pdf", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbAdoptionPolicyWealthInvestment() {
          appendResponseMessage('This policy, which applies specifically to the Wealth and Investment Management division of Barclays, has been developed following feedback from our employees and sets out the support and benefits that Barclays provides above and beyond statutory entitlements. This includes our enhanced adoption pay, which means eligible employees will received their normal full pay for up to 26 weeks. Separate paternity and maternity policies set out the support and benefits with Barclays offers to employees when they become parents.', 500);
          setTimeout(
            function() {
              appendQuickButton('View Adoption Policy for Wealth and Investment Management', 'qbAdoptionPolicyWealthInvestmentMyHR();');
              appendQuickButton('Adoption Timeline', 'qbAdoptionTimeline();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbAdoptionPolicyWealthInvestmentMyHR() {
          window.open("http://home.barclays.intranet/sites/myhr/er/Documents/adoption-policy-uk-07.pdf", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbAdoptionPayProvisions() {
          appendResponseMessage('This document sets out the adoption pay provisions that apply to Barclays employees and should be read in conjunction with the Barclays Adoption Policy. Adoption pay eligibility depends on your length of service and where relevant, whether you meet the statutory requirements.', 500);
          setTimeout(
            function() {
              appendQuickButton('View Adoption Policy for Wealth and Investment Management', 'qbAdoptionPolicyPayProvisionsMyHR();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbAdoptionPolicyPayProvisionsMyHR() {
          window.open("http://home.barclays.intranet/sites/myhr/er/Documents/adoption-pay-provisions-uk-mainland-uk-00.pdf", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }



      //1007
      function qbReturnLeavePolicy() {
          /*appendResponseMessage('Which of the leave policy would you like to view?', 500);
          setTimeout(
            function() {
              appendQuickButton('Maternity/Paternity/Adoption Leave Polices', 'qbMainMenu();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );*/
          //go to faq 1009
          qbPolicyMain();
      }

      function qbReturnOnlineProcess() {
          appendResponseMessage('Please give me your full name.', 500);
          setInputProcessor(true, 'qbReturnOnlineProcess__full_name');
      }
//here
      function qbReturnOnlineProcess_Step2() {
          appendResponseMessage('Please provide your BRID.', 500);
          setTimeout(
            function() {
              appendQuickButton('What is BRID and where can you find it?', 'qbBridHelp(\'qbReturnOnlineProcess_Step2();\');');
            }, 1000
          );
          setInputProcessor(true, 'qbReturnOnlineProcess_Step2__brid');
      }

      function qbReturnOnlineProcess_Step3() {
          appendResponseMessage('Please type in your barclays email address.', 500);
          setInputProcessor(true, 'qbReturnOnlineProcess_Step3__email');
      }

      function qbReturnOnlineProcess_Step4() {
          appendResponseMessage('Please give me the Return From Leave date. This date should be the official date as the one you have provided to your Line Manager before your leave, as this is the agreed date.', 500);
          setInputProcessor(true, 'qbReturnOnlineProcess_Step4__leavedate');
      }

      function qbReturnOnlineProcess_Step5() {
          appendResponseMessage('Please select your leave type:', 500);
          setTimeout(
            function() {
              appendQuickButton('Planned Leave', 'qbReturnOnlineProcessPlannedLeave();');
              appendQuickButton('Sickness', 'qbReturnOnlineProcessSickness();');
            }, 1000
          );
      }

      function qbReturnOnlineProcessPlannedLeave() {
        window.leavetype = 'Planned';
        appendResponseMessage('Please tell me the name of your Line Manager.', 500);
        setInputProcessor(true, 'qbReturnOnlineProcess_Step5__linemgr');
      }

      function qbReturnOnlineProcessSickness() {
        window.leavetype = 'Sickness';
        appendResponseMessage('Please tell me the name of your Line Manager.', 500);
        setInputProcessor(true, 'qbReturnOnlineProcess_Step5__linemgr');
      }

      function qbReturnOnlineProcess_Step6() {
          appendResponseMessage('Last step, please tell me your Line Manager`s Barclays email address.', 500);
          setInputProcessor(true, 'qbReturnOnlineProcess_Step6__linemgr_email');
      }

      function qbReturnOnlineProcess_Step7() {
          appendResponseMessage('Finally, please confirm the following details are correct: <br>Name: '+window.full_name+' <br>BRID: '+window.brid+' <br>Your Barclays Email address: '+window.email+' <br>Your Return From Leave date: '+window.leavedate+' <br>Leave Type: '+window.leavetype+' <br>Line Manager Name: '+window.linemgr+' <br>Line Manager Email address: '+window.linemgr_email, 500);
          setTimeout(
            function() {
              appendQuickButton('Correct', 'qbReturnOnlineProcess_Finish();');
              appendQuickButton('Amend Details', 'qbReturnOnlineProcess();');
            }, 1000
          );
      }

      function qbReturnOnlineProcess_Finish() {
        //mailhere
          $.get('http://46.101.77.5/mailer.php'+
            '?applicationform='+window.applicationform+
            '&email='+window.email+
            '&name='+window.full_name+
            '&brid='+window.brid+
            '&leavedate='+window.leavedate+
            '&leavetype='+window.leavetype+
            '&linemgr='+window.linemgr+
            '&linemgreml='+window.linemgr_email+
            '&flow=returnonline'
          );
          appendResponseMessage('Thank you. Return to Work date has been filled and you shall recieve a notification of approval within the next ten working days.', 500);
          appendResponseMessage('This is your unique Reference ID: 74224553', 1000);
          appendResponseMessage('Is there anything else I can help you with?', 1500);
          //Main Display of quickbuttons
          //Main Menu
          setTimeout(
            function() {
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 2000
          );  
      }

      //1008
      //brid info (no extra funcs required.)
//herehere
      //1009
      //leave policy extra.
        function qbPolicyMain() {
          appendResponseMessage('Here are a few policies around leaves in Barclays. Please select the policy you would like to view from the list below.', 500);
          setTimeout(
            function() {
              appendQuickButton('Maternity/ Paternity/ Adoption Leave Policies', 'qbPolicies();');
              appendQuickButton('Shared Parental Leave Policy', 'qbLeaveMyHRParental();');
              appendQuickButton('Sickness', 'qbSickProcedure();');
            }, 1000
          );
        }

      function qbPolicies() {
          setTimeout(
            function() {
              appendQuickButton('Paternity Leave Policy', 'qbPolicesPaternity();');
              appendQuickButton('Maternity Leave Policy', 'qbPolicesMaternity();');
              appendQuickButton('Adoption Leave Policy', 'qbPoliciesAdoption();');
            }, 1000
          );
      }

      function qbPoliciesAdoption() {
          appendResponseMessage('Did you know you can manage your paternity leave or adoption leave using the online form via MyHR Portal? Click "personal action" and select "Becoming a parent" to initiate the application form.', 500);
          window.open("http://home.barclays.intranet/sites/myhr/er/Pages/adoption-uk-00.aspx", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {
              appendQuickButton('MyHR Portal', 'qbPolicesPaternityMyHR();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          ); 
      }

      function qbPoliciesAdoptionMyHR() {
        window.open("https://sap-hrp.intranet.barcapint.com/gateway/sap(bD1lbiZjPTQwMA==)/bc/gallus/bspalias/z_gallus_sso/index_search.do#/homeSearch", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      function qbPolicesPaternity() {
          appendResponseMessage('Did you know you can manage your paternity leave or adoption leave using the online form via MyHR Portal? Click "personal action" and select "Becoming a parent" to initiate the application form.', 500);
          window.open("http://home.barclays.intranet/sites/myhr/er/Documents/paternity-policy-uk-00.pdf", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {
              appendQuickButton('MyHR Portal', 'qbPolicesPaternityMyHR();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          ); 
      }

      function qbPolicesPaternityMyHR() {
        window.open("https://sap-hrp.intranet.barcapint.com/gateway/sap(bD1lbiZjPTQwMA==)/bc/gallus/bspalias/z_gallus_sso/index_search.do#/homeSearch", "_blank");
             appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }


      function qbPolicesMaternity() {
          window.open("http://home.barclays.intranet/sites/myhr/er/Documents/maternity-policy-uk-00.pdf", "_blank");
          appendResponseMessage('Is there anything else I can help you with?', 500);
          setTimeout(
            function() {

              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 1000
          );
      }

      //end



      /**
        //Faq Execution
      **/
      function faq1001(debug) {
          appendResponseMessage('You will be paid on the 23rd of each month (16th of the month for December) or on the preceding business day if this falls on a Saturday, Sunday or Bank Holiday.', 500);
          appendResponseMessage('Although payment is made part through the month, it is for the whole of the calendar month.', 1000);
          //quick buttons here
          setTimeout(
            function() {
              appendQuickButton('Your Payroll Explained', 'qbPayrollExpl();');
              appendQuickButton('Payroll Dates', 'qbPayrollDates();');
              appendQuickButton('Main Menu', 'qbMainMenu();');
            }, 2000
          );
      }

      function faq1002(debug) {
        if (debug) { 
            if (debug.indexOf('post') !== -1 || debug.indexOf('posted') !== -1) {
              qbPayslipSendPost();
            } else if (debug.indexOf('email') !== -1 || debug.indexOf('emailed') !== -1) {
              qbPayslipSendEmail();
            } else {
              appendResponseMessage('Payslips are available to view and print two calendar days before each payday. These are accessed via MyHR – there is a quick link to `My payslip` under `related actions`. This also gives you access to view and print historical payslips.', 500);
              appendResponseMessage('Would you like to view your payslip or have it sent to you?', 1000);
              setTimeout(
                function() {
                  appendQuickButton('Sent to me', 'qbPayslipSend();');
                  appendQuickButton('View my payslip online', 'qbPayslipView();');
                }, 2000
              );
            }
        } else { 
          appendResponseMessage('Payslips are available to view and print two calendar days before each payday. These are accessed via MyHR – there is a quick link to `My payslip` under `related actions`. This also gives you access to view and print historical payslips.', 500);
          appendResponseMessage('Would you like to view your payslip or have it sent to you?', 1000);
          setTimeout(
            function() {
              appendQuickButton('Sent to me', 'qbPayslipSend();');
              appendQuickButton('View my payslip online', 'qbPayslipView();');
            }, 2000
          ); 
        }
      }

      function faq1003(debug) {
          appendResponseMessage('You are entitled to take up to 18 weeks unpaid Parental Leave to look after any children who you have formal or legal responsibility for. Any Parental Leave must be taken before your child’s 18th birthday and a maximum of four weeks can be taken in a calendar year.', 500);
          appendResponseMessage('To be eligible for Parental Leave, you must have at least one year’s continuous service at Barclays. You must also have legal or formal responsibility for the child you are taking leave to look after.', 1000);
          appendResponseMessage('Please refer to page seven of the Time Away From Work Policy document for further entitlement and eligibility details by clicking the link below.', 1500);
          setTimeout(
            function() {
              appendQuickButton('View Time Away from Work Policy online', 'qbLeaveTimeAway();');
            }, 1500
          );
      }

      function faq1004(debug) {
          appendResponseMessage('You can access the application forms online as well as have it sent to you. We can even process it online right here. Please choose from the options below:', 500);
            setTimeout(
              function() {
                appendQuickButton('Online Applications', 'qbApplicationOnline();');
                appendQuickButton('View application forms online', 'qbApplicationView();');
                appendQuickButton('Send to me via Post', 'qbApplicationSend();');
              }, 1000
            );
      }

      function faq1005(debug) {
          appendResponseMessage('Barclays is committed to supporting and protecting the health and well being of employees and assisting them to return to work following ill health. if you are absent due to ill health, independent specialist advice will be taken as appropiate and Barclays may continue to pay all or part of your salary if you meet certain eligibility criteria. For further details, please refer to the ill health policy document in MyHR or click the button below.', 500);
        setTimeout(
          function() {
            appendQuickButton('Ill health Policy', 'qbHealthPolicy();');
            appendQuickButton('Overview of the sickness procedure and FAQs', 'qbSickProcedure();');
            appendQuickButton('Longterm sickness', 'qbSickLongterm();');
            appendQuickButton('Ill health Procedure', 'qbHealthProcedure();');
            appendQuickButton('Sick pay provisions', 'qbSickProvisions();');
            appendQuickButton('Main menu', 'qbMainMenu();');
          }, 1000
        );
      }

      function faq1006(debug) {
        appendResponseMessage('All employees, irrespective of length of service, are entitled to up to 52 weeks Adoption Leave and this may be further extended by making a request for Parental Leave or a career break. What pay you will receive during the leave depends on your length of service and when your child is matched for adoption. ‘Employees’ are encouraged to call HR Operations UK on 0800 145 6013 (dialling from outside UK: +44 2036 843 747) to discuss details of how this policy may apply to them.', 500);
        setTimeout(
          function() {
            appendQuickButton('Adoption Policy UK', 'qbAdoptionPolicyUK();');
            appendQuickButton('Adoption Policy for Wealth and Investment Management (UK)', 'qbAdoptionPolicyWealthInvestment();');
            appendQuickButton('Adoption Pay Provisions - UK Mainland', 'qbAdoptionPayProvisions();');
            appendQuickButton('Parental Leave entitlement', 'faq1003();');
            appendQuickButton('Main menu', 'qbMainMenu();');
          }, 1000
        );
      }

      function faq1007(debug) {
        appendResponseMessage('Ok, so you want to log your return to work. Logging your return to work is mandatory for all Barclays employees that have been away on leave. If you need help logging your return to Barclays, I can help with that.', 500);
        //barclays leave policy
        //start online process
        setTimeout(
            function() {
              appendQuickButton('View Policy', 'qbReturnLeavePolicy();');
              appendQuickButton('Start Online Process', 'qbReturnOnlineProcess();');
            }, 1000
        );
      }

        function faq1008(debug) {
            appendResponseMessage('Your BRID is the set of 9 alphanumeric characters that you use to log into your Barclays machine. This number can be found in your IT log-in starter pack issued to you when you first joined Barclays. It will also be available on your MyHR portal.', 500);
            //Main Display of quickbuttons
            //Main Menu
            setTimeout(
                function() {
                    appendQuickButton('Main Menu', 'qbMainMenu();');
                }, 1000
            );
        }

        function faq1009(debug) { qbPolicyMain(); }

      /**
      //FUNCTIONS
      **/
      function setInputProcessor(bool, callback) { window.callback = callback; window.getinput = bool; }

      function getInputProcessor() {  return {input:window.getinput, cb:window.callback}; }

      function inputHandler(str) {
                var inputProc = getInputProcessor();
                if (inputProc.input === true) {
                  setInputProcessor(false, false);
                  switch(inputProc.cb) {
                    case 'qbPayslipSendEmail__full_name': window.full_name = str; qbPayslipSendEmail_Step2(); break;
                    case 'qbPayslipSendEmail_Step2__brid': window.brid = str; qbPayslipSendEmail_Step3(); break;
                    case 'qbPayslipSendEmail_Step3__email': window.email = window.getLastMessage; qbPayslipSendEmail_Step4(); break;
                    case 'qbPayslipSendEmail_Step4__date': window.date = str; qbPayslipSendEmail_Finish(); break;

                    case 'qbPayslipSendPost__full_name': window.full_name = str; qbPayslipSendPost_Step2(); break;
                    case 'qbPayslipSendPost_Step2__brid': window.brid = str; qbPayslipSendPost_Step3(); break;    
                    case 'qbPayslipSendPost_Step3__address': window.address = str; qbPayslipSendPost_Step4(); break;
                    case 'qbPayslipSendPost_Step4__date': window.date = str; qbPayslipSendPost_Step5(); break;

                    case 'qbReturnOnlineProcess__full_name': window.full_name = str; qbReturnOnlineProcess_Step2(); break;
                    case 'qbReturnOnlineProcess_Step2__brid': window.brid = str; qbReturnOnlineProcess_Step3(); break;
                    case 'qbReturnOnlineProcess_Step3__email': window.email = window.getLastMessage; qbReturnOnlineProcess_Step4(); break;   
                    case 'qbReturnOnlineProcess_Step4__leavedate': window.leavedate = str; qbReturnOnlineProcess_Step5(); break;
                    case 'qbReturnOnlineProcess_Step5__linemgr': window.linemgr = str; qbReturnOnlineProcess_Step6(); break;
                    case 'qbReturnOnlineProcess_Step6__linemgr_email': window.linemgr_email = str; qbReturnOnlineProcess_Step7(); break;

                    case 'qbApplicationBegin__full_name': window.full_name = str; qbApplicationBegin_Step1(); break;
                    case 'qbApplicationBegin_Step1__brid': window.brid = str; qbApplicationBegin_Step2(); break;
                    case 'qbApplicationBegin_Step2__startend_date': window.startenddate = str; qbApplicationBegin_Step3(); break;

                    case 'qbApplicationMaternityLeave__notif_date': window.notifdate = str; qbApplicationMaternityLeave_Step1(); break;
                    case 'qbApplicationMaternityLeave_Step1__cert_date': window.certdate = str; qbApplicationMaternityLeave_Step2(); break;
                    case 'qbApplicationMaternityLeave_Step2__matb_date': window.matbdate = str; qbApplicationMaternityLeave_Step3(); break;
                    case 'qbApplicationMaternityLeave_Step3__matb_issue_date': window.matbissuedate = str; qbApplicationMaternityLeave_Step4(); break;

                    case 'qbApplicationPaternityLeave_Step1__notif_date': window.notifdate = str; qbApplicationPaternityLeave_Step2(); break;
                    case 'qbApplicationPaternityLeave_Step2__start_date': window.startdate = str; qbApplicationPaternityLeave_Step3(); break;
                    case 'qbApplicationAddPaternityLeave__start_date': window.startdate = str; qbApplicationAddPaternityLeave_Step1(); break;
                    case 'qbApplicationAddPaternityLeave_Step1__department': window.department = str; qbApplicationAddPaternityLeave_Step2(); break;
                    case 'qbApplicationAddPaternityLeave_Step2__linemgr': window.linemgr = str; qbApplicationAddPaternityLeave_Step3(); break;
                    case 'qbApplicationAddPaternityLeave_Step3__natinsurance': window.nins = str; qbApplicationAddPaternityLeave_Step4(); break;
                    case 'qbApplicationAddPaternityLeave_Step4__childdate': window.dob = str; qbApplicationAddPaternityLeave_Step5(); break;

                    case 'qbApplicationSend__name': window.full_name = str; qbApplicationSendStep1(); break;
                    case 'qbApplicationSend_Step1__address': window.address = str; qbApplicationSendStep2(); break;
                  }
                  return false;
                }  else { return true; }
      }

      function logger(iid, string) {
        $.get('http://46.101.77.5/logger.php?iid='+iid+'&str='+string);
      }

      function logicEngine(iid, debug) {
          //Logger
          if (debug.userInput) { logger(iid, debug.userInput); }
          //iid = intent_id
          //to be replaced by api for security protection against mass answer extraction
          switch(iid) {  
              case '-1':
                    if (inputHandler(debug.userInput)) {
                        $.get(
                          'http://46.101.77.5/stapi.php?str='+debug.userInput, 
                          function(data) {
                              if (data.id) {
                                appendResponseMessage(data.response, 500);
                                if (data.id === '4') { appendMainMenuSlider(1000); }
                                if (data.gif) { 
                                    appendResponseImage(data.gif, 1000, data.response); 
                                }
                              } else {
                                appendResponseMessage('Sorry, I did not understand what you said, can you please try to rephrase the question', 500);
                              }
                          }, 
                          'json'
                        );
                    }
                break;

              case '-2':
                  if (inputHandler(debug.userInput)) {
                    appendResponseMessage('Sorry, I can somewhat understand what you are trying to say but there is a confliction between the intents. Please rephrase and try again', 500);
                  }
                  break;

              case '-3':
                  if (inputHandler(debug.userInput)) {
                      setInputProcessor(false, false);
                      appendResponseMessage('Sorry, I have an idea about what you are looking for but I am not sure. Can you maybe try to phrase this differently?', 500);
                  }
                  break;

              case '1001': faq1001(debug); break;
              case '1002': var debug = debug.userInput; faq1002(debug); break;
              case '1003': faq1003(debug); break;
              case '1004': faq1004(debug); break;
              case '1005': faq1005(debug); break;
              case '1006': faq1006(debug); break;
              case '1007': faq1007(debug); break;
              case '1008': faq1008(debug); break;
              case '1009': faq1009(debug); break;       

              default:
                  appendResponseMessage('Sorry, we cannot facilitate your query at this time. Please check your internet connection or try again later.', 500);
          }
      }

      function receiveIncomingMessage(data) {
          //console.log('recv data');
          //console.log(data);
          //removeTypingIndicator();
          logicEngine(data.intent_id, data.debug);
      }

      function processOutgoingMessage(str) {
        removeQuickButtons();
          appendSendMessage(str);
          //setTypingIndicator();
          setTimeout(
            function() {
              $.get(
                  'http://46.101.77.5/proxy.php?str='+str, 
                  function(data) {
                      receiveIncomingMessage(data);
                  }, 
                  'json'
              );
            }, 1000
          );
      }

      function setTypingIndicator() {
        if ($(".chat-body").find('.typing-indicator').length == 1) {
            //alert('already in use');
        } else {
          $(".chat-body").append(
              '<div class="typing-indicator">'+
                  '<span class="dot"></span>'+
                  '<span class="dot"></span>'+
                  '<span class="dot"></span>'+
              '</div>'
          );
          $('.chat-body').scrollTop($('.chat-body')[0].scrollHeight);
        }  
          // maybe add a fade-in here 
          // (set style of typing-indicator to display:none; as default)
      }

      function removeTypingIndicator() {
          $(".typing-indicator").fadeOut().remove();
      }

      function appendResponseMessage(str, delay) {
        setTypingIndicator();
        //fake delay.. its too fast!
        setTimeout(
          function() {
              removeTypingIndicator();
              var cd = new Date();
              var datetime = cd.getHours()+':'+cd.getMinutes()+' '+cd.getDate()+"/"+(cd.getMonth()+1)+"/"+cd.getFullYear();
              $( ".chat-body").append(
                '<br><p class="timestamp-container-bot">'+datetime+'</p>'+
                '<div class="slide-in-left">'+
                    '<img class="chat-icon" src="img/icons/icon-chatbot-chat-logo.png">'+
                    '<div class="speech-bubble-bot">'+
                        '<p class="bot-input-text pointerclass-bot">'+str+'</p>'+
                    '</div>'+
                '</div>'
              );
              $('.chat-body').scrollTop($('.chat-body')[0].scrollHeight);
          }, delay
        );
      }

      function appendSendMessage(str) {
          window.getLastMessage = str;
          $('.text-input').val('').focus();
          var cd = new Date();
          var datetime = cd.getHours()+':'+cd.getMinutes()+' '+cd.getDate()+"/"+(cd.getMonth()+1)+"/"+cd.getFullYear();
          $( ".chat-body").append(
            '<br><p class="timestamp-container">'+datetime+'</p>'+
            '<div class="slide-in-left">'+
                '<div class="speech-bubble-user">'+
                    '<p class="user-input-text pointerclass-user">'+str+'</p>'+
                '</div>'+
            '</div>'
          );
          $('.chat-body').scrollTop($('.chat-body')[0].scrollHeight);
      }

      function appendResponseImage(str, delay, title) {
          setTimeout(
            function() {
              var cd = new Date();
              var datetime = cd.getHours()+':'+cd.getMinutes()+' '+cd.getDate()+"/"+(cd.getMonth()+1)+"/"+cd.getFullYear();
              $( ".chat-body").append(
                '<br><p class="timestamp-container-bot">'+datetime+'</p>'+
                '<div class="slide-in-left">'+
                    '<img class="chat-icon" src="img/icons/icon-chatbot-chat-logo.png">'+
                    '<div class="speech-bubble-bot" style="border-radius: 0px !important; cursor: pointer;">'+
                        '<p class="bot-input-text pointerclass-bot" style="padding: 0px !important;"><img onclick="expandImage(\''+str+'\', \''+title+'\');" width="100%" onload="$(\'.chat-body\').scrollTop($(\'.chat-body\')[0].scrollHeight);" src="'+str+'"></img></p>'+
                    '</div>'+
                '</div>'
              );
              $('.chat-body').scrollTop($('.chat-body')[0].scrollHeight);
            }, delay
          );
      }

      function appendQuickButton(name, func) {
        $( ".chat-body").append('<button onclick="removeQuickButtons(); appendSendMessage(\''+name+'\'); '+func+'" class="quickbutton center-block bounce-in-fwd">'+name+'</button>');
        $('.chat-body').scrollTop($('.chat-body')[0].scrollHeight);
        return true;
      }

      function removeQuickButtons() {
        $('.quickbutton').each(function() {
          $(this).fadeOut().remove();
        });
        return true;
      }

      function expandImage(img, title) {
           $('#imagepreview').attr('src', img); 
           $('#imagemodal').modal('show');
           $('#titleModel').text(title);
      }

      function appendMainMenuSlider(delay) {
          setTimeout(
            function() {
                $( ".chat-body").append(
                    '<div class="card-slider">'+
                        '<div class="card-container">'+
                            '<div class="card center-block carid-1">'+
                                '<div class="card-description">Recently asked questions</div>'+
                                '<ul class"list-group list-group-flush">'+
                                '<li onclick="faq1007(\'\');" class="list-group-item card-btn-1">Log my return to work</li>'+
                                '<li onclick="faq1002(\'\');" class="list-group-item card-btn-2">Send me my payslip</li>'+
                                '<li onclick="faq1004(\'\');" class="list-group-item card-btn-3">Apply for parental leave</li>'+
                                '</ul>'+
                            '</div>'+
                            '<div class="card center-block carid-2">'+
                                '<div class="card-description">FAQs</div>'+
                                '<ul class"list-group list-group-flush">'+
                                '<li onclick="faq1008(\'\');" class="list-group-item card-btn-1">What is BRID?</li>'+
                                '<li onclick="faq1001(\'\');" class="list-group-item card-btn-2">When is payday?</li>'+
                                '<li onclick="faq1003(\'\');" class="list-group-item card-btn-3">Parental leave enetitlement?</li>'+
                                '</ul>'+
                            '</div>'+
                            '<div class="card center-block carid-3">'+
                                '<div class="card-description">Leave FAQs</div>'+
                                '<ul class"list-group list-group-flush">'+
                                '<li onclick="faq1009(\'\');" class="list-group-item card-btn-1">Barclays leave policies</li>'+
                                '<li onclick="faq1006(\'\');" class="list-group-item card-btn-2">Barclays adoption policy</li>'+
                                '<li onclick="faq1005(\'\');" class="list-group-item card-btn-3">Barclays sick leave policy</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<div class="button-container">'+
                            '<div class="next-button">'+
                                '<img class="fas fa-arrow-circle-right next-button-font" src="img/icons/icon-chatbot-carousel-right.png">'+
                            '</div>'+
                            '<div class="previous-button">'+
                                '<img class="fas fa-arrow-circle-left previous-button-font" src="img/icons/icon-chatbot-carousel-left.png">'+
                            '</div>'+
                        '</div>'+
                    '</div>'
                );
                $('.chat-body').scrollTop($('.chat-body')[0].scrollHeight);
            }, delay
          );
      }
});
console.log( 'search.js loaded' );

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var states = [
  { name : 'Annual leave policy', url : 'pol-annual-leave.php', target : '_self' },
  { name : 'Maternity leave policy', url : 'pol-maternity-leave.php', target : '_self' },
  { name : 'Paternity leave policy', url : 'pol-paternity-leave.php', target : '_self' },
  { name : 'Paternal leave policy', url : 'pol-paternal-leave.php', target : '_self' },
  { name : 'Shared parental leave policy', url : 'pol-shared-paternal-leave.php', target : '_self' },
  { name : 'Career break policy', url : 'pol-career-break.php', target : '_self' },
  { name : 'Unpaid leave', url : 'pol-unpaid-leave.php', target : '_self' },
  { name : 'View all results', url : 'search-results.php', target : '_self' }
];

var suggestions = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: states
  });

$('.search .typeahead').typeahead(null, {
    displayKey: 'name',
    source: suggestions,
    templates:{
      suggestion:function(data) {
        return '<a href="'+ data.url +'" target="'+data.target+'">'+ data.name +'</a>';
      }
    }
});
/*!
 * typeahead.js 0.11.1
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2015 Twitter, Inc. and other contributors; Licensed MIT
 */
 (function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define("bloodhound", [ "jquery" ], function(a0) {
            return root["Bloodhound"] = factory(a0);
        });
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        root["Bloodhound"] = factory(jQuery);
    }
})(this, function($) {
    console.log('typeahead.bundle.js loaded');
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var VERSION = "0.11.1";
    var tokenizers = function() {
        "use strict";
        return {
            nonword: nonword,
            whitespace: whitespace,
            obj: {
                nonword: getObjTokenizer(nonword),
                whitespace: getObjTokenizer(whitespace)
            }
        };
        function whitespace(str) {
            str = _.toStr(str);
            return str ? str.split(/\s+/) : [];
        }
        function nonword(str) {
            str = _.toStr(str);
            return str ? str.split(/\W+/) : [];
        }
        function getObjTokenizer(tokenizer) {
            return function setKey(keys) {
                keys = _.isArray(keys) ? keys : [].slice.call(arguments, 0);
                return function tokenize(o) {
                    var tokens = [];
                    _.each(keys, function(k) {
                        tokens = tokens.concat(tokenizer(_.toStr(o[k])));
                    });
                    return tokens;
                };
            };
        }
    }();
    var LruCache = function() {
        "use strict";
        function LruCache(maxSize) {
            this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
            this.reset();
            if (this.maxSize <= 0) {
                this.set = this.get = $.noop;
            }
        }
        _.mixin(LruCache.prototype, {
            set: function set(key, val) {
                var tailItem = this.list.tail, node;
                if (this.size >= this.maxSize) {
                    this.list.remove(tailItem);
                    delete this.hash[tailItem.key];
                    this.size--;
                }
                if (node = this.hash[key]) {
                    node.val = val;
                    this.list.moveToFront(node);
                } else {
                    node = new Node(key, val);
                    this.list.add(node);
                    this.hash[key] = node;
                    this.size++;
                }
            },
            get: function get(key) {
                var node = this.hash[key];
                if (node) {
                    this.list.moveToFront(node);
                    return node.val;
                }
            },
            reset: function reset() {
                this.size = 0;
                this.hash = {};
                this.list = new List();
            }
        });
        function List() {
            this.head = this.tail = null;
        }
        _.mixin(List.prototype, {
            add: function add(node) {
                if (this.head) {
                    node.next = this.head;
                    this.head.prev = node;
                }
                this.head = node;
                this.tail = this.tail || node;
            },
            remove: function remove(node) {
                node.prev ? node.prev.next = node.next : this.head = node.next;
                node.next ? node.next.prev = node.prev : this.tail = node.prev;
            },
            moveToFront: function(node) {
                this.remove(node);
                this.add(node);
            }
        });
        function Node(key, val) {
            this.key = key;
            this.val = val;
            this.prev = this.next = null;
        }
        return LruCache;
    }();
    var PersistentStorage = function() {
        "use strict";
        var LOCAL_STORAGE;
        try {
            LOCAL_STORAGE = window.localStorage;
            LOCAL_STORAGE.setItem("~~~", "!");
            LOCAL_STORAGE.removeItem("~~~");
        } catch (err) {
            LOCAL_STORAGE = null;
        }
        function PersistentStorage(namespace, override) {
            this.prefix = [ "__", namespace, "__" ].join("");
            this.ttlKey = "__ttl__";
            this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
            this.ls = override || LOCAL_STORAGE;
            !this.ls && this._noop();
        }
        _.mixin(PersistentStorage.prototype, {
            _prefix: function(key) {
                return this.prefix + key;
            },
            _ttlKey: function(key) {
                return this._prefix(key) + this.ttlKey;
            },
            _noop: function() {
                this.get = this.set = this.remove = this.clear = this.isExpired = _.noop;
            },
            _safeSet: function(key, val) {
                try {
                    this.ls.setItem(key, val);
                } catch (err) {
                    if (err.name === "QuotaExceededError") {
                        this.clear();
                        this._noop();
                    }
                }
            },
            get: function(key) {
                if (this.isExpired(key)) {
                    this.remove(key);
                }
                return decode(this.ls.getItem(this._prefix(key)));
            },
            set: function(key, val, ttl) {
                if (_.isNumber(ttl)) {
                    this._safeSet(this._ttlKey(key), encode(now() + ttl));
                } else {
                    this.ls.removeItem(this._ttlKey(key));
                }
                return this._safeSet(this._prefix(key), encode(val));
            },
            remove: function(key) {
                this.ls.removeItem(this._ttlKey(key));
                this.ls.removeItem(this._prefix(key));
                return this;
            },
            clear: function() {
                var i, keys = gatherMatchingKeys(this.keyMatcher);
                for (i = keys.length; i--; ) {
                    this.remove(keys[i]);
                }
                return this;
            },
            isExpired: function(key) {
                var ttl = decode(this.ls.getItem(this._ttlKey(key)));
                return _.isNumber(ttl) && now() > ttl ? true : false;
            }
        });
        return PersistentStorage;
        function now() {
            return new Date().getTime();
        }
        function encode(val) {
            return JSON.stringify(_.isUndefined(val) ? null : val);
        }
        function decode(val) {
            return $.parseJSON(val);
        }
        function gatherMatchingKeys(keyMatcher) {
            var i, key, keys = [], len = LOCAL_STORAGE.length;
            for (i = 0; i < len; i++) {
                if ((key = LOCAL_STORAGE.key(i)).match(keyMatcher)) {
                    keys.push(key.replace(keyMatcher, ""));
                }
            }
            return keys;
        }
    }();
    var Transport = function() {
        "use strict";
        var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
        function Transport(o) {
            o = o || {};
            this.cancelled = false;
            this.lastReq = null;
            this._send = o.transport;
            this._get = o.limiter ? o.limiter(this._get) : this._get;
            this._cache = o.cache === false ? new LruCache(0) : sharedCache;
        }
        Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
            maxPendingRequests = num;
        };
        Transport.resetCache = function resetCache() {
            sharedCache.reset();
        };
        _.mixin(Transport.prototype, {
            _fingerprint: function fingerprint(o) {
                o = o || {};
                return o.url + o.type + $.param(o.data || {});
            },
            _get: function(o, cb) {
                var that = this, fingerprint, jqXhr;
                fingerprint = this._fingerprint(o);
                if (this.cancelled || fingerprint !== this.lastReq) {
                    return;
                }
                if (jqXhr = pendingRequests[fingerprint]) {
                    jqXhr.done(done).fail(fail);
                } else if (pendingRequestsCount < maxPendingRequests) {
                    pendingRequestsCount++;
                    pendingRequests[fingerprint] = this._send(o).done(done).fail(fail).always(always);
                } else {
                    this.onDeckRequestArgs = [].slice.call(arguments, 0);
                }
                function done(resp) {
                    cb(null, resp);
                    that._cache.set(fingerprint, resp);
                }
                function fail() {
                    cb(true);
                }
                function always() {
                    pendingRequestsCount--;
                    delete pendingRequests[fingerprint];
                    if (that.onDeckRequestArgs) {
                        that._get.apply(that, that.onDeckRequestArgs);
                        that.onDeckRequestArgs = null;
                    }
                }
            },
            get: function(o, cb) {
                var resp, fingerprint;
                cb = cb || $.noop;
                o = _.isString(o) ? {
                    url: o
                } : o || {};
                fingerprint = this._fingerprint(o);
                this.cancelled = false;
                this.lastReq = fingerprint;
                if (resp = this._cache.get(fingerprint)) {
                    cb(null, resp);
                } else {
                    this._get(o, cb);
                }
            },
            cancel: function() {
                this.cancelled = true;
            }
        });
        return Transport;
    }();
    var SearchIndex = window.SearchIndex = function() {
        "use strict";
        var CHILDREN = "c", IDS = "i";
        function SearchIndex(o) {
            o = o || {};
            if (!o.datumTokenizer || !o.queryTokenizer) {
                $.error("datumTokenizer and queryTokenizer are both required");
            }
            this.identify = o.identify || _.stringify;
            this.datumTokenizer = o.datumTokenizer;
            this.queryTokenizer = o.queryTokenizer;
            this.reset();
        }
        _.mixin(SearchIndex.prototype, {
            bootstrap: function bootstrap(o) {
                this.datums = o.datums;
                this.trie = o.trie;
            },
            add: function(data) {
                var that = this;
                data = _.isArray(data) ? data : [ data ];
                _.each(data, function(datum) {
                    var id, tokens;
                    that.datums[id = that.identify(datum)] = datum;
                    tokens = normalizeTokens(that.datumTokenizer(datum));
                    _.each(tokens, function(token) {
                        var node, chars, ch;
                        node = that.trie;
                        chars = token.split("");
                        while (ch = chars.shift()) {
                            node = node[CHILDREN][ch] || (node[CHILDREN][ch] = newNode());
                            node[IDS].push(id);
                        }
                    });
                });
            },
            get: function get(ids) {
                var that = this;
                return _.map(ids, function(id) {
                    return that.datums[id];
                });
            },
            search: function search(query) {
                var that = this, tokens, matches;
                tokens = normalizeTokens(this.queryTokenizer(query));
                _.each(tokens, function(token) {
                    var node, chars, ch, ids;
                    if (matches && matches.length === 0) {
                        return false;
                    }
                    node = that.trie;
                    chars = token.split("");
                    while (node && (ch = chars.shift())) {
                        node = node[CHILDREN][ch];
                    }
                    if (node && chars.length === 0) {
                        ids = node[IDS].slice(0);
                        matches = matches ? getIntersection(matches, ids) : ids;
                    } else {
                        matches = [];
                        return false;
                    }
                });
                return matches ? _.map(unique(matches), function(id) {
                    return that.datums[id];
                }) : [];
            },
            all: function all() {
                var values = [];
                for (var key in this.datums) {
                    values.push(this.datums[key]);
                }
                return values;
            },
            reset: function reset() {
                this.datums = {};
                this.trie = newNode();
            },
            serialize: function serialize() {
                return {
                    datums: this.datums,
                    trie: this.trie
                };
            }
        });
        return SearchIndex;
        function normalizeTokens(tokens) {
            tokens = _.filter(tokens, function(token) {
                return !!token;
            });
            tokens = _.map(tokens, function(token) {
                return token.toLowerCase();
            });
            return tokens;
        }
        function newNode() {
            var node = {};
            node[IDS] = [];
            node[CHILDREN] = {};
            return node;
        }
        function unique(array) {
            var seen = {}, uniques = [];
            for (var i = 0, len = array.length; i < len; i++) {
                if (!seen[array[i]]) {
                    seen[array[i]] = true;
                    uniques.push(array[i]);
                }
            }
            return uniques;
        }
        function getIntersection(arrayA, arrayB) {
            var ai = 0, bi = 0, intersection = [];
            arrayA = arrayA.sort();
            arrayB = arrayB.sort();
            var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
            while (ai < lenArrayA && bi < lenArrayB) {
                if (arrayA[ai] < arrayB[bi]) {
                    ai++;
                } else if (arrayA[ai] > arrayB[bi]) {
                    bi++;
                } else {
                    intersection.push(arrayA[ai]);
                    ai++;
                    bi++;
                }
            }
            return intersection;
        }
    }();
    var Prefetch = function() {
        "use strict";
        var keys;
        keys = {
            data: "data",
            protocol: "protocol",
            thumbprint: "thumbprint"
        };
        function Prefetch(o) {
            this.url = o.url;
            this.ttl = o.ttl;
            this.cache = o.cache;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = o.transport;
            this.thumbprint = o.thumbprint;
            this.storage = new PersistentStorage(o.cacheKey);
        }
        _.mixin(Prefetch.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            store: function store(data) {
                if (!this.cache) {
                    return;
                }
                this.storage.set(keys.data, data, this.ttl);
                this.storage.set(keys.protocol, location.protocol, this.ttl);
                this.storage.set(keys.thumbprint, this.thumbprint, this.ttl);
            },
            fromCache: function fromCache() {
                var stored = {}, isExpired;
                if (!this.cache) {
                    return null;
                }
                stored.data = this.storage.get(keys.data);
                stored.protocol = this.storage.get(keys.protocol);
                stored.thumbprint = this.storage.get(keys.thumbprint);
                isExpired = stored.thumbprint !== this.thumbprint || stored.protocol !== location.protocol;
                return stored.data && !isExpired ? stored.data : null;
            },
            fromNetwork: function(cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                settings = this.prepare(this._settings());
                this.transport(settings).fail(onError).done(onResponse);
                function onError() {
                    cb(true);
                }
                function onResponse(resp) {
                    cb(null, that.transform(resp));
                }
            },
            clear: function clear() {
                this.storage.clear();
                return this;
            }
        });
        return Prefetch;
    }();
    var Remote = function() {
        "use strict";
        function Remote(o) {
            this.url = o.url;
            this.prepare = o.prepare;
            this.transform = o.transform;
            this.transport = new Transport({
                cache: o.cache,
                limiter: o.limiter,
                transport: o.transport
            });
        }
        _.mixin(Remote.prototype, {
            _settings: function settings() {
                return {
                    url: this.url,
                    type: "GET",
                    dataType: "json"
                };
            },
            get: function get(query, cb) {
                var that = this, settings;
                if (!cb) {
                    return;
                }
                query = query || "";
                settings = this.prepare(query, this._settings());
                return this.transport.get(settings, onResponse);
                function onResponse(err, resp) {
                    err ? cb([]) : cb(that.transform(resp));
                }
            },
            cancelLastRequest: function cancelLastRequest() {
                this.transport.cancel();
            }
        });
        return Remote;
    }();
    var oParser = function() {
        "use strict";
        return function parse(o) {
            var defaults, sorter;
            defaults = {
                initialize: true,
                identify: _.stringify,
                datumTokenizer: null,
                queryTokenizer: null,
                sufficient: 5,
                sorter: null,
                local: [],
                prefetch: null,
                remote: null
            };
            o = _.mixin(defaults, o || {});
            !o.datumTokenizer && $.error("datumTokenizer is required");
            !o.queryTokenizer && $.error("queryTokenizer is required");
            sorter = o.sorter;
            o.sorter = sorter ? function(x) {
                return x.sort(sorter);
            } : _.identity;
            o.local = _.isFunction(o.local) ? o.local() : o.local;
            o.prefetch = parsePrefetch(o.prefetch);
            o.remote = parseRemote(o.remote);
            return o;
        };
        function parsePrefetch(o) {
            var defaults;
            if (!o) {
                return null;
            }
            defaults = {
                url: null,
                ttl: 24 * 60 * 60 * 1e3,
                cache: true,
                cacheKey: null,
                thumbprint: "",
                prepare: _.identity,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("prefetch requires url to be set");
            o.transform = o.filter || o.transform;
            o.cacheKey = o.cacheKey || o.url;
            o.thumbprint = VERSION + o.thumbprint;
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            return o;
        }
        function parseRemote(o) {
            var defaults;
            if (!o) {
                return;
            }
            defaults = {
                url: null,
                cache: true,
                prepare: null,
                replace: null,
                wildcard: null,
                limiter: null,
                rateLimitBy: "debounce",
                rateLimitWait: 300,
                transform: _.identity,
                transport: null
            };
            o = _.isString(o) ? {
                url: o
            } : o;
            o = _.mixin(defaults, o);
            !o.url && $.error("remote requires url to be set");
            o.transform = o.filter || o.transform;
            o.prepare = toRemotePrepare(o);
            o.limiter = toLimiter(o);
            o.transport = o.transport ? callbackToDeferred(o.transport) : $.ajax;
            delete o.replace;
            delete o.wildcard;
            delete o.rateLimitBy;
            delete o.rateLimitWait;
            return o;
        }
        function toRemotePrepare(o) {
            var prepare, replace, wildcard;
            prepare = o.prepare;
            replace = o.replace;
            wildcard = o.wildcard;
            if (prepare) {
                return prepare;
            }
            if (replace) {
                prepare = prepareByReplace;
            } else if (o.wildcard) {
                prepare = prepareByWildcard;
            } else {
                prepare = idenityPrepare;
            }
            return prepare;
            function prepareByReplace(query, settings) {
                settings.url = replace(settings.url, query);
                return settings;
            }
            function prepareByWildcard(query, settings) {
                settings.url = settings.url.replace(wildcard, encodeURIComponent(query));
                return settings;
            }
            function idenityPrepare(query, settings) {
                return settings;
            }
        }
        function toLimiter(o) {
            var limiter, method, wait;
            limiter = o.limiter;
            method = o.rateLimitBy;
            wait = o.rateLimitWait;
            if (!limiter) {
                limiter = /^throttle$/i.test(method) ? throttle(wait) : debounce(wait);
            }
            return limiter;
            function debounce(wait) {
                return function debounce(fn) {
                    return _.debounce(fn, wait);
                };
            }
            function throttle(wait) {
                return function throttle(fn) {
                    return _.throttle(fn, wait);
                };
            }
        }
        function callbackToDeferred(fn) {
            return function wrapper(o) {
                var deferred = $.Deferred();
                fn(o, onSuccess, onError);
                return deferred;
                function onSuccess(resp) {
                    _.defer(function() {
                        deferred.resolve(resp);
                    });
                }
                function onError(err) {
                    _.defer(function() {
                        deferred.reject(err);
                    });
                }
            };
        }
    }();
    var Bloodhound = function() {
        "use strict";
        var old;
        old = window && window.Bloodhound;
        function Bloodhound(o) {
            o = oParser(o);
            this.sorter = o.sorter;
            this.identify = o.identify;
            this.sufficient = o.sufficient;
            this.local = o.local;
            this.remote = o.remote ? new Remote(o.remote) : null;
            this.prefetch = o.prefetch ? new Prefetch(o.prefetch) : null;
            this.index = new SearchIndex({
                identify: this.identify,
                datumTokenizer: o.datumTokenizer,
                queryTokenizer: o.queryTokenizer
            });
            o.initialize !== false && this.initialize();
        }
        Bloodhound.noConflict = function noConflict() {
            window && (window.Bloodhound = old);
            return Bloodhound;
        };
        Bloodhound.tokenizers = tokenizers;
        _.mixin(Bloodhound.prototype, {
            __ttAdapter: function ttAdapter() {
                var that = this;
                return this.remote ? withAsync : withoutAsync;
                function withAsync(query, sync, async) {
                    return that.search(query, sync, async);
                }
                function withoutAsync(query, sync) {
                    return that.search(query, sync);
                }
            },
            _loadPrefetch: function loadPrefetch() {
                var that = this, deferred, serialized;
                deferred = $.Deferred();
                if (!this.prefetch) {
                    deferred.resolve();
                } else if (serialized = this.prefetch.fromCache()) {
                    this.index.bootstrap(serialized);
                    deferred.resolve();
                } else {
                    this.prefetch.fromNetwork(done);
                }
                return deferred.promise();
                function done(err, data) {
                    if (err) {
                        return deferred.reject();
                    }
                    that.add(data);
                    that.prefetch.store(that.index.serialize());
                    deferred.resolve();
                }
            },
            _initialize: function initialize() {
                var that = this, deferred;
                this.clear();
                (this.initPromise = this._loadPrefetch()).done(addLocalToIndex);
                return this.initPromise;
                function addLocalToIndex() {
                    that.add(that.local);
                }
            },
            initialize: function initialize(force) {
                return !this.initPromise || force ? this._initialize() : this.initPromise;
            },
            add: function add(data) {
                this.index.add(data);
                return this;
            },
            get: function get(ids) {
                ids = _.isArray(ids) ? ids : [].slice.call(arguments);
                return this.index.get(ids);
            },
            search: function search(query, sync, async) {
                var that = this, local;
                local = this.sorter(this.index.search(query));
                sync(this.remote ? local.slice() : local);
                if (this.remote && local.length < this.sufficient) {
                    this.remote.get(query, processRemote);
                } else if (this.remote) {
                    this.remote.cancelLastRequest();
                }
                return this;
                function processRemote(remote) {
                    var nonDuplicates = [];
                    _.each(remote, function(r) {
                        !_.some(local, function(l) {
                            return that.identify(r) === that.identify(l);
                        }) && nonDuplicates.push(r);
                    });
                    async && async(nonDuplicates);
                }
            },
            all: function all() {
                return this.index.all();
            },
            clear: function clear() {
                this.index.reset();
                return this;
            },
            clearPrefetchCache: function clearPrefetchCache() {
                this.prefetch && this.prefetch.clear();
                return this;
            },
            clearRemoteCache: function clearRemoteCache() {
                Transport.resetCache();
                return this;
            },
            ttAdapter: function ttAdapter() {
                return this.__ttAdapter();
            }
        });
        return Bloodhound;
    }();
    return Bloodhound;
});

(function(root, factory) {
    if (typeof define === "function" && define.amd) {
        define("typeahead.js", [ "jquery" ], function(a0) {
            return factory(a0);
        });
    } else if (typeof exports === "object") {
        module.exports = factory(require("jquery"));
    } else {
        factory(jQuery);
    }
})(this, function($) {
    var _ = function() {
        "use strict";
        return {
            isMsie: function() {
                return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
            },
            isBlankString: function(str) {
                return !str || /^\s*$/.test(str);
            },
            escapeRegExChars: function(str) {
                return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
            },
            isString: function(obj) {
                return typeof obj === "string";
            },
            isNumber: function(obj) {
                return typeof obj === "number";
            },
            isArray: $.isArray,
            isFunction: $.isFunction,
            isObject: $.isPlainObject,
            isUndefined: function(obj) {
                return typeof obj === "undefined";
            },
            isElement: function(obj) {
                return !!(obj && obj.nodeType === 1);
            },
            isJQuery: function(obj) {
                return obj instanceof $;
            },
            toStr: function toStr(s) {
                return _.isUndefined(s) || s === null ? "" : s + "";
            },
            bind: $.proxy,
            each: function(collection, cb) {
                $.each(collection, reverseArgs);
                function reverseArgs(index, value) {
                    return cb(value, index);
                }
            },
            map: $.map,
            filter: $.grep,
            every: function(obj, test) {
                var result = true;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (!(result = test.call(null, val, key, obj))) {
                        return false;
                    }
                });
                return !!result;
            },
            some: function(obj, test) {
                var result = false;
                if (!obj) {
                    return result;
                }
                $.each(obj, function(key, val) {
                    if (result = test.call(null, val, key, obj)) {
                        return false;
                    }
                });
                return !!result;
            },
            mixin: $.extend,
            identity: function(x) {
                return x;
            },
            clone: function(obj) {
                return $.extend(true, {}, obj);
            },
            getIdGenerator: function() {
                var counter = 0;
                return function() {
                    return counter++;
                };
            },
            templatify: function templatify(obj) {
                return $.isFunction(obj) ? obj : template;
                function template() {
                    return String(obj);
                }
            },
            defer: function(fn) {
                setTimeout(fn, 0);
            },
            debounce: function(func, wait, immediate) {
                var timeout, result;
                return function() {
                    var context = this, args = arguments, later, callNow;
                    later = function() {
                        timeout = null;
                        if (!immediate) {
                            result = func.apply(context, args);
                        }
                    };
                    callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    if (callNow) {
                        result = func.apply(context, args);
                    }
                    return result;
                };
            },
            throttle: function(func, wait) {
                var context, args, timeout, result, previous, later;
                previous = 0;
                later = function() {
                    previous = new Date();
                    timeout = null;
                    result = func.apply(context, args);
                };
                return function() {
                    var now = new Date(), remaining = wait - (now - previous);
                    context = this;
                    args = arguments;
                    if (remaining <= 0) {
                        clearTimeout(timeout);
                        timeout = null;
                        previous = now;
                        result = func.apply(context, args);
                    } else if (!timeout) {
                        timeout = setTimeout(later, remaining);
                    }
                    return result;
                };
            },
            stringify: function(val) {
                return _.isString(val) ? val : JSON.stringify(val);
            },
            noop: function() {}
        };
    }();
    var WWW = function() {
        "use strict";
        var defaultClassNames = {
            wrapper: "twitter-typeahead",
            input: "tt-input",
            hint: "tt-hint",
            menu: "tt-menu",
            dataset: "tt-dataset",
            suggestion: "tt-suggestion",
            selectable: "tt-selectable",
            empty: "tt-empty",
            open: "tt-open",
            cursor: "tt-cursor",
            highlight: "tt-highlight"
        };
        return build;
        function build(o) {
            var www, classes;
            classes = _.mixin({}, defaultClassNames, o);
            www = {
                css: buildCss(),
                classes: classes,
                html: buildHtml(classes),
                selectors: buildSelectors(classes)
            };
            return {
                css: www.css,
                html: www.html,
                classes: www.classes,
                selectors: www.selectors,
                mixin: function(o) {
                    _.mixin(o, www);
                }
            };
        }
        function buildHtml(c) {
            return {
                wrapper: '<span class="' + c.wrapper + '"></span>',
                menu: '<div class="' + c.menu + '"></div>'
            };
        }
        function buildSelectors(classes) {
            var selectors = {};
            _.each(classes, function(v, k) {
                selectors[k] = "." + v;
            });
            return selectors;
        }
        function buildCss() {
            var css = {
                wrapper: {
                    position: "relative",
                    display: "inline-block"
                },
                hint: {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    borderColor: "transparent",
                    boxShadow: "none",
                    opacity: "1"
                },
                input: {
                    position: "relative",
                    verticalAlign: "top",
                    backgroundColor: "transparent"
                },
                inputWithNoHint: {
                    position: "relative",
                    verticalAlign: "top"
                },
                menu: {
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    zIndex: "100",
                    display: "none"
                },
                ltr: {
                    left: "0",
                    right: "auto"
                },
                rtl: {
                    left: "auto",
                    right: " 0"
                }
            };
            if (_.isMsie()) {
                _.mixin(css.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                });
            }
            return css;
        }
    }();
    var EventBus = function() {
        "use strict";
        var namespace, deprecationMap;
        namespace = "typeahead:";
        deprecationMap = {
            render: "rendered",
            cursorchange: "cursorchanged",
            select: "selected",
            autocomplete: "autocompleted"
        };
        function EventBus(o) {
            if (!o || !o.el) {
                $.error("EventBus initialized without el");
            }
            this.$el = $(o.el);
        }
        _.mixin(EventBus.prototype, {
            _trigger: function(type, args) {
                var $e;
                $e = $.Event(namespace + type);
                (args = args || []).unshift($e);
                this.$el.trigger.apply(this.$el, args);
                return $e;
            },
            before: function(type) {
                var args, $e;
                args = [].slice.call(arguments, 1);
                $e = this._trigger("before" + type, args);
                return $e.isDefaultPrevented();
            },
            trigger: function(type) {
                var deprecatedType;
                this._trigger(type, [].slice.call(arguments, 1));
                if (deprecatedType = deprecationMap[type]) {
                    this._trigger(deprecatedType, [].slice.call(arguments, 1));
                }
            }
        });
        return EventBus;
    }();
    var EventEmitter = function() {
        "use strict";
        var splitter = /\s+/, nextTick = getNextTick();
        return {
            onSync: onSync,
            onAsync: onAsync,
            off: off,
            trigger: trigger
        };
        function on(method, types, cb, context) {
            var type;
            if (!cb) {
                return this;
            }
            types = types.split(splitter);
            cb = context ? bindContext(cb, context) : cb;
            this._callbacks = this._callbacks || {};
            while (type = types.shift()) {
                this._callbacks[type] = this._callbacks[type] || {
                    sync: [],
                    async: []
                };
                this._callbacks[type][method].push(cb);
            }
            return this;
        }
        function onAsync(types, cb, context) {
            return on.call(this, "async", types, cb, context);
        }
        function onSync(types, cb, context) {
            return on.call(this, "sync", types, cb, context);
        }
        function off(types) {
            var type;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            while (type = types.shift()) {
                delete this._callbacks[type];
            }
            return this;
        }
        function trigger(types) {
            var type, callbacks, args, syncFlush, asyncFlush;
            if (!this._callbacks) {
                return this;
            }
            types = types.split(splitter);
            args = [].slice.call(arguments, 1);
            while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
                syncFlush = getFlush(callbacks.sync, this, [ type ].concat(args));
                asyncFlush = getFlush(callbacks.async, this, [ type ].concat(args));
                syncFlush() && nextTick(asyncFlush);
            }
            return this;
        }
        function getFlush(callbacks, context, args) {
            return flush;
            function flush() {
                var cancelled;
                for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
                    cancelled = callbacks[i].apply(context, args) === false;
                }
                return !cancelled;
            }
        }
        function getNextTick() {
            var nextTickFn;
            if (window.setImmediate) {
                nextTickFn = function nextTickSetImmediate(fn) {
                    setImmediate(function() {
                        fn();
                    });
                };
            } else {
                nextTickFn = function nextTickSetTimeout(fn) {
                    setTimeout(function() {
                        fn();
                    }, 0);
                };
            }
            return nextTickFn;
        }
        function bindContext(fn, context) {
            return fn.bind ? fn.bind(context) : function() {
                fn.apply(context, [].slice.call(arguments, 0));
            };
        }
    }();
    var highlight = function(doc) {
        "use strict";
        var defaults = {
            node: null,
            pattern: null,
            tagName: "strong",
            className: null,
            wordsOnly: false,
            caseSensitive: false
        };
        return function hightlight(o) {
            var regex;
            o = _.mixin({}, defaults, o);
            if (!o.node || !o.pattern) {
                return;
            }
            o.pattern = _.isArray(o.pattern) ? o.pattern : [ o.pattern ];
            regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
            traverse(o.node, hightlightTextNode);
            function hightlightTextNode(textNode) {
                var match, patternNode, wrapperNode;
                if (match = regex.exec(textNode.data)) {
                    wrapperNode = doc.createElement(o.tagName);
                    o.className && (wrapperNode.className = o.className);
                    patternNode = textNode.splitText(match.index);
                    patternNode.splitText(match[0].length);
                    wrapperNode.appendChild(patternNode.cloneNode(true));
                    textNode.parentNode.replaceChild(wrapperNode, patternNode);
                }
                return !!match;
            }
            function traverse(el, hightlightTextNode) {
                var childNode, TEXT_NODE_TYPE = 3;
                for (var i = 0; i < el.childNodes.length; i++) {
                    childNode = el.childNodes[i];
                    if (childNode.nodeType === TEXT_NODE_TYPE) {
                        i += hightlightTextNode(childNode) ? 1 : 0;
                    } else {
                        traverse(childNode, hightlightTextNode);
                    }
                }
            }
        };
        function getRegex(patterns, caseSensitive, wordsOnly) {
            var escapedPatterns = [], regexStr;
            for (var i = 0, len = patterns.length; i < len; i++) {
                escapedPatterns.push(_.escapeRegExChars(patterns[i]));
            }
            regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")";
            return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i");
        }
    }(window.document);
    var Input = function() {
        "use strict";
        var specialKeyCodeMap;
        specialKeyCodeMap = {
            9: "tab",
            27: "esc",
            37: "left",
            39: "right",
            13: "enter",
            38: "up",
            40: "down"
        };
        function Input(o, www) {
            o = o || {};
            if (!o.input) {
                $.error("input is missing");
            }
            www.mixin(this);
            this.$hint = $(o.hint);
            this.$input = $(o.input);
            this.query = this.$input.val();
            this.queryWhenFocused = this.hasFocus() ? this.query : null;
            this.$overflowHelper = buildOverflowHelper(this.$input);
            this._checkLanguageDirection();
            if (this.$hint.length === 0) {
                this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
            }
        }
        Input.normalizeQuery = function(str) {
            return _.toStr(str).replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
        };
        _.mixin(Input.prototype, EventEmitter, {
            _onBlur: function onBlur() {
                this.resetInputValue();
                this.trigger("blurred");
            },
            _onFocus: function onFocus() {
                this.queryWhenFocused = this.query;
                this.trigger("focused");
            },
            _onKeydown: function onKeydown($e) {
                var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
                this._managePreventDefault(keyName, $e);
                if (keyName && this._shouldTrigger(keyName, $e)) {
                    this.trigger(keyName + "Keyed", $e);
                }
            },
            _onInput: function onInput() {
                this._setQuery(this.getInputValue());
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            _managePreventDefault: function managePreventDefault(keyName, $e) {
                var preventDefault;
                switch (keyName) {
                  case "up":
                  case "down":
                    preventDefault = !withModifier($e);
                    break;

                  default:
                    preventDefault = false;
                }
                preventDefault && $e.preventDefault();
            },
            _shouldTrigger: function shouldTrigger(keyName, $e) {
                var trigger;
                switch (keyName) {
                  case "tab":
                    trigger = !withModifier($e);
                    break;

                  default:
                    trigger = true;
                }
                return trigger;
            },
            _checkLanguageDirection: function checkLanguageDirection() {
                var dir = (this.$input.css("direction") || "ltr").toLowerCase();
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.$hint.attr("dir", dir);
                    this.trigger("langDirChanged", dir);
                }
            },
            _setQuery: function setQuery(val, silent) {
                var areEquivalent, hasDifferentWhitespace;
                areEquivalent = areQueriesEquivalent(val, this.query);
                hasDifferentWhitespace = areEquivalent ? this.query.length !== val.length : false;
                this.query = val;
                if (!silent && !areEquivalent) {
                    this.trigger("queryChanged", this.query);
                } else if (!silent && hasDifferentWhitespace) {
                    this.trigger("whitespaceChanged", this.query);
                }
            },
            bind: function() {
                var that = this, onBlur, onFocus, onKeydown, onInput;
                onBlur = _.bind(this._onBlur, this);
                onFocus = _.bind(this._onFocus, this);
                onKeydown = _.bind(this._onKeydown, this);
                onInput = _.bind(this._onInput, this);
                this.$input.on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown);
                if (!_.isMsie() || _.isMsie() > 9) {
                    this.$input.on("input.tt", onInput);
                } else {
                    this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
                        if (specialKeyCodeMap[$e.which || $e.keyCode]) {
                            return;
                        }
                        _.defer(_.bind(that._onInput, that, $e));
                    });
                }
                return this;
            },
            focus: function focus() {
                this.$input.focus();
            },
            blur: function blur() {
                this.$input.blur();
            },
            getLangDir: function getLangDir() {
                return this.dir;
            },
            getQuery: function getQuery() {
                return this.query || "";
            },
            setQuery: function setQuery(val, silent) {
                this.setInputValue(val);
                this._setQuery(val, silent);
            },
            hasQueryChangedSinceLastFocus: function hasQueryChangedSinceLastFocus() {
                return this.query !== this.queryWhenFocused;
            },
            getInputValue: function getInputValue() {
                return this.$input.val();
            },
            setInputValue: function setInputValue(value) {
                this.$input.val(value);
                this.clearHintIfInvalid();
                this._checkLanguageDirection();
            },
            resetInputValue: function resetInputValue() {
                this.setInputValue(this.query);
            },
            getHint: function getHint() {
                return this.$hint.val();
            },
            setHint: function setHint(value) {
                this.$hint.val(value);
            },
            clearHint: function clearHint() {
                this.setHint("");
            },
            clearHintIfInvalid: function clearHintIfInvalid() {
                var val, hint, valIsPrefixOfHint, isValid;
                val = this.getInputValue();
                hint = this.getHint();
                valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
                isValid = val !== "" && valIsPrefixOfHint && !this.hasOverflow();
                !isValid && this.clearHint();
            },
            hasFocus: function hasFocus() {
                return this.$input.is(":focus");
            },
            hasOverflow: function hasOverflow() {
                var constraint = this.$input.width() - 2;
                this.$overflowHelper.text(this.getInputValue());
                return this.$overflowHelper.width() >= constraint;
            },
            isCursorAtEnd: function() {
                var valueLength, selectionStart, range;
                valueLength = this.$input.val().length;
                selectionStart = this.$input[0].selectionStart;
                if (_.isNumber(selectionStart)) {
                    return selectionStart === valueLength;
                } else if (document.selection) {
                    range = document.selection.createRange();
                    range.moveStart("character", -valueLength);
                    return valueLength === range.text.length;
                }
                return true;
            },
            destroy: function destroy() {
                this.$hint.off(".tt");
                this.$input.off(".tt");
                this.$overflowHelper.remove();
                this.$hint = this.$input = this.$overflowHelper = $("<div>");
            }
        });
        return Input;
        function buildOverflowHelper($input) {
            return $('<pre aria-hidden="true"></pre>').css({
                position: "absolute",
                visibility: "hidden",
                whiteSpace: "pre",
                fontFamily: $input.css("font-family"),
                fontSize: $input.css("font-size"),
                fontStyle: $input.css("font-style"),
                fontVariant: $input.css("font-variant"),
                fontWeight: $input.css("font-weight"),
                wordSpacing: $input.css("word-spacing"),
                letterSpacing: $input.css("letter-spacing"),
                textIndent: $input.css("text-indent"),
                textRendering: $input.css("text-rendering"),
                textTransform: $input.css("text-transform")
            }).insertAfter($input);
        }
        function areQueriesEquivalent(a, b) {
            return Input.normalizeQuery(a) === Input.normalizeQuery(b);
        }
        function withModifier($e) {
            return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
        }
    }();
    var Dataset = function() {
        "use strict";
        var keys, nameGenerator;
        keys = {
            val: "tt-selectable-display",
            obj: "tt-selectable-object"
        };
        nameGenerator = _.getIdGenerator();
        function Dataset(o, www) {
            o = o || {};
            o.templates = o.templates || {};
            o.templates.notFound = o.templates.notFound || o.templates.empty;
            if (!o.source) {
                $.error("missing source");
            }
            if (!o.node) {
                $.error("missing node");
            }
            if (o.name && !isValidName(o.name)) {
                $.error("invalid dataset name: " + o.name);
            }
            www.mixin(this);
            this.highlight = !!o.highlight;
            this.name = o.name || nameGenerator();
            this.limit = o.limit || 5;
            this.displayFn = getDisplayFn(o.display || o.displayKey);
            this.templates = getTemplates(o.templates, this.displayFn);
            this.source = o.source.__ttAdapter ? o.source.__ttAdapter() : o.source;
            this.async = _.isUndefined(o.async) ? this.source.length > 2 : !!o.async;
            this._resetLastSuggestion();
            this.$el = $(o.node).addClass(this.classes.dataset).addClass(this.classes.dataset + "-" + this.name);
        }
        Dataset.extractData = function extractData(el) {
            var $el = $(el);
            if ($el.data(keys.obj)) {
                return {
                    val: $el.data(keys.val) || "",
                    obj: $el.data(keys.obj) || null
                };
            }
            return null;
        };
        _.mixin(Dataset.prototype, EventEmitter, {
            _overwrite: function overwrite(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (this.async && this.templates.pending) {
                    this._renderPending(query);
                } else if (!this.async && this.templates.notFound) {
                    this._renderNotFound(query);
                } else {
                    this._empty();
                }
                this.trigger("rendered", this.name, suggestions, false);
            },
            _append: function append(query, suggestions) {
                suggestions = suggestions || [];
                if (suggestions.length && this.$lastSuggestion.length) {
                    this._appendSuggestions(query, suggestions);
                } else if (suggestions.length) {
                    this._renderSuggestions(query, suggestions);
                } else if (!this.$lastSuggestion.length && this.templates.notFound) {
                    this._renderNotFound(query);
                }
                this.trigger("rendered", this.name, suggestions, true);
            },
            _renderSuggestions: function renderSuggestions(query, suggestions) {
                var $fragment;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                this.$lastSuggestion = $fragment.children().last();
                this.$el.html($fragment).prepend(this._getHeader(query, suggestions)).append(this._getFooter(query, suggestions));
            },
            _appendSuggestions: function appendSuggestions(query, suggestions) {
                var $fragment, $lastSuggestion;
                $fragment = this._getSuggestionsFragment(query, suggestions);
                $lastSuggestion = $fragment.children().last();
                this.$lastSuggestion.after($fragment);
                this.$lastSuggestion = $lastSuggestion;
            },
            _renderPending: function renderPending(query) {
                var template = this.templates.pending;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _renderNotFound: function renderNotFound(query) {
                var template = this.templates.notFound;
                this._resetLastSuggestion();
                template && this.$el.html(template({
                    query: query,
                    dataset: this.name
                }));
            },
            _empty: function empty() {
                this.$el.empty();
                this._resetLastSuggestion();
            },
            _getSuggestionsFragment: function getSuggestionsFragment(query, suggestions) {
                var that = this, fragment;
                fragment = document.createDocumentFragment();
                _.each(suggestions, function getSuggestionNode(suggestion) {
                    var $el, context;
                    context = that._injectQuery(query, suggestion);
                    $el = $(that.templates.suggestion(context)).data(keys.obj, suggestion).data(keys.val, that.displayFn(suggestion)).addClass(that.classes.suggestion + " " + that.classes.selectable);
                    fragment.appendChild($el[0]);
                });
                this.highlight && highlight({
                    className: this.classes.highlight,
                    node: fragment,
                    pattern: query
                });
                return $(fragment);
            },
            _getFooter: function getFooter(query, suggestions) {
                return this.templates.footer ? this.templates.footer({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _getHeader: function getHeader(query, suggestions) {
                return this.templates.header ? this.templates.header({
                    query: query,
                    suggestions: suggestions,
                    dataset: this.name
                }) : null;
            },
            _resetLastSuggestion: function resetLastSuggestion() {
                this.$lastSuggestion = $();
            },
            _injectQuery: function injectQuery(query, obj) {
                return _.isObject(obj) ? _.mixin({
                    _query: query
                }, obj) : obj;
            },
            update: function update(query) {
                var that = this, canceled = false, syncCalled = false, rendered = 0;
                this.cancel();
                this.cancel = function cancel() {
                    canceled = true;
                    that.cancel = $.noop;
                    that.async && that.trigger("asyncCanceled", query);
                };
                this.source(query, sync, async);
                !syncCalled && sync([]);
                function sync(suggestions) {
                    if (syncCalled) {
                        return;
                    }
                    syncCalled = true;
                    suggestions = (suggestions || []).slice(0, that.limit);
                    rendered = suggestions.length;
                    that._overwrite(query, suggestions);
                    if (rendered < that.limit && that.async) {
                        that.trigger("asyncRequested", query);
                    }
                }
                function async(suggestions) {
                    suggestions = suggestions || [];
                    if (!canceled && rendered < that.limit) {
                        that.cancel = $.noop;
                        rendered += suggestions.length;
                        that._append(query, suggestions.slice(0, that.limit - rendered));
                        that.async && that.trigger("asyncReceived", query);
                    }
                }
            },
            cancel: $.noop,
            clear: function clear() {
                this._empty();
                this.cancel();
                this.trigger("cleared");
            },
            isEmpty: function isEmpty() {
                return this.$el.is(":empty");
            },
            destroy: function destroy() {
                this.$el = $("<div>");
            }
        });
        return Dataset;
        function getDisplayFn(display) {
            display = display || _.stringify;
            return _.isFunction(display) ? display : displayFn;
            function displayFn(obj) {
                return obj[display];
            }
        }
        function getTemplates(templates, displayFn) {
            return {
                notFound: templates.notFound && _.templatify(templates.notFound),
                pending: templates.pending && _.templatify(templates.pending),
                header: templates.header && _.templatify(templates.header),
                footer: templates.footer && _.templatify(templates.footer),
                suggestion: templates.suggestion || suggestionTemplate
            };
            function suggestionTemplate(context) {
                return $("<div>").text(displayFn(context));
            }
        }
        function isValidName(str) {
            return /^[_a-zA-Z0-9-]+$/.test(str);
        }
    }();
    var Menu = function() {
        "use strict";
        function Menu(o, www) {
            var that = this;
            o = o || {};
            if (!o.node) {
                $.error("node is required");
            }
            www.mixin(this);
            this.$node = $(o.node);
            this.query = null;
            this.datasets = _.map(o.datasets, initializeDataset);
            function initializeDataset(oDataset) {
                var node = that.$node.find(oDataset.node).first();
                oDataset.node = node.length ? node : $("<div>").appendTo(that.$node);
                return new Dataset(oDataset, www);
            }
        }
        _.mixin(Menu.prototype, EventEmitter, {
            _onSelectableClick: function onSelectableClick($e) {
                this.trigger("selectableClicked", $($e.currentTarget));
            },
            _onRendered: function onRendered(type, dataset, suggestions, async) {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetRendered", dataset, suggestions, async);
            },
            _onCleared: function onCleared() {
                this.$node.toggleClass(this.classes.empty, this._allDatasetsEmpty());
                this.trigger("datasetCleared");
            },
            _propagate: function propagate() {
                this.trigger.apply(this, arguments);
            },
            _allDatasetsEmpty: function allDatasetsEmpty() {
                return _.every(this.datasets, isDatasetEmpty);
                function isDatasetEmpty(dataset) {
                    return dataset.isEmpty();
                }
            },
            _getSelectables: function getSelectables() {
                return this.$node.find(this.selectors.selectable);
            },
            _removeCursor: function _removeCursor() {
                var $selectable = this.getActiveSelectable();
                $selectable && $selectable.removeClass(this.classes.cursor);
            },
            _ensureVisible: function ensureVisible($el) {
                var elTop, elBottom, nodeScrollTop, nodeHeight;
                elTop = $el.position().top;
                elBottom = elTop + $el.outerHeight(true);
                nodeScrollTop = this.$node.scrollTop();
                nodeHeight = this.$node.height() + parseInt(this.$node.css("paddingTop"), 10) + parseInt(this.$node.css("paddingBottom"), 10);
                if (elTop < 0) {
                    this.$node.scrollTop(nodeScrollTop + elTop);
                } else if (nodeHeight < elBottom) {
                    this.$node.scrollTop(nodeScrollTop + (elBottom - nodeHeight));
                }
            },
            bind: function() {
                var that = this, onSelectableClick;
                onSelectableClick = _.bind(this._onSelectableClick, this);
                this.$node.on("click.tt", this.selectors.selectable, onSelectableClick);
                _.each(this.datasets, function(dataset) {
                    dataset.onSync("asyncRequested", that._propagate, that).onSync("asyncCanceled", that._propagate, that).onSync("asyncReceived", that._propagate, that).onSync("rendered", that._onRendered, that).onSync("cleared", that._onCleared, that);
                });
                return this;
            },
            isOpen: function isOpen() {
                return this.$node.hasClass(this.classes.open);
            },
            open: function open() {
                this.$node.addClass(this.classes.open);
            },
            close: function close() {
                this.$node.removeClass(this.classes.open);
                this._removeCursor();
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.attr("dir", dir);
            },
            selectableRelativeToCursor: function selectableRelativeToCursor(delta) {
                var $selectables, $oldCursor, oldIndex, newIndex;
                $oldCursor = this.getActiveSelectable();
                $selectables = this._getSelectables();
                oldIndex = $oldCursor ? $selectables.index($oldCursor) : -1;
                newIndex = oldIndex + delta;
                newIndex = (newIndex + 1) % ($selectables.length + 1) - 1;
                newIndex = newIndex < -1 ? $selectables.length - 1 : newIndex;
                return newIndex === -1 ? null : $selectables.eq(newIndex);
            },
            setCursor: function setCursor($selectable) {
                this._removeCursor();
                if ($selectable = $selectable && $selectable.first()) {
                    $selectable.addClass(this.classes.cursor);
                    this._ensureVisible($selectable);
                }
            },
            getSelectableData: function getSelectableData($el) {
                return $el && $el.length ? Dataset.extractData($el) : null;
            },
            getActiveSelectable: function getActiveSelectable() {
                var $selectable = this._getSelectables().filter(this.selectors.cursor).first();
                return $selectable.length ? $selectable : null;
            },
            getTopSelectable: function getTopSelectable() {
                var $selectable = this._getSelectables().first();
                return $selectable.length ? $selectable : null;
            },
            update: function update(query) {
                var isValidUpdate = query !== this.query;
                if (isValidUpdate) {
                    this.query = query;
                    _.each(this.datasets, updateDataset);
                }
                return isValidUpdate;
                function updateDataset(dataset) {
                    dataset.update(query);
                }
            },
            empty: function empty() {
                _.each(this.datasets, clearDataset);
                this.query = null;
                this.$node.addClass(this.classes.empty);
                function clearDataset(dataset) {
                    dataset.clear();
                }
            },
            destroy: function destroy() {
                this.$node.off(".tt");
                this.$node = $("<div>");
                _.each(this.datasets, destroyDataset);
                function destroyDataset(dataset) {
                    dataset.destroy();
                }
            }
        });
        return Menu;
    }();
    var DefaultMenu = function() {
        "use strict";
        var s = Menu.prototype;
        function DefaultMenu() {
            Menu.apply(this, [].slice.call(arguments, 0));
        }
        _.mixin(DefaultMenu.prototype, Menu.prototype, {
            open: function open() {
                !this._allDatasetsEmpty() && this._show();
                return s.open.apply(this, [].slice.call(arguments, 0));
            },
            close: function close() {
                this._hide();
                return s.close.apply(this, [].slice.call(arguments, 0));
            },
            _onRendered: function onRendered() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onRendered.apply(this, [].slice.call(arguments, 0));
            },
            _onCleared: function onCleared() {
                if (this._allDatasetsEmpty()) {
                    this._hide();
                } else {
                    this.isOpen() && this._show();
                }
                return s._onCleared.apply(this, [].slice.call(arguments, 0));
            },
            setLanguageDirection: function setLanguageDirection(dir) {
                this.$node.css(dir === "ltr" ? this.css.ltr : this.css.rtl);
                return s.setLanguageDirection.apply(this, [].slice.call(arguments, 0));
            },
            _hide: function hide() {
                this.$node.hide();
            },
            _show: function show() {
                this.$node.css("display", "block");
            }
        });
        return DefaultMenu;
    }();
    var Typeahead = function() {
        "use strict";
        function Typeahead(o, www) {
            var onFocused, onBlurred, onEnterKeyed, onTabKeyed, onEscKeyed, onUpKeyed, onDownKeyed, onLeftKeyed, onRightKeyed, onQueryChanged, onWhitespaceChanged;
            o = o || {};
            if (!o.input) {
                $.error("missing input");
            }
            if (!o.menu) {
                $.error("missing menu");
            }
            if (!o.eventBus) {
                $.error("missing event bus");
            }
            www.mixin(this);
            this.eventBus = o.eventBus;
            this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
            this.input = o.input;
            this.menu = o.menu;
            this.enabled = true;
            this.active = false;
            this.input.hasFocus() && this.activate();
            this.dir = this.input.getLangDir();
            this._hacks();
            this.menu.bind().onSync("selectableClicked", this._onSelectableClicked, this).onSync("asyncRequested", this._onAsyncRequested, this).onSync("asyncCanceled", this._onAsyncCanceled, this).onSync("asyncReceived", this._onAsyncReceived, this).onSync("datasetRendered", this._onDatasetRendered, this).onSync("datasetCleared", this._onDatasetCleared, this);
            onFocused = c(this, "activate", "open", "_onFocused");
            onBlurred = c(this, "deactivate", "_onBlurred");
            onEnterKeyed = c(this, "isActive", "isOpen", "_onEnterKeyed");
            onTabKeyed = c(this, "isActive", "isOpen", "_onTabKeyed");
            onEscKeyed = c(this, "isActive", "_onEscKeyed");
            onUpKeyed = c(this, "isActive", "open", "_onUpKeyed");
            onDownKeyed = c(this, "isActive", "open", "_onDownKeyed");
            onLeftKeyed = c(this, "isActive", "isOpen", "_onLeftKeyed");
            onRightKeyed = c(this, "isActive", "isOpen", "_onRightKeyed");
            onQueryChanged = c(this, "_openIfActive", "_onQueryChanged");
            onWhitespaceChanged = c(this, "_openIfActive", "_onWhitespaceChanged");
            this.input.bind().onSync("focused", onFocused, this).onSync("blurred", onBlurred, this).onSync("enterKeyed", onEnterKeyed, this).onSync("tabKeyed", onTabKeyed, this).onSync("escKeyed", onEscKeyed, this).onSync("upKeyed", onUpKeyed, this).onSync("downKeyed", onDownKeyed, this).onSync("leftKeyed", onLeftKeyed, this).onSync("rightKeyed", onRightKeyed, this).onSync("queryChanged", onQueryChanged, this).onSync("whitespaceChanged", onWhitespaceChanged, this).onSync("langDirChanged", this._onLangDirChanged, this);
        }
        _.mixin(Typeahead.prototype, {
            _hacks: function hacks() {
                var $input, $menu;
                $input = this.input.$input || $("<div>");
                $menu = this.menu.$node || $("<div>");
                $input.on("blur.tt", function($e) {
                    var active, isActive, hasActive;
                    active = document.activeElement;
                    isActive = $menu.is(active);
                    hasActive = $menu.has(active).length > 0;
                    if (_.isMsie() && (isActive || hasActive)) {
                        $e.preventDefault();
                        $e.stopImmediatePropagation();
                        _.defer(function() {
                            $input.focus();
                        });
                    }
                });
                $menu.on("mousedown.tt", function($e) {
                    $e.preventDefault();
                });
            },
            _onSelectableClicked: function onSelectableClicked(type, $el) {
                this.select($el);
            },
            _onDatasetCleared: function onDatasetCleared() {
                this._updateHint();
            },
            _onDatasetRendered: function onDatasetRendered(type, dataset, suggestions, async) {
                this._updateHint();
                this.eventBus.trigger("render", suggestions, async, dataset);
            },
            _onAsyncRequested: function onAsyncRequested(type, dataset, query) {
                this.eventBus.trigger("asyncrequest", query, dataset);
            },
            _onAsyncCanceled: function onAsyncCanceled(type, dataset, query) {
                this.eventBus.trigger("asynccancel", query, dataset);
            },
            _onAsyncReceived: function onAsyncReceived(type, dataset, query) {
                this.eventBus.trigger("asyncreceive", query, dataset);
            },
            _onFocused: function onFocused() {
                this._minLengthMet() && this.menu.update(this.input.getQuery());
            },
            _onBlurred: function onBlurred() {
                if (this.input.hasQueryChangedSinceLastFocus()) {
                    this.eventBus.trigger("change", this.input.getQuery());
                }
            },
            _onEnterKeyed: function onEnterKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                }
            },
            _onTabKeyed: function onTabKeyed(type, $e) {
                var $selectable;
                if ($selectable = this.menu.getActiveSelectable()) {
                    this.select($selectable) && $e.preventDefault();
                } else if ($selectable = this.menu.getTopSelectable()) {
                    this.autocomplete($selectable) && $e.preventDefault();
                }
            },
            _onEscKeyed: function onEscKeyed() {
                this.close();
            },
            _onUpKeyed: function onUpKeyed() {
                this.moveCursor(-1);
            },
            _onDownKeyed: function onDownKeyed() {
                this.moveCursor(+1);
            },
            _onLeftKeyed: function onLeftKeyed() {
                if (this.dir === "rtl" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onRightKeyed: function onRightKeyed() {
                if (this.dir === "ltr" && this.input.isCursorAtEnd()) {
                    this.autocomplete(this.menu.getTopSelectable());
                }
            },
            _onQueryChanged: function onQueryChanged(e, query) {
                this._minLengthMet(query) ? this.menu.update(query) : this.menu.empty();
            },
            _onWhitespaceChanged: function onWhitespaceChanged() {
                this._updateHint();
            },
            _onLangDirChanged: function onLangDirChanged(e, dir) {
                if (this.dir !== dir) {
                    this.dir = dir;
                    this.menu.setLanguageDirection(dir);
                }
            },
            _openIfActive: function openIfActive() {
                this.isActive() && this.open();
            },
            _minLengthMet: function minLengthMet(query) {
                query = _.isString(query) ? query : this.input.getQuery() || "";
                return query.length >= this.minLength;
            },
            _updateHint: function updateHint() {
                var $selectable, data, val, query, escapedQuery, frontMatchRegEx, match;
                $selectable = this.menu.getTopSelectable();
                data = this.menu.getSelectableData($selectable);
                val = this.input.getInputValue();
                if (data && !_.isBlankString(val) && !this.input.hasOverflow()) {
                    query = Input.normalizeQuery(val);
                    escapedQuery = _.escapeRegExChars(query);
                    frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i");
                    match = frontMatchRegEx.exec(data.val);
                    match && this.input.setHint(val + match[1]);
                } else {
                    this.input.clearHint();
                }
            },
            isEnabled: function isEnabled() {
                return this.enabled;
            },
            enable: function enable() {
                this.enabled = true;
            },
            disable: function disable() {
                this.enabled = false;
            },
            isActive: function isActive() {
                return this.active;
            },
            activate: function activate() {
                if (this.isActive()) {
                    return true;
                } else if (!this.isEnabled() || this.eventBus.before("active")) {
                    return false;
                } else {
                    this.active = true;
                    this.eventBus.trigger("active");
                    return true;
                }
            },
            deactivate: function deactivate() {
                if (!this.isActive()) {
                    return true;
                } else if (this.eventBus.before("idle")) {
                    return false;
                } else {
                    this.active = false;
                    this.close();
                    this.eventBus.trigger("idle");
                    return true;
                }
            },
            isOpen: function isOpen() {
                return this.menu.isOpen();
            },
            open: function open() {
                if (!this.isOpen() && !this.eventBus.before("open")) {
                    this.menu.open();
                    this._updateHint();
                    this.eventBus.trigger("open");
                }
                return this.isOpen();
            },
            close: function close() {
                if (this.isOpen() && !this.eventBus.before("close")) {
                    this.menu.close();
                    this.input.clearHint();
                    this.input.resetInputValue();
                    this.eventBus.trigger("close");
                }
                return !this.isOpen();
            },
            setVal: function setVal(val) {
                this.input.setQuery(_.toStr(val));
            },
            getVal: function getVal() {
                return this.input.getQuery();
            },
            select: function select($selectable) {
                var data = this.menu.getSelectableData($selectable);
                if (data && !this.eventBus.before("select", data.obj)) {
                    this.input.setQuery(data.val, true);
                    this.eventBus.trigger("select", data.obj);
                    this.close();
                    return true;
                }
                return false;
            },
            autocomplete: function autocomplete($selectable) {
                var query, data, isValid;
                query = this.input.getQuery();
                data = this.menu.getSelectableData($selectable);
                isValid = data && query !== data.val;
                if (isValid && !this.eventBus.before("autocomplete", data.obj)) {
                    this.input.setQuery(data.val);
                    this.eventBus.trigger("autocomplete", data.obj);
                    return true;
                }
                return false;
            },
            moveCursor: function moveCursor(delta) {
                var query, $candidate, data, payload, cancelMove;
                query = this.input.getQuery();
                $candidate = this.menu.selectableRelativeToCursor(delta);
                data = this.menu.getSelectableData($candidate);
                payload = data ? data.obj : null;
                cancelMove = this._minLengthMet() && this.menu.update(query);
                if (!cancelMove && !this.eventBus.before("cursorchange", payload)) {
                    this.menu.setCursor($candidate);
                    if (data) {
                        this.input.setInputValue(data.val);
                    } else {
                        this.input.resetInputValue();
                        this._updateHint();
                    }
                    this.eventBus.trigger("cursorchange", payload);
                    return true;
                }
                return false;
            },
            destroy: function destroy() {
                this.input.destroy();
                this.menu.destroy();
            }
        });
        return Typeahead;
        function c(ctx) {
            var methods = [].slice.call(arguments, 1);
            return function() {
                var args = [].slice.call(arguments);
                _.each(methods, function(method) {
                    return ctx[method].apply(ctx, args);
                });
            };
        }
    }();
    (function() {
        "use strict";
        var old, keys, methods;
        old = $.fn.typeahead;
        keys = {
            www: "tt-www",
            attrs: "tt-attrs",
            typeahead: "tt-typeahead"
        };
        methods = {
            initialize: function initialize(o, datasets) {
                var www;
                datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
                o = o || {};
                www = WWW(o.classNames);
                return this.each(attach);
                function attach() {
                    var $input, $wrapper, $hint, $menu, defaultHint, defaultMenu, eventBus, input, menu, typeahead, MenuConstructor;
                    _.each(datasets, function(d) {
                        d.highlight = !!o.highlight;
                    });
                    $input = $(this);
                    $wrapper = $(www.html.wrapper);
                    $hint = $elOrNull(o.hint);
                    $menu = $elOrNull(o.menu);
                    defaultHint = o.hint !== false && !$hint;
                    defaultMenu = o.menu !== false && !$menu;
                    defaultHint && ($hint = buildHintFromInput($input, www));
                    defaultMenu && ($menu = $(www.html.menu).css(www.css.menu));
                    $hint && $hint.val("");
                    $input = prepInput($input, www);
                    if (defaultHint || defaultMenu) {
                        $wrapper.css(www.css.wrapper);
                        $input.css(defaultHint ? www.css.input : www.css.inputWithNoHint);
                        $input.wrap($wrapper).parent().prepend(defaultHint ? $hint : null).append(defaultMenu ? $menu : null);
                    }
                    MenuConstructor = defaultMenu ? DefaultMenu : Menu;
                    eventBus = new EventBus({
                        el: $input
                    });
                    input = new Input({
                        hint: $hint,
                        input: $input
                    }, www);
                    menu = new MenuConstructor({
                        node: $menu,
                        datasets: datasets
                    }, www);
                    typeahead = new Typeahead({
                        input: input,
                        menu: menu,
                        eventBus: eventBus,
                        minLength: o.minLength
                    }, www);
                    $input.data(keys.www, www);
                    $input.data(keys.typeahead, typeahead);
                }
            },
            isEnabled: function isEnabled() {
                var enabled;
                ttEach(this.first(), function(t) {
                    enabled = t.isEnabled();
                });
                return enabled;
            },
            enable: function enable() {
                ttEach(this, function(t) {
                    t.enable();
                });
                return this;
            },
            disable: function disable() {
                ttEach(this, function(t) {
                    t.disable();
                });
                return this;
            },
            isActive: function isActive() {
                var active;
                ttEach(this.first(), function(t) {
                    active = t.isActive();
                });
                return active;
            },
            activate: function activate() {
                ttEach(this, function(t) {
                    t.activate();
                });
                return this;
            },
            deactivate: function deactivate() {
                ttEach(this, function(t) {
                    t.deactivate();
                });
                return this;
            },
            isOpen: function isOpen() {
                var open;
                ttEach(this.first(), function(t) {
                    open = t.isOpen();
                });
                return open;
            },
            open: function open() {
                ttEach(this, function(t) {
                    t.open();
                });
                return this;
            },
            close: function close() {
                ttEach(this, function(t) {
                    t.close();
                });
                return this;
            },
            select: function select(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.select($el);
                });
                return success;
            },
            autocomplete: function autocomplete(el) {
                var success = false, $el = $(el);
                ttEach(this.first(), function(t) {
                    success = t.autocomplete($el);
                });
                return success;
            },
            moveCursor: function moveCursoe(delta) {
                var success = false;
                ttEach(this.first(), function(t) {
                    success = t.moveCursor(delta);
                });
                return success;
            },
            val: function val(newVal) {
                var query;
                if (!arguments.length) {
                    ttEach(this.first(), function(t) {
                        query = t.getVal();
                    });
                    return query;
                } else {
                    ttEach(this, function(t) {
                        t.setVal(newVal);
                    });
                    return this;
                }
            },
            destroy: function destroy() {
                ttEach(this, function(typeahead, $input) {
                    revert($input);
                    typeahead.destroy();
                });
                return this;
            }
        };
        $.fn.typeahead = function(method) {
            if (methods[method]) {
                return methods[method].apply(this, [].slice.call(arguments, 1));
            } else {
                return methods.initialize.apply(this, arguments);
            }
        };
        $.fn.typeahead.noConflict = function noConflict() {
            $.fn.typeahead = old;
            return this;
        };
        function ttEach($els, fn) {
            $els.each(function() {
                var $input = $(this), typeahead;
                (typeahead = $input.data(keys.typeahead)) && fn(typeahead, $input);
            });
        }
        function buildHintFromInput($input, www) {
            return $input.clone().addClass(www.classes.hint).removeData().css(www.css.hint).css(getBackgroundStyles($input)).prop("readonly", true).removeAttr("id name placeholder required").attr({
                autocomplete: "off",
                spellcheck: "false",
                tabindex: -1
            });
        }
        function prepInput($input, www) {
            $input.data(keys.attrs, {
                dir: $input.attr("dir"),
                autocomplete: $input.attr("autocomplete"),
                spellcheck: $input.attr("spellcheck"),
                style: $input.attr("style")
            });
            $input.addClass(www.classes.input).attr({
                autocomplete: "off",
                spellcheck: false
            });
            try {
                !$input.attr("dir") && $input.attr("dir", "auto");
            } catch (e) {}
            return $input;
        }
        function getBackgroundStyles($el) {
            return {
                backgroundAttachment: $el.css("background-attachment"),
                backgroundClip: $el.css("background-clip"),
                backgroundColor: $el.css("background-color"),
                backgroundImage: $el.css("background-image"),
                backgroundOrigin: $el.css("background-origin"),
                backgroundPosition: $el.css("background-position"),
                backgroundRepeat: $el.css("background-repeat"),
                backgroundSize: $el.css("background-size")
            };
        }
        function revert($input) {
            var www, $wrapper;
            www = $input.data(keys.www);
            $wrapper = $input.parent().filter(www.selectors.wrapper);
            _.each($input.data(keys.attrs), function(val, key) {
                _.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
            });
            $input.removeData(keys.typeahead).removeData(keys.www).removeData(keys.attr).removeClass(www.classes.input);
            if ($wrapper.length) {
                $input.detach().insertAfter($wrapper);
                $wrapper.remove();
            }
        }
        function $elOrNull(obj) {
            var isValid, $el;
            isValid = _.isJQuery(obj) || _.isElement(obj);
            $el = isValid ? $(obj).first() : [];
            return $el.length ? $el : null;
        }
    })();
});