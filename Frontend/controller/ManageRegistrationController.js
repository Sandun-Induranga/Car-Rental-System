// Save Customer
$("#btnSaveCustomer").on("click", function () {

    let data = new FormData($("#customerForm")[0]);

    let json = {
        nic: $("#cusNic").val(),
        name: $("#cusName").val(),
        license: $("#cusLicense").val(),
        address: $("#cusAddress").val(),
        contact: $("#cusContact").val(),
        email: $("#cusEmail").val(),
        user: {
            username: $("#cusUsername").val(),
            password: $("#cusPassword").val(),
        }

    }

    $.ajax({
        url: baseurl + "customer",
        method: "post",
        async: false,
        cache: false,
        data: JSON.stringify(json),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            saveAlert();
        }
    });

    if ($('#cusNicImage').get(0).files.length === 0 || $('#cusLicenseImage').get(0).files.length === 0) {
        return;
    }

    $.ajax({
        url: baseurl + "customer?image",
        method: "post",
        async: false,
        data: data,
        contentType: false,
        processData: false,
        success: function (res) {
            saveAlert();
            window.open("login-form.html", '_self');
        },
        error: function (res) {
            alert(res.message);
        }
    });

});
