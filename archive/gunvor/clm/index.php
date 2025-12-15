<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gunvor CLM</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
  <style>
    body, html {
      height: 100%;
      margin: 0;
      overflow: hidden;
      background-color: #F8F9FD;
      font-family: 'Roboto', sans-serif;
    }

    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      width: 48px;
      background-color: #fff;
      transition: width 0.3s;
      overflow-x: hidden;
      z-index: 1050;
      border-right:1px solid #E5E5E5;
    }

    .sidebar.expanded {
      width: 240px;
    }

    .sidebar .toggle-btn {
      width: 100%;
      height: 48px;
      background: #495057;
      border: none;
      color: white;
    }

    .main-content {
      margin: 16px 16px 16px 64px;
      height: calc(100vh - 32px);
      overflow: hidden;
      transition: margin-left 0.3s;
      padding: 0;
      position: relative;
      z-index: 1; /* lower than sidebar */
    }

    ul.navigation {
        list-style-type: none;
        margin:0;
        padding:0;
        position:relative;
        width:240px;
    }

    .icon-container {
        width:32px;
    }

    .navigation-link-label {
        padding-left:20px;
    }

    li a {
        text-decoration: none;
    }

    .nav-tabs .nav-link {
      background-color: transparent;
      border: none;
      font-size: 16px;
      color: #858585;
      font-weight: 500;
      padding: 12px 16px;
    }
    .nav-tabs .nav-link.active {
      background-color: white;
      border: 1px solid #dee2e6;
      border-bottom: none;
      color: #224449;
    }
    .tab-content {
      background: white;
      border: 1px solid #dee2e6;
      border-bottom-right-radius: 8px;
      border-bottom-left-radius: 8px;
      padding: 1rem;
      margin-top: -1px; /* fixes border overlap */
      height: calc(100vh - 80px);
      overflow-y: auto;
    }

    h1 {
        font-size: 18px;
        font-weight:bold;
    }

    .custom-tabs .nav-link {
        border: none;
        border-bottom: 2px solid transparent;
        color: #555;
        font-weight: 500;
        transition: border-color 0.3s, color 0.3s;
    }

    .custom-tabs .nav-link:hover {
        color: #000;
    }

    .custom-tabs .nav-link.active {
        color: #000;
        border:0;
        border-bottom: 5px solid #232323; /* Change to your desired color */
    }

    .sheet {
        position:fixed;
        height:100%;
        top:0;
        bottom:0;
        width:580px;
        z-index:1000;
    }

    .sheet.sheet-right {
        right:0;
    }

    .sheet-content {
        position:absolute;
        top:0;
        right:0;
        bottom:0;
        width:532px;
        background-color: #fff;
    }

    .sheet-right .sheet-content {
        border-left: 1px solid #E5E5E5;
    }

    .sheet-right .sheet-tabs {
        position:absolute;
        top:240px;
        background-color: #fff;
        border-top:1px solid #E5E5E5;
        border-left:1px solid #E5E5E5;
        width:49px;
        padding:0;
        margin:0;
    }

    .sheet-tabs li {
        position:relative;
        background-position:center center;
        background-repeat:no-repeat;
        width:49px;
        height:49px;
        border-bottom:1px solid #E5E5E5;
        text-align: center;
        list-style-type: none;
        
        cursor:pointer;
    }
    .sheet-tabs li .overlay {
        background-color: rgba(255, 255, 255, 0.8);
        border-right: 1px solid #E5E5E5;
    }
    .sheet-tabs li .overlay.active {
        background-color: rgba(255, 255, 255, 0);
        border-right: 1px solid #fff;
    }
    .sheet-tabs li.contract-details {
        background-image: url('./img/icon-contract.svg');
    }
    .sheet-tabs li.contract-placeholders {
        background-image: url('./img/icon-placeholders.svg');
    }
    .sheet-tabs li.contract-clauses {
        background-image: url('./img/icon-clauses.svg');
    }
    .sheet-tabs li.active {
        border-right: 1px solid #fff;
    }

    .offcanvas-tabs {
        position: fixed;
        top: 50%;
        right: 100%; /* Stick to the left edge of offcanvas */
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1056; /* Higher than default so it's clickable */
    }

    .tab-trigger {
        writing-mode: vertical-rl;
        text-orientation: mixed;
        background-color: #007bff;
        color: white;
        border: none;
        padding: 8px;
        cursor: pointer;
        border-radius: 4px 4px 0 0;
    }
  </style>
