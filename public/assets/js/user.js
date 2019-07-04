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


$('#avatar').on('change', function() {
    // console.log(this.files[0]);
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