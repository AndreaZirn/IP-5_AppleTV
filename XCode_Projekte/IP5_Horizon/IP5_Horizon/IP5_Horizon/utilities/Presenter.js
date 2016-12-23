
class Presenter {

  constructor(resourceLoader, searchHandler) {
    this._resourceLoader = resourceLoader;
    this._searchHandler = searchHandler;
  }

  present(template, data, presentation, eventHandler, sender) {
    if (presentation === 'dismiss') {
      navigationDocument.dismissModal();
    } else if (presentation === 'playVideo') {
      this._playVideo(data, eventHandler);
      return; 
    }

    var enhancedData = this._enchancedDataForTemplate(data, template);
    var doc = this._resourceLoader.getDocument(template, enhancedData);

    if(eventHandler) {
      eventHandler.addEventHandlersToDoc(doc);
    }
    if(template === 'search.tvml') {
      this._searchHandler.registerDocForSearch(doc);
    }   
    switch (presentation) {
      case 'modal':
        navigationDocument.presentModal(doc);
        break;
      case 'push':
        navigationDocument.pushDocument(doc);
        break;
      case 'menuBar':
        this._presentMenuBarItem(doc, sender);
        break;
    }

  }

  _playVideo(data, eventHandler) {
  var player = new Player();
  var video = new MediaItem('video', data.videoURL);
  video.title = data.title;
  video.subtitle = data.subtitle;
  video.description = data.description;
  player.playlist = new Playlist();
  player.playlist.push(video);
  player.present();
}

  _presentMenuBarItem(doc, menuItem) {
    var feature = menuItem.parentNode.getFeature("MenuBarDocument");
    if (feature) {
      var currentDoc = feature.getDocument(menuItem);

      if (!currentDoc) {
        feature.setDocument(doc, menuItem);
      }
    }
  }

  _enchancedDataForTemplate(data, template) {
    var enhancedData = Object.assign({}, data);

    //enhancedData.sharedImages = this._sharedImageResources();
    enhancedData = this._resourceLoader.recursivelyConvertFieldsToURLs(enhancedData, "image");

    if(template === 'video.tvml') {
      enhancedData["images"] = this._convertURLValuesInObject(data["images"]);
    }

    return enhancedData;
  }

 /* 
 _sharedImageResources() {
    var sharedImageNames = {
      background: "tv_background.png"
    };

    return this._convertURLValuesInObject(sharedImageNames);
  }
  */

  _convertURLValuesInObject(object) {
    return this._resourceLoader.convertNamesToURLs(object);
  }

}
