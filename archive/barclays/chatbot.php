<div id="chatbot">
    <div class="welcome-messages" style="display: none;"></div>
    <div class="container" style="display: none;">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="barclays-search">
                    <img style="height: 80px; width: 80px;" src="img/favicon.svg"></img>
                    <h1 style="color: white;">Welcome to Barclays HR</h1>
                    <div class="search center-block" style="display: block; text-align: left;">
                        <span style="margin-left: 10px; font-size: 20px;" id="search-box"></span>
                        <span class="typed-cursor" style="animation-iteration-count: infinite;">|</span>
                        <div style=" height: 28px; width: 35px; border-left:1px solid grey; float: right; background-color: rgb(0, 174, 239); cursor: pointer; border-radius: 5px;">
                            <i class="fa fa-search" style="color: white; font-size: 20px; position: absolute;margin-left: 8px; margin-top: 4px;"></i>
                        </div>
                    </div>
                    <div class="results" style="display: none;">
                        <div class="result">
                            <h4>Sickness</h4>
                            <p>How ill health is managed where an employee is absent due to...</p>
                            <p>Authors: Amrin, Sana: Hrss Date: 16/03/17 Size: 76KB</p>
                        </div>
                        <div class="result">
                            <h4>My HR Requests</h4>
                            <p>Extention, position change (within LMs span of control) or contractural work address...</p>
                            <p>Authors: Joe, Funnel: Hrss Date: 14/03/16 Size: 34KB</p>
                        </div>
                        <div class="result">
                            <h4>Time Away From Work Policy</h4>
                            <p>Is to support you in carrying out work for our customers and clients...</p>
                            <p>Authors: Amrin, Sana: Hrss Date: 20/10/17 Size: 1MB</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3"></div>
        </div>
    </div>
    <div class="outerbox">
        <div class="header">
            <div id="close-button">
                <img class="far fa-times-circle close" src="img/icons/icon-chatbot-close.png">
            </div>
            <img class="logo center-block" src="img/icons/icon-flat-eagle.png">
        </div>
        <div class="chat-body">
            <h1 class="header-body-text">Messaging By Barclays HR</h1>
        </div>
        <div class="input-field">
            <input autofocus placeholder="Type your message..." class="text-input" type="text" name="chat-input">
            <div class="send">
                <i class="fas fa-paper-plane"></i>
            </div>
        <!-- <div class="emoji" id="emoji-btn">
        <i style="color: #FFBC42;" class="far fa-smile"></i>
        </div> -->
        </div>
    </div>
    <div class="chat-head">
        <img src="img/chatbot-cta.png">
    </div>
    <!-- <button class="execute_response">Test response</button>
    <button class="execute_hyperlink_response">Test Hyperlink Response</button>
    <button class="Execute_carusel_response">Tets Carusel Response</button>
    <div class="card-slider">
      <div class="card-container">
        <div class="card center-block carid-1">
          <div class="card-image"></div>
          <div class="card-description"></div>
          <div class="card-button"></div>
        </div>
        <div class="card center-block cardid-2">
          <div class="card-image"></div>
          <div class="card-description"></div>
          <div class="card-button"></div>
        </div>
        <div class="card center-block cardid-3">
          <div class="card-image"></div>
          <div class="card-description"></div>
          <div class="card-button"></div>
        </div>
      </div>
      <div class="button-container">
        <div class="next-button">
          <i class="fas fa-arrow-circle-right next-button-font"></i>
        </div>
      <div class="previous-button">
        <i class="fas fa-arrow-circle-left previous-button-font"></i>
      </div>
    </div> -->

    <!-- image popup code -->
    <!-- Creates the bootstrap modal where the image will appear -->
    <div class="modal fade" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title" id="titleModel"></h4>
                </div>

                <div class="modal-body">
                    <img src="" id="imagepreview" width="100%"/>
                </div>
            </div>
        </div>
    </div>

    <div style="display: none;">
        <p id="emoji-psuedo"></p>
    </div>




