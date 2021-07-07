$(document).ready(function () {
    getData();
    $("#all-items").click(function () {
        $(".select_one").prop('checked', this.checked);
    });

});
function check() {
    var all = $(".select_one").length;
    var checked = $(".select_one:checked").length;
    var val = (all > 0 && all == checked);
    $("#all-items").prop('checked', val);
}
function subm(type) {
    if (type == true) {
        let action = $('#testaction').val();
        var checkedid = [];
        $('.select_one:checked').each(function () {
            checkedid.push($(this).val());
        });

        var arr = { "action": action, "ids": checkedid };
        var jsonstr = JSON.stringify(arr);

        $.ajax({
            url: 'api/json.php',
            method: 'POST',
            dataType: 'json',
            data: jsonstr,
            success: function (response) {
                $('#groupModal').modal('hide');
                //refresh();


                if (response.status == 'good') {
                    if (action == 'active') {
                        checkedid.forEach(function (item) {
                            editElement(item, null, null, 1, null);
                        });
                    } else if (action == 'nactive') {
                        checkedid.forEach(function (item) {
                            editElement(item, null, null, 0, null);
                        });
                    } else if (action == 'delete') {
                        checkedid.forEach(function (item) {
                            $('#user-' + item).remove();
                        });
                    }
                    alertzone('info', 'Info', response.goodtype, 2000);
                } else if (data.status == 'error') {
                    alertzone('warning', 'Warning', response.errtype, 2000);
                }

            }
        });

    } else {
        var checked = $(".select_one:checked").length;
        if (checked == 0) {
            //вибрати хотяб один
            alertzone('warning', 'Warning', 'Please select at least one item', 4000)
            return;
        }
        var action = $('#testaction').val();
        if (action == 'none') {
            //вибрати дію
            alertzone('warning', 'Warning!', 'Please select action', 4000)
            return;
        }
        var checkedid = [];
        $('.select_one:checked').each(function () {
            checkedid.push($(this).val());
        });
        $('#group-user').empty();
        $('#group-user').append('Confirm ' + action);
        $('#groupModal').modal('show');
        $('#group-btn').attr('onclick', "subm(true)");
    }

}
function subm1(type) {
    if (type == true) {
        let action = $('#action1').val();
        var checkedid = [];
        $('.select_one:checked').each(function () {
            checkedid.push($(this).val());
        });

        var arr = { "action": action, "ids": checkedid };
        var jsonstr = JSON.stringify(arr);

        $.ajax({
            url: 'api/json.php',
            method: 'POST',
            dataType: 'json',
            data: jsonstr,
            success: function (response) {
                $('#groupModal').modal('hide');
                // refresh();
                if (response.status == 'good') {
                    if (action == 'active') {
                        checkedid.forEach(function (item) {
                            editElement(item, null, null, 1, null);
                        });
                    } else if (action == 'nactive') {
                        checkedid.forEach(function (item) {
                            editElement(item, null, null, 0, null);
                        });
                    } else if (action == 'delete') {
                        checkedid.forEach(function (item) {
                            $('#user-' + item).remove();
                        });
                    }
                    alertzone('info', 'Info', response.goodtype, 2000);
                } else if (data.status == 'error') {
                    alertzone('warning', 'Warning', response.errtype, 2000);
                }

            }
        });

    } else {
        var checked = $(".select_one:checked").length;
        if (checked == 0) {
            //вибрати хотяб один
            alertzone('warning', 'Warning', 'Please select at least one item', 4000)
            return;
        }
        var action = $('#action1').val();
        if (action == 'none') {
            //вибрати дію
            alertzone('warning', 'Warning!', 'Please select action', 4000)
            return;
        }
        var checkedid = [];
        $('.select_one:checked').each(function () {
            checkedid.push($(this).val());
        });
        $('#group-user').empty();
        $('#group-user').append('Confirm ' + action);
        $('#groupModal').modal('show');
        $('#group-btn').attr('onclick', "subm1(true)");
    }

}
function alertzone(type, strong, message, time) {


    let html = '<div id="alertz" class="alert alert-' + type + ' alert-dismissible fade show" role="alert">\
    <strong>'+ strong + ' </strong>' + message + '\
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">\
      <span aria-hidden="true">&times;</span>\
    </button>\
  </div>';

    $('#alertzone').append(html);
    setTimeout(function () {
        $('#alertz').alert('close')
    }, time);
}

function getData() {
    $.ajax({
        url: 'api/db.php',
        method: 'POST',
        dataType: 'text',
        data: {
            key: 'getusers',
        }, success: function (response) {
            let data = JSON.parse(response);
            for (var x = 0; x < data.length; x++) {

                $('tbody').append(buildTableElemet(data[x].id_user, data[x].f_name, data[x].l_name, data[x].status, data[x].role));

            }
        }
    });
}
function buildTableElemet(id_user, f_name, l_name, status, role) {
    let toggle
    if (status == 1) {
        toggle = 'green'
    } else {
        toggle = 'text-secondary'
    }
    let html = '<tr class="tabledel" id="user-' + id_user + '"> \
    <td class="align-middle"> \
      <div \
        class="custom-control custom-control-inline custom-checkbox custom-control-nameless m-0 align-top">\
        <input type="checkbox" onclick="check()" class="select_one custom-control-input" id="item-'+ id_user + '" value="' + id_user + '">\
        <label class="custom-control-label" for="item-'+ id_user + '"></label>\
      </div>\
    </td>\
    <td id="td_fname'+ id_user + '" class="text-nowrap align-middle">' + f_name + ' ' + l_name + '</td>\
    <td id="td_role'+ id_user + '"class="text-nowrap align-middle"><span>' + role + '</span></td>\
    <td id="td_status'+ id_user + '" class="text-center align-middle">\
    <i class="size fa fa-circle '+ toggle + '"></i>\
    </td>\
    <td class="text-center align-middle">\
      <div class="btn-group align-top">\
        <button class="btn btn-sm btn-outline-secondary badge" onclick="edit('+ id_user + ')" type="button" data-toggle="modal"\
          >Edit</button>\
        <button class="btn btn-sm btn-outline-secondary badge" onclick="remove('+ id_user + ')" type="button"><i\
            class="fa fa-trash"></i></button>\
      </div>\
    </td>\
  </tr>'
    return html;
}

function remove(id) {//build modal delete
    $.ajax({
        url: 'api/db.php',
        method: 'POST',
        dataType: 'text',
        data: {
            key: 'getrowuser',
            id: id,
        }, success: function (response) {
            let data = JSON.parse(response);
            $('#delete-user').empty();
            $('#delete-user').append('Confirm delete ' + data[0].f_name + ' ' + data[0].l_name);
            $('#deleteModal').modal('show');
            $('#delete-btn').attr('onclick', "deleteUser('" + data[0].id_user + "')");
        }
    });

}
function deleteUser(id) {//delete 
    $.ajax({
        url: 'api/db.php',
        method: 'POST',
        dataType: 'text',
        data: {
            key: 'deleteuser',
            id: id,
        }, success: function (response) {
            $('#deleteModal').modal('hide');
            alertzone('info', 'Info', 'User deleted', 2000);
            $('#user-' + id).remove();
            //доробити вивід помилок 
        }
    });
}

function edit(id = 0) {//build modal
    $('#title-edit').empty();
    $('#edit-status').attr('checked', false);

    if (id == 0) {
        $('#title-edit').append('Add user');
        $('#edit-name').val('');
        $('#edit-surname').val('');
        $('#edit-status').val(0);
        $('#edit-role').val('');

    } else {
        $('#title-edit').append('Edit user');
        $.ajax({
            url: 'api/db.php',
            method: 'POST',
            dataType: 'text',
            data: {
                key: 'getrowuser',
                id: id,
            }, success: function (response) {
                let data = JSON.parse(response);
                $('#edit-name').val(data[0].f_name);
                $('#edit-surname').val(data[0].l_name);
                $('#edit-status').val(data[0].status);
                if (data[0].status == '1') {
                    $('#edit-status').attr('checked', true);


                } else {
                    $('#edit-status').attr('checked', false);
                }
                $('#edit-role').val(data[0].role);


            }
        });
    }
    $("#edit-btn").attr('onclick', "validateform('" + id + "')");
    $('#user-form-modal').modal('show');
}

function validateform(id) {
    let f_name = $('#edit-name');
    let l_name = $('#edit-surname');
    let status = $('#edit-status');
    let role = $('#edit-role');
    let status_state;

    if (status.prop("checked") == true) {
        status_state = 1;
    }
    else if (status.prop("checked") == false) {
        status_state = 0;
    }


    $.ajax({
        url: 'api/db.php',
        method: 'POST',
        dataType: 'text',
        data: {
            key: 'updateuser',
            id: id,
            f_name: f_name.val(),
            l_name: l_name.val(),
            status: status_state,
            role: role.val()
        }, success: function (response) {
            result = JSON.parse(response);
            if (result.status == 'error') {
                addErrView(result.key, result.errtype);
            } else {
                $('#user-form-modal').modal('hide');
                if (result.id != null) {
                    $('tbody').append(buildTableElemet(result.id, f_name.val(), l_name.val(), status_state, role.val()));
                } else {
                    editElement(id, f_name.val(), l_name.val(), status_state, role.val())
                }

                alertzone('info', 'Info', 'User edited/created', 2000);
            }

        }
    });
}

function addErrView(idElem, message) {
    $('#' + idElem).addClass('is-invalid');
    $('#' + idElem + '-p').html(message);

    setTimeout(function () {
        $('#' + idElem).removeClass('is-invalid');
        $('#' + idElem + '-p').html('');
    }, 2000);
}
// function refresh() {
//     $('.tabledel').remove();
//     getData();
// }
function editElement(id, f_name, l_name, status, role) {

    if (f_name != null && l_name != null) {
        $('#td_fname' + id).text(f_name + ' ' + l_name);
    }
    if (status != null) {
        let toggle
        if (status == 1) {
            toggle = 'green'
        } else {
            toggle = 'text-secondary'
        }
        $('#td_status' + id + ':first-child').remove();
        $('#td_status' + id).html('<i class="size fa fa-circle ' + toggle + '">');
    }
    if (role != null) {
        $('#td_role' + id).text(role);
    }
}

