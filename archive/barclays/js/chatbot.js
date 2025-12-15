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