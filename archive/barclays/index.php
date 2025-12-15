<?php
    
?>
<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Barclays myHR - Home page</title>
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
            
            <div class="jumbotron hero homepage">
                <div class="container">
                    <h1>Hi Huxley, welcome to My HR</h1>
                    <h2>Start searching, or get clicking. The whole wealth of HR content, now just a click away.</h2>
                    <div class="input-group align-middle search">
                        <div class="input-group-prepend">
                            <span class="input-group-text" style="border-right:0;background-color:#fff;"><img src="img/icons/icon-search.png" /></span>
                        </div>

                        <input type="text" class="form-control typeahead" placeholder="Search...">
                        
                        <div class="input-group-append">
                            <button class="btn btn-primary btn-barclays" type="button">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container text-center up-dent">
                <div class="container-header">
                    <h1>Get to know our knowledge hubs</h1>
                    <div class="divider-horz"></div>
                    <h5>We have broken down what HR offers, from pay to paternity, we have a wealth of infomation convenient packaged for you in our hubs</h5>
                </div>

                <ul class="row">
                    <li class="col">
                        <img src="img/icons/home-time-off.png" style="margin-bottom:16px;" />
                        <h3><a href="hub-time-off.php" style="color:#00395D;text-decoration:none;">Time Off</a></h3>
                        <ul>
                            <li><a href="pol-annual-leave.php">Annual leave</a></li>
                            <li><a href="pol-maternity-leave.php">Maternity leave</a></li>
                            <li><a href="pol-paternal-leave.php">Paternal leave</a></li>
                        </ul>
                    </li>
                    <li class="col">
                        <img src="img/icons/home-pay.png" style="margin-bottom:16px;" />
                        <h3><a href="hub-pay.php" style="color:#00395D;text-decoration:none;">Pay</a></h3>
                        <ul>
                            <li><a href="pay/payslip.php">View payslip</a></li>
                            <li><a href="pay/bonus.php">Bonus</a></li>
                            <li><a href="pay/paye-forms.php">P60 and P45</a></li>
                        </ul>
                    </li>
                    <li class="col">
                        <img src="img/icons/home-career.png" style="margin-bottom:16px;" />
                        <h3><a href="hub-career.php" style="color:#00395D;text-decoration:none;">Career</a></h3>
                        <ul>
                            <li><a href="career/coaching.php">Coaching</a></li>
                            <li><a href="career/goals-and-performance.php">Goals and performance</a></li>
                        </ul>
                    </li>
                    <li class="col">
                        <img src="img/icons/home-benefits.png" style="margin-bottom:16px;" />
                        <h3><a href="hub-benefits.php" style="color:#00395D;text-decoration:none;">Benefits</a></h3>
                        <ul>
                            <li><a href="benefits/bike4work.php">Bike4Work</a></li>
                            <li><a href="benefits/buy-sell-holiday.php">Buy and sell holiday</a></li>
                        </ul>
                    </li>
                    <li class="col">
                        <img src="img/icons/home-learning.png" style="margin-bottom:16px;" />
                        <h3><a href="hub-learning.php" style="color:#00395D;text-decoration:none;">Learning</a></h3>
                        <ul>
                            <li><a href="learning/academies.php">Academies</a></li>
                            <li><a href="learning/external-certifications.php">External sertifications</a></li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div class="container">
                <div class="container-header">
                    <h1>Start getting the most out of your HR</h1>
                    <div class="divider-horz"></div>
                    <p>The latest scoop on what’s trending in the learning centre acros the business</p>
                </div>
                <img src="img/home-page-carousel.png" style="margin:0 auto;" />
            </div>

            <div class="container">
                <div class="container-header">
                    <h1>Upcoming events</h1>
                    <div class="divider-horz"></div>
                </div>
                <img src="img/home-page-events.png" style="margin:0 auto;" />
            </div>

            <div class="container">
                <div class="container-header">
                    <h1>Latest news</h1>
                    <div class="divider-horz"></div>
                    <p>The latest scoop on what’s trending in the learning centre acros the business</p>
                </div>

                <div class="card-deck">
                    <div class="card">
                        <img class="card-img-top" src="img/card-images/latest-news-01.png" alt="Card image cap">
                        <div class="card-body">
                            <h6 class="card-topic">
                                <strong><small>Diversity and inclusion</small></strong>
                            </h6>
                            <h5 class="card-title">
                                <a>IDAHOBIT is on Thursday 17 May</a>
                            </h5>
                            <p class="card-text">Become an ally for LGBT + Inclusion on International day against Homophobia, Biphobia and Transphobia…</p>
                            <p class="card-text">
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </p>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-img-top" src="img/card-images/latest-news-02.png" alt="Card image cap">
                        <div class="card-body">
                            <h6 class="card-topic">
                                <strong><small>Diversity and inclusion</small></strong>
                            </h6>
                            <h5 class="card-title">
                                <a>IDAHOBIT is on Thursday 17 May</a>
                            </h5>
                            <p class="card-text">Become an ally for LGBT + Inclusion on International day against Homophobia, Biphobia and Transphobia…</p>
                            <p class="card-text">
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </p>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-img-top" src="img/card-images/latest-news-03.png" alt="Card image cap">
                        <div class="card-body">
                            <h6 class="card-topic">
                                <strong><small>Diversity and inclusion</small></strong>
                            </h6>
                            <h5 class="card-title">
                                <a>IDAHOBIT is on Thursday 17 May</a>
                            </h5>
                            <p class="card-text">Become an ally for LGBT + Inclusion on International day against Homophobia, Biphobia and Transphobia…</p>
                            <p class="card-text">
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </p>
                        </div>
                    </div>
                    <div class="card">
                        <img class="card-img-top" src="img/card-images/latest-news-04.png" alt="Card image cap">
                        <div class="card-body">
                            <h6 class="card-topic">
                                <strong><small>Diversity and inclusion</small></strong>
                            </h6>
                            <h5 class="card-title">
                                <a>IDAHOBIT is on Thursday 17 May</a>
                            </h5>
                            <p class="card-text">Become an ally for LGBT + Inclusion on International day against Homophobia, Biphobia and Transphobia…</p>
                            <p class="card-text">
                                <small class="text-muted">Last updated 3 mins ago</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <? include 'chatbot.php'; ?>
        </div>

        <? include 'footer.php'; ?>
    </body>
</html>
