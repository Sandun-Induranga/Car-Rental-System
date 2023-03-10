/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

$("#btnLogin").on("click", function () {

    $.ajax({
        url: baseurl + "login",
        method: "post",
        data: $("#loginForm").serialize(),
        success: function (res) {

            switch (res.data.role) {
                case "Admin":
                    window.open("admin-home-page.html", '_self');
                    break;
                case "Customer":
                    window.open("customer-page.html", '_self');
                    break;
                case "Driver":
                    window.open("driver-page.html", '_self');
                    break;
                default:
                    alert("none");
            }

        },
        error:function (res) {
            errorAlert("Wrong User Details");
        }
    });

});