</head>
<body>

  <div id="sidebar" class="sidebar d-flex flex-column justify-content-between">
    <div class="primary-navigation">
        <a class="d-block text-left my-3 pl-3" onclick="toggleSidebar(event)">
            <img src="./img/logo.svg" class="position-relative" style="left:10px;" />
        </a>
        <div class="text-dark">
            <ul class="navigation px-2 pt-2">
                <li class="d-flex align-items-center pb-3">
                    <div class="icon-container text-center">
                        <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.417.158a.667.667 0 0 0-.862 0L.235 6.37a.667.667 0 0 0-.078.938c.236.28.657.313.937.077l.682-.576v5.171c0 1.226.993 2.219 2.219 2.219h7.986a2.218 2.218 0 0 0 2.218-2.219V6.808l.68.576a.664.664 0 1 0 .86-1.015L8.416.16zM3.107 11.98v-6.3l4.88-4.14 4.881 4.14v6.3c0 .491-.396.888-.887.888H10.65V8.652c0-.613-.497-1.11-1.11-1.11H6.436c-.613 0-1.11.497-1.11 1.11v4.215h-1.33a.886.886 0 0 1-.888-.888zm3.55.888V8.873h2.662v3.994H6.657z" fill="#232323" fill-rule="nonzero"/>
                        </svg>
                    </div>
                    <a href="" class="text-dark"><p class="ms-2 my-0 small flex-shrink-0">Dashboard</p></a>
                </li>
                <li class="d-flex align-items-center pb-3">
                    <div class="icon-container text-center">
                        <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.497 0c.262 0 .5.148.614.384l1.949 4.014 4.352.642a.685.685 0 0 1 .38 1.16l-3.156 3.13.745 4.42a.683.683 0 0 1-.995.716l-3.892-2.08-3.886 2.077a.678.678 0 0 1-.719-.048.689.689 0 0 1-.276-.667l.745-4.421L.2 6.199a.68.68 0 0 1-.167-.696.687.687 0 0 1 .548-.463l4.353-.642L6.883.384A.683.683 0 0 1 7.497 0zm0 2.244L6.006 5.318a.688.688 0 0 1-.515.378l-3.36.495 2.44 2.417c.156.156.23.378.193.597l-.577 3.4 2.99-1.596a.677.677 0 0 1 .641 0l2.989 1.596-.574-3.397a.676.676 0 0 1 .193-.597l2.44-2.418-3.36-.497a.687.687 0 0 1-.514-.378L7.497 2.244z" fill="#232323" fill-rule="nonzero"/>
                        </svg>
                    </div>
                    <a href="" class="text-dark"><p class="ms-2 my-0 small flex-shrink-0">Favorites</p></a>
                </li>
                <li class="d-flex align-items-center pb-3">
                    <div class="icon-container text-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 0c-.553 0-1 .447-1 1v2a.999.999 0 1 0 2 0v-.916a6 6 0 1 1-5.2 1.632 1.002 1.002 0 0 0-1.4-1.431A8 8 0 0 0 8 16a8 8 0 0 0 8-8.001 8 8 0 0 0-8-8zM6.031 4.969a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.06-1.06l-2.5-2.5z" fill="#232323" fill-rule="nonzero"/>
                        </svg>
                    </div>
                    <a href="" class="text-dark"><p class="ms-2 my-0 small flex-shrink-0">Recent</p></a>
                </li>
            </ul>

            <ul class="navigation mt-3 pt-4 border-top px-2">
                <li class="d-flex align-items-center pb-3">
                    <div class="icon-container text-center">
                        <svg width="12" height="16" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 14.5a.501.501 0 0 1-.5-.5V2c0-.275.225-.5.5-.5h5V4c0 .553.447 1 1 1h2.5v9c0 .275-.225.5-.5.5H2zM2 0C.897 0 0 .897 0 2v12c0 1.103.897 2 2 2h8c1.103 0 2-.897 2-2V4.828a2 2 0 0 0-.584-1.416L8.584.585A1.993 1.993 0 0 0 7.172 0H2zm1.75 8a.748.748 0 0 0-.75.75c0 .416.334.75.75.75h4.5c.416 0 .75-.334.75-.75A.748.748 0 0 0 8.25 8h-4.5zm0 3a.748.748 0 0 0-.75.75c0 .416.334.75.75.75h4.5c.416 0 .75-.334.75-.75a.748.748 0 0 0-.75-.75h-4.5z" fill="#232323" fill-rule="nonzero"/>
                        </svg>
                    </div>
                    <a href="" class="text-dark"><p class="ms-2 my-0 small flex-shrink-0">Contracts</p></a>
                </li>
                <li class="d-flex align-items-center pb-3">
                    <div class="icon-container text-center">
                        <svg width="20" height="16" viewBox="0 0 20 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 2.25c0-.416.334-.75.75-.75h8.5c.415 0 .75.334.75.75v5.5c0 .415-.335.75-.75.75h-4a.755.755 0 0 0-.416.124L4.5 9.85v-.6a.748.748 0 0 0-.75-.75h-1.5a.748.748 0 0 1-.75-.75v-5.5zM2.25 0A2.248 2.248 0 0 0 0 2.25v5.5A2.248 2.248 0 0 0 2.25 10H3v1.25a.752.752 0 0 0 1.165.624l2.813-1.875h3.771A2.248 2.248 0 0 0 13 7.75v-5.5A2.248 2.248 0 0 0 10.749 0h-8.5zM8 11.749a2.248 2.248 0 0 0 2.25 2.25h2.77l2.813 1.875A.752.752 0 0 0 17 15.249v-1.25h.75a2.248 2.248 0 0 0 2.25-2.25v-5.5A2.248 2.248 0 0 0 17.748 4h-3.75v1.5h3.75c.415 0 .75.335.75.75v5.5c0 .416-.335.75-.75.75h-1.5a.748.748 0 0 0-.75.75v.6l-1.835-1.225a.755.755 0 0 0-.415-.125h-3a.748.748 0 0 1-.75-.75v-.75H8v.75z" fill="#232323" fill-rule="nonzero"/>
                        </svg>
                    </div>
                    <a href="" class="text-dark"><p class="ms-2 my-0 small flex-shrink-0">Communications</p></a>
                </li>
                <li class="d-flex align-items-center pb-3">
                    <div class="icon-container text-center">
                        <svg width="21" height="16" viewBox="0 0 21 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.286 1.714c.314 0 .571.257.571.572v11.428a.573.573 0 0 1-.571.572h-16a.573.573 0 0 1-.572-.572V2.286c0-.315.257-.572.572-.572h16zM2.286 0A2.288 2.288 0 0 0 0 2.286v11.428A2.288 2.288 0 0 0 2.286 16h16a2.288 2.288 0 0 0 2.285-2.286V2.286A2.288 2.288 0 0 0 18.286 0h-16zm5.143 8a2.286 2.286 0 1 0 0-4.571 2.286 2.286 0 0 0 0 4.571zM6.286 9.143A2.856 2.856 0 0 0 3.429 12c0 .314.257.571.571.571h6.857A.573.573 0 0 0 11.43 12 2.856 2.856 0 0 0 8.57 9.143H6.286zM13.429 4a.855.855 0 0 0-.858.857c0 .475.383.857.858.857h2.857a.855.855 0 0 0 .857-.857.855.855 0 0 0-.857-.857h-2.857zm0 3.429a.855.855 0 0 0-.858.857c0 .475.383.857.858.857h2.857a.855.855 0 0 0 .857-.857.855.855 0 0 0-.857-.857h-2.857z" fill="#232323" fill-rule="nonzero"/>
                        </svg>
                    </div>
                    <a href="" class="text-dark"><p class="ms-2 my-0 small flex-shrink-0">Address Book</p></a>
                </li>
                <li class="d-flex align-items-center pb-3">
                    <div class="icon-container text-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.452.156a.748.748 0 0 0-.985.063L.219 1.466a.751.751 0 0 0-.065.986l2.495 3.244a.75.75 0 0 0 .592.293H4.93l3.4 3.4a2.409 2.409 0 0 0 .445 2.794l3.494 3.493a1 1 0 0 0 1.412 0l1.997-1.996a1 1 0 0 0 0-1.413l-3.494-3.493a2.414 2.414 0 0 0-2.794-.446l-3.4-3.4V3.241a.745.745 0 0 0-.293-.593L2.452.156zM.724 11.752a2.472 2.472 0 0 0 3.493 3.493l3.222-3.221a3.422 3.422 0 0 1-.361-1.756l-3.918 3.92a.974.974 0 0 1-1.379-1.379l4.28-4.278-1.057-1.058-4.28 4.28zM14.47 5.115a3.499 3.499 0 0 1-1.677 2.864c.034.03.065.062.096.093l.986.986a4.982 4.982 0 0 0 2.096-4.064c0-.774-.178-1.507-.49-2.162-.137-.287-.515-.327-.74-.103l-2.117 2.118a.5.5 0 0 1-.352.147l-.793-.003a.5.5 0 0 1-.499-.5V3.7a.5.5 0 0 1 .147-.352l2.118-2.118c.224-.224.184-.602-.103-.739A5.016 5.016 0 0 0 10.979 0a4.981 4.981 0 0 0-4.235 2.352c.156.268.243.574.243.892v1.273l.5.499V4.99a3.49 3.49 0 0 1 3.368-3.49l-.79.789a1.997 1.997 0 0 0-.583 1.413v.792c0 1.1.895 1.996 1.996 1.996h.793c.53 0 1.038-.21 1.413-.583l.785-.793z" fill="#232323" fill-rule="nonzero"/>
                        </svg>
                    </div>
                    <a href="" class="text-dark"><p class="ms-2 my-0 small flex-shrink-0">Reference Data</p></a>
                </li>
                <li class="d-flex align-items-center pb-3">
                    <div class="icon-container text-center">
                        <svg width="14" height="17" viewBox="0 0 14 17" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.823 2.177a2.144 2.144 0 0 0-3.033 0l-6.187 6.19a3.598 3.598 0 0 0 0 5.093 3.607 3.607 0 0 0 5.097 0l4.897-4.9a.773.773 0 0 1 1.093 1.093l-4.897 4.903A5.152 5.152 0 0 1 1.507 7.27l6.19-6.19a3.691 3.691 0 1 1 5.222 5.22l-5.925 5.925a2.415 2.415 0 0 1-3.595-.2 2.418 2.418 0 0 1 .178-3.217l4.893-4.89A.773.773 0 0 1 9.563 5.01l-4.89 4.893a.865.865 0 1 0 1.225 1.225l5.925-5.922a2.144 2.144 0 0 0 0-3.033v.003z" fill="#232323" fill-rule="nonzero"/>
                        </svg>
                    </div>
                    <a href="" class="text-dark"><p class="ms-2 my-0 small flex-shrink-0">Repository</p></a>
                </li>
                <li class="d-flex align-items-center pb-3">
                    <div class="icon-container text-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.909 10.188a.894.894 0 0 1-.189-1.08 6.227 6.227 0 0 0 .66-3.708C12.04 2.725 9.93.523 7.27.087A6.224 6.224 0 0 0 .084 7.263c.434 2.658 2.629 4.768 5.3 5.115a6.217 6.217 0 0 0 3.703-.649.892.892 0 0 1 1.07.185l3.361 3.63c.587.634 1.637.588 2.19-.106.478-.6.342-1.487-.225-2.002l-3.575-3.248zM1.6 6.216a4.616 4.616 0 1 1 9.232 0 4.616 4.616 0 0 1-9.232 0z" fill="#232323" fill-rule="evenodd"/>
                        </svg>
                    </div>
                    <a href="" class="text-dark"><p class="ms-2 my-0 small flex-shrink-0">Search</p></a>
                </li>
            </ul>
        </div>
    </div>
    <div class="utility-navigation">
        <div class="text-dark">
            <ul class="navigation border-top pt-4 px-2">
                <li class="d-flex align-items-center pb-3">
                    <div class="icon-container text-center">
                        <svg width="17" height="19" viewBox="0 0 17 19" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.694 0C8.062 0 7.55.51 7.55 1.143v.686a5.717 5.717 0 0 0-4.571 5.6v.907a7.15 7.15 0 0 1-1.565 4.46l-.532.668a.855.855 0 0 0 .668 1.393h14.286a.858.858 0 0 0 .668-1.393l-.532-.664a7.167 7.167 0 0 1-1.565-4.464v-.907a5.717 5.717 0 0 0-4.571-5.6v-.686C9.837.51 9.327 0 8.694 0zm0 3.429c2.21 0 4 1.789 4 4v.907a8.87 8.87 0 0 0 1.418 4.807H3.276a8.87 8.87 0 0 0 1.418-4.807v-.907c0-2.211 1.79-4 4-4zM10.98 16H6.408c0 .607.24 1.19.668 1.618.429.429 1.01.668 1.618.668.607 0 1.19-.24 1.618-.668.428-.429.668-1.01.668-1.618z" fill="#232323" fill-rule="nonzero"/>
                        </svg>
                    </div>
                    <a href="" class="text-dark"><p class="ms-2 my-0 small flex-shrink-0">Notifications</p></a>
                </li>
                <li class="d-flex align-items-center pb-3">
                    <div class="icon-container text-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 8.61V7.39a.719.719 0 0 0-.72-.72h-.197c-.46 0-.862-.297-1.011-.732a6.268 6.268 0 0 0-.318-.764 1.073 1.073 0 0 1 .193-1.241l.142-.142a.72.72 0 0 0 0-1.016l-.864-.863a.719.719 0 0 0-1.016 0l-.152.151c-.326.327-.821.4-1.236.196a6.368 6.368 0 0 0-.755-.312A1.072 1.072 0 0 1 9.33.935V.719A.719.719 0 0 0 8.611 0H7.389a.719.719 0 0 0-.718.72v.236c0 .46-.296.86-.73 1.01-.254.088-.5.192-.738.31a1.074 1.074 0 0 1-1.241-.194l-.17-.17a.719.719 0 0 0-1.017 0l-.863.863a.719.719 0 0 0 0 1.016l.18.181c.327.327.4.822.196 1.237a6.499 6.499 0 0 0-.302.727c-.149.437-.55.735-1.012.735H.72A.72.72 0 0 0 0 7.389v1.222a.72.72 0 0 0 .72.718h.254c.462 0 .863.298 1.012.735.086.25.187.492.302.727.203.415.131.91-.196 1.237l-.18.18a.719.719 0 0 0 0 1.017l.863.864a.72.72 0 0 0 1.016 0l.171-.17c.328-.329.825-.4 1.241-.194.238.117.484.22.738.308.434.15.73.552.73 1.01v.238c0 .397.322.719.718.719h1.222a.719.719 0 0 0 .718-.72v-.215c0-.462.3-.864.737-1.012.26-.088.511-.193.755-.312.415-.204.91-.13 1.236.196l.152.152a.72.72 0 0 0 1.016 0l.864-.864a.72.72 0 0 0 0-1.016l-.142-.142a1.073 1.073 0 0 1-.193-1.24c.122-.247.229-.502.318-.765.15-.435.55-.733 1.011-.733h.198c.397 0 .719-.322.719-.718zm-7.025 3.418a4.142 4.142 0 0 1-4.973-4.974 4.101 4.101 0 0 1 3.082-3.082 4.142 4.142 0 0 1 4.973 4.974 4.101 4.101 0 0 1-3.082 3.082z" fill="#232323" fill-rule="evenodd"/>
                        </svg>
                    </div>
                    <a href="" class="text-dark"><p class="ms-2 my-0 small flex-shrink-0">Settings</p></a>
                </li>
                <li class="d-flex align-items-center pb-3">
                    <div class="icon-container text-center">
                        <svg width="16" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.004 9.203c-.586 0-1.061-.493-1.061-1.1V1.1c0-.607.475-1.1 1.061-1.1s1.062.493 1.062 1.1v7.002c0 .608-.476 1.1-1.062 1.1zm2.923-6.495c-.28.501-.124 1.142.341 1.462 1.636 1.126 2.7 3.07 2.645 5.272-.083 3.223-2.709 5.914-5.82 5.963-3.309.053-6.008-2.712-6.008-6.129 0-2.138 1.057-4.018 2.659-5.115.464-.316.614-.96.333-1.458-.29-.519-.946-.7-1.433-.373C1.474 3.792.028 6.312 0 9.19c-.044 4.446 3.469 8.244 7.756 8.376C12.286 17.704 16 13.94 16 9.276c0-2.907-1.446-5.457-3.63-6.936-.489-.331-1.15-.153-1.443.368z" fill="#232323" fill-rule="evenodd"/>
                        </svg>
                    </div>
                    <a href="" class="text-dark"><p class="ms-2 my-0 small flex-shrink-0">Logout</p></a>
                </li>
            </ul>
        </div>
    </div>
  </div>

  <div id="main-content" class="main-content bg-white border rounded">
    <div class="row border-bottom">
        <div class="col ps-4 py-3">
            <h1 class="m-0 p-0">Workspace title</h1>
        </div>
    </div>
    <ul class="nav nav-tabs custom-tabs ms-2" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link active" id="tab1-tab" data-bs-toggle="tab" data-bs-target="#tab1" type="button" role="tab" aria-controls="tab1" aria-selected="true">Contract Editing</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="tab2-tab" data-bs-toggle="tab" data-bs-target="#tab2" type="button" role="tab" aria-controls="tab2" aria-selected="false">File Viewer</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="tab3-tab" data-bs-toggle="tab" data-bs-target="#tab3" type="button" role="tab" aria-controls="tab3" aria-selected="false">Document Compare</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="tab4-tab" data-bs-toggle="tab" data-bs-target="#tab4" type="button" role="tab" aria-controls="tab4" aria-selected="false">Text Comparison</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="tab5-tab" data-bs-toggle="tab" data-bs-target="#tab5" type="button" role="tab" aria-controls="tab5" aria-selected="false">Clause Repository</button>
        </li>
    </ul>


    <!-- Tab content -->
    <div class="tab-content p-0" id="myTabContent">
        <div class="tab-pane fade show active h-100" id="tab1" role="tabpanel" aria-labelledby="tab1-tab">
            <div class="row h-100">
                <div class="col col-3 border-end"><h1>Viewport 123456</h1></div>
                <div class="col col-6 border-end"><h1>Viewport 2</h1></div>
                <div class="col col-3"><h1>Viewport 3</h1></div>
            </div>
        </div>
        <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="tab2-tab">
            <h3>Content for Tab 2</h3>
            <p>This is the content for Tab 2.</p>
        </div>
        <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="tab3-tab">
            <h3>Content for Tab 3</h3>
            <p>Here's Tab 3 content.</p>
        </div>
        <div class="tab-pane fade" id="tab4" role="tabpanel" aria-labelledby="tab4-tab">
            <h3>Content for Tab 4</h3>
            <p>Tab 4 content lives here.</p>
        </div>
        <div class="tab-pane fade" id="tab5" role="tabpanel" aria-labelledby="tab5-tab">
            <h3>Content for Tab 5</h3>
            <p>Tab 5 content lives here.</p>
        </div>
    </div>

  </div>

    <div class="sheet sheet-right">
        <div class="sheet-content tab-content h-100" style="border-radius: 0;" id="sheet-content">
            <div class="contract-details tab-pane fade show active" id="sheet-contract-details" role="tabpanel">
                <p>Contract Details</p>
                <i class="fa-regular fa-xmark close-sheet-right text-dark" style="position:absolute;top:20px;right:20px;z-index:10000;"></i>
            </div>
            <div class="contract-placeholders tab-pane fade" id="sheet-contract-placeholders" role="tabpanel">Contract Placeholders</div>
            <div class="contract-clases tab-pane fade" id="sheet-contract-clauses" role="tabpanel">Contract Clauses</div>

        </div>

        <ul class="sheet-tabs nav nav-tabs" id="sheet-tabs">
            <li class="contract-details nav-item">
                <button class="nav-link overlay w-100 h-100 active" id="tab-contract-details" data-bs-toggle="tab" data-bs-target="#sheet-contract-details" type="button" role="tab" aria-selected="false">&nbsp;</button>
                <!-- <div class="overlay w-100 h-100">&nbsp;</div> -->
            </li>
            <li class="contract-placeholders nav-item">
                <button class="nav-link overlay w-100 h-100" id="tab-contract-placeholders" data-bs-toggle="tab" data-bs-target="#sheet-contract-placeholders" type="button" role="tab" aria-selected="false">&nbsp;</button>
                <!-- <div class="overlay w-100 h-100">&nbsp;</div> -->
            </li>
            <li class="contract-clauses nav-item">
                <button class="nav-link overlay w-100 h-100" id="tab-contract-clauses" data-bs-toggle="tab" data-bs-target="#sheet-contract-clauses" type="button" role="tab" aria-selected="false">&nbsp;</button>
                <!-- <div class="overlay w-100 h-100">&nbsp;</div> -->
            </li>
        </ul>
        
    </div>

    <!-- Trigger Tabs (attached to offcanvas left edge) -->
    <!-- <div class="offcanvas-tabs">
        <button class="tab-trigger" data-bs-toggle="offcanvas" data-bs-target="#myOffcanvas" data-tab="tab1">Tab 1</button>
        <button class="tab-trigger" data-bs-toggle="offcanvas" data-bs-target="#myOffcanvas" data-tab="tab2">Tab 2</button>
    </div> -->

    <!-- Offcanvas Component -->
    <!-- <div class="offcanvas offcanvas-end" tabindex="-1" id="myOffcanvas" aria-labelledby="offcanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasLabel">Offcanvas</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
        </div>
        <div class="offcanvas-body">
            <div class="tab-content">
                <div class="tab-pane fade show active" id="tab1-content">Tab 1 Content</div>
                <div class="tab-pane fade" id="tab2-content">Tab 2 Content</div>
            </div>
        </div>
    </div> -->

  <script>
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');

    function toggleSidebar(event) {
      event.stopPropagation(); // Prevent sidebar click from closing itself
      sidebar.classList.toggle('expanded');
    }

    // Collapse sidebar if clicked outside
    document.addEventListener('click', function (event) {
      if (sidebar.classList.contains('expanded') && !sidebar.contains(event.target)) {
        sidebar.classList.remove('expanded');
      }
    });

    // Prevent clicks inside the sidebar from triggering collapse
    sidebar.addEventListener('click', function(event) {
      event.stopPropagation();
    });

    // Expand when mouse enters
    sidebar.addEventListener('mouseenter', function() {
        sidebar.classList.add('expanded');
    });

    // Collapse when mouse leaves
    sidebar.addEventListener('mouseleave', function() {
        sidebar.classList.remove('expanded');
    });
  </script>

  <!-- Bootstrap 5 JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

  <!-- FONT-AWESOME -->
    <script src="https://kit.fontawesome.com/71a1b77613.js" crossorigin="anonymous"></script>

</body>
</html>