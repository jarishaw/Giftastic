//create an array of cartoon characters

var characters = ["mickey mouse", "garfield", "daffy duck", "bart simpson"];

//create a button each time a character is sumbitted


function renderButtons() {

	$("#character-view").empty();

	for (var i = 0; i < characters.length; i++) {
    	var newButton = $("<button>");
    	newButton.addClass("cartoon")
    	newButton.attr("data-character", characters[i]);
        newButton.text(characters[i]);

          $("#character-view").append(newButton);
    }
}

//create an on click event for the search button
$("#add-character").on("click", function(event) {
	
	event.preventDefault()

//grab the value of the input

var newCharacter = $("#character-input").val().trim();

//push into the array

characters.push(newCharacter);

renderButtons();

});

renderButtons();

$(document.body).on("click", ".cartoon", function() {

// $(".cartoon").on("click", function() {

	var character = $(this).attr("data-character");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        character + "&api_key=1hWnN1pfRfunDV5HyaWpocTeQXnO0nJK&limit=10";

	$.ajax({ url: queryURL, method: "GET"})

	.done(function(response) {

	var results = response.data;


	for(var i = 0; i <results.length; i++) {

		var characterDiv = $("<div>");

		var pgraph = $("<p>").text("Rating: " + results[i].rating);

		var characterImage = $("<img>");

		characterImage.addClass("gif");

		characterImage.attr("src", results[i].images.fixed_height_still.url);

		characterImage.attr("data-state", "still");

		characterImage.attr("data-still", results[i].images.fixed_height_still.url);

		characterImage.attr("data-animate", results[i].images.fixed_height.url);

		characterDiv.append(pgraph);

		characterDiv.append(characterImage);


	$("#gifs-appear-here").prepend(characterDiv);
    
    }
	
	});

	});


//this should work
$(document).on("click", ".gif", function() {

     //   $(this).attr("src", $(this).attr("images.fixed_height.url"));
     // }); 
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });


