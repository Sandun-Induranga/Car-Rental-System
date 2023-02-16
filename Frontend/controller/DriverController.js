/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

// Upload NIC Image
loadSelectedImage("#licenseImage");

$("#btnSubmit").on("click", function () {

    let data = new FormData($("#driverForm")[0]);

    $.ajax({
        url: baseurl + "driver",
        method: "post",
        data: data,
        contentType: false,
        processData: false,
        success: function (res) {

        }
    });
});
