// sets lists as sortable and disableSelection
$("#sortable1, #sortable2").sortable({
    connectWith: ".connectedSortable"
}).disableSelection();

$("#submitButton").click(function () {
    $.post({
            url: "vote/submit",
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