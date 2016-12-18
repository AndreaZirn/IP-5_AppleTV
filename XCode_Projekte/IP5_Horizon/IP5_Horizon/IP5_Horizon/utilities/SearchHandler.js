

class SearchHandler {

  constructor(resourceLoader, dataController) {
    this._resourceLoader = resourceLoader;
    this._dataController = dataController;
    this._addSearchHandlerToDoc =
      this._addSearchHandlerToDoc.bind(this);
  }

  registerDocForSearch(doc) {
    this._addSearchHandlerToDoc(doc);
  }

  _addSearchHandlerToDoc(doc) {
    var searchFields = doc.getElementsByTagName('searchField');
    for (var i = 0; i < searchFields.length; ++i) {
      var searchField = searchFields.item(i);
      var keyboard = searchField.getFeature("Keyboard");
      keyboard.onTextChange =
        this._handleSearch.bind(this, keyboard, doc);
    }
  }

  _handleSearch(keyboard, doc) {
    var searchString = keyboard.text;
    var results = [];
    if (searchString.length) {
      results = this._dataController.searchVideosForString(searchString);
    }
    var resultNodes = this._renderResults(results);
    var resultContainer = doc.getElementById("results");
    if(resultContainer) {
      while (resultContainer.lastChild) {
        resultContainer.removeChild(resultContainer.lastChild);
      }
      resultNodes.forEach(function(resultNode) {
        doc.adoptNode(resultNode);
        resultContainer.appendChild(resultNode);
      });
    }
  }

  _renderResults(results) {
    var resourceLoader = this._resourceLoader;
    var rendered = results.map(function(result) {
      result["image"] =
        resourceLoader.urlForResource(result["image"]);
      var doc =
        resourceLoader.getDocument("_searchResult.tvml", result);
      return doc.documentElement;
    });
    return rendered;
  }

}
