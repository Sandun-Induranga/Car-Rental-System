/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

$("#btnLogin").on("click", function () {

    $.ajax({
        url: baseurl + "login",
        method: "get",
        data: $("#loginForm").serialize(),
        success: function () {

        }
    })

})
