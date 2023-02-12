const baseurl = "http://localhost:8080/easy/";

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
