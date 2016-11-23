var id = 1;

$("#addButton").click(function () {
    var option = $("#optionPrototype").clone();
    option.find("label").attr("for", function (i, val) {
        return val + id;
    });
    option.find(".form-control").attr("id", function (i, val) {
        return val + id;
    });
    option.find(".form-control").attr("name", function (i, val) {
        return "option[" + id + "][" + val + "]";
    });
    $("#optionsContainer").append(option.html());
    id++;
});