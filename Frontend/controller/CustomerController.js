$("#nicImage").on("change", function (e) {
    var file = e.target.files;
    console.log("come")

    if (FileReader && file && file.length){
        console.log("done")
        var reader = new FileReader();
        reader.onload = function () {
            $("#licenseImgContext").css({"background": `url(${reader.result})`,"background-size":"cover", "background-position":"center"})
        }
        reader.readAsDataURL(file[0]);
    }

})
