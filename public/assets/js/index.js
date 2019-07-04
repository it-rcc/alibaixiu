$('#logout').on('click', function() {
    var tc = confirm('确认退出');
    if (tc) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = 'login.html';
            },
            error: function() {
                alert('退出失败');
            }
        });
    }
})