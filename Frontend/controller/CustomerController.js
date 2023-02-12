const baseurl = "http://localhost:8080/easy/";

// Upload NIC Image
loadSelectedImage("#nicImage");

// Upload License Image
loadSelectedImage("#licenseImage");

function loadSelectedImage(divId) {
    $(divId).on("change", function (e) {
        let file = e.target.files;

        if (FileReader && file && file.length) {
            let reader = new FileReader();
            reader.onload = function () {
                $(divId).parent().children(":eq(0)").css({
                    "background": `url(${reader.result})`,
                    "background-size": "cover",
                    "background-position": "center"
                });
            }
            reader.readAsDataURL(file[0]);
        }

    });
}

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
