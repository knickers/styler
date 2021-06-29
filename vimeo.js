document.onkeypress = function(e) {
	if (e.keyCode == 60) {
		// < (less than) (left angle bracket)
		document.querySelector('video').playbackRate -= 0.25;
	}
	else if (e.keyCode == 62) {
		// > (greater than) (right angle bracket)
		document.querySelector('video').playbackRate += 0.25;
	}
};
