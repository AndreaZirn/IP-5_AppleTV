

class DataController {
  constructor(resourceLoader) {
    this._resourceLoader = resourceLoader;
  }

  retrieveData(data, presentation) {
    if (data) {
      try {
        var decodedData = JSON.parse(data);
        return decodedData;
      } catch(error) {
        // Wasn't sent a JSON string. Try to load the file instead.
        return this._loadDataFromFile(data);
      }

    }
    return null;
  }

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
