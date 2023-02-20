/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

let currentUser;

$.ajax({
    url: baseurl + "driver",
    method: "get",
    async: false,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
        currentUser = res.data;
        $("#username").text(res.data.user.username);
    }
});

$.ajax({
    url: baseurl + "driver?nic=" + currentUser.nic,
    method: "get",
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
        console.log(res.data)
    }
});
