function get_id(str) {
	var id = str.split('v=')[1];
	if (!id) {
		return;
	}
	var pos = id.indexOf('&');
	if (pos != -1) {
		id = id.substring(0, pos);
	}
	return id;
}
function get_a(id, text) {
	var a = document.createElement('a');
	a.href = 'https://youtube.com/embed/' + id + '?autoplay=1';
	a.title = 'Full Window Video';
	a.style.textDecoration = 'initial';
	a.style.fontSize = '20px';
	a.style.color = '#167ac6';
	a.appendChild(document.createTextNode(text));
	return a;
}
function list(selector, num_parents) {
	var links = document.querySelectorAll(selector);
	var length = links.length;
	
	for(var i=0; i<length; i++) {
		var id = get_id(links[i].href);
		if (!id) {
			continue;
		}
		var a = get_a(id, '⊕');
		a.style.position = 'absolute';
		a.style.bottom = '0';
		a.style.right = '0';
		
		var par = links[i];
		for(var j=0; j<num_parents; j++) {
			par = par.parentElement;
		}
		par.style.position = 'relative';
		par.appendChild(a);
	}
}
function run() {
	// Subscriptions list
	list('div.yt-lockup-video h3.yt-lockup-title a.yt-uix-sessionlink', 2);
	// Subscriptions list - September 2016
	//list('ytd-grid-video-renderer div.ytd-grid-video-renderer a.ytd-video-meta-block', 2);
	// Subscriptions list, mobile - August 2017
	list('ytd-grid-video-renderer .ytd-grid-video-renderer', 2);
	
	// Suggestions sidebar list
	list('ul.video-list li.video-list-item a.yt-uix-sessionlink', 2);
	// Suggestions sidebar list - September 2016
	list('div.ytd-watch-next-secondary-results-renderer a.ytd-compact-video-renderer', 1);
	
	// Watch later list
	list('tr.pl-video td.pl-video-title a.yt-uix-sessionlink', 1);
	
	// Main video on a page
	var video_id = get_id(window.location.search);
	if (!video_id) {
		return;
	}
	var a = get_a(video_id, ' - - ⊕');
	a.style.verticalAlign = 'middle';
	var spot = document.getElementById('watch7-subscription-container');
	if (spot) {
		spot.appendChild(a);
	}
	// New spot as of September 2016
	spot = document.querySelectorAll('ytd-video-primary-info-renderer h1.title yt-formatted-string')[0];
	if (spot) {
		spot.appendChild(a);
	}
}

jQuery(function($) {
	setTimeout(run, 1000);
	
	// YouTube asynchronous page navigation.
	// http://stackoverflow.com/questions/18397962/chrome-extension-is-not-loading-on-browser-navigation-at-youtube/18398921#18398921
	var body = document.body || document.documentElement;
	body.addEventListener('transitionend', function(event) { // TransitionEvent
		if (event.propertyName === 'width' && event.target.id === 'progress') {
			setTimeout(run, 2000);
		}
	}, true);
});
