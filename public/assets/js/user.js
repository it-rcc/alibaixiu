$('#userForm').on('submit', function() {
    var formData = $(this).serialize();
    // console.log(formData);
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            location.reload();
        },
        error: function() {
            alert('添加失败')
        }
    });
    return false;
});

$('#modifyBox').on('change', '#avatar', function() {
    console.log(this.files[0]);
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAvatar').val(response[0].avatar);
        }
    })
});

$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        // console.log(response);
        var html = template('userTpl', {
            data: response
        });
        // console.log(html);
        $('#userBox').html(html);
    }

});

$('#userBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            // console.log(response);
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    })
});

$('#modifyBox').on('submit', '#modifyForm', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    console.log(formData);
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            location.reload();
        }

    })
    return false;
});

$('#userBox').on('click', '.delete', function() {
    if (confirm('是否确定删除')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function(response) {
                location.reload()
            }
        })
    }
});
var selectAll = $('#selectAll');

var deleteMany = $('#deleteMany');

selectAll.on('change', function() {
    var status = $(this).prop('checked');
    if (status) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
    // alert(status);
    $('#userBox').find('input').prop('checked', status);
});

$('#userBox').on('change', '.userStatus', function() {
    var input = $('#userBox').find('input');
    if (input.length == input.filter(':checked').length) {
        // alert('被选中')
        selectAll.prop('checked', true);
    } else {
        // alert('mei ')
        selectAll.prop('checked', false);
    }

    if (input.filter(':checked').length > 0) {
        deleteMany.show();
    } else {
        deleteMany.hide();
    }
});

deleteMany.on('click', function() {
    var ids = [];
    var checkedUser = $('#userBox').find('input').filter(':checked');
    checkedUser.each(function(index, element) {
            ids.push($(element).attr('data-id'));
        })
        // console.log(ids);
    if (confirm('是否确定批量删除')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload();
            }
        })
    } else {

    }
});