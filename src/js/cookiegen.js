(function() {

	/*var tracker_config = {
		domain: 'localhost:8896',
		cookiename: 'trkit_tracker',
		cookie_expiration: 30
	};*/

    function cookieGen(result) {
	
		var id = result.id;

		if(id != null)
		{
			createCookie(tracker_config.cookiename, id, tracker_config.cookie_expiration);
		
			trackItems();
		}
		
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
	
	function eraseCookie(name) {
		createCookie(name,"",-1);
	}
	
	function getParameterByName( name ){
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		if( results == null )
		    return "";
		else
		    return decodeURIComponent(results[1].replace(/\+/g, " "));
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
	
	function trackItems(){
		
		if(tracker_config.varsToTrack.length>0)
		{
			for (var i = 0; i < tracker_config.varsToTrack.length; i++)
			{
				var trackerVar = tracker_config.varsToTrack[i];
				
				if(trackerVar.params.length > 0) {
					
					var table = trackerVar.table;
					
					var database = trackerVar.db;
				
					var qs = "trk_name=" + tracker_config.cookiename + "&";
					
					qs += "table=" + table + "&database=" + database + "&";
					
					for (var j = 0; j < trackerVar.params.length; j++) {
						var paramName = trackerVar.params[j];
					
						var paramValue = getParameterByName(paramName);
						
						qs += paramName + "=" + paramValue + "&";
						
					}//end for
					
					if(trackerVar.additionalVars.length>0){
						
						for(var x = 0; x < trackerVar.additionalVars.length; x++){
							
							var addVar = trackerVar.additionalVars[x];

							var key = addVar.key;
							
							var value = addVar.value;

							qs += key + "=" + value + "&";
							
							if (typeof addVar.checkVal === "undefined")
							{
								//do nothing
							} else {
								if(addVar.checkVal == true)
								{
									//append the info to the service to make sure that tracking value is unique
									qs += "checkVal=" + key +"|" + value + "&";
								}
							}
							
						} //end for
						
					} //end if
					
					qs = qs.substring(0, qs.length-1);
					
					document.write('<script src="'+ tracker_config.domain +'/track.php?'+ qs +'"><\/script>');
					
				} //end if
				
			}//end for
		}//end if		
	}
		
    function callFeed() {
	
		var cookieVal = readCookie(tracker_config.cookiename);
        
		if(cookieVal == null){
        
			document.write('<script src="'+ tracker_config.domain +'/generator.php?callback=cookieGen"><\/script>');
			
		} else {
			
			trackItems();
			
		}

    }

	window.cookieGen = cookieGen;
    if (!window.onerror) window.onerror = callFeed();

}
)();