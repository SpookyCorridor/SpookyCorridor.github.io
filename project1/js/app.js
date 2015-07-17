$(document).ready(function() {

	console.log("Resources loaded");

	$('#nav-bars').on('click', function() {
		$('.nav').toggle();
	})
	// contact submit event handler
	$('.form-send').on('click', function() {	
		//clear old queries 
		$('img').detach(); 
		$('video').detach();
		$('div:not(".container")').detach();
		//build new reddit search query 
		console.log('Clicked form submit..');
		app.buildQuery();
		
	}); 
	// expand options for wallpaper or video 
	$('span>a').on('click', function() {
		var choice = $(this).html().trim();
		console.log(choice);
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

	return retJson; 
}

//get JSON with user defined query  
app.buildQuery = function(data) {
	data = app.createFormObject();
	var a; // for generateContent to return after loop
	// namespace to app.num later to try 
	var num = Math.floor(Math.random() * 100); //random indice
	var sub = data.searchSubr;
	var tags = data.searchTerms; 
	var time = data.searchTime;
	//add width and height reqs 
	var requestedSize = [parseInt(data.searchWidth), parseInt(data.searchHeight)];
	if ($('#choice-video').length) { 
	//get only youtube links for better compatability
	var searchQuery = 'http://www.reddit.com/r/' + sub + '/search.json?q=' + 
	tags + /*begin*/ '+site%3Ayoutube+url%3Ayoutube+is_self%3Ano' /*end*/ +'&restrict_sr=' + sub + '&t=' + time + '&limit=100';
	} else {
		// get only imgur links for better compatability
		var searchQuery = 'http://www.reddit.com/r/' + sub + '/search.json?q=' + 
		tags + /*begin*/ '+url%3Aimgur+is_self%3Ano' /*end*/ +'&restrict_sr=' + sub + '&t=' + time + '&limit=100';
	}
	console.log(searchQuery);
	$.getJSON(searchQuery, function(data) {
		var size = [data.data.children[num].data.preview.images[0].source.width,
					data.data.children[num].data.preview.images[0].source.height];		 
		if ($('#choice-wallpaper').length) {
			do {
			
				num = Math.floor(Math.random() * 100);
			a =	app.generateContent(data.data.children[num].data.url,
				requestedSize,
				//grab image dimensions 
			   [data.data.children[num].data.preview.images[0].source.width,
			data.data.children[num].data.preview.images[0].source.height]);
			size = [data.data.children[num].data.preview.images[0].source.width,
					data.data.children[num].data.preview.images[0].source.height];
			} while ((requestedSize[0] > size[0] || requestedSize[1] > size[1]));
		}
			a = a =	app.generateContent(data.data.children[num].data.url,
				requestedSize,
				//grab image dimensions 
			   [data.data.children[num].data.preview.images[0].source.width,
			data.data.children[num].data.preview.images[0].source.height]);

			return a;
      		
	});
}


app.generateContent = function(link, requestedSize, size) {
	
	console.log(requestedSize, size);
	/* ----- start wallpaper build ------ */ 
	if ( $('#choice-wallpaper').css('display') === 'inline') {
			
		
		// TODO: 
		// check for min width and height and 
		// provide link under responsive image
		

		//working direct link 
		if ( link.indexOf('i.imgur') >= 0 ) {
			console.log(link + ' is i'); 
			$('section').append('<img id= "img" src="' + link + '">');

			
		} // fix link path to i.imgur instead of imgur
		  // and append img extention 
		else if (!link.indexOf('i.imgur') >= 0) {
			console.log(link + ' is not i'); 
			var newLink = link.slice(7);
			$('section').append('<img id="img" src="https://i.' + newLink + '.jpg">');
			
			} 

		$('section').children(':not("#img")').hide();
		$('#restart').show(); // allow user to do new

		} /* ------ end wallpaper build ------ */

		/* ------ start video build ------ */
		else if ( $('#choice-video').css('display') === 'inline') {
			// video output  
			console.log("video true");


			var vid = '<video width="540" height="260" id="player1" autoplayer="true" preload="auto"> <source type="video/youtube" src="';
			console.log(vid+link+'"/></video>'); 
			$('section').append(vid + link + '"/></video>');
			$('video, audio').mediaelementplayer();
			$('section>span').hide();
			$('#restart').show(); // allow user to do new
		}

		
		$('#restart').on('click', function() {
			$('section').children(':not("span#wallpaper-advanced")').show();
			$('#advanced').show();
			$('.form-send').show();
			$('div:not(".container")').detach();
			$('video').detach(); 
			$('#img').detach();
		$(this).toggle();

	});

}







