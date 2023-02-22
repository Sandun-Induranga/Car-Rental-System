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
        // getCustomer();
    }
});

// getCustomer();
// function getCustomer() {
//     $.ajax({
//         url: baseurl + `rent?username=${currentUser.username}`,
//         method: "get",
//         async: false,
//         dataType: "json",
//         contentType: "application/json",
//         success: function (res) {
//             customer = res.data;
//             console.log(customer)
//         }
//     });
// }

manageCustomerPage();
manageCarPage();
manageDriverPage();
manageRentPage();

function manageCustomerPage() {
    $("#btnCustomer").on("click", function () {

        $("#home").attr("style", "display : none !important");
        $("#viewCustomer").attr("style", "display : block !important");
        $("#manageCustomers").attr("style", "display : none !important");
        $("#manageCar").attr("style", "display : none !important");
        $("#viewCar").attr("style", "display : none !important");
        $("#manageDriver").attr("style", "display : none !important");
        $("#drivers").attr("style", "display : none !important");
        $("#rents").attr("style", "display : none !important");

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
        })

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


// /** ********************************************************* Rent ***************************************************** **/
//
// function getDetail() {
//
//     $(".rent").on("click", function () {
//
//         regNum = $(this).parent().parent().children(":eq(6)").text();
//         dailyMileage = $(this).parent().parent().children(":eq(4)").children(":eq(1)").text();
//         monthlyMileage = $(this).parent().parent().children(":eq(4)").children(":eq(2)").text();
//         dailyPrice = $(this).parent().parent().children(":eq(4)").children(":eq(1)").text();
//         monthlyPrice = $(this).parent().parent().children(":eq(4)").children(":eq(2)").text();
//         console.log(regNum + dailyMileage + monthlyMileage + dailyPrice + monthlyPrice);
//
//     });
//
// }
//
// $("#btnRequestCar").on("click", function () {
//
//     let json = {
//         rentId: rentId,
//         nic: customer,
//         pickUpDate: $("#pickUpDate").val(),
//         pickUpTime: $("#pickUpTime").val(),
//         returnDate: $("#returnDate").val(),
//         returnTime: $("#returnTime").val(),
//         driverRequest: $('#driverRequest').is(':checked') ? "YES" : "NO",
//         status: "Pending",
//         cost: $("#cost").val(),
//         description: $("#description").val(),
//         rentDetails: [
//             {
//                 rentId: rentId,
//                 nic: null,
//                 regNum: regNum,
//                 driverCost: $("#driverCost").val(),
//                 carCost: $("#carCost").val()
//             }
//         ]
//     }
//
//     $.ajax({
//         url: baseurl + "rent",
//         method: "post",
//         data: JSON.stringify(json),
//         dataType: "json",
//         contentType: "application/json",
//         success: function (res) {
//
//         }
//     });
//
// });
//
// $("#pickUpDate").on("change", function () {
//     setCosts();
// });
//
// $("#returnDate").on("change", function () {
//     setCosts();
// });
//
//
// function setCosts() {
//
//     let days = (new Date(Date.parse($("#returnDate").val()) - Date.parse($("#pickUpDate").val()))) / 1000 / 60 / 60 / 24;
//     let carCost = days < 30 ? dailyPrice.split(" ")[0] * days : monthlyPrice.split(" ")[0] * (days / 30);
//     $("#carCost").val(carCost);
//     $("#driverCost").val(1000 * days);
//
// }
//
// generateNewRentId();
//
// function generateNewRentId() {
//     $.ajax({
//         url: baseurl + "rent",
//         method: "get",
//         async: false,
//         dataType: "json",
//         contentType: "application/json",
//         success: function (res) {
//             rentId = res.data;
//         }
//     });
// }


/** *************************************************************** Car ***************************************************** **/


function manageCarPage() {
    $("#btnCar").on("click", function () {

        $("#home").attr("style", "display : none !important");
        $("#manageCustomers").attr("style", "display : none !important");
        $("#viewCustomer").attr("style", "display : none !important");
        $("#manageCar").attr("style", "display : none !important");
        $("#viewCar").attr("style", "display : block !important");
        $("#manageDriver").attr("style", "display : none !important");
        $("#drivers").attr("style", "display : none !important");
        $("#rents").attr("style", "display : none !important");

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
                    loadAllCars();
                }
            });

        });

        $(".btnUpdate").on("click", function () {

            let data = new FormData($("#carForm")[0]);

            let json = {
                regNum: $("#regNum").val(),
                type: $("#carType").val(),
                color: $("#color").val(),
                brand: $("#brand").val(),
                Availability: $("#availability").val(),
                transmissionType: $("#transmission").val(),
                fuelType: $("#fuelType").val(),
                passengers: $("#passengers").val(),
                price: $("#price").val(),
                freeMileage: $("#freeMileage").val(),
                extraKMPrice: $("#extraKMPrice").val(),
                lostDamageCost: $("#lostDamageCost").val(),
                meterValue: $("#meterValue").val(),
            }

            $.ajax({
                url: baseurl + "car",
                async: false,
                method: "put",
                data: json,
                contentType: "application/json",
                dataType: "json",
                success: function (res) {
                    loadAllCars();
                }
            });

            $.ajax({
                url: baseurl + "car",
                async: false,
                method: "post",
                data: data,
                contentType: false,
                processData: false,
                success: function (res) {
                    loadAllCars();
                }
            });

        });

        loadAllCars();

        function loadAllCars() {

            $.ajax({
                url: baseurl + "car",
                method: "get",

                success: function (res) {

                    $("#cars").empty();

                    for (let car of res.data) {
                        $("#cars").append(`<div class="col col-12 col-md-5 col-lg-3">
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
                    
                    <section class="row justify-content-between">
                        <p class="card-text text-secondary col col-6" id="registerNum"><i class="bi bi-car-front me-1"></i>${car.regNum}</p>
                        <p class="card-text text-secondary col col-6 text-danger">${car.availability == "YES" ? "" : "Out Of Stock"}</p>
                    </section>
                        
                    <section class="d-flex justify-content-between flex-lg-row flex-column gap-1">
                        <button class="btn btn-warning btnUpdate" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><p class="card-text"><i class="bi bi-app-indicator"></i> Update </p></button>
                        <button class="btn btn-danger btnDelete"><p class="card-text"><i class="bi bi-trash-fill"></i> Delete </p></button>
                    </section>

                </div>

            </div>
        </div>`);
                        getDetail();
                    }
                }

            });

        }

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


/** ********************************************************** Driver ****************************************************** **/


function manageDriverPage() {
    $("#btnDriver").on("click", function () {

        $("#home").attr("style", "display : none !important");
        $("#viewCustomer").attr("style", "display : none !important");
        $("#manageCustomers").attr("style", "display : none !important");
        $("#manageCar").attr("style", "display : none !important");
        $("#viewCar").attr("style", "display : none !important");
        $("#manageDriver").attr("style", "display : block !important");
        $("#drivers").attr("style", "display : none !important");
        $("#rents").attr("style", "display : none !important");

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

    });
}


/** ********************************************************** Rent ****************************************************** **/


function manageRentPage() {
    $("#btnRent").on("click", function () {

        $("#home").attr("style", "display : none !important");
        $("#viewCustomer").attr("style", "display : none !important");
        $("#manageCustomers").attr("style", "display : none !important");
        $("#manageCar").attr("style", "display : none !important");
        $("#viewCar").attr("style", "display : none !important");
        $("#manageDriver").attr("style", "display : none !important");
        $("#drivers").attr("style", "display : none !important");
        $("#rents").attr("style", "display : block !important");

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
