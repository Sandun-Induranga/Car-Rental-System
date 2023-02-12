const baseurl = "http://localhost:8080/easy/";

// Upload NIC Image
$("#nicImage").on("change", function (e) {
    var file = e.target.files;
    console.log("come")

    if (FileReader && file && file.length) {
        var reader = new FileReader();
        reader.onload = function () {
            $("#nicImgContext").css({
                "background": `url(${reader.result})`,
                "background-size": "cover",
                "background-position": "center"
            })
        }
        reader.readAsDataURL(file[0]);
    }

})


// Upload License Image
$("#licenseImage").on("change", function (e) {
    var file = e.target.files;
    console.log("come")

    if (FileReader && file && file.length) {
        var reader = new FileReader();
        reader.onload = function () {
            $("#licenseImgContext").css({
                "background": `url(${reader.result})`,
                "background-size": "cover",
                "background-position": "center"
            })
        }
        reader.readAsDataURL(file[0]);
    }

})

$.ajax({
    url: baseurl + "customer",
    method: "post",
    contentType: false,
    processData: false,
    success: function (res) {

    }
})
