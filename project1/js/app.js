$(document).ready(function() {

	console.log("Resources loaded");

	// contact submit event handler
	$('.form-send').on('click', function() {	
		//clear old queries 
		$('img').detach(); 
		$('video').detach();
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
	var num = Math.floor(Math.random() * 100 + 1); //random indice
	var sub = data.searchSubr;
	var tags = data.searchTerms; 
	var time = data.searchTime; 

	//add width and height reqs 
	var reqestedSize = [parseInt(data.searchWidth), parseInt(data.searchHeight)];
	var searchQuery = 'http://www.reddit.com/r/' + sub + '/search.json?q=' + 
	tags + '&restrict_sr=' + sub + '&t=' + time + '&limit=100';
	$.getJSON(searchQuery, function(data) {
      	return app.generateContent(data.data.children[num].data.url,
      			reqestedSize,
      			//grab image dimensions 
      		   [data.data.children[num].data.preview.images[0].source.width,
				data.data.children[num].data.preview.images[0].source.height]);
});
}


app.generateContent = function(link, requestedSize, size) {
	
	console.log(size);
	/* ----- start wallpaper build ------ */ 
	if ( $('#choice-wallpaper').css('display') === 'inline') {
		
		
		// TODO: 
		// check for min width and height and 
		// provide link under responsive image
		
		//working direct link 
		if ( link.indexOf('i.imgur') >= 0 ) {
			console.log(link + ' is i'); 
			$('section').children().hide();
			$('section').append('<img src="' + link + '">');

			
		} // fix link path to i.imgur instead of imgur
		  // and append img extention 
		else if (!link.indexOf('i.imgur') >= 0) {
			console.log(link + ' is not i'); 
			var newLink = link.slice(7);
			$('section').children().hide();
			$('section').append('<img src="https://i.' + newLink + '.jpg">');
			$('section').append('<p id="restart"> next </p>');
			
			} 
		} /* ------ end wallpaper build ------ */

	/* ------ start video build ------ */
		else if ( $('#choice-video').css('display') === 'inline') {
			// video output  
			console.log("video true");


			var vid = '<video width="540" height="260" id="player1" autoplayer="true" preload="auto"> <source type="video/youtube" src="';
			console.log(vid+link+'"/></video>'); 
			$('section').append("err" + vid + link + '"/></video>');
			$('video, audio').mediaelementplayer();
	}

}