<?php
    $test_var = 'fubar' ; 
?>
<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="manifest" href="site.webmanifest">
        <link rel="apple-touch-icon" href="icon.png">
        <!-- Place favicon.ico in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <!-- <link rel="stylesheet" href="css/main.css"> -->
        <link rel="stylesheet" href="css/gunvor.css">

        <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700" rel="stylesheet">
    </head>
    <body>
        <!--[if lte IE 9]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
        <![endif]-->

        <!-- Add your site or application content here -->
        
        <div id="app-container">
            
            <div id="top-nav" class="top-nav">
                <ul class="branding">
                    <li>
                        <a class="logo"></a>
                    </li>
                    <li class="search">
                        <img src="img/topnav/icon-search.png" width="12" height="12" alt="Search" title="Search" />
                        <input type="text" placeholder="Search..." />
                    </li>
                </ul>
                <ul class="actions actions-right">
                    <li class="action action-icon window-close">
                        <a title="Close window"></a>
                    </li>
                    <li class="action action-icon window-maximize">
                        <a title="Maximize window"></a>
                    </li>
                    <li class="action action-icon window-minimize">
                        <a title="Minimize window"></a>
                    </li>
                    <li class="action action-icon settings">
                        <a title="Application settings"></a>
                    </li>
                    <li class="action action-icon notifications">
                        <a title="Notifications"></a>
                    </li>
                    <li class="action action-icon documents">
                        <a title="Documents"></a>
                    </li>
                    <li class="action action-icon favourites">
                        <a title="Favourites"></a>
                    </li>
                    <li class="action action-icon widgets">
                        <a title="Widgets"></a>
                    </li>
                </ul>
            </div>
            
            <div id="workspace-tabs">
                <ul class="tabs">
                    <li class="tab tab-home">
                        <a></a>
                    </li>
                    <li class="tab tab-inbox">
                        <a>
                            <span class="label">Inbox</span>
                            <span class="workspace-tab-badge tab-badge">88</span>
                        </a>
                    </li>
                    <li class="tab tab-trader-workspace">
                        <a class="active">
                            <span class="label">Trader Workspace</span>
                        </a>
                    </li>
                    <li class="tab tab-linkage">
                        <a href="matching.php">
                            <span class="label">Linkage</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div id="workspace">

                <div class="master">
                    <div class="content">
                        <div class="tabs content-tabs">
                            <ul class="inboxes">
                                <li class="tab tab-inbox">
                                    <a class="active" style="background-color:#152E30;">
                                        <span class="label">Physical Inbox</span>
                                    </a>
                                </li>
                                <li class="tab tab-trader-workspace">
                                    <a class="">
                                        <span class="label">Paper Inbox</span>
                                        <span class="workspace-tab-badge tab-badge">88</span>
                                    </a>
                                </li>
                            </ul>
                            
                            <ul class="lists">
                                <li class="tab">
                                    <a>
                                        <span class="label">Physical Deal List</span>
                                    </a>
                                </li>
                                <li class="tab">
                                    <a class="">
                                        <span class="label">Paper Deal List</span>
                                    </a>
                                </li>
                                <li class="tab">
                                    <a class="">
                                        <span class="label">Templates</span>
                                    </a>
                                </li>
                            </ul>

                        </div>
                        <div class="grid inbox">
                            <div class="filters"></div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Deal Date</th>
                                        <th>Status</th>
                                        <th>Trader</th>
                                        <th>Side</th>
                                        <th>Quantity</th>
                                        <th>Unit of Measure</th>
                                        <th>Product Description</th>
                                        <th>Incoterm</th>
                                        <th>Discharge Port</th>
                                        <th>Delivery Period</th>
                                        <th>Pay CCV</th>
                                        <th>Counterparty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="row-light row-active">
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td class="buy">292258</td>
                                        <td class="buy">292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                    </tr>
                                    <tr class="row-dark">
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                    </tr>
                                    <tr class="row-light">
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="footer"></div>
                </div>

                <div class="slave">
                    <div class="content">
                        <h1 style="color:#fff;">Deal Ticket</h1>
                    </div>
                    <div class="footer">
                        <ul class="actions actions-left">
                            <li class="action action-icon-link close">
                                <a>Close</a>
                            </li>
                            <li class="action action-icon-link window-maximize">
                                <a>Open in full mode</a>
                            </li>
                            <li class="action action-icon-link copy">
                                <a>Copy</a>
                            </li>
                        </ul>
                        <ul class="actions actions-right">
                            <li class="action action-button">
                                <a class="button button-primary">
                                    <span>Amend</span>
                                </a>
                            </li>
                            <li class="action action-button">
                                <a class="button button-primary">
                                    <span>Create</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <div id="menu-main" class="menu-main menu">
                <ul>
                    <li>
                        <a class="menu-item">
                            <span>System Log</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>About</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Set Business Date</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div id="side-panel" class="side-panel open">
                <div class="notifications">
                    <div class="header">
                        <span class="title">Notifications</span>
                        <ul class="actions actions-right">
                            <li class="action action-icon close">
                                <a></a>
                            </li>
                            <li>
                                
                            </li>
                        </ul>
                    </div>
                    <ul>
                        <li>
                            <a>
                                
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="footer"></div>
            </div>

        </div>

        <script src="js/vendor/modernizr-3.5.0.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-3.2.1.min.js"><\/script>')</script>
        <script src="js/plugins.js"></script>
        <script src="js/main.js"></script>

        <!-- Google Analytics: change UA-XXXXX-Y to be your site's ID. -->
        <script>
            window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
            ga('create','UA-XXXXX-Y','auto');ga('send','pageview')
        </script>
        <script src="https://www.google-analytics.com/analytics.js" async defer></script>
    </body>
</html>
