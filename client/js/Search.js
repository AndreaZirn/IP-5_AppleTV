var baseURL;
 
function alertTemplate() {
    var alertDoc = "<document><alertTemplate><title>Error</title><description>Page failed to load</description></alertTemplate></document>";
    var parser = new DOMParser();
    var parsedTemplate = parser.parseFromString(alertDoc, "application/xml");
    return parsedTemplate;
}
 
function loadingTemplate() {
    var alertDoc = "<document><loadingTemplate><title>Loading ...</title></loadingTemplate></document>";
    var parser = new DOMParser();
    var parsedTemplate = parser.parseFromString(alertDoc, "application/xml");
    return parsedTemplate;
}
 
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
            navigationDocument.replaceDocument(document, loadingDocument)
            search(document);
        }
        else {
            navigationDocument.popDocument();
            var alertDocument = alertTemplate();
            navigationDocument.presentModal(alertDocument);
        }
    };
    request.send();
}
 
App.onLaunch = function(options) {
    baseURL = options.BASEURL;
    var startDocumentURL = baseURL + "templates/SearchTemplate.xml";
    loadAndPushDocument(startDocumentURL)
}
 
function search(document) {
    var searchField = document.getElementsByTagName("searchField").item(0);
    var keyboard = searchField.getFeature("Keyboard");
 
    keyboard.onTextChange = function() {
            var searchText = keyboard.text;
            console.log("Search text changed " + searchText);
            searchResults(document, searchText);
    }
}
 
function searchResults(doc, searchText) {
    var regExp = new RegExp(searchText, "i");
    var matchesText = function(value) {
        return regExp.test(value);
    }
 
    var movies = {
        "Black": 1,
        "Green": 2,
        "Blue": 3,
    };
    var titles = Object.keys(movies);
    console.log(titles);
 
    var domImplementation = doc.implementation;
    var lsParser = domImplementation.createLSParser(1, null);
    var lsInput = domImplementation.createLSInput();
 
    lsInput.stringData = `<list>
      <section>
        <header>
          <title>No Results</title>
        </header>
      </section>
    </list>`;
 
    titles = (searchText) ? titles.filter(matchesText) : titles;
 
    if (titles.length > 0) {
        lsInput.stringData = `<shelf><header><title>Results</title></header><section id="Results">`;
        for (var i = 0; i < titles.length; i++) {
            lsInput.stringData += `<lockup><img src="images/Black.png" width="182" height="274" /><title>${titles[i]}</title></lockup>`
        }
        lsInput.stringData += `</section></shelf>`;
    }
 
    lsParser.parseWithContext(lsInput, doc.getElementsByTagName("collectionList").item(0), 2);
}