$(document).ready(function() {

	console.log("Resources loaded");

	// contact submit event handler
	$('#form_send').on('click', function() {
		var formdata = app.createFormObject();
		console.log('Clicked form submit..');
	}); 
});

var app = app || {}; 

app.createFormObject = function() {

	var retJson = {}; 

	retJson.userName = $('#user_name').val();
	retJson.searchTerms = $('#user_search_terms').val();
	retJson.request = $('#user_search_amt').val(); 
	retJson.startDate = $('#user_date_start').val();
	retJson.endDate = $('#user_date_end').val();

	//testing..comment out when done
	// console.log(retJson);
	return retJson; 
}