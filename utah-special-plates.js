jQuery(function($) {
	function get_a(url, text) {
		var a = document.createElement('a');
		a.href = url;
		a.title = 'Click Image to Enlarge';
		a.target = '_blank';
		a.style.fontWeight = 'normal';
		a.appendChild(document.createTextNode(text));
		return a;
	}
	
	$('.dmv-platethumb').each(function(i, e) {
		var self = $(this);
		
		var url = self.find('p a[rel]').attr('href');
		if ((i = url.indexOf('?')) != -1) {
			url = url.slice(0, i);
		}
		
		var a = get_a(url, this.innerText);
		var p = self.find('> p');
		self.html(p);
		self.append(a);
	});
});
