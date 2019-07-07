$('#addCategory').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            location.reload();
        }
    })
    return false;
});

$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        console.log(response);
        var html = template('categoryListTpl', { data: response });
        // console.log(html);
        $('#categoryBox').html(html);
    }
});

$('#categoryBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function(response) {
            console.log(response);
            var html = template('modifyCategoryTpl', response);
            // console.log(html);
            $('#formBox').html(html);
        }
    })
});

$('#formBox').on('submit', '#modifyCategory', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function() {
            location.reload();
        }
    })
    return false;
});

$('#categoryBox').on('click', '.delete', function() {
    if (confirm('是否执行删除')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})