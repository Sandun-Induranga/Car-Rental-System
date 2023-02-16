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
                case "Customer":
                    alert("Customer");
                    break;
                default:
                    alert("none");
            }
        }
    })

})
