/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

let rentId;

$.ajax({

    url: baseurl + "rent/all",
    method: "get",
    contentType: "application/json",
    dataType: "json",
    success: function (res) {
        loadCards(res);
    }

});

function loadCards(res) {

    for (let rent of res.data) {

        $("#rent-context").append(`
            <div class="card text-center p-2 w-50 shadow">
                <div class="card-body" id="${res.rentId}">
                    <h5 class="card-title">${rent.rentId}</h5>
                    <p class="card-text">Customer NIC : ${rent.nic.nic}</p>
                    <p class="card-text">Customer Name : ${rent.nic.name}</p>
                    <p class="card-text">Pick Up Date : ${rent.pickUpDate.toString().replaceAll(",", "/")}</p>
                    <p class="card-text">Pick Up Time: ${rent.pickUpTime.toString().replaceAll(",", ":")}</p>
                    <p class="card-text">Return Date : ${rent.returnDate.toString().replaceAll(",", "/")}</p>
                    <p class="card-text">Return Time : ${rent.returnTime.toString().replaceAll(",", ":")}</p>
                    <p class="card-text">Description : ${rent.description.split(".")[0]}</p>
                    <p class="card-text">Rent Status : ${rent.status}</p>
                    <table class="table" id=${rent.rentId}>
                        <thead>
                              <tr>
                                    <th scope="col">Register Number</th>
                                    <th scope="col">Car Cost</th>
                                    <th scope="col">Driver Cost</th>
                                    <th scope="col">Driver NIC</th>
                              </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <section class="mb-2">
                    <button class="btn btn-success me-2 btnAccept">Accept</button>
                    <button class="btn btn-success me-2 btn-warning pay" data-bs-toggle="modal" data-bs-target="#paymentModel">Pay</button>
                    <button class="btn btn-danger">Reject</button>
                </section>
            </div>
            `);

        $(`#${res.rentId} > tbody`).empty();

        for (let rentDetail of rent.rentDetails) {
            $(`#${rent.rentId} > tbody`).append(`
                   
                    <tr>
                      <td>${rentDetail.regNum}</td>
                      <td>${rentDetail.carCost}</td>
                      <td>${rentDetail.driverCost}</td>
                      <td>${rentDetail.nic == null ? "--" : rentDetail.nic}</td>
                    </tr>  
                `);
        }

    }

    bindAcceptEvent();
    bindManagePayment();
    bindPayEvent()

}

function bindAcceptEvent() {
    $(".btnAccept").on("click", function () {

        let text = $(this).parent().parent().children(":eq(0)").children(":eq(0)").text();

        $.ajax({
            url: baseurl + `rent?rentId=${text}`,
            method: "put",
            dataType: "json",
            contentType: "application/json",
            success: function (res) {

            }
        });

    });
}


function bindPayEvent() {

    $(".pay").on("click", function () {
        rentId = $(this).parent().parent().children(":eq(0)").children(":eq(0)").text();
    });

}

function bindManagePayment() {
    $("#btnPayment").on("click", function () {

        let data = $("#paymentForm").serialize();

        let json = {
            balance: $("#balance").val(),
            cash: $("#cash").val(),
            description: $("#description").val(),
            total: $("#total").val(),
            type: $("#type").val(),
            rentId: {
                rentId:rentId
            }
        }

        $.ajax({
            url: baseurl + `payment`,
            method: "post",
            data: JSON.stringify(json),
            dataType: "json",
            contentType: "application/json",
            success: function (res) {

            }
        });

    });
}
