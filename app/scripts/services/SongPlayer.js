(function() {
  function SongPlayer($rootScope, Fixtures) {
    /**
    *@desc songPlayer object
    *@type {Object}
    */
    var SongPlayer = {};
      
    /**
    *@desc Current Album
    *@type {Object}
    */
    var currentAlbum = Fixtures.getAlbum();
    /**
    *@desc Buzz object audio file
    *@type {Object}
    */
      
    var currentBuzzObject = null;
    /**  
    *@desc Current Song Object
    *@type {Object}
    */
    
     function playSong (song) {
      currentBuzzObject.play();
      song.playing = true;
    }
      
    var stopSong = function(){
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
    }
      
    /**
    *@desc Song Index
    *@type {Object}
    */
      
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);  
    };
      
        /**
    *@function setSong
    *@desc Stops currently playing song and loads new audio file as currentBuzzObject
    *@PARAM {Object} song
    */
    var setSong = function(song) {
      if (currentBuzzObject) {
        stopSong();
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
        
      currentBuzzObject.bind('timeupdate', function() {
          $rootScope.$apply(function() {
              SongPlayer.currentTime = currentBuzzObject.getTime();
          });
      });
 
      SongPlayer.currentSong = song;
    };
    
    /**
    * @desc Active song object from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;
    /**
    *@desc Current playback time in second of currently playing song
    *@type {Number}
    */
      SongPlayer.currentTime = null;
    
    /**
    * @function Play
    * @desc Play current or new song
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
        song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song){
        setSong(song);
        playSong(song);
      }
      else if (SongPlayer.currentSong === song){
        if (currentBuzzObject.isPaused()){
          playSong(song);
        }
      }
    };
    /**
    * @function pause
    * @desc Pause current song
    * @param {Object} song
    */
     SongPlayer.pause = function(song){
        song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };
    
    /**
    *@function previous
    *@desc go to previous song
    *@param {Object} index
    */
    SongPlayer.previous = function () {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex--;
        if (currentSongIndex < 0) {
            stopSong();
        }
        else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
    };
      
    SongPlayer.next = function () {
        var currentSongIndex = getSongIndex(SongPlayer.currentSong);
        currentSongIndex++;
        if (currentSongIndex > currentAlbum.songs.length){
            stopSong();
    }
        else {
            var song = currentAlbum.songs[currentSongIndex];
            setSong(song);
            playSong(song);
        }
    };
    
    /**
    *@function setCurrentTime
    *@desc Set current time in second of currently playing song
    *@param {Number} time
    */
    SongPlayer.setCurrentTime = function(time) {
        if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
        }
    };
   
    return SongPlayer;
  }

 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();