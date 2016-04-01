function get_id(str) {
	var id = str.split('v=')[1];
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
	a.style.fontSize = '20px';
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
		a.style.bottom = '5px';
		a.style.right = '0';
		
		var par = links[i];
		for(var j=0; j<num_parents; j++) {
			par = par.parentElement;
		}
		par.style.position = 'relative';
		par.appendChild(a);
	}
}

jQuery(function($) {
	// Subscriptions list
	list('div.yt-lockup-video h3.yt-lockup-title a.yt-uix-sessionlink', 2);
	// Suggestions sidebar list
	list('ul.video-list li.video-list-item a.yt-uix-sessionlink', 2);
	// Watch later list
	list('tr.pl-video td.pl-video-title a.yt-uix-sessionlink', 1);
	// On a video page
	var video_id = get_id(window.location.search);
	if (!video_id) {
		return;
	}
	var a = get_a(video_id, ' - - ⊕');
	a.style.verticalAlign = 'middle';
	var spot = document.getElementById('watch7-subscription-container');
	spot.appendChild(a);
});
