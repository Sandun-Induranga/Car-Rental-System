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

$.ajax({
    url: baseurl + "login",
    method: "get",
    async: false,
    dataType: "json",
    contentType: "application/json",
    success: function (res) {
        currentUser = res.data;
        $("#user").text(res.data.username);
    }
});

manageCustomerPage();
manageCarPage();
manageDriverPage();
manageRentPage();
managePaymentsPage();
manageHomePage();

function manageHomePage() {

    $("#btnHome").on("click", function () {
        $('#home').fadeIn();
        $("#home").attr("style", "display : block !important");
        $("#viewCustomer").attr("style", "display : none !important");
        $("#manageCustomers").attr("style", "display : none !important");
        $("#manageCar").attr("style", "display : none !important");
        $("#viewCar").attr("style", "display : none !important");
        $("#manageDriver").attr("style", "display : none !important");
        $("#drivers").attr("style", "display : none !important");
        $("#rents").attr("style", "display : none !important");
        $("#payments").attr("style", "display : none !important");


        $.ajax({
            url: baseurl + "customer/count",
            method: "get",
            dataType: "json",
            success: function (res) {
                $("#reg-users").text(res.data);
            }
        });

        $.ajax({
            url: baseurl + "rent/count",
            method: "get",
            dataType: "json",
            success: function (res) {
                $("#rent-count").text(res.data);
            }
        });

        $.ajax({
            url: baseurl + "car/count",
            method: "get",
            dataType: "json",
            success: function (res) {
                $("#available-cars").text(res.data);
            }
        });

        $.ajax({
            url: baseurl + "car/count/reserved",
            method: "get",
            dataType: "json",
            success: function (res) {
                $("#reserved-cars").text(res.data);
            }
        });

    });

    var options = {
        animationEnabled: true,
        title: {
            text: "GDP Growth Rate - 2016"
        },
        axisY: {
            title: "Growth Rate (in %)",
            suffix: "%"
        },
        axisX: {
            title: "Countries"
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#" % "",
            dataPoints: [
                {label: "Iraq", y: 10.09},
                {label: "Turks & Caicos Islands", y: 9.40},
                {label: "Nauru", y: 8.50},
                {label: "Ethiopia", y: 7.96},
                {label: "Uzbekistan", y: 7.80},
                {label: "Nepal", y: 7.56},
                {label: "Iceland", y: 7.20},
                {label: "India", y: 7.1}

            ]
        }]
    };

    $("#chartContainer").CanvasJSChart(options);

}


function manageCustomerPage() {
    $("#btnCustomer").on("click", function () {
        $('#viewCustomer').fadeIn();
        $("#home").attr("style", "display : none !important");
        $("#viewCustomer").attr("style", "display : block !important");
        $("#manageCustomers").attr("style", "display : none !important");
        $("#manageCar").attr("style", "display : none !important");
        $("#viewCar").attr("style", "display : none !important");
        $("#manageDriver").attr("style", "display : none !important");
        $("#drivers").attr("style", "display : none !important");
        $("#rents").attr("style", "display : none !important");
        $("#payments").attr("style", "display : none !important");

        // Upload NIC Image
        loadSelectedImage("#cusNicImage");

        // Upload License Image
        loadSelectedImage("#cusLicenseImage");

        $("#btnAddCustomer").on("click", function () {
            $("#manageCustomers").attr("style", "display : block !important");
            $("#viewCustomer").attr("style", "display : none !important");
            $(this).attr("style", "display : block !important");
            $("#btnSaveCustomer").text("Save");
        });

        $("#btnBackCustomer").on("click", function () {
            $("#manageCustomers").attr("style", "display : none !important");
            $("#viewCustomer").attr("style", "display : block !important");
            $(this).attr("style", "display : block !important");
            $("#btnSaveCustomer").text("Save");
        });

        // Save Customer
        $("#btnSaveCustomer").on("click", function () {

            let data = new FormData($("#customerForm")[0]);

            let json = {
                nic: $("#cusNic").val(),
                name: $("#cusName").val(),
                license: $("#cusLicense").val(),
                address: $("#cusAddress").val(),
                contact: $("#cusContact").val(),
                email: $("#cusEmail").val(),
                user: {
                    username: $("#cusUsername").val(),
                    password: $("#cusPassword").val(),
                }

            }

            $.ajax({
                url: baseurl + "customer",
                method: $("#btnSaveCustomer").text() == "Save" ? "post" : "put",
                async: false,
                data: JSON.stringify(json),
                contentType: "application/json",
                dataType: "json",
                success: function (res) {

                }
            });

            if ($('#cusNicImage').get(0).files.length === 0 || $('#cusLicenseImage').get(0).files.length === 0) {
                return;
            }

            $.ajax({
                url: baseurl + "customer?image",
                method: "post",
                async: false,
                data: data,
                contentType: false,
                processData: false,
                success: function (res) {
                    alert(res.message);
                    $("#manageCustomers").attr("style", "display : none !important");
                    $("#viewCustomer").attr("style", "display : block !important");
                }
            });
            loadAllCustomers();

        });

        function loadAllCustomers() {

            $.ajax({
                url: baseurl + "customer",
                method: "get",
                dataType: "json",
                success: function (res) {

                    $("#tblCustomer").empty();

                    for (let customer of res.data) {

                        $("#tblCustomer").append(`
                    <tr class="text-secondary">
                        <td>${customer.nic}</td>
                        <td>${customer.name}</td>
                        <td>${customer.email}</td>
                        <td>${customer.address}</td>
                        <td>${customer.license}</td>
                        <td>${customer.user.username}</td>
                        <td>${customer.user.password}</td>
                        <td>${customer.contact}</td>
                        <td><img src="${customer.nicImage}" alt="" srcset="" width="80px" height="60px"></td>
                        <td><img src="${customer.licenseImage}" alt="" srcset="" width="80px" height="60px"></td>
                        <td><i class="bi bi-pen-fill text-success text-center btn btnUpdate"></i><i class="bi bi-trash-fill text-danger text-center btn btnDelete"></i></td>
                    </tr>
                    `);
                    }

                    bindUpdateEvent();
                    bindDeleteEvent();

                }
            });


        }

        loadAllCustomers();

        function bindUpdateEvent() {
            $(".btnUpdate").on("click", function () {

                $("#cusNic").val($(this).parent().parent().children(":eq(0)").text());
                $("#cusName").val($(this).parent().parent().children(":eq(1)").text());
                $("#cusLicense").val($(this).parent().parent().children(":eq(4)").text());
                $("#cusAddress").val($(this).parent().parent().children(":eq(3)").text());
                $("#cusContact").val($(this).parent().parent().children(":eq(7)").text());
                $("#cusEmail").val($(this).parent().parent().children(":eq(2)").text());
                $("#cusUsername").val($(this).parent().parent().children(":eq(5)").text());
                $("#cusPassword").val($(this).parent().parent().children(":eq(6)").text());

                $("#manageCustomers").attr("style", "display : block !important");
                $("#viewCustomer").attr("style", "display : none !important");
                $(this).attr("style", "display : block !important");
                $("#btnSaveCustomer").text("Update");

            });
        }

        function bindDeleteEvent() {
            $(".btnDelete").on("click", function () {

                let nic = $(this).parent().parent().children(":eq(0)").text();

                if (!confirm("Are You Sure")) return;


                $.ajax({
                    url: baseurl + "customer?nic=" + nic,
                    method: "delete",
                    async: false,
                    data: nic,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        alert(res.message);
                        $("#manageCustomers").attr("style", "display : none !important");
                        $("#viewCustomer").attr("style", "display : block !important");
                        loadAllCustomers();
                    }
                });

            });
        }


    });
}


/* ***************************************************************    Car    ***************************************************** */


