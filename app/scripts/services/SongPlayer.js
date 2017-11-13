(function() {
  function SongPlayer() {
    /**
    *@desc songPlayer object
    *@type {Object}
    */
    var SongPlayer = {};
    /**
    *@desc Current Song Object
    *@type {Object}
    */
    var currentSong = null;
    /**
    *@desc Buzz object audio file
    *@type {Object}
    */
    var currentBuzzObject = null;
    
    SongPlayer.play = function(song) {
      if (currentSong !== song){
        setSong(song);
        playSong(song);
      }
      else if (currentSong === song){
        if (currentBuzzObject.isPaused()){
          playSong(song);
        }
      }
    };
    
    SongPlayer.pause = function(song){
      currentBuzzObject.pause();
      song.playing = false;
    };
    /**
    *@function setSong
    *@desc Stops currently playing song and loads new audio file as currentBuzzObject
    *@PARAM {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
 
      currentSong = song;
    };
    
    function playSong (song) {
      currentBuzzObject.play();
      song.playing = true;
    }
    
    return SongPlayer;
  }

 
     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
})();