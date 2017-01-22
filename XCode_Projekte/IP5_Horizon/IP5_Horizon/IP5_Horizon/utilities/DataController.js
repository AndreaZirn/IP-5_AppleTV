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
 * Class which works a  Controller which loads data from either a static JSON 
 * file or a JSON string.
 */

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

  //retrieve progress of a video
  progressForVideoAtURL(url) {
    return localStorage.getItem(url) || 0;
  }

  //save progress of a video
  saveProgressForVideoAtURL(url, progress) {
    localStorage.setItem(url, progress);
  }

}