function manageCarPage() {
    $("#btnCar").on("click", function () {

        $('#viewCar').fadeIn();
        $("#home").attr("style", "display : none !important");
        $("#manageCustomers").attr("style", "display : none !important");
        $("#viewCustomer").attr("style", "display : none !important");
        $("#viewCar").attr("style", "display : block !important");
        $("#manageDriver").attr("style", "display : none !important");
        $("#drivers").attr("style", "display : none !important");
        $("#rents").attr("style", "display : none !important");
        $("#payments").attr("style", "display : none !important");

        loadSelectedImage("#front");
        loadSelectedImage("#back");
        loadSelectedImage("#side");
        loadSelectedImage("#interior");

        $("#btnAddNewCar").on("click", function () {
            $("#btnSaveCar").text("Save");
        })

        $("#btnSaveCar").on("click", function () {

            let data = new FormData($("#carForm")[0]);

            if ($("#btnSaveCar").text() == "Save") {

                $.ajax({
                    url: baseurl + "car",
                    async: false,
                    data: data,
                    method: "post",
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        loadAllCars();
                    }
                });

            } else {

                $.ajax({
                    url: baseurl + "car/update",
                    data: data,
                    method: "post",
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        loadAllCars();
                    }
                });

            }

        });

        function bindUpdateEvent() {
            $(".btnUpdate").on("click", function () {

                regNum = $(this).parent().parent().children(":eq(6)").children(":eq(0)").text().trim();

                $.ajax({
                    url: baseurl + "car?regNum=" + regNum,
                    async: false,
                    method: "get",
                    dataType: "json",
                    success: function (res) {

                        $("#regNum").val(res.data.regNum);
                        $("#carType").val(res.data.type);
                        $("#color").val(res.data.color);
                        $("#brand").val(res.data.brand);
                        $("#dailyRate").val(res.data.freeMileage.dailyRate);
                        $("#monthlyRate").val(res.data.freeMileage.monthlyRate);

                        if (res.data.fuelType == "petrol") {
                            $("#petrol").prop("checked", true)
                        } else {
                            $("#diesel").prop("checked", true)
                        }

                        if (res.data.availability == "YES") {
                            $("#yes").prop("checked", true);
                        } else if (res.data.availability == "NO") {
                            $("#no").prop("checked", true);
                        } else {
                            $("#maintain").prop("checked", true);
                        }

                        $("#dailyPriceRate").val(res.data.price.dailyPriceRate);
                        $("#monthlyPriceRate").val(res.data.price.monthlyPriceRate);

                        if (res.data.transmissionType == "manual") {
                            $("#manual").prop("checked", true)
                        } else {
                            $("#auto").prop("checked", true)
                        }

                        $("#extraKMPrice").val(res.data.extraKMPrice);
                        $("#passengers").val(res.data.passengers);
                        $("#lostDamageCost").val(res.data.lostDamageCost);
                        $("#meterValue").val(res.data.meterValue);
                        $("#frontImgContext").attr(`style`, `background : url(../assets${res.data.photos.front}); background-position: center; background-size: cover`)
                        $("#backImgContext").attr(`style`, `background : url(../assets${res.data.photos.back}); background-position: center; background-size: cover`)
                        $("#sideImgContext").attr(`style`, `background : url(../assets${res.data.photos.side}); background-position: center; background-size: cover`)
                        $("#interiorImgContext").attr(`style`, `background : url(../assets${res.data.photos.interior}); background-position: center; background-size: cover`)

                        $("#btnSaveCar").text("Update");

                    }
                });

            });
        }

        function bindDeleteEvent() {

            $(".btnDelete").on("click", function () {

                regNum = $(this).parent().parent().children(":eq(6)").children(":eq(0)").text().trim();

                if (confirm("Are You Sure..?")){
                    $.ajax({
                        url: baseurl + "car?regNum="+regNum,
                        method: "delete",
                        dataType:"json",
                        contentType: "application/json",
                        success: function (res) {
                            loadAllCars();
                        }
                    });
                }
            });

        }

        loadAllCars();

        function loadAllCars() {

            $.ajax({
                url: baseurl + "car",
                method: "get",

                success: function (res) {

                    $("#cars").empty();

                    for (let car of res.data) {
                        $("#cars").append(`<div class="col col-lg-4">
            <div class="card">
                <img src="../assets/${car.photos.front}" class="card-img-top" alt="car">

                <div class="card-body">
                    <h5 class="card-title">${car.brand}</h5>

                    <section class="mb-4">
                        <img src="../assets/${car.photos.back}" class="w-25" alt="${car.photos.back}">
                        <img src="../assets/${car.photos.side}" class="w-25" alt="car">
                        <img src="../assets/${car.photos.interior}" class="w-25" alt="car">
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
                    
                    <section class="row justify-content-between">
                        <p class="card-text text-secondary col col-6" id="registerNum"><i class="bi bi-car-front me-1"></i>${car.regNum}</p>
                        <p class="card-text text-secondary col col-6 text-danger">${car.availability == "YES" ? "" : "Out Of Stock"}</p>
                    </section>
                        
                    <section class="d-flex justify-content-between flex-lg-row flex-column gap-1">
                        <button class="btn btn-warning btnUpdate" data-bs-toggle="modal" data-bs-target="#registerCar"><p class="card-text"><i class="bi bi-app-indicator"></i> Update </p></button>
                        <button class="btn btn-danger btnDelete"><p class="card-text"><i class="bi bi-trash-fill"></i> Delete </p></button>
                    </section>

                </div>

            </div>
        </div>`);
                        getDetail();
                    }
                    bindUpdateEvent();
                    bindDeleteEvent();
                }

            });

        }

        $("#search").on("keyup", function () {
            $.ajax({
                url: baseurl + "car/filterByRegNum?text="+$("#search").text(),
                method: "delete",
                dataType:"json",
                contentType: "application/json",
                success: function (res) {
                    loadAllCars();
                }
            });
        });

        function getDetail() {

            $(".rent").on("click", function () {

                regNum = $(this).parent().parent().children(":eq(6)").text();
                dailyMileage = $(this).parent().parent().children(":eq(4)").children(":eq(1)").text();
                monthlyMileage = $(this).parent().parent().children(":eq(4)").children(":eq(2)").text();
                dailyPrice = $(this).parent().parent().children(":eq(4)").children(":eq(1)").text();
                monthlyPrice = $(this).parent().parent().children(":eq(4)").children(":eq(2)").text();

            });

        }

    });

}


