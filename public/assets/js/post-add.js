$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        console.log(response);
        var html = template('categoryTpl', { data: response });
        // console.log(html)
        $('#category').html(html);
    }
});

$('#feature').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            $('#thumbnail').val(response[0].cover);
        }
    })
});

$('#addForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            location.href = '/admin/posts.html';
        }
    })
    return false;
});