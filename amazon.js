document.addEventListener('keydown', function(event) {
	if (event.keyCode === 191) { // Slash '/' key
		event.preventDefault();
		document.getElementById('twotabsearchtextbox').focus();
	}
});