/* **********************************************************    Driver    ****************************************************** */


function manageDriverPage() {
    $("#btnDriver").on("click", function () {

        loadAllDrivers();

        $('#manageDriver').fadeIn();
        $("#home").attr("style", "display : none !important");
        $("#viewCustomer").attr("style", "display : none !important");
        $("#manageCustomers").attr("style", "display : none !important");
        $("#manageCar").attr("style", "display : none !important");
        $("#viewCar").attr("style", "display : none !important");
        $("#manageDriver").attr("style", "display : none !important");
        $("#drivers").attr("style", "display : block !important");
        $("#rents").attr("style", "display : none !important");
        $("#payments").attr("style", "display : none !important");

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

                    loadAllDrivers();

                }
            });
        });

        function loadAllDrivers() {

            $.ajax({
                url: baseurl + "driver/all",
                method: "get",
                dataType: "json",
                success: function (res) {

                    $("#tblDriver").empty();

                    for (let driver of res.data) {

                        $("#tblDriver").append(`
                            <tr>
                              <td>${driver.nic}</td>
                              <td>${driver.name}</td>
                              <td>${driver.email}</td>
                              <td>${driver.address}</td>
                              <td>${driver.license}</td>
                              <td><img src="../assets${driver.licenseImage}" width="150" height="100" alt="license"></td>
                              <td>${driver.availabilityStatus}</td>
                            </tr>  
                        `)

                    }

                }
            });

        }

    });
}


/* **********************************************************    Rent    ****************************************************** */


function manageRentPage() {
    $("#btnRent").on("click", function () {

        $('#rents').fadeIn();
        $("#home").attr("style", "display : none !important");
        $("#viewCustomer").attr("style", "display : none !important");
        $("#manageCustomers").attr("style", "display : none !important");
        $("#manageCar").attr("style", "display : none !important");
        $("#viewCar").attr("style", "display : none !important");
        $("#manageDriver").attr("style", "display : none !important");
        $("#drivers").attr("style", "display : none !important");
        $("#rents").attr("style", "display : block !important");
        $("#payments").attr("style", "display : none !important");

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

            $("#rent-context").empty();

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
                    <button class="btn btn-success me-2 btnAccept"><i class="bi bi-calendar2-check"></i> Accept</button>
                    <button class="btn btn-success me-2 btn-warning pay" data-bs-toggle="modal" data-bs-target="#paymentModel"><i class="bi bi-paypal"></i> Pay</button>
                    <button class="btn btn-danger"><i class="bi bi-calendar-x-fill"></i> Reject</button>
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

                let json = {
                    balance: $("#balance").val(),
                    cash: $("#cash").val(),
                    description: $("#description").val(),
                    total: $("#total").val(),
                    type: $("#type").val(),
                    rentId: {
                        rentId: rentId
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
    });
}

function managePaymentsPage() {

    $("#btnManagePayment").on("click", function () {

        $('#payments').fadeIn();
        $("#home").attr("style", "display : none !important");
        $("#viewCustomer").attr("style", "display : none !important");
        $("#manageCustomers").attr("style", "display : none !important");
        $("#manageCar").attr("style", "display : none !important");
        $("#viewCar").attr("style", "display : none !important");
        $("#manageDriver").attr("style", "display : none !important");
        $("#drivers").attr("style", "display : none !important");
        $("#rents").attr("style", "display : none !important");
        $("#payments").attr("style", "display : block !important");

    });

    loadAllPayments();

    function loadAllPayments() {

        $.ajax({
            url: baseurl + `payment`,
            method: "get",
            dataType: "json",
            success: function (res) {
                for (let payment of res.data) {
                    $("#tblPayment").append(`
                    <tr>
                        <td>${payment.paymentId}</td>
                        <td>${payment.rentId.rentId}</td>
                        <td>${payment.type}</td>
                        <td>${payment.description}</td>
                        <td>${payment.total}</td>
                        <td>${payment.cash}</td>
                        <td>${payment.balance}</td>
                        <td>${payment.date}</td>
                        <td>${payment.time}</td>
                        <td></td>
                    </tr>
                `);
                }
            }
        });

    }

}
