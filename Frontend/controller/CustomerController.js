const baseurl = "http://localhost:8080/easy/";

// Upload NIC Image
loadSelectedImage("#nicImage");

// Upload License Image
loadSelectedImage("#licenseImage");

$("#btnSubmit").on("click", function () {

    var data = new FormData($("#customerForm")[0]);

    $.ajax({
        url: baseurl + "customer",
        method: "post",
        data: data,
        contentType: false,
        processData: false,
        success: function (res) {

        }
    });
});
