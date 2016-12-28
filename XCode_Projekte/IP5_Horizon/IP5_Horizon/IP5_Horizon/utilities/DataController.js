

class DataController {
  constructor(resourceLoader) {
    this._resourceLoader = resourceLoader;
  }

  retrieveData(data, presentation) {
    if (data) {
      try {
        var decodedData = JSON.parse(data);
        if(presentation === 'playVideo') {
          decodedData.resumeTime =
            this.progressForVideoAtURL(decodedData.videoURL);
        }
        return decodedData;
      } catch(error) {
        // Wasn't sent a JSON string. Try to load the file instead.
        return this._loadDataFromFile(data);
      }

    }
    return null;
  }

  progressForVideoAtURL(url) {
    return localStorage.getItem(url) || 0;
  }

  saveProgressForVideoAtURL(url, progress) {
    localStorage.setItem(url, progress);
  }


  //can be swaped with a call to the data-provdiers's API
  searchVideosForString(searchString) {
    var sourceData = this._loadDataFromFile("videoDatabase.json");

    var results = sourceData.filter(function(v) {
      var title = v.title;
      var imageName = v.image;

      return title.toLowerCase().includes(searchString.toLowerCase())
        || imageName.toLowerCase().includes(searchString.toLowerCase());
    });

    return results;
  }

  _loadDataFromFile(fileName) {
    return this._resourceLoader.getJSON(fileName);
  }

}
