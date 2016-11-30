// 1
var resourceLoader;
 
App.onLaunch = function(options) {
  // 2
  var javascriptFiles = [
    `${options.BASEURL}js/ResourceLoader.js`, 
    `${options.BASEURL}js/Presenter.js`
  ];
 
  evaluateScripts(javascriptFiles, function(success) {
    if(success) {
      // 3
      resourceLoader = new ResourceLoader(options.BASEURL);
      resourceLoader.loadResource(`${options.BASEURL}templates/RWDevConTemplate.xml.js`, function(resource) {
        var doc = Presenter.makeDocument(resource);
        doc.addEventListener("select", Presenter.load.bind(Presenter));
        Presenter.pushDocument(doc);
      });
    } else {
      var errorDoc = createAlert("Evaluate Scripts Error", "Error attempting to evaluate external JavaScript files.");
      navigationDocument.presentModal(errorDoc);
    }
  });
}

// 2
var createAlert = function(title, description) {
  var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <alertTemplate>
        <title>${title}</title>
        <description>${description}</description>
        <button>
          <text>Push</text>
        </button>
      </alertTemplate>
    </document>`
    var parser = new DOMParser();
    var alertDoc = parser.parseFromString(alertString, "application/xml");
    return alertDoc
}