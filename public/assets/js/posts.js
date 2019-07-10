$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        console.log(response);
        var html = template('postsTpl', response);
        // console.log(html);
        $('#postsBox').html(html);
        var page = template('pageTpl', response);
        $('#page').html(page)
    }
});

function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
};

function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(response) {
            console.log(response);
            var html = template('postsTpl', response);
            // console.log(html);
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page)
        }
    });
};



$('#postsBox').on('click', '.delete', function() {
    if (confirm('是否确认删除')) {
        var id = $(this).attr('data-id');
        // alert(id)
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function() {
                location.reload();
            }
        })
    }
});