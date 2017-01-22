/*
 * Copyright (c) 2015 Razeware LLC
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 *
 * Class that provides the search handling functionality for a given TVML document.
 */

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
