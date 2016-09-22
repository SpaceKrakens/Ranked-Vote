  // sets lists as sortable and disableSelection
  $( function() {
    $( "#sortable1, #sortable2" ).sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
    // Runs a function when the submitVote button is pressed
    $( "#savebutton" ).click(postList());
  } );

// Using the core $.ajax() method
function postList(){
  $.ajax({

      url: "server.js",

      data: $( "#sortable2" ).sortable( "serialize", { key: "sort" } ),

      type: "POST",
  
      dataType : "string",
  })
    .done(function( json ) {
      $( "<h1>" ).text( json.title ).appendTo( "body" );
      $( "<div class=\"content\">").html( json.html ).appendTo( "body" );
    })
    .fail(function( xhr, status, errorThrown ) {
      alert( "Sorry, there was a problem!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    })
    .always(function( xhr, status ) {
      alert( "The request is complete!" );
    });}
    