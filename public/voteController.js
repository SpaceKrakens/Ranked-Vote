// sets lists as sortable
// sets basic accordion functionality.
$("#sortable1, #sortable2")
  .sortable({
    placeholder: "ui-state-highlight",
    handle: "li",
    connectWith: ".connectedSortable",
});

// Not working yet - want to make a spesific button on the sortable to make it easier to collapse and expand without 
// dragging accedentaly.
$( "collapsible" ).on( "click", function() {
    var icon = $( this );
    icon.toggleClass( "ui-icon-minusthick ui-icon-plusthick" );
    icon.closest( ".connectedSortable" ).toggle();
});

$("#submitButton").click(function () {
    $.post({
            url: "vote",
            data: $("#sortable2").sortable("serialize", {key: "sort"}),
            dataType: "json"
        })
        .done(function (json) {
            $("<h1>").text(json.title).appendTo("body");
            $("<div class=\"content\">").html(json.html).appendTo("body");
        })
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            console.dir(xhr);
        })
        .always(function () {
            alert("The request is complete!");
        });
});