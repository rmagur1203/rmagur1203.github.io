$(document).ready(function() {
    let Search = () => {
        var value = $("input").val().toLowerCase();
        $("tbody tr").filter(function() {
            $(this).toggle($(this).children().first().text().toLowerCase().indexOf(value) > -1)
        });
    }
    $("button[type=button]").click(function() {
        Search();
    });
    $("input[type=text]").keypress(function(e) {
        if (e.keyCode == 13) {
            Search();
        }
    });
});