$(document).ready(function() {

	$('#nav-bars').on('click', function() { 
		$('.nav').toggle();
		$('#nav-bars .fa-bars').toggleClass('fa-rotate-90');
	})


	// contact submit event handler
	$('.form-send').on('click', function() {	
		//clear old queries 
		$('.form-send').submit();
		$('img').detach(); 
		$('video').detach();
		$('div:not(".container")').detach();
		//build new reddit search query 
		//console.log('Clicked form submit..');
		app.buildQuery();
		
	}); 
	// expand options for wallpaper or video 
	$('span>a').on('click', function() {
		var choice = $(this).html().trim();
		//console.log(choice);
		$(this).parent().text(choice);
		if (choice == 'wallpaper') {
			$('.choices').prop('id', 'choice-wallpaper').fadeIn();

		} else if (choice == 'video') {
			$('.choices').prop('id', 'choice-video').fadeIn();
			$('#advanced').hide();
			$('')
		}
		
	}); // end span click 

	$('#advanced').on('click', function() {
		// show advanced options 
		$(this).siblings('.form-send').appendTo('#wallpaper-advanced');
		$(this).fadeOut();
		$('#wallpaper-advanced').fadeIn().append('');

	});

});

var app = app || {}; 

app.createFormObject = function() {

	var retJson = {}; 

	retJson.searchTerms = $('#search-terms').val();
	retJson.searchSubr = $('#search-subreddit').val();
	retJson.searchSort = $('#search-sort').val(); 
	retJson.searchTime = $('#search-time').val();
	retJson.searchSource = $('#search-source').val();
	retJson.searchWidth = $('#search-width').val();
	retJson.searchHeight = $('#search-height').val();
	retJson.randomNum = function(max) {
		return Math.floor(Math.random() * max);
	}	

	return retJson; 
}

//get JSON with user defined query  
app.buildQuery = function(resize) {
	searchObj = app.createFormObject();
	var a; // for generateContent to return after loop
	// namespace to app.num later to try 
	var max = searchObj.randomNum(); 
	var sub = searchObj.searchSubr;
	var tags = searchObj.searchTerms; 
	var time = searchObj.searchTime;
	var width = typeof resize !== 'undefined' ? resize[0] : searchObj.searchWidth;
	var height = typeof resize !== 'undefined' ? resize[1] : searchObj.searchHeight;
	//add width and height reqs 
	var requestedSize = [parseInt(width), parseInt(height)];

	if ($('#choice-video').length) { 
	//get only youtube links for better compatability
	var searchQuery = 'http://www.reddit.com/r/' + sub + '/search.json?q=' + 
		tags + /*begin*/ '+site%3Ayoutube+url%3Ayoutube+is_self%3Ano+self%3Ano' /*end*/ +
		'&restrict_sr=' + sub + '&t=' + time + '&limit=1000';
	} else {
		// get only imgur links for better compatability
		var searchQuery = 'http://www.reddit.com/r/' + sub + '/search.json?q=' + 
			tags + /*begin*/ '+url%3Aimgur+is_self%3Ano' /*end*/ +'&restrict_sr=' + sub + '&t=' + time + '&limit=1000';
	}

	$.getJSON(searchQuery, function(data) {
		//don't exceed number of found results 
		console.log(data.data); 
		max = searchObj.randomNum(data.data.children.length - 1); 
		
		if ($('#choice-wallpaper').length) {
				
			var size = [data.data.children[max].data.preview.images[0].source.width,
			data.data.children[max].data.preview.images[0].source.height]; 
			var match = false; //set boolean for recursion 
			var count = 0; //prevent infinite loop 

			while (!match && count <= data.data.children.length - 1) {

				if ((requestedSize[0] <= size[0] && requestedSize[1] <= size[1])) {
					match = true; 
					return a = app.generateContent(data.data.children[max].data.url,
								size); 
				} else {
					max = searchObj.randomNum(data.data.children.length - 1);
					
					if (typeof data.data.children[max].data.preview !== 'undefined') {
						size = [data.data.children[max].data.preview.images[0].source.width,
								data.data.children[max].data.preview.images[0].source.height];
					
						count += 1;
					}
				}
			
			};

			if (count >= data.data.children.length - 1) {
				console.log("nothing found"); 
				return app.buildQuery([(width/2), (height/2)]); //found nothing...recursion time 
			}
			
		};
		//video 
		a = app.generateContent(data.data.children[max].data.url);
			return a; 
	});
}


app.generateContent = function(link) {
	
	//console.log(requestedSize, size);
	/* ----- start wallpaper build ------ */ 
	if ( $('#choice-wallpaper').css('display') === 'inline') {
		
		//working direct link 
		if ( link.indexOf('i.imgur') >= 0 ) {
			//console.log(link + ' is i'); 
			$('section').append('<img id= "img" src="' + link + '">');

			
		} // fix link path to i.imgur instead of imgur
		  // and append img extention 
		else if (!link.indexOf('i.imgur') >= 0) {
			//console.log(link + ' is not i'); 
			var newLink = link.slice(7);
			$('section').append('<img id="img" src="https://i.' + newLink + '.jpg">');
			
			} 

		$('section').children(':not("#img")').hide();
		$('#restart').show(); // allow user to do new

		$('section').append('<a id="source" href="' + link + '">Source</a>');
		} /* ------ end wallpaper build ------ */

		/* ------ start video build ------ */
		else if ( $('#choice-video').css('display') === 'inline') {
			// video output  
			//console.log("video true");


			var vid = '<video width="540" height="260" id="player1" autoplayer="true" preload="auto"> <source type="video/youtube" src="';
			//console.log(vid+link+'"/></video>'); 
			$('section').append(vid + link + '"/></video>');
			$('video, audio').mediaelementplayer();
			$('section>span').hide();
			$('#restart').show(); // allow user to do new
			$('section').append('<a id="source" href="' + link + '">Source</a>');
		}

		
		$('#restart').on('click', function() {
			$('section').children(':not("span#wallpaper-advanced")').show();
			$('#advanced').show();
			$('.form-send').show();
			$('div:not(".container")').detach();
			$('video').detach(); 
			$('#img').detach();
			$('#source').detach(); 
			$(this).toggle();
 
	});
}







