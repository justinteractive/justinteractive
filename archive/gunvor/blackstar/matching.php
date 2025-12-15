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
                        <input type="text" value="Search..." />
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
                        <a href="trader-workspace.php">
                            <span class="label">Trader Workspace</span>
                        </a>
                    </li>
                    <li class="tab tab-linkage">
                        <a class="active">
                            <span class="label">Linkage</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div id="workspace">

                <div class="master" style="width:50%;left:0;top:0;">
                    <div class="content">
                        <div class="module-header">
                            <h2>Suppliers</h2>
                        </div>
                        <div class="grid matching suppliers">
                            <div class="filters" style="border-top:1px solid #295B61;">
                                <img src="img/filters/matching-grid-filters-left.png" class="grid-filters-left" />
                                <img src="img/filters/matching-grid-filters-right.png" class="grid-filters-right" />
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Deal Date</th>
                                        <th>Counterparty</th>
                                        <th>Quantity</th>
                                        <th>Product</th>
                                        <th>Incoterm</th>
                                        <th>Discharge Port</th>
                                        <th>Delivery Period</th>
                                        <th>UoM</th>
                                        <th>Pay CCY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="row-light buy">
                                        <td class="id">341367</td>
                                        <td class="deal-date">20/12/2017</td>
                                        <td class="counterparty">SABC Petrochemicals B.V.</td>
                                        <td class="quantity">6 000.00</td>
                                        <td class="product">MTBE</td>
                                        <td class="incoterm">OF</td>
                                        <td class="discharge-port">AMSTERDAM</td>
                                        <td class="delivery-period">MAR18</td>
                                        <td class="uom">MT</td>
                                        <td class="tolerance">USD</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- <div class="footer"></div> -->
                </div>

                <div class="master" style="width:50%;left:50%;top:0;">
                    <div class="content">
                        <div class="module-header">
                            <h2>Customers</h2>
                        </div>
                        <div class="grid matching customers">
                            <div class="filters" style="border-top:1px solid #295B61;">
                                <img src="img/filters/matching-grid-filters-left.png" class="grid-filters-left" />
                                <img src="img/filters/matching-grid-filters-right.png" class="grid-filters-right" />
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Deal Date</th>
                                        <th>Counterparty</th>
                                        <th>Quantity</th>
                                        <th>Product</th>
                                        <th>Incoterm</th>
                                        <th>Discharge Port</th>
                                        <th>Delivery Period</th>
                                        <th>UoM</th>
                                        <th>Pay CCY</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="row-light sell">
                                        <td class="id">4065455</td>
                                        <td class="deal-date">04/05/2018</td>
                                        <td class="counterparty">ENOC Services (UK) Limited</td>
                                        <td class="quantity">-1 000.00</td>
                                        <td class="product">MTBE</td>
                                        <td class="incoterm">FOB</td>
                                        <td class="discharge-port">ARA Range</td>
                                        <td class="delivery-period">12/05/2018-16/05/2018</td>
                                        <td class="uom">MT</td>
                                        <td class="tolerance">USD</td>
                                    </tr>
                                    <tr class="row-dark sell">
                                        <td class="id">4009637</td>
                                        <td class="deal-date">24/04/2018</td>
                                        <td class="counterparty">ENOC Services (UK) Limited</td>
                                        <td class="quantity">-1 000.00</td>
                                        <td class="product">MTBE</td>
                                        <td class="incoterm">CF</td>
                                        <td class="discharge-port">Rotterdam</td>
                                        <td class="delivery-period">05/05/2018-07/05/2018</td>
                                        <td class="uom">MT</td>
                                        <td class="tolerance">USD</td>
                                    </tr>
                                    <tr class="row-light sell">
                                        <td class="id">4046463</td>
                                        <td class="deal-date">05/03/2018</td>
                                        <td class="counterparty">ENOC Services (UK) Limited</td>
                                        <td class="quantity">-1 000.00</td>
                                        <td class="product">MTBE</td>
                                        <td class="incoterm">CF</td>
                                        <td class="discharge-port">Rotterdam</td>
                                        <td class="delivery-period">05/05/2018-07/05/2018</td>
                                        <td class="uom">MT</td>
                                        <td class="tolerance">USD</td>
                                    </tr>
                                    <tr class="row-dark sell">
                                        <td class="id">3807280</td>
                                        <td class="deal-date">06/03/2018</td>
                                        <td class="counterparty">ENOC Services (UK) Limited</td>
                                        <td class="quantity">-1 000.00</td>
                                        <td class="product">MTBE</td>
                                        <td class="incoterm">CF</td>
                                        <td class="discharge-port">Rotterdam</td>
                                        <td class="delivery-period">14/03/2018-16/03/2018</td>
                                        <td class="uom">MT</td>
                                        <td class="tolerance">USD</td>
                                    </tr>
                                    <tr class="row-light sell">
                                        <td class="id">3807272</td>
                                        <td class="deal-date">06/03/2018</td>
                                        <td class="counterparty">ENOC Services (UK) Limited</td>
                                        <td class="quantity">-1 000.00</td>
                                        <td class="product">MTBE</td>
                                        <td class="incoterm">CF</td>
                                        <td class="discharge-port">Rotterdam</td>
                                        <td class="delivery-period">14/03/2018-16/03/2018</td>
                                        <td class="uom">MT</td>
                                        <td class="tolerance">USD</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <!-- <div class="footer"></div> -->
                </div>

                <div class="matching-footer">
                    <div class="footer">
                        <ul class="actions actions-right">
                            <li class="action action-button">
                                <a class="button button-primary button-match">
                                    <span>Match</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="matched-deals" style="">
                    <div class="content">
                        <div class="module-header">
                            <h2>Matched Deals</h2>
                        </div>
                        <div class="grid matched">
                            <!-- <div class="filters">
                                <img src="img/filters/matching-grid-filters-left.png" class="grid-filters-left" />
                                <img src="img/filters/matching-grid-filters-right.png" class="grid-filters-right" />
                            </div> -->

                            <table>
                                <thead>
                                    <tr>
                                        <th>Matching</th>
                                        <th>Deal ID</th>
                                        <th>Counterparty</th>
                                        <th>Product</th>
                                        <th>UoM</th>
                                        <th>In</th>
                                        <th>Out</th>
                                        <th>Matching Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="row-light">
                                        <td class="matching">292258</td>
                                        <td class="id">292258</td>
                                        <td class="counterparty">292258</td>
                                        <td class="product">292258</td>
                                        <td class="uom">292258</td>
                                        <td class="in">
                                            <input type="text" value="292258" />
                                        </td>
                                        <td class="out">
                                            <input type="text" value="292258" />
                                        </td>
                                        <td class="matching-status">FULL</td>
                                    </tr>
                                    
                                </tbody>
                            </table>

                            <div class="footer" style="position:relative;border-top:1px solid #295B61;">
                                <ul class="actions actions-right">
                                    <li class="action action-button">
                                        <a class="button button-primary create-match">
                                            <span>Create Match</span>
                                        </a>
                                    </li>
                                    <li class="action action-button">
                                        <a class="button button-primary discard">
                                            <span>Discard</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="footer"></div> -->
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
