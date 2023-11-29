$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});

$(document).ready(function(){
    $('#video_tab').click(function() {
      $('.video_tab_pan').toggle("fast");
    });
});

function openNav10() {
        document.getElementById("myNav10").style.display = "block";
}

function closeNav10() {
    document.getElementById("myNav10").style.display = "none";
}