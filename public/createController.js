
var id = 1;

$("#addButton").click(function () {
    var doc =$("optionPrototype").clone();
    doc.$("label").each( function (element) {
        element.attr("for").append(id);
    });
    doc.$(".form-control").each( function (element) {
        element.attr("id").append(id);
    });
    $("#optionsContainer").appendChild(doc);

});