// Load Selected Image
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
