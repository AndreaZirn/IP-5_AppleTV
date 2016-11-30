var baseURL;
 
function loadingTemplate() {
    var loadingDoc = "<document><loadingTemplate><activityIndicator><text>Loading ...</text></activityIndicator></loadingTemplate></document>";
    var parser = new DOMParser();
    var parsedTemplate = parser.parseFromString(loadingDoc, "application/xml");
    navigationDocument.pushDocument(parsedTemplate);
}
 
function getDocument(extension) {
    var templateXHR = new XMLHttpRequest();
    var url = baseURL + extension;
    //var loadingScreen = loadingTemplate();
 
    loadingTemplate();
    templateXHR.responseType = "document";
    //Listener for main Page
    templateXHR.addEventListener("load", function() {pushPage(templateXHR.responseXML);}, false);
    //Json Listener for pictures
    //templateXHR.addEventListener("load", function() {parseJson(templateXHR.responseText);}, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
}
 
function pushPage(document) {
 var currentDoc = getActiveDocument();
    if (currentDoc.getElementsByTagName("loadingTemplate").item(0) == null) {
        console.log("no loading");
        navigationDocument.pushDocument(document);
    } else {
        navigationDocument.replaceDocument(document, currentDoc);
        console.log("loading");
    }
}

//Function that adds an even listener to the menu bar in order to respond to an event
function loadAndPushDocument(url) {
    var loadingDocument = loadingTemplate();
    navigationDocument.pushDocument(loadingDocument);
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
 
    request.onreadystatechange = function() {
        if (request.readyState != 4) {
            return;
        }
 
        if (request.status == 200) {
            var document = request.responseXML;
            document.addEventListener("select", handleSelectEvent);
            navigationDocument.replaceDocument(document, loadingDocument)
        }
        else {
            navigationDocument.popDocument();
            var alertDocument = alertTemplate();
            navigationDocument.presentModal(alertDocument);
        }
    };
    request.send();
}


//handles the selection of the menubar
function handleSelectEvent(event) {
    var selectedElement = event.target;
 
    var targetURL = selectedElement.getAttribute("selectTargetURL");
    if (!targetURL) {
        return;
    }
    targetURL = baseURL + targetURL;
 
    if (selectedElement.tagName == "menuItem") {
        updateMenuItem(selectedElement, targetURL);
    }
    else {
        loadAndPushDocument(targetURL);
    }
}

//updateMenuItem, after a new TVML page is loaded, the menu item has to 
//be updates to present the page
function updateMenuItem(menuItem, url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
 
    request.onreadystatechange = function() {
        if (request.status == 200) {
            var document = request.responseXML;
            document.addEventListener("select", handleSelectEvent);
            var menuItemDocument = menuItem.parentNode.getFeature("MenuBarDocument");
            menuItemDocument.setDocument(document, menuItem)
        }
    };
 
    request.send();
}

//extension contains the path to the media file 
//mediaTyp contais the type of media to be played
function playMedia(extension, mediaType) {
    var videourl = baseURL + extension;
    var singleVideo = new MediaItem(mediaType, videourl);
    var videoList = new Playlist();
    videoList.push(singleVideo);
    var myPlayer = new Player();
    myPlayer.playlist = videoList;
    myPlayer.play();
}

App.onLaunch = function(options) {
    baseURL = options.BASEURL;
  var javascriptFiles = [
    `${options.BASEURL}js/Navigation.js`
  ];

  evaluateScripts(javascriptFiles, function(success) {
    if(success) {
        var extension = "templates/PageNavigation.xml";
        getDocument(extension);
    } else {
      var errorDoc = createAlert("Evaluate Scripts Error", "Error attempting to evaluate external JavaScript files.");
      navigationDocument.presentModal(errorDoc);
    }
  });
}

App.onExit = function() {
    console.log("exited");
}