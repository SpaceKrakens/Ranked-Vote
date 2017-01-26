var id = 1;

/**
 * Copies the prototype option, updates id and name attributes to current index
 * and pastes it
 * into the available options, increases the index afterwards
 */
$('#addButton').click(function () {
    var option = $('#optionPrototype').clone();
    option.find('label').attr('for', function (i, val) {
        return val + id;
    });
    option.find('label').first().text('Option ' + id + ' Name');
    option.find('.form-control').attr('id', function (i, val) {
        return val + id;
    });
    option.find('.form-control').attr('name', function (i, val) {
        return 'option[' + id + '][' + val + ']';
    });
    $('#optionsContainer').append(option.html());
    id++;
});

/**
 * Removes the attached group and then decrements the index
 * Also goes through each label and renames them
 */
$('#removeButton').click(function () {
    /* Implement magic */
});

/**
 * Automatically en/disables the password input field depending on the selected
 * access type
 */
$('#access').change(function () {
    if (this.value === 'password') {
        $('#password-group').show();
        $('#password').prop('disabled', false);
    } else {
        $('#password-group').hide();
        $('#password').prop('disabled', true);
    }
});

$('#timeLimit').change(function () {
    if ($(this).prop('checked') === true) {
        $('#closing-date-group').show();
        $('#closingDate').prop('disabled', false);
    } else {
        $('#closing-date-group').hide();
        $('#closingDate').prop('disabled', true);
    }
});
$(function () {
    $('#closingDate').datetimepicker({
        defaultDate: moment().add(48, 'hours'), // @TODO - make this work.
                                                // Currently it does not work.
        minDate: moment().add(2, 'hours'),
    });
});
