
var animals = ["dog", "rabbit", "goat", "frog"];

function clearField() {

     $("#animal-input").val("");
}

function populateButtons() {

        $("#buttonpit").empty();

        for (var i = 0; i < animals.length; i++) {

          var a = $("<button>");
          
          a.addClass("animal");
          
          a.attr("data-animal", animals[i]);
          
          a.text(animals[i]);
          
          $("#buttonpit").append(a);
        }
      }

$("#add-animal").on("click", function(event) {
        event.preventDefault();

        var animal = $("#animal-input").val();

        animals.push(animal);

        clearField();

  		populateButtons();

  		$(".animal").click(ajaxCaller);

      });

$(document).ready(function(){

	populateButtons();

	$("button").click(ajaxCaller);

});


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

	        var animalImage = $("<img>");
	        animalImage.attr("src", results[i].images.fixed_height.url);

	        gifDiv.prepend(p);
	        gifDiv.prepend(animalImage);

	        $("#gifs").prepend(gifDiv);
	      }
		});

	    }