<?php
    
?>
<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Barclays myHR - Time Off - Paternity Leave</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="manifest" href="site.webmanifest">
        <link rel="apple-touch-icon" href="icon.png">
        <!-- Place favicon.ico in the root directory -->

        <!-- Bootstrap core CSS -->
        <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <link rel="stylesheet" href="css/master.css">
        <!-- <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <link rel="stylesheet" href="css/pure.min.css"> -->

        <link rel="preload" href="https://www.barclays.co.uk/etc/designs/bdl1.7.4/clientlib/fonts/expertsans-b14-light-webfont.woff" as="font" type="font/woff" crossorigin="">
        <link rel="preload" href="https://www.barclays.co.uk/etc/designs/bdl1.7.4/clientlib/fonts/expertsans-regular-webfont.woff" as="font" type="font/woff" crossorigin="">
        <link rel="preload" href="https://www.barclays.co.uk/etc/designs/bdl1.7.4/clientlib/fonts/expertsans-light-webfont.woff" as="font" type="font/woff" crossorigin="">
        <!-- <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w" crossorigin="anonymous"> -->

        <!-- <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet"> -->
    </head>
    <body id="bootstrap-override">
        <!--[if lte IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        
        <div id="app-container">
            
            <? include 'header.php'; ?>
            
            <div class="jumbotron hero hero-maternity-leave">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item" aria-current="page">Home</li>
                        <li class="breadcrumb-item" aria-current="page">Time off</li>
                        <li class="breadcrumb-item" aria-current="page">Becoming a parent</li>
                        <li class="breadcrumb-item active" aria-current="page">Paternity Leave (Wealth)</li>
                    </ol>
                </nav>

                <div class="container">
                    <blockquote>
                        <h1>Maternity leave</h1>
                        <h2>Having a baby is an exciting and fulfilling experience. Our Maternity Policy ensures you will be supported before, during and after this important period in your life.</h2>
                        <div class="document-metadata">
                            <a data-toggle="tooltip" title="Click to see alternate versions of this policy for other countries" class="document-metadata-item location">USA, Brazil, Mexico</a>
                            <a data-toggle="tooltip" title="Click to see alternate versions of this policy for other business units" class="document-metadata-item business-unit">Barclays International</a>
                            <img data-toggle="tooltip" class="help" data-original-title="Loads of info to fill a small space" src="img/icons/icon-help.png" />
                        </div>
                    </blockquote>
                    <div class="actions">
                        <button class="btn btn-primary btn-barclays" type="button" data-toggle="modal" data-target="#modal-book-leave">Book leave now</button>
                        <button class="btn btn-secondary btn-barclays" type="button">View current requests</button>
                    </div>
                </div>
                <!-- <div class="information-overlay">
                    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
                </div>  -->
            </div>

            <div class="subnav" id="subnav">
                <!-- <div class="container"> -->
                    <ul class="d-flex justify-content-center bd-highlight">
                        <li class="bd-highlight">
                            <a href="#entitlement">Entitlement &amp; eligibility</a>
                        </li>
                        <li class="bd-highlight">
                            <a href="#process">Process overview</a>
                        </li>
                        <li class="bd-highlight">
                            <a href="#further-info">Further info</a>
                        </li>
                        <li class="bd-highlight">
                            <a href="#downloads">Downloads</a>
                        </li>
                    </ul>
                <!-- </div> -->
            </div>

            <div class="container text-center component-key-highlights">
                <h2>Key highlights</h2>
                <div class="divider-horz"></div>
                <ul class="row">
                    <li class="col">
                        <div class="icon" style="background-image:url(img/icons/icon-pay.png);"></div>
                        <h3>Pay</h3>
                        <p>Eligible employees can receive up to 39 weeks’ pay. The level and duration of pay are dependent on length of service.</p>
                    </li>
                    <li class="col">
                        <div class="icon" style="background-image:url(img/icons/icon-time-off.png);"></div>
                        <h3>Leave</h3>
                        <p>Up to 52 weeks for all employees, regardless of the length of service</p>
                    </li>
                    <li class="col">
                        <div class="icon" style="background-image:url(img/icons/icon-keep-in-touch-days.png);"></div>
                        <h3>Keep in touch days</h3>
                        <p>During Maternity Leave, you can use up to 10 KIT days to return to work and familiarise yourself with any changes</p>
                    </li>
                    <li class="col">
                        <div class="icon" style="background-image:url(img/icons/icon-antenatal-appointments.png);"></div>
                        <h3>Antenatal appointments</h3>
                        <p>You are entitled to a reasonable amount of paid leave to attend important appointments related to your childbirth</p>
                    </li>
                </ul>
            </div>

            <div id="entitlement" class="container-fluid container-zebra">
                <div class="container">
                    <div class="container-header">
                        <h1>Eligibility and entitlement</h1>
                        <div class="divider-horz"></div>
                        <h4>How many weeks of continuous service will you have prior to the 15th week of your Expected Week of Childbirth (EWC)?</h4>
                    </div>

                    <ul class="nav nav-pills mb-2 justify-content-center" id="pills-tab" role="tablist">
                        <li class="nav-item">
                            <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-more-than-26-weeks" role="tab" aria-controls="pills-home" aria-selected="true">26 weeks or more</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-less-than-26-weeks" role="tab" aria-controls="pills-profile" aria-selected="false">Less than 26 weeks</a>
                        </li>
                    </ul>

                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-more-than-26-weeks" role="tabpanel" aria-labelledby="pills-more-than-26-weeks-tab">
                            <div id="accordion" class="accordion">
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Am I eligible?
                                            </button>
                                        </h5>
                                    </div>

                                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="card-body">
                                            If you’re expecting to give birth, you will be entitled to Maternity Leave. Eligibility requirements will only affect the level and duration of pay you receive
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-header" id="headingTwo">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                How much will I get paid?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div class="card-body">
                                            <h5>Week 0-26</h5>
                                            <ul class="checklist">
                                                <li class="check">You are entitled to full Statutory Maternity Pay (SMP)</li>
                                                <li class="check">If SMP is lower than your normal rate of pay, you will receive Barclays Maternity Pay (BMP)</li>
                                                <li class="check">BMP enhances SMP to ensure you receive your normal rate of pay</li>
                                            </ul>

                                            <h5>Week 27-39</h5>
                                            <ul class="checklist">
                                                <li class="check">You will receive a reduced rate of SMP or 90% of your average gross weekly earnings (whichever is lower)</li>
                                            </ul>

                                            <h5>Week 40-42</h5>
                                            <ul class="checklist">
                                                <li class="check">These weeks will be unpaid</li>
                                            </ul>

                                            <h5>What else should I know?</h5>
                                            <ul class="checklist">
                                                <li class="check">If SMP is higher than your normal rate of pay, you will receive SMP for the first six weeks of your Maternity Leave. You will then receive BMP (your normal rate of pay) for the following 20 weeks. After the 26th week of your Maternity Leave, you will not receive any further payment</li>
                                                <li class="check">If your earnings are below the SMP lower earnings threshold, you should claim Maternity Allowance (MA). If eligible for MA, you will then receive BMP (your normal rate of pay) for 26 weeks. After the 26th week of your Maternity Leave, you will not receive any further payment</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-header" id="headingThree">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            How much time do I get off and when can I take it?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                        <div class="card-body">
                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="pills-less-than-26-weeks" role="tabpanel" aria-labelledby="pills-less-than-26-weeks-tab">
                            <div id="accordion" class="accordion">
                                <div class="card">
                                    <div class="card-header" id="headingOne">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Am I eligible?
                                            </button>
                                        </h5>
                                    </div>

                                    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                        <div class="card-body">
                                            If you’re expecting to give birth, you will be entitled to Maternity Leave. Eligibility requirements will only affect the level and duration of pay you receive
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-header" id="headingTwo">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                How much will I get paid?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                        <div class="card-body">
                                            <h5>Week 0-26</h5>
                                            <p>
                                                You are entitled to full Statutory Maternity Pay (SMP)<br />
                                                If SMP is lower than your normal rate of pay, you will receive Barclays Maternity Pay (BMP)<br />
                                                BMP enhances SMP to ensure you receive your normal rate of pay
                                            </p>
                                            <h5>Week 27-39</h5>
                                            <p>
                                                You will receive a reduced rate of SMP or 90% of your average gross weekly earnings (whichever is lower)
                                            </p>
                                            <h5>Week 40-42</h5>
                                            <p>
                                                These weeks will be unpaid
                                            </p>
                                            <h5>What else should I know?</h5>
                                            <p>
                                                If SMP is higher than your normal rate of pay, you will receive SMP for the first six weeks of your Maternity Leave. You will then receive BMP (your normal rate of pay) for the following 20 weeks. After the 26th week of your Maternity Leave, you will not receive any further payment<br />
                                                If your earnings are below the SMP lower earnings threshold, you should claim Maternity Allowance (MA). If eligible for MA, you will then receive BMP (your normal rate of pay) for 26 weeks. After the 26th week of your Maternity Leave, you will not receive any further payment
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="card">
                                    <div class="card-header" id="headingThree">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            How much time do I get off and when can I take it?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                        <div class="card-body">
                                            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container" id="process">
                <div class="container-header">
                    <h1>How to take maternity leave</h1>
                    <div class="divider-horz"></div>
                </div>

                <div class="container-fluid">
                    <ol class="steps">
                        <li class="step">
                            <div class="step-count">1</div>
                            <h4 class="step-title">Download the policy PDF</h4>
                            <p>Please read the Maternity Leave policy document in the downloads section before applying for Maternity Leave. Once you feel comfortable disclosing your pregnancy (must be before the 15th week prior to your EWC), please inform your line manager or HR. </p>
                        </li>

                        <li class="step">
                            <div class="step-count">2</div>
                            <h4 class="step-title">Submit formal notification</h4>
                            <p>After informing us of your pregnancy, your line manager will reach out to you to discuss your Maternity Leave. From this discussion you should:</p>
                            <ul>
                                <li>Be aware of the documentation required for formal notification (i.e. MATB1 or equivalent)</li>
                                <li>Inform us of your Expected Week of Childbirth (EWC)</li>
                                <li>Inform us of the date you wish to start your Maternity Leave</li>
                                <li>Inform us on how you would like to use your existing and accrued Annual Leave allowances</li>
                                <li>Be able to develop a handover plan</li>
                                <li>Agree on the type and level of contact you wish to maintain during your Maternity Leave</li>
                            </ul>
                            <p>After this discussion you should be in a position to formally request Maternity Leave through the MyHR portal. This should be done at least 15 weeks before your EWC. For more information on this process, please see ‘How to apply for Maternity Leave’ in Downloads</p>
                        </li>

                        <li class="step">
                            <div class="step-count">3</div>
                            <h4 class="step-title">Confirm your leave date</h4>
                            <p>We understand that your circumstances can change in the build up to your childbirth. If you wish to change the start date of your Maternity Leave, you will need to inform your line manager and create a new Maternity Leave request in the MyHR portal. You should let us know about a change in date at least 28 days in advance (where reasonably practical). </p>
                        </li>

                        <li class="step">
                            <div class="step-count">4</div>
                            <h4 class="step-title">Keep us up to date</h4>
                            <p>It’s important to keep us up to date once you have left for Maternity Leave. While you are away, we will need you to provide the following:</p>
                            <ul>
                                <li>A copy of the Birth Certificate of your child</li>
                                <li>Written notice to your line manager (eight weeks prior to your new return date) if you plan to return to work before your agreed return date</li>
                                <li>An update if you experience any tragedy associated with your childbirth</li>
                                <li>An update if you experience any ill-health or injury</li>
                            </ul>
                        </li>

                        <li class="step">
                            <div class="step-count">5</div>
                            <h4 class="step-title">Returning to work</h4>
                            <p>Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
                        </li>
                    </ol>
                </div>
            </div>

            <div class="container-fluid container-zebra" id="further-info">
                <div class="container component-further-information">
                    <h1 class="text-center">Further information</h1>
                    <div class="divider-horz"></div>
                    <div class="card-deck text-left">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">Keep In Touch days (KIT)</h3>
                                <p class="card-text">We look forward to having you back. However, if you do not want to return immediately following your leave, there are a number of available options for you.</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="card-link">Download policy to learn more</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">Parental buddy scheme</h3>
                                <p class="card-text">Learn about developing a buddy relationship with a fellow colleague, who can provide invaluable support, advice and guidance during this exciting time in your life.</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="card-link">Download policy to learn more</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">Delaying your return</h3>
                                <p class="card-text">In the case of a tragedy such as the death of a child or partner, Barclays will provide as much support as possible and will be able to help you get through the hard times.</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="card-link">Download policy to learn more</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">Performance review</h3>
                                <p class="card-text">In the case of a tragedy such as the death of a child or partner, Barclays will provide as much support as possible and will be able to help you get through the hard times.</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="card-link">Download policy to learn more</a>
                            </div>
                        </div>
                    </div>

                    <div class="card-deck text-left more-cards" style="margin-top:20px;">
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">Keep In Touch days (KIT)</h3>
                                <p class="card-text">We look forward to having you back. However, if you do not want to return immediately following your leave, there are a number of available options for you.</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="card-link">Download policy to learn more</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">Parental buddy scheme</h3>
                                <p class="card-text">Learn about developing a buddy relationship with a fellow colleague, who can provide invaluable support, advice and guidance during this exciting time in your life.</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="card-link">Download policy to learn more</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">Delaying your return</h3>
                                <p class="card-text">In the case of a tragedy such as the death of a child or partner, Barclays will provide as much support as possible and will be able to help you get through the hard times.</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="card-link">Download policy to learn more</a>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <h3 class="card-title">Performance review</h3>
                                <p class="card-text">In the case of a tragedy such as the death of a child or partner, Barclays will provide as much support as possible and will be able to help you get through the hard times.</p>
                            </div>
                            <div class="card-footer">
                                <a href="#" class="card-link">Download policy to learn more</a>
                            </div>
                        </div>
                    </div>

                    <center><button class="btn btn-secondary btn-barclays btn-more-cards" style="margin-top:20px;">Show 4 more</button></center>
                </div>
            </div>

            <div class="container" id="downloads">
                <div class="container-header">
                    <h1>Document downloads</h1>
                    <div class="divider-horz"></div>
                </div>
                <div class="downloads">
                    <div class="card-deck">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">
                                    <small class="text-muted">Policy document</small><br />
                                    <a>Maternity leave policy</a>
                                </p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">
                                    <small class="text-muted">Glossary</small><br />
                                    <a>Defintitions of maternity leave</a>
                                </p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">
                                    <small class="text-muted">Calculator</small><br />
                                    <a>Maternity leave calcuator</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="card-deck">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">
                                    <small class="text-muted">Policy document</small><br />
                                    <a>Maternity leave policy</a>
                                </p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">
                                    <small class="text-muted">Glossary</small><br />
                                    <a>Defintitions of maternity leave</a>
                                </p>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">
                                    <small class="text-muted">Calculator</small><br />
                                    <a>Maternity leave calcuator</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <center><button class="btn btn-secondary btn-barclays btn-download">Download all</button></center>
            </div>

            <div class="container-fluid container-zebra">
                <div class="container">
                    <h1 class="text-center">Related policies and resources</h1>
                    <div class="divider-horz"></div>
                    <div class="card-deck text-left">
                        <div class="card">
                            <img class="card-img-top" src="img/card-images/family-table-laptop.jpg" alt="Card image cap">
                            <div class="card-body">
                                <h3 class="card-title">Shared parental leave</h3>
                                <p class="card-text">Shared Parental Leave enables parents to share the care of their child during the first year of the child's life.</p>
                            </div>
                            <div class="card-footer">
                                <a class="btn btn-primary btn-barclays" href="pol-shared-parental-leave.php">View more info</a>
                            </div>
                        </div>
                        <div class="card">
                            <img class="card-img-top" src="img/card-images/father-baby.jpg" alt="Card image cap">
                            <div class="card-body">
                                <h3 class="card-title">Parental leave</h3>
                                <p class="card-text">We appreciate that being a parent can be hard work. Parental Leave is a way to take time off from work to spend more time with your children.</p>
                            </div>
                            <div class="card-footer">
                                <a class="btn btn-primary btn-barclays" href="pol-parental-leave.php">View more info</a>
                            </div>
                        </div>
                        <div class="card">
                            <img class="card-img-top" src="img/card-images/laptop-hands.jpg" alt="Card image cap">
                            <div class="card-body">
                                <h3 class="card-title">Parenting portal</h3>
                                <p class="card-text">Visit this website for free access to supporting material, tools and guidance for parents, all provided by a Barclays partner.</p>
                            </div>
                            <div class="card-footer">
                                <a class="btn btn-primary btn-barclays" href="http://www.barclays.co.uk" target="_blank">Visit the site</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <? include 'chatbot.php'; ?>
        </div>

        <? include 'footer.php'; ?>
    </body>
</html>
