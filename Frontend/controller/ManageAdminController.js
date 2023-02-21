/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

let regNum;
let dailyMileage;
let monthlyMileage;
let dailyPrice;
let monthlyPrice;
let rentId;
let currentUser;
let customer;

loadAllCars();

$.ajax({
    url: baseurl + "login",
    method: "get",
    async: false,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
        currentUser = res.data;
        $("#user").text(res.data.username);
        getCustomer();
    }
});

// getCustomer();
function getCustomer() {
    $.ajax({
        url: baseurl + `rent?username=${currentUser.username}`,
        method: "get",
        async: false,
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            customer = res.data;
            console.log(customer)
        }
    });
}


/** ********************************************************* Rent ***************************************************** **/

function getDetail() {

    $(".rent").on("click", function () {

        regNum = $(this).parent().parent().children(":eq(6)").text();
        dailyMileage = $(this).parent().parent().children(":eq(4)").children(":eq(1)").text();
        monthlyMileage = $(this).parent().parent().children(":eq(4)").children(":eq(2)").text();
        dailyPrice = $(this).parent().parent().children(":eq(4)").children(":eq(1)").text();
        monthlyPrice = $(this).parent().parent().children(":eq(4)").children(":eq(2)").text();
        console.log(regNum + dailyMileage + monthlyMileage + dailyPrice + monthlyPrice);

    });

}

$("#btnRequestCar").on("click", function () {

    let json = {
        rentId: rentId,
        nic: customer,
        pickUpDate: $("#pickUpDate").val(),
        pickUpTime: $("#pickUpTime").val(),
        returnDate: $("#returnDate").val(),
        returnTime: $("#returnTime").val(),
        driverRequest: $('#driverRequest').is(':checked') ? "YES" : "NO",
        status: "Pending",
        cost: $("#cost").val(),
        description: $("#description").val(),
        rentDetails: [
            {
                rentId: rentId,
                nic: null,
                regNum: regNum,
                driverCost: $("#driverCost").val(),
                carCost: $("#carCost").val()
            }
        ]
    }

    $.ajax({
        url: baseurl + "rent",
        method: "post",
        data: JSON.stringify(json),
        dataType: "json",
        contentType: "application/json",
        success: function (res) {

        }
    });

});

$("#pickUpDate").on("change", function () {
    setCosts();
});

$("#returnDate").on("change", function () {
    setCosts();
});


function setCosts() {

    let days = (new Date(Date.parse($("#returnDate").val()) - Date.parse($("#pickUpDate").val()))) / 1000 / 60 / 60 / 24;
    let carCost = days < 30 ? dailyPrice.split(" ")[0] * days : monthlyPrice.split(" ")[0] * (days / 30);
    $("#carCost").val(carCost);
    $("#driverCost").val(1000 * days);

}

generateNewRentId();

function generateNewRentId() {
    $.ajax({
        url: baseurl + "rent",
        method: "get",
        async: false,
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            rentId = res.data;
        }
    });
}

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


/** *************************************************************** Car ***************************************************** **/

loadSelectedImage("#front");
loadSelectedImage("#back");
loadSelectedImage("#side");
loadSelectedImage("#interior");

$("#btnSubmit").on("click", function () {

    let data = new FormData($("#carForm")[0]);

    $.ajax({
        url: baseurl + "car",
        method: "post",
        data: data,
        contentType: false,
        processData: false,
        success: function (res) {

        }
    });
});

function loadAllCars() {

    $.ajax({
        url: baseurl + "car",
        method: "get",

        success: function (res) {
            for (let car of res.data) {
                $("#cars").append(`<div class="col w-25">
            <div class="card">
                <img src="../assets/image/background.png" class="card-img-top" alt="car">

                <div class="card-body">
                    <h5 class="card-title">${car.brand}</h5>

                    <section class="mb-4">
                        <img src="../assets/image/background.png" class="w-25" alt="${car.photos.back}">
                        <img src="../assets/image/background.png" class="w-25" alt="car">
                        <img src="../assets/image/background.png" class="w-25" alt="car">
                    </section>

                    <section class="d-flex gap-3 justify-content-between">
                        <p class="card-text"><i class="bi bi-fuel-pump-diesel-fill me-1 text-success"></i>${car.fuelType}</p>
                        <p class="card-text"><i class="bi bi-palette-fill me-1 text-danger"></i>${car.color}</p>
                        <p class="card-text"><i class="bi bi-gear-wide-connected me-1 text-info"></i>${car.transmissionType}</p>
                        <p class="card-text"><i class="bi bi-people-fill me-1 text-primary"></i>${car.passengers}</p>
                    </section>

                    <section class="row justify-content-between align-items-center">
                        <p class="card-text col col-12">Free Mileage</p>
                        <p class="card-text text-secondary col col-lg-6 mb-lg-0 mb-4">${car.freeMileage.dailyRate}km Daily</p>
                        <p class="card-text text-secondary col col-lg-6 mb-lg-0 mb-4">${car.freeMileage.monthlyRate}km Monthly</p>
                    </section>

                    <section class="row justify-content-between align-items-center">
                        <p class="card-text col col-12">Price</p>
                        <p class="card-text text-secondary col col-lg-6 mb-lg-0 mb-4">${car.price.dailyPriceRate} LKR Daily</p>
                        <p class="card-text text-secondary col col-lg-6 mb-lg-0 mb-4">${car.price.monthlyPriceRate} LKR Monthly</p>
                    </section>

                    <section class="row justify-content-between">
                        <p class="card-text col col-lg-4">Lost Damage Cost</p>
                        <p class="card-text text-secondary col">${car.lostDamageCost} LKR</p>
                    </section>

                    <p class="card-text text-secondary" id="registerNum"><i class="bi bi-car-front me-1"></i>${car.regNum}</p>
                        
                    <section class="d-flex justify-content-between flex-lg-row flex-column gap-1">
                        <button class="btn btn-success rent" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><p class="card-text"><i class="bi bi-upc-scan"></i> Rent </p></button>
                        <button class="btn btn-warning"><p class="card-text"><i class="bi bi-cart-check-fill"></i> Add to cart</p></button>
                    </section>

                </div>

            </div>
        </div>`);
                getDetail();
            }
        }

    });

}


/** ********************************************************** Driver ****************************************************** **/

// Upload License Image
loadSelectedImage("#licenseImage");

$("#btnSaveDriver").on("click", function () {

    let data = new FormData($("#driverForm")[0]);

    $.ajax({
        url: baseurl + "driver",
        method: "post",
        data: data,
        contentType: false,
        processData: false,
        success: function (res) {

        }
    });
});
