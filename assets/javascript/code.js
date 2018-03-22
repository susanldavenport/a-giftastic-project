$(document).ready(function(){

  var gifs = ["Rick and Morty", "Bob's Burgers", "American Dad", "The Venture Brothers", "Family Guy"];
  
  function renderButtons() {
    $('#button-holder').empty();
    
    for (i = 0; i < gifs.length; i++){
      var a = $('<button>');
      a.addClass('buttons');
      a.attr('data-name', gifs[i]);

      a.text(gifs[i]);
      $('#button-holder').append(a);
    }; 
  }; // end renderButtons function
  
  function getGifs(){
    $('#button-holder').on('click', '.buttons', function() {
      // console.log('gif click');

      var gif = $(this).attr('data-name');
      // console.log('THIS: ', this);
      // console.log(gif);
      
      var apiKey = "mqKIR6ZY8blFSFVvyMcV1maZ8CQ0fHaN";
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=" + apiKey + "&limit=10";
      // console.log('Query URL: ', queryURL); 
      
      $.ajax({
        url: queryURL,
        method: 'GET',
      }) //end AJAX get
      .then(function(response) {
        var results = response.data;
        // console.log(results);
        
        for (var i = 0; i < results.length; i++) {
          var gifImg = $("<img>");
          gifImg.addClass("image");
          gifImg.attr("src", results[i].images.original_still.url);
          gifImg.attr("data-animate", results[i].images.original.url);
          gifImg.attr("data-still", results[i].images.original_still.url);
          gifImg.attr("data-state", "still");
          var p = $("<p>").text("Rating: " + results[i].rating);
          // console.log(gifImg);
          $('#gif-holder').prepend(gifImg);
        } //end gifImg get
      }) //end AJAX
    }); //end click function data-get
  }; //end get Gifs function
  
  
  $('#submit').on('click', function(event) {
    event.preventDefault();
    var newGif = $('#search').val();
    gifs.push(newGif);
    console.log("New Array: ", gifs);
    renderButtons();
  }); //end click event button add
  
  //TODO: Coding to animate and pause gifs
  
  $(".gif").on("click", function() {
    var state = $(this).attr('data-state');
    console.log(state);
    
    if (state === 'still'){
      $(this).attr('src', $(this).attr("data-animate"));
      // $(this).attr("data-state", "animate"); 
    } else {
      $(this).attr('src', $(this).attr("data-still"));
      // $(this).attr("data-state", "still"); 
    }
  });
  
//FIXME: Make Clear Button Work!!
  //clear button
  $("#clear").on("click", function() {
    $('.form-group :input').val('');
  }); // ----- end clear function

  //call functions
  getGifs(); 
  renderButtons();
}); //end document ready function 

///notes
//_______________________

  ///image returns
  // result.data.images.original_still.url

  // var newRating = response[i].rating;
  // var p = $("<p>").text("Rating: " + newRating);
  // console.log('Rating: ', newRating);
  
  // $('.gifID').append('<src>', gifImg, '<br>'),
  // console.log('Gif URL: ', gifImg); 
  
  // gifDiv.prepend(gifImg);
  // gifDiv.prepend(p);
  
  // $('#gif-holder').append(gifDiv);
  // console.log('Gif Div: ', gifDiv);