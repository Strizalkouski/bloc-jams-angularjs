(function() {
  function AlbumCtrl() {
    this.albums.songs[i] = [];
    for (var i=0; i <= this.albums.songs.length; i++){
      this.albums.songs.push(angular.copy(this.albums.songs));
      }
    }
  angular
    .module('blocJams')
    .controller('AlbumCtrl', AlbumCtrl);
})();