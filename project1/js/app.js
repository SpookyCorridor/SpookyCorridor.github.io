$(document).ready(function() {

	console.log("Resources loaded");

	// contact submit event handler
	$('#form-send').on('click', function() {
		var formdata = app.createFormObject();
		console.log('Clicked form submit..');
	}); 

	$('span>a').on('click', function() {
		var choice = $(this).html().trim();
		console.log(choice);
		$(this).parent().text(choice);
		if (choice == 'wallpaper') {
			$('#choice-wallpaper').fadeIn();
		} else if (choice == 'video') {
			$('#choice-video').fadeIn();
		}
		
	}); 

});

var app = app || {}; 

app.createFormObject = function() {

	var retJson = {}; 

	retJson.searchLength = $('#user_search_length').val();
	retJson.userName = $('#user_name').val();
	retJson.searchTerms = $('#user_search').val();
	retJson.request = $('#user_search_amt').val(); 
	retJson.startDate = $('#user_date_start').val();
	retJson.endDate = $('#user_date_end').val();

	//testing..comment out when done
	// console.log(retJson);
	return retJson; 
}