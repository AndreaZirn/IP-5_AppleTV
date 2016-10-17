//loading template to show users that the app is loading information.

var baseURL;
 
function loadingDoc() {
    var template = '<document><loadingTemplate><activityIndicator><text>Loading</text></activityIndicator></loadingTemplate></document>';
 
    var templateParser = new DOMParser();
    var parsedTemplate = templateParser.parseFromString(template, "application/xml");
    navigationDocument.pushDocument(parsedTemplate);
}
 
function getDocument(url) {
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {pushDoc(templateXHR.responseXML);}, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
}
 
function pushDoc(document) {
    navigationDocument.pushDocument(document);
}
 
App.onLaunch = function(options) {
    baseURL = options.BASEURL;
    loadingDoc();
    var templateURL = baseURL + "templates/Welcome.xml";
    getDocument(templateURL);
}