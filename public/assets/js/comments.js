$.ajax({
    type: 'get',
    url: '/comments',
    success: function(response) {
        console.log(response);
        var html = template('commentsTpl', response);
        // console.log(html);
        $("#commentBox").html(html);
    }
});