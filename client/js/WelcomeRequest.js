//This code retrieves a TVML page, but does nothing during the retrieval.
var baseURL;
 
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
 
    var templateURL = baseURL + "templates/Welcome.xml";
    getDocument(templateURL);
}