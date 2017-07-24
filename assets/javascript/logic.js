var apiKey = "cd596e6a6f35472090dc58cfbb090200";
var url = "https://api.giphy.com/v1/gifs/search?";
var arrayOfGifs = ["All Might", "Code Geass", "Kamehameha", "Chidori", "Attack on Titan", "Super Saiyan", "Rinnegan", "Death Note"]

var printButtons = function(arrayButtons){
	for (var i = 0; i < arrayButtons.length; i++){
		var button = $("<button>");
		button.text(arrayButtons[i]);
		button.attr("value",arrayButtons[i]);
		button.addClass("giph-button btn btn-primary");
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
		$(".all-giphs").remove();
		url += $.param({
			'api_key': apiKey,
			'q': name
		})
		$.ajax({
			url: url,
			method: 'GET'
		}).done(function(result){
			var arrayObjects = result.data;
			var rowNum;
			for (var i = 0; i < 12; i++){
				if (i%4 === 0){
					rowNum = i;
					var row = "row all-giphs giph-row"+i;
					var imageRow = $("<div class = '"+row+"'>");
					$("#search-inputs").after(imageRow);
				}
				var imageCol = $("<div class = 'col-md-3 col-sm-6'>");
				var rating = $("<div>");
				rating.text("Ratings: " + arrayObjects[i].rating);
				imageCol.append(rating);
				var imageSet = arrayObjects[i].images;
				var image = $("<img class = 'center-block'>");
				image.attr("data-still",imageSet.fixed_height_still.url);
				image.attr("data-move",imageSet.fixed_height.url);
				image.attr("data-state", "still");
				image.attr("src",imageSet.fixed_height_still.url);
				image.addClass("giph");
				imageCol.append(image);
				$(".giph-row"+ rowNum).append(imageCol);

			}
		});
	});

	$(document).on("click",".giph",function(){
		if (typeof $("#movin")[0] !== "undefined"){
			if ($(this)[0].outerHTML !== $("#movin")[0].outerHTML){
				$("#movin").attr("data-state", "still")
				$("#movin").attr("src", $("#movin").data("still"));
				$("#movin").removeAttr("id");
				$(this).attr("src",$(this).attr("data-move"));
				$(this).attr("data-state", "move");
				$(this).attr("id", "movin");
			}else{
				$("#movin").attr("data-state", "still")
				$("#movin").attr("src", $("#movin").data("still"));
				$("#movin").removeAttr("id");
				}
		}else{
				$("#movin").attr("data-state", "still")
				$("#movin").attr("src", $("#movin").data("still"));
				$("#movin").removeAttr("id");
				$(this).attr("src",$(this).attr("data-move"));
				$(this).attr("data-state", "move");
				$(this).attr("id", "movin");
		}
	});



});


