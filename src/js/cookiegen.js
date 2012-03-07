(function() {

	/*var tracker_config = {
		domain: 'localhost:8896',
		cookiename: 'trkit_tracker',
		cookie_expiration: 30
	};*/

    function cookieGen(result) {
	
		var id = result.id;

		createCookie(tracker_config.cookiename, id, tracker_config.cookie_expiration);
    }
	
	function createCookie(name,value,days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	}

	function readCookie(name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	}

	function eraseCookie(name) {
		createCookie(name,"",-1);
	}
		
    function callFeed() {
        
		if(readCookie(tracker_config.cookiename) == null){
        	document.write('<script src="'+ tracker_config.domain +'/generator.php?callback=cookieGen"><\/script>');
		} else {
			//alert('else!');
		}

    }

	window.cookieGen = cookieGen;
    if (!window.onerror) window.onerror = callFeed();

}
)();