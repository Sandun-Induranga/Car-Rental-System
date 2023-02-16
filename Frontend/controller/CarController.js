/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

loadSelectedImage("#front")
loadSelectedImage("#back")
loadSelectedImage("#side")
loadSelectedImage("#interior")

$("#btnSubmit").on("click", function () {

    var data = new FormData($("#carForm")[0]);

    $.ajax({
        url: baseurl + "car",
        method: "post",
        data: data,
        contentType: false,
        processData: false,
        success: function (res) {

        }
    });
});
