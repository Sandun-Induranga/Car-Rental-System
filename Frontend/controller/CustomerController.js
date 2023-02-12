// Upload NIC Image
loadSelectedImage("#nicImage");

// Upload License Image
loadSelectedImage("#licenseImage");

// Save Customer
$("#btnSubmit").on("click", function () {

    let data = new FormData($("#customerForm")[0]);

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
