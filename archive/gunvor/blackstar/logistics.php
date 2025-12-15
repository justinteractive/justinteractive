<?php
    $test_var = 'fubar' ; 
?>
<!doctype html>
<html class="no-js" lang="">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <title>Logistics : Gunvor</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <link rel="manifest" href="site.webmanifest">
        <link rel="apple-touch-icon" href="icon.png">
        <!-- Place favicon.ico in the root directory -->

        <link rel="stylesheet" href="css/normalize.css">
        <!-- <link rel="stylesheet" href="css/bootstrap.min.css"> -->
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
                        <a>
                            <span class="label">Linkage</span>
                            <span class="workspace-tab-badge tab-badge">19</span>
                        </a>
                    </li>
                    <li class="tab tab-logistics">
                        <a class="active">
                            <span class="label">Logistics</span>
                            <span class="workspace-tab-badge tab-badge">8</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div id="workspace">

                <div class="master" style="width:65%;">
                    <div class="content">
                        <div class="tabs content-tabs">
                            <ul class="inboxes">
                                <li class="tab tab-inbox">
                                    <a class="active" style="background-color:#152E30;">
                                        <span class="label">G1803127A : 01/09/18 : Vessel <strong>Hengeist</strong></span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="grid grid-logistics">
                            <div class="filters">
                                <img src="img/filters/grid-filters-logistics.png" />
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th>Lot</th>
                                        <th>Matching</th>
                                        <th>Deal ID</th>
                                        <th>Counterparty</th>
                                        <th>Product Description</th>
                                        <th>UoM</th>
                                        <th>In</th>
                                        <th>Out</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="row-light row-active">
                                        <td class="lot">1</td>
                                        <td class="buy">IN</td>
                                        <td>3481367</td>
                                        <td>Sabic</td>
                                        <td>EUROBOB 94 SUMMER</td>
                                        <td>MT</td>
                                        <td class="buy">1000</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark row-active">
                                        <td class="lot">1</td>
                                        <td class="sell">OUT</td>
                                        <td>3807272</td>
                                        <td>ENOC</td>
                                        <td>EUROBOB 94 SUMMER</td>
                                        <td>BBL</td>
                                        <td></td>
                                        <td class="sell">-1025</td>
                                    </tr>
                                    <tr class="row-light row-active">
                                        <td class="lot">2</td>
                                        <td class="buy">IN</td>
                                        <td>3807280</td>
                                        <td>ENOC</td>
                                        <td>EUROBOB 94 SUMMER</td>
                                        <td>BBL</td>
                                        <td class="buy">1025</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark">
                                        <td class="lot">2</td>
                                        <td class="sell">OUT</td>
                                        <td>292258</td>
                                        <td>Sabic</td>
                                        <td>EUROBOB 94 SUMMER</td>
                                        <td>MT</td>
                                        <td></td>
                                        <td class="sell">-1000</td>
                                    </tr>
                                    <tr class="row-light">
                                        <td class="lot">3</td>
                                        <td class="buy">IN</td>
                                        <td>292258</td>
                                        <td>Sabic</td>
                                        <td>EUROBOB 94 SUMMER</td>
                                        <td>MT</td>
                                        <td class="buy">1200</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark">
                                        <td class="lot">3</td>
                                        <td class="sell">OUT</td>
                                        <td>292258</td>
                                        <td>Enoc</td>
                                        <td>EUROBOB 94 SUMMER</td>
                                        <td>MT</td>
                                        <td></td>
                                        <td class="sell">-1000</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="logistics-footer">
                                <p>footer</p>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="footer"></div> -->
                </div>

                <div class="slave slave-logistics">
                    <div class="content" style="margin-top:-40px;">
                        <div class="grid grid-logistics">
                            
                            <h3 style="color:#fff;font-size:14px;background-color:#0A1718;border-top:1px solid #1F4449;margin:0;padding:10px;">G1803127A : 01/09/18 : Vessel <strong>Hengeist</strong></h3>
                            
                            <div class="filters">
                                <span style="font-size:14px;color:#fff;position:absolute;top:13px;left:20px;">Estimates</span>
                                <label class="switch logistics-estimates"  style="position:absolute;top:12px;left:90px;">
                                    <input type="checkbox">
                                    <span class="slider round"></span>
                                </label>
                            </div>

                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th class="buy">Sabic 3481367</th>
                                        <th class="sell">ENOC 3807272</th>
                                        <th class="buy">ENOC 3807280</th>
                                        <th></th>
                                    </tr>
                                    <tr>
                                        <th></th>
                                        <th>Lot 1</th>
                                        <th>Lot 1</th>
                                        <th>Lot 2</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="row-header logistics-dates" data-section="logistics-dates">
                                        <td><span class="toggle open">Logistics Dates</span></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="align-right">
                                            <a class="add-event" data-menu-type="logistics">+ Add Event</a>
                                        </td>
                                    </tr>
                                    <tr class="row-light logistics-dates">
                                        <td class="align-right">BL</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark logistics-dates">
                                        <td class="align-right">NOR</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light logistics-dates">
                                        <td class="align-right">COD</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark logistics-dates">
                                        <td class="align-right">Risk Transfer</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light logistics-dates last-row">
                                        <td class="align-right">Title Transfer</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    

                                    <tr class="row-header measures" data-section="measures">
                                        <td><span class="toggle open">Measures</span></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="align-right">
                                            <a class="add-event" data-menu-type="measures">+ Add Measure</a>
                                        </td>
                                    </tr>
                                    <tr class="row-light measures">
                                        <td class="align-right">Gross Quantity</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark measures">
                                        <td class="align-right">M3 Quantity</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light measures">
                                        <td class="align-right">BBL Quantity</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark measures">
                                        <td class="align-right">MTA Quantity</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light measures">
                                        <td class="align-right">API/Density</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark measures">
                                        <td class="align-right">Factor</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light measures">
                                        <td class="align-right">Qty Adjustment MT</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark measures">
                                        <td class="align-right">Net Quantity MT</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light measures">
                                        <td class="align-right">Final Invoice Quantity</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark measures">
                                        <td class="align-right">MT</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light measures">
                                        <td class="align-right">Provisional Invoice</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark measures">
                                        <td class="align-right">Quantity MT</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>

                                    <tr class="row-header" data-section="invoice">
                                        <td><span class="toggle open">Invoice</span></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="align-right">
                                            <a class="add-event" data-menu-type="invoice">+ Add Invoice</a>
                                        </td>
                                    </tr>
                                    <tr class="row-light invoice">
                                        <td class="align-right">Currency Price</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark invoice">
                                        <td class="align-right">Proforma Price</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light invoice">
                                        <td class="align-right">Provisional</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark invoice">
                                        <td class="align-right">Prepayment Price</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light invoice">
                                        <td class="align-right">Prov. Prepayment Price</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark invoice">
                                        <td class="align-right">Date</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light invoice">
                                        <td class="align-right">Final Price</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark invoice">
                                        <td class="align-right">Final Due Date</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>

                                    <tr class="row-header" data-section="financing">
                                        <td><span class="toggle open">Financing</span></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td class="align-right">
                                            <a class="add-event" data-menu-type="financing">+ Add Financing</a>
                                        </td>
                                    </tr>
                                    <tr class="row-light financing">
                                        <td class="align-right">Security Type</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark financing">
                                        <td class="align-right">Reference</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light financing">
                                        <td class="align-right">Security Date</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark financing">
                                        <td class="align-right">Financing Bank</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light financing">
                                        <td class="align-right">Confirming Bank</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark financing">
                                        <td class="align-right">Validity From</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light financing">
                                        <td class="align-right">Validity To</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark financing">
                                        <td class="align-right">Amount</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-light financing">
                                        <td class="align-right">Currency</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>
                                    <tr class="row-dark financing">
                                        <td class="align-right">Status</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td>292258</td>
                                        <td></td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="footer">
                        <ul class="actions actions-left">
                            <li class="action action-icon-link close">
                                <a>Close</a>
                            </li>
                            <li class="action action-icon-link window-maximize">
                                <a>Open in full mode</a>
                            </li>
                        </ul>
                        <ul class="actions actions-right">
                            <li class="action action-button">
                                <a class="button button-primary">
                                    <span>Save</span>
                                </a>
                            </li>
                            <li class="action action-button">
                                <a class="button button-primary">
                                    <span>Cancel</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>

            <?php include 'matching-module.php'; ?>

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
            <div class="menu menu-logistics">
                <ul>
                    <li>
                        <a class="menu-item">
                            <span>Event Type 1</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Event Type 2</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Event Type 3</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Event Type 4</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="menu menu-measures">
                <ul>
                    <li>
                        <a class="menu-item">
                            <span>Measure Type 1</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Measure Type 2</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Measure Type 3</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Measure Type 4</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="menu menu-invoice">
                <ul>
                    <li>
                        <a class="menu-item">
                            <span>Invoice Type 1</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Invoice Type 2</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Invoice Type 3</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Invoice Type 4</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="menu menu-financing">
                <ul>
                    <li>
                        <a class="menu-item">
                            <span>Financing Type 1</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Financing Type 2</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Financing Type 3</span>
                        </a>
                    </li>
                    <li>
                        <a class="menu-item">
                            <span>Financing Type 4</span>
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

        <script src="js/modernizr-3.5.0.min.js"></script>
        <script src="js/jquery-3.2.1.min.js"></script>
        <script src="js/bootstrap.bundle.min.js"></script>
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
