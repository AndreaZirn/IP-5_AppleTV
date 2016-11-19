/*Media Player
appropriate player is automatically presented on the type of media item
being played
Most TVML apps will play videos stored on their server and accessed from a 
TVML file. Listing above uses the example used for page navigation to play 
audio and video.
This Media Palyer calls a TVMl file that consits of a stackTemplate*/

var baseURL;
 
function loadingTemplate() {
    var template = '<document><loadingTemplate><activityIndicator><text>Loading</text></activityIndicator></loadingTemplate></document>';
    var templateParser = new DOMParser();
    var parsedTemplate = templateParser.parseFromString(template, "application/xml");
    navigationDocument.pushDocument(parsedTemplate);
}
 
function getDocument(extension) {
    var templateXHR = new XMLHttpRequest();
    var url = baseURL + extension;
 
    loadingTemplate();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {pushPage(templateXHR.responseXML);}, false);
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
    var extension = "templates/mediaItems.xml";
    getDocument(extension);
}
 
App.onExit = function() {
    console.log("exited");
}