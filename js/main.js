var music = document.getElementById('eminem');
var fullProgress = parseInt($('.audio-progress-bar-wrapper').css('width')) - 15;
var currentProgress = 0;
var progressDrag = false;
$(document).ready(function() {
	var minutes
	var seconds
	let getMinutes = setInterval(function () {
		minutes = Math.floor(music.duration/60);
		seconds = Math.floor(music.duration - minutes*60);
		if(!(isNaN(minutes) || isNaN(seconds))) {
			clearInterval(getMinutes)
			$('.audio-song-length-minutes').text(minutes);
			$('.audio-song-length-seconds').text(seconds);
		}
	}, 100)
	var currentMinutes;
	var currentSeconds;
	

	$('.play-pause').click(function(event) {
		$(this).toggleClass('pause');
		if ($(this).hasClass('pause')) {
			music.play();
			/*setInterval(function(){
				console.log(music.currentTime, Math.floor(music.currentTime/60), ":", Math.floor(music.currentTime - Math.floor(music.currentTime/60)*60));
				
			}, 900);*/
		}
		else {
			music.pause();
		};
	});
	
})

function timeUpdate() {
	currentMinutes = Math.floor(music.currentTime/60);
	currentSeconds = Math.floor(music.currentTime - currentMinutes*60);
	$('.audio-song-progress-minutes').text(currentMinutes);
	if (currentSeconds < 10) {
		currentSeconds = "0" + currentSeconds;
	}
	$('.audio-song-progress-seconds').text(currentSeconds);
	currentProgress = fullProgress * music.currentTime/music.duration;
	
	console.log(currentProgress);
	if (!progressDrag) {
		$('.audio-progress-bar-playing').css('width', currentProgress);
	}
}





$('.audio-progress-bar-wrapper').on('mousedown', function (e) {
    progressDrag = true;
});

$(document).on('mouseup', function (e) {
    if (progressDrag) {
        progressDrag = false;
        updateProgress(e.pageX);
    }
});

$(document).on('mousemove', function (e) {
    if (progressDrag) {
        var progress = $('.audio-progress-bar-wrapper');
    	var currentProgress = e.pageX - progress.offset().left;
    	if (currentProgress >= fullProgress) {
    		$('.audio-progress-bar-playing').css('width', fullProgress);
    	}
    	else {
    		$('.audio-progress-bar-playing').css('width', currentProgress);
    	}
    }
});

var updateProgress = function (x) {
    var progress = $('.audio-progress-bar-wrapper');
    var currentProgress = x - progress.offset().left;
    var aaa = music.duration * currentProgress/fullProgress;
    music.currentTime = parseInt(aaa);
    $('.audio-progress-bar-playing').css('width', currentProgress);    
};