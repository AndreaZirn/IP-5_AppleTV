

class EventHandler {
  constructor(presenter, dataController) {
    this._presenter = presenter;
    this._dataController = dataController;
    this.handleEvent = this.handleEvent.bind(this);
    this.handlePlaybackUpdates = this.handlePlaybackUpdates.bind(this);
  }

  addEventHandlersToDoc(doc) {
    doc.addEventListener("select", this.handleEvent);
  }

  handleEvent(event) {
    var element = event.target;
    var template = element.getAttribute("template"),
    presentation = element.getAttribute("presentation"),
    data = element.getAttribute("data"),
    action = element.getAttribute("action");
    var retrievedData = this._dataController.retrieveData(data, presentation);
    
    if(presentation) {
      this._presenter.present(template, retrievedData, presentation, this, element);
    }
  }

  //handles playback option for a video
  handlePlaybackUpdates(event) {
  var url = event.target.currentMediaItem.url;
  var progress = event.time;
  this._dataController.saveProgressForVideoAtURL(url, progress);
  }

}
