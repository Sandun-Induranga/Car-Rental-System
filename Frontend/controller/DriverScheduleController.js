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
        for (let detail of res.data) {
            $("#tblDriverSchedule").append(`
                <tr>
                    <td>${detail.rentId}</td>
                    <td>${detail.pickUpDate}</td>
                    <td>${detail.pickUpTime}</td>
                    <td>${detail.returnDate}</td>
                    <td>${detail.returnTime}</td>
                    <td>${detail.regNum}</td>
                </tr>
            `);
        }
    }
});
