var baseURL;
 
function loadingTemplate() {
    var loadingDoc = "<document><loadingTemplate><activityIndicator><text>Loading ...</text></activityIndicator></loadingTemplate></document>";
    var parser = new DOMParser();
    var parsedTemplate = parser.parseFromString(loadingDoc, "application/xml");
    return parsedTemplate;
}
 
function getDocument(extension) {
    var templateXHR = new XMLHttpRequest();
    var url = baseURL + extension;
    var loadingScreen = loadingTemplate();
 
    loadingTemplate();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {pushPage(templateXHR.responseXML, loadingScreen);}, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
}
 
function pushPage(document) {
    navigationDocument.pushDocument(document);
    navigationDocument.replaceDocument(page, loading);
}
 
App.onLaunch = function(options) {
    baseURL = options.BASEURL;
    var extension = "templates/pagenavigation.xml";
    getDocument(extension);
}