$('#logo').on('change', function() {
    var file = this.files[0];
    var formData = new FormData();
    formData.append('logo', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#settsc').val(response[0].logo);
            $('#preview').attr('src', response[0].logo)
        }
    })
});

$('#settingsForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function() {
            location.reload();
        }
    })
    return false;
});

$.ajax({
    type: 'get',
    url: '/settings',
    success: function(response) {
        console.log(response);
    }
})