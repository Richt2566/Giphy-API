
//an array to hold the subjects of the buttons
var animals = ["dog", "rabbit", "goat", "frog", "owl", "lion", "tiger", "bear", "monkey"];

//function to clear the form from previous user input 
function clearField() {

     $("#animal-input").val("");
}

// buttons populate upon page loading
function populateButtons() {
		//empty the div first
        $("#buttonpit").empty();
        //loop through the array
        for (var i = 0; i < animals.length; i++) {
        //create buttons for each item in array
          var a = $("<button>");
          // add a class to each new button
          a.addClass("animal");
          // add an attribute to each new button
          a.attr("data-animal", animals[i]);
          // add text for the buttons
          a.text(animals[i]);
          // append the buttons to the html 
          $("#buttonpit").append(a);
        }
      }

// buttons on click will appear based on user input
$("#add-animal").on("click", function(event) {
        // prevent page from reloading
        event.preventDefault();
        // collect the value of user input
        var animal = $("#animal-input").val();
        // push user input into array
        animals.push(animal);
        // clear text box for a cleaner input
        clearField();

  		  populateButtons();
        // call ajax function when class animal gets clicked
  		  $(".animal").click(ajaxCaller);

});

//on page load populate buttons, 
$(document).ready(function(){

	populateButtons();
  // call ajax when any button gets clicked
	$("button").click(ajaxCaller);

});

// ajax call to get the gif
function ajaxCaller() {

    var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
	      url: queryURL,
	      method: "GET"
	    	}).done(function(response) {

	      var results = response.data;
        // loop through api for ten gifs
	      for (var i = 0; i < results.length; i++) {
          // create div for new populated gif
	        var gifDiv = $("<div class='item'>");
          // display ratings of gifs
	        var rating = results[i].rating;

	        var p = $("<p>").text("Rating: " + rating);
          // setting variable for gif file path
	        var animalImage = $('<img class="gif" src="' + response.data[i].images.fixed_height.url + '">');
          // prepend both rating and gif image
	        gifDiv.prepend(p);
	        gifDiv.prepend(animalImage);

	        $("#gifs").prepend(gifDiv);

	      } 
		});
}

// on click make the gifs pause
$('body').on('click','.gif', function() {
      // setting variable for src attribute
    	var src = $(this).attr("src");
      // if statement saying if gif is running, make it stop...
      if($(this).hasClass('playing')){
         $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
         $(this).removeClass('playing');
      } else {
        // if gif is stopped make it play...
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
    });