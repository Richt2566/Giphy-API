
//an array to hold the subjects of the buttons
var animals = ["dog", "rabbit", "goat", "frog"];

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

          //a.attr("data-state", "still");
          
          //a.attr("src", animals[i].images.fixed_height_still.url);

          a.text(animals[i]);
          
          $("#buttonpit").append(a);
        }
      }

// buttons on click will appear based on user input
$("#add-animal").on("click", function(event) {
        event.preventDefault();

        var animal = $("#animal-input").val();

        animals.push(animal);

        clearField();

  		populateButtons();

  		$(".animal").click(ajaxCaller);

});

//on page load populate buttons, 
$(document).ready(function(){

	populateButtons();

	$("button").click(ajaxCaller);

	$("#gifs").on("click", function(){
		console.log("rich");
	});

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

	      for (var i = 0; i < results.length; i++) {
	        var gifDiv = $("<div class='item'>");

	        var rating = results[i].rating;

	        var p = $("<p>").text("Rating: " + rating);

	        //var animalImage = $("<img>");

	        var animalImage = $('<img class="gif" src="' + response.data[i].images.fixed_height_still.url + '">');
	        //animalImage.attr("src", results[i].images.fixed_height.url);

	        gifDiv.prepend(p);
	        gifDiv.prepend(animalImage);

	        $("#gifs").prepend(gifDiv);

	        //$("#gifs").append('<img class="gif" src="' + response.data[i].images.fixed_height_still.url + '">');
	      } 
		});

	    }

$('body').on('click','.gif', function() {
    	var src = $(this).attr("src");
      if($(this).hasClass('playing')){
         //stop
         $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
         $(this).removeClass('playing');
      } else {
        //play
        $(this).addClass('playing');
        $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
      }
    });