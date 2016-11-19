//plays a single video, there is no need for a TVML file

App.onLaunch = function(options) {
    var singleVideo = new MediaItem('video', '*/Enter URL to video here');
    var videoList = new Playlist();
    videoList.push(singleVideo)
    var myPlayer = new Player();
    myPlayer.playlist = videoList;
    myPlayer.play();
}
 
App.onExit = function() {
    console.log('App finished');
}