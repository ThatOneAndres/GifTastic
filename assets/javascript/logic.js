var apiKey = "cd596e6a6f35472090dc58cfbb090200";
var url = "http://api.giphy.com/v1/gifs/search?";
var arrayOfGifs = ["MidoriYA", "Naruto", "Goku", "Chidori", "Attack on Titan", "Super Saiyan", "Rinnegan"]

var printButtons = function(arrayButtons){
	for (var i = 0; i < arrayButtons.length; i++){
		var button = $("<button>");
		button.text(arrayButtons[i]);
		button.attr("value",arrayButtons[i]);
		button.addClass("giph-button");
		$("#giph-buttons").append(button);
	}
};

$(document).ready(function(){
	printButtons(arrayOfGifs);



	$("")

	$("#add-button").on("click",function(event){
		event.preventDefault();
		var word = $("#animeWord").val().trim();
		if (word !== ""){
			$("#giph-buttons").empty();
			arrayOfGifs.push(word);
			printButtons(arrayOfGifs);
		}
	});


	$(document).on("click",".giph-button", function(){
		var name = $(this).attr("value");
		url += $.param({
			'api_key': apiKey,
			'q': name
		})
		console.log(url);
		$.ajax({
			url: url,
			method: 'GET'
		}).done(function(result){
			var arrayObjects = result.data;
			for (var i = 0; i < 12; i++){
				if (i%4 === 0){
					var imageRow = $("<div class = 'row giph-row'>");
					$("#search-inputs").after(imageRow);
				}
				var imageCol = $("<div class = 'col-md-3'>");
				var rating = $("<div>");
				rating.text("Ratings: " + arrayObjects[i].rating);
				imageCol.append(rating);
				var imageSet = arrayObjects[i].images;
				var image = $("<img>");
				image.attr("data-still",imageSet.fixed_height_still.url);
				image.attr("data-move",imageSet.fixed_height.url);
				image.attr("src",imageSet.fixed_height_still.url);
				image.addClass("giph");
				imageCol.append(image);
				$(".giph-row").append(imageCol);

			}

		});
	});

});


