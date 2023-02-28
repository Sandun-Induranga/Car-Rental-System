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
manageReports();
loadHome();

function loadHome() {
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
    $("#reports").attr("style", "display : none !important");
}

function manageHomePage() {

    $("#btnHome").on("click", function () {

        loadHome();

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

    var dataPoints = [];

    var options = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "Daily Sales Income"
        },
        axisX: {
            valueFormatString: "DD MMM YYYY",
        },
        axisY: {
            title: "LKR",
            titleFontSize: 24
        },
        data: [{
            type: "spline",
            yValueFormatString: "$#,###.##",
            dataPoints: dataPoints
        }]
    };

    $.ajax({
        url: baseurl + "payment/daily",
        method: "get",
        success: function (res) {
            for (var i = 0; i < res.data.length; i++) {
                dataPoints.push({
                    x: new Date(res.data[i][0]),
                    y: res.data[i][1]
                });
            }
            $("#chartContainer").CanvasJSChart(options);
        }
    });

    let points = [];

    var brandOptions = {
        title: {
            text: "Desktop OS Market Share in 2017"
        },
        subtitles: [{
            text: "As of November, 2017"
        }],
        animationEnabled: true,
        data: [{
            type: "pie",
            startAngle: 40,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: points
        }]
    };

    $.ajax({
        url: baseurl + "car/brand",
        method: "get",
        success: function (res) {
            for (var i = 0; i < res.data.length; i++) {
                points.push({
                    y: res.data[i][1],
                    label: res.data[i][0]
                });
            }
            $("#brandChart").CanvasJSChart(brandOptions);
        }
    });

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
        $("#reports").attr("style", "display : none !important");

        // Upload NIC Image
        loadSelectedImage("#cusNicImage");

        // Upload License Image
        loadSelectedImage("#cusLicenseImage");

        $("#btnAddNewCustomer").on("click", function () {

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

                    loadAllCustomers();
                }
            });

            $.ajax({
                url: baseurl + "customer?image",
                method: "post",
                async: false,
                data: data,
                contentType: false,
                processData: false,
                success: function (res) {

                    if ($("#btnSaveCustomer").text() == "Save") {
                        saveAlert();
                    } else {
                        updateAlert();
                    }
                    loadAllCustomers();
                }
            });

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
                        <td><img src="${customer.nicImage}" alt="" srcset="" width="150" height="100"></td>
                        <td><img src="${customer.licenseImage}" alt="" srcset="" width="150" height="100"></td>
                        <td><i class="bi bi-pen-fill text-success text-center btn btnUpdate" data-bs-toggle="modal" data-bs-target="#registerCustomerModal"></i><i class="bi bi-trash-fill text-danger text-center btn btnDelete"></i></td>
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
                        deleteAlert();
                        loadAllCustomers();
                    }
                });

            });
        }

        // customer regular expressions
        const cusNameRegEx = /^[A-z ]{5,20}$/;
        const cusEmailRegEx = /^[a-z ]{5,20}@[a-z][gmail.com]$/;
        const cusNicRegEx = /^[0-9]{9,10}[A-z]?$/;
        const cusAddressRegEx = /^[0-9/A-z. ,]{5,}$/;
        const cusContactRegEx = /^[0-9]{10}$/;
        const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

        let customerValidations = [];
        customerValidations.push({
            reg: cusNameRegEx,
            field: $('#cusName'),
            error: 'Customer Name Pattern is Wrong : A-z 5-20'
        });
        customerValidations.push({
            reg: cusNicRegEx,
            field: $('#cusNic'),
            error: 'NIC Pattern is Wrong : 2001134561'
        });
        customerValidations.push({
            reg: cusNicRegEx,
            field: $('#cusLicense'),
            error: 'NIC Pattern is Wrong : 2001134561'
        });
        customerValidations.push({
            reg: cusAddressRegEx,
            field: $('#cusAddress'),
            error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/'
        });
        customerValidations.push({
            reg: cusContactRegEx,
            field: $('#cusContact'),
            error: 'Contact Pattern is Wrong : 0-9 ,/'
        });
        customerValidations.push({
            reg: cusEmailRegEx,
            field: $('#cusEmail'),
            error: 'Email Pattern is Wrong : example@gmail.com'
        });
        customerValidations.push({
            reg: cusAddressRegEx,
            field: $('#cusUsername'),
            error: 'Invalid Username'
        });
        customerValidations.push({
            reg: cusAddressRegEx,
            field: $('#cusPassword'),
            error: 'Password Pattern is not Strong'
        });
        customerValidations.push({
            reg: cusAddressRegEx,
            field: $('#cusRe-password'),
            error: 'Password Pattern is not Strong'
        });


        $("#cusName,#cusNic,#cusLicense,#cusAddress,#cusContact,#cusEmail,#cusUsername,#cusPassword,#cusRe-password").on('keyup', function (event) {
            checkValidity(customerValidations);
        });

        $("#cusName,#cusNic,#cusLicense,#cusAddress,#cusContact,#cusEmail,#cusUsername,#cusPassword,#cusRe-password").on('blur', function (event) {
            checkValidity(customerValidations);
        });

        $("#cusName").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusNameRegEx, $("#cusName"))) {
                $("#cusNic").focus();
            } else {
                focusText($("#txtCusId"));
            }
        });

        $("#cusNic").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusNicRegEx, $("#cusNic"))) {
                focusText($("#cusLicense"));
            }
        });

        $("#cusLicense").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusNicRegEx, $("#cusLicense"))) {
                focusText($("#cusAddress"));
            }
        });

        $("#cusAddress").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusAddressRegEx, $("#cusAddress"))) {
                focusText($("#cusContact"));
            }
        });

        $("#cusContact").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusAddressRegEx, $("#cusContact"))) {
                focusText($("#cusEmail"));
            }
        });

        $("#cusEmail").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusEmailRegEx, $("#cusEmail"))) {
                focusText($("#cusUsername"));
            }
        });

        $("#cusUsername").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusNameRegEx, $("#cusUsername"))) {
                focusText($("#cusPassword"));
            }
        });

        $("#cusUsername").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusNameRegEx, $("#cusUsername"))) {
                focusText($("#cusPassword"));
            }
        });

        $("#cusPassword").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusAddressRegEx, $("#cusPassword"))) {
                focusText($("#cusRe-password"));
            }
        });

        $("#cusRe-password").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusAddressRegEx, $("#cusRe-password"))) {

            }
        });

    });
}


/* **********************************************************    Car    ***************************************************** */


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
        $("#reports").attr("style", "display : none !important");

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
                        saveAlert();

                        $.ajax({
                            url: baseurl + "car",
                            method: "get",

                            success: function (res) {
                                loadAllCars(res.data);
                            }

                        });
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
                        updateAlert();

                        $.ajax({
                            url: baseurl + "car",
                            method: "get",

                            success: function (res) {
                                loadAllCars(res.data);
                            }

                        });
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

                if (confirm("Are You Sure..?")) {
                    $.ajax({
                        url: baseurl + "car?regNum=" + regNum,
                        method: "delete",
                        dataType: "json",
                        contentType: "application/json",
                        success: function (res) {
                            deleteAlert();
                            $.ajax({
                                url: baseurl + "car",
                                method: "get",

                                success: function (res) {
                                    loadAllCars(res.data);
                                }

                            });
                        }
                    });
                }
            });

        }


        $.ajax({
            url: baseurl + "car",
            method: "get",

            success: function (res) {
                loadAllCars(res.data);
            }

        });

        function loadAllCars(cars) {

            $("#cars").empty();

            for (let car of cars) {
                $("#cars").append(`<div class="col col-lg-3">
            <div class="card">
                <img src="../assets/${car.photos.front}" class="card-img-top" alt="car">

                <div class="card-body">
                    <h5 class="card-title">${car.brand}</h5>

                    <section class="mb-4">
                        <img src="../assets/${car.photos.back}" class="w-25 h-25" alt="${car.photos.back}">
                        <img src="../assets/${car.photos.side}" class="w-25 h-25" alt="car">
                        <img src="../assets/${car.photos.interior}" class="w-25 h-25" alt="car">
                    </section>

                    <section class="d-flex gap-3 justify-content-between">
                        <p class="card-text"><i class="bi bi-fuel-pump-diesel-fill me-1 text-success"></i>${car.fuelType}</p>
                        <p class="card-text"><i class="bi bi-palette-fill me-1 text-danger"></i>${car.color}</p>
                        <p class="card-text"><i class="bi bi-gear-wide-connected me-1 text-info"></i>${car.transmissionType}</p>
                        <p class="card-text"><i class="bi bi-people-fill me-1 text-primary"></i>${car.passengers}</p>
                    </section>

                    <section class="row justify-content-between align-items-center p-0 m-0 g-0">
                        <p class="card-text col col-12 p-0 m-0 g-0">Free Mileage</p>
                        <p class="card-text text-secondary col col-lg-6 mb-lg-0 mb-4">${car.freeMileage.dailyRate}km Daily</p>
                        <p class="card-text text-secondary col col-lg-6 mb-lg-0 mb-4 text-end">${car.freeMileage.monthlyRate}km Monthly</p>
                    </section>

                    <section class="row justify-content-between align-items-center p-0 m-0 g-0">
                        <p class="card-text col col-12 p-0 m-0 g-0">Price</p>
                        <p class="card-text text-secondary col col-lg-6 mb-lg-0 mb-4">${car.price.dailyPriceRate} LKR Daily</p>
                        <p class="card-text text-secondary col col-lg-6 mb-lg-0 mb-4 text-end">${car.price.monthlyPriceRate} LKR Monthly</p>
                    </section>

                    <section class="row justify-content-between">
                        <p class="card-text col col-lg-6">Lost Damage Cost</p>
                        <p class="card-text text-secondary col text-end">${car.lostDamageCost} LKR</p>
                    </section>
                    
                    <section class="row justify-content-between">
                        <p class="card-text text-secondary col col-6" id="registerNum"><i class="bi bi-car-front me-1"></i>${car.regNum}</p>
                        <p class="card-text text-secondary col col-6 text-danger text-end">${car.availability == "YES" ? "" : "Out Of Stock"}</p>
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

        // Filter

        $("#search").on("keyup", function () {

            let text = $("#search").val();
            let searchBy = $("#searchBy").val();
            let fuel = $("#fuelTypes").val();

            $.ajax({
                url: baseurl + `car/filterByRegNum?text=${text}&search=${searchBy}&fuel=${fuel}`,
                method: "get",
                dataType: "json",
                contentType: "application/json",
                success: function (res) {
                    loadAllCars(res.data);
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

        const regNumRegEx = /^[0-9/A-z.]{2,20}$/;
        const colorRegEx = /^[A-z ]{2,20}$/;
        const brandRegEx = /^[A-z ]{2,20}$/;
        const priceRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

        let carValidations = [];
        carValidations.push({
            reg: regNumRegEx,
            field: $('#regNum'),
            error: 'Car Number Pattern is Wrong : AAA-5500'
        });
        carValidations.push({
            reg: colorRegEx,
            field: $('#color'),
            error: 'Color Pattern is Wrong'
        });
        carValidations.push({
            reg: brandRegEx,
            field: $('#brand'),
            error: 'Brand Pattern is Wrong'
        });
        carValidations.push({
            reg: priceRegEx,
            field: $('#dailyPriceRate'),
            error: 'Price Pattern is Wrong'
        });
        carValidations.push({
            reg: priceRegEx,
            field: $('#monthlyPriceRate'),
            error: 'Price Pattern is Wrong'
        });
        carValidations.push({
            reg: priceRegEx,
            field: $('#extraKMPrice'),
            error: 'Price Pattern is Wrong'
        });
        carValidations.push({
            reg: priceRegEx,
            field: $('#passengers'),
            error: 'Invalid Number'
        });
        carValidations.push({
            reg: priceRegEx,
            field: $('#lostDamageCost'),
            error: 'Price Pattern is Wrong'
        });
        carValidations.push({
            reg: priceRegEx,
            field: $('#meterValue'),
            error: 'Meter Value Pattern is Wrong'
        });


        $("#regNum,#color,#brand,#dailyPriceRate,#monthlyPriceRate,#extraKMPrice,#passengers,#lostDamageCost,#meterValue").on('keyup', function (event) {
            checkValidity(carValidations);
        });

        $("#regNum,#color,#brand,#dailyPriceRate,#monthlyPriceRate,#extraKMPrice,#passengers,#lostDamageCost,#meterValue").on('blur', function (event) {
            checkValidity(carValidations);
        });

        $("#regNum").on('keydown', function (event) {
            if (event.key == "Enter" && check(regNumRegEx, $("#regNum"))) {
                $("#carType").focus();
            } else {
                focusText($("#regNum"));
            }
        });

        $("#carType").on('keydown', function (event) {
            if (event.key == "Enter") {
                focusText($("#color"));
                textSuccess($("#carType"), "");
            }
        });

        $("#color").on('keydown', function (event) {
            if (event.key == "Enter" && check(colorRegEx, $("#color"))) {
                focusText($("#brand"));
            }
        });

        $("#brand").on('keydown', function (event) {
            if (event.key == "Enter" && check(brandRegEx, $("#brand"))) {
                focusText($("#dailyRate"));
            }
        });

        $("#dailyRate").on('keydown', function (event) {
            if (event.key == "Enter") {
                textSuccess($("#dailyRate"), "");
                focusText($("#monthlyRate"));
            }
        });

        $("#monthlyRate").on('keydown', function (event) {
            if (event.key == "Enter") {
                textSuccess($("#monthlyRate"), "");
                focusText($("#petrol"));
            }
        });

        $("#petrol").on('keydown', function (event) {
            if (event.key == "Enter") {
                textSuccess($("#petrol"), "");
                focusText($("#yes"));
            }
        });

        $("#yes").on('keydown', function (event) {
            if (event.key == "Enter") {
                textSuccess($("#yes"), "");
                focusText($("#dailyPriceRate"));
            }
        });

        $("#dailyPriceRate").on('keydown', function (event) {
            if (event.key == "Enter" && check(priceRegEx, $("#dailyPriceRate"))) {
                focusText($("#monthlyPriceRate"));
            }
        });

        $("#monthlyPriceRate").on('keydown', function (event) {
            if (event.key == "Enter" && check(priceRegEx, $("#monthlyPriceRate"))) {
                focusText($("#auto"));
            }
        });

        $("#auto").on('keydown', function (event) {
            if (event.key == "Enter" && check(priceRegEx, $("#monthlyPriceRate"))) {
                focusText($("#extraKMPrice"));
            }
        });

        $("#extraKMPrice").on('keydown', function (event) {
            if (event.key == "Enter" && check(priceRegEx, $("#extraKMPrice"))) {
                focusText($("#passengers"));
            }
        });

        $("#passengers").on('keydown', function (event) {
            if (event.key == "Enter" && check(priceRegEx, $("#passengers"))) {
                focusText($("#lostDamageCost"));
            }
        });

        $("#lostDamageCost").on('keydown', function (event) {
            if (event.key == "Enter" && check(priceRegEx, $("#lostDamageCost"))) {
                focusText($("#meterValue"));
            }
        });

        $("#meterValue").on('keydown', function (event) {
            if (event.key == "Enter" && check(priceRegEx, $("#meterValue"))) {

            }
        });

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
        $("#reports").attr("style", "display : none !important");

        // Upload License Image
        loadSelectedImage("#licenseImage");

        $("#btnAddNewDriver").on("click", function () {
            $("#btnSaveDriver").text("Save");
        })

        $("#btnSaveDriver").on("click", function () {

            let data = new FormData($("#driverForm")[0]);

            $.ajax({
                url: baseurl + ($("#btnSaveDriver").text() == "Save" ? "driver" : "driver/update"),
                method: "post",
                data: data,
                contentType: false,
                processData: false,
                success: function (res) {

                    if ($("#btnSaveDriver").text() == "Save") {
                        saveAlert();
                    }else {
                        updateAlert();
                    }

                    loadAllDrivers();

                }
            });
        });

        function loadAllDrivers() {

            $.ajax({
                url: baseurl + "driver/all",
                method: "get",
                async:false,
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
                              <td>${driver.contact}</td>
                              <td>${driver.user.username}</td>
                              <td>${driver.user.password}</td>
                              <td><img src="../assets${driver.licenseImage}" width="150" height="100" alt="license"></td>
                              <td>${driver.availabilityStatus}</td>
                              <td><i class="bi bi-pen-fill text-success text-center btn btnUpdate" data-bs-toggle="modal" data-bs-target="#registerDriver"></i><i class="bi bi-trash-fill text-danger text-center btn btnDelete"></i></td>
                            </tr>
                        `)

                    }

                    bindUpdateEvent();
                    bindDeleteEvent();

                }
            });

        }

        function bindUpdateEvent() {
            $(".btnUpdate").on("click", function () {

                $("#nic").val($(this).parent().parent().children(":eq(0)").text());
                $("#name").val($(this).parent().parent().children(":eq(1)").text());
                $("#email").val($(this).parent().parent().children(":eq(2)").text());
                $("#address").val($(this).parent().parent().children(":eq(3)").text());
                $("#license").val($(this).parent().parent().children(":eq(4)").text());
                $("#availability").val($(this).parent().parent().children(":eq(9)").text());
                $("#contact").val($(this).parent().parent().children(":eq(5)").text());
                $("#username").val($(this).parent().parent().children(":eq(6)").text());
                $("#password").val($(this).parent().parent().children(":eq(8)").text());
                loadSelectedImage("#licenseImageContext");

                $("#btnSaveDriver").text("Update");

            });
        }

        function bindDeleteEvent() {
            $(".btnDelete").on("click", function () {

                let nic = $(this).parent().parent().children(":eq(0)").text();

                if (!confirm("Are You Sure")) return;


                $.ajax({
                    url: baseurl + "driver?nic=" + nic,
                    method: "delete",
                    async: false,
                    data: nic,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        deleteAlert();
                        loadAllDrivers();
                    }
                });

            });
        }

        const cusNameRegEx = /^[A-z ]{5,20}$/;
        const cusEmailRegEx = /^[a-z ]{5,20}@[a-z][gmail.com]$/;
        const cusNicRegEx = /^[0-9]{9,10}[A-z]?$/;
        const cusAddressRegEx = /^[0-9/A-z. ,]{5,}$/;
        const cusContactRegEx = /^[0-9]{10}$/;
        const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

        let driverValidations = [];
        driverValidations.push({
            reg: cusNameRegEx,
            field: $('#name'),
            error: 'Customer Name Pattern is Wrong : A-z 5-20'
        });
        driverValidations.push({
            reg: cusNicRegEx,
            field: $('#nic'),
            error: 'NIC Pattern is Wrong : 2001134561'
        });
        driverValidations.push({
            reg: cusNicRegEx,
            field: $('#license'),
            error: 'NIC Pattern is Wrong : 2001134561'
        });
        driverValidations.push({
            reg: cusAddressRegEx,
            field: $('#address'),
            error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/'
        });
        driverValidations.push({
            reg: cusContactRegEx,
            field: $('#contact'),
            error: 'Contact Pattern is Wrong : 0-9 ,/'
        });
        driverValidations.push({
            reg: cusEmailRegEx,
            field: $('#email'),
            error: 'Email Pattern is Wrong : example@gmail.com'
        });
        driverValidations.push({
            reg: cusAddressRegEx,
            field: $('#username'),
            error: 'Invalid Username'
        });
        driverValidations.push({
            reg: cusAddressRegEx,
            field: $('#password'),
            error: 'Password Pattern is not Strong'
        });
        driverValidations.push({
            reg: cusAddressRegEx,
            field: $('#re-password'),
            error: 'Password Pattern is not Strong'
        });


        $("#name,#nic,#license,#address,#address,#email,#username,#contact,#password,#re-password").on('keyup', function (event) {
            checkValidity(driverValidations);
        });

        $("#name,#nic,#license,#address,#address,#email,#username,#contact,#password,#re-password").on('blur', function (event) {
            checkValidity(driverValidations);
        });

        $("#name").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusNameRegEx, $("#name"))) {
                $("#nic").focus();
            } else {
                focusText($("#txtCusId"));
            }
        });

        $("#nic").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusNicRegEx, $("#nic"))) {
                focusText($("#license"));
            }
        });

        $("#license").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusNicRegEx, $("#license"))) {
                focusText($("#address"));
            }
        });

        $("#address").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusAddressRegEx, $("#address"))) {
                focusText($("#contact"));
            }
        });

        $("#contact").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusAddressRegEx, $("#contact"))) {
                focusText($("#email"));
            }
        });

        $("#email").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusEmailRegEx, $("#email"))) {
                focusText($("#username"));
            }
        });

        $("#username").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusNameRegEx, $("#username"))) {
                focusText($("#password"));
            }
        });

        $("#password").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusAddressRegEx, $("#password"))) {
                focusText($("#re-password"));
            }
        });

        $("#re-password").on('keydown', function (event) {
            if (event.key == "Enter" && check(cusAddressRegEx, $("#re-password"))) {

            }
        });

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
        $("#reports").attr("style", "display : none !important");

        $.ajax({

            url: baseurl + "rent/all",
            async: false,
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
                    <button class="btn btn-danger btnReject"><i class="bi bi-calendar-x-fill"></i> Reject</button>
                    <button class="btn btn-danger btnReject"><i class="bi bi-calendar-x-fill"></i> Reject</button>
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
            bindPayEvent();
            bindRejectEvent();

        }

        function bindAcceptEvent() {
            $(".btnAccept").on("click", function () {

                let text = $(this).parent().parent().children(":eq(0)").children(":eq(0)").text();

                $.ajax({
                    url: baseurl + `rent?rentId=${text}&option=accepted`,
                    async: false,
                    method: "put",
                    dataType: "json",
                    contentType: "application/json",
                    success: function (res) {
                        loadCards();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Accepted..!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });

            });
        }

        function bindRejectEvent() {
            $(".btnReject").on("click", function () {

                let text = $(this).parent().parent().children(":eq(0)").children(":eq(0)").text();

                $.ajax({
                    url: baseurl + `rent?rentId=${text}&option=reject`,
                    async: false,
                    method: "put",
                    dataType: "json",
                    contentType: "application/json",
                    success: function (res) {
                        loadCards();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'warning',
                            title: 'Rejected..!',
                            showConfirmButton: false,
                            timer: 1500
                        });
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
                    async: false,
                    method: "post",
                    data: JSON.stringify(json),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (res) {
                        saveAlert();
                        managePaymentsPage();
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
        $("#reports").attr("style", "display : none !important");

        loadAllPayments();

    });

    loadAllPayments();

    function loadAllPayments() {

        $.ajax({
            url: baseurl + `payment`,
            method: "get",
            dataType: "json",
            success: function (res) {

                $("#tblPayment").empty();

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

function manageReports() {

    $("#btnReport").on("click", function () {
        $('#reports').fadeIn();
        $("#home").attr("style", "display : none !important");
        $("#viewCustomer").attr("style", "display : none !important");
        $("#manageCustomers").attr("style", "display : none !important");
        $("#manageCar").attr("style", "display : none !important");
        $("#viewCar").attr("style", "display : none !important");
        $("#manageDriver").attr("style", "display : none !important");
        $("#drivers").attr("style", "display : none !important");
        $("#rents").attr("style", "display : none !important");
        $("#payments").attr("style", "display : none !important");
        $("#reports").attr("style", "display : block !important");

        $.ajax({
            url:baseurl+"payment/day",
            method:"get",
            success:function (res) {
                if (res.data!=null){
                    $("#day").text(res.data);
                }
            }
        });

        $.ajax({
            url:baseurl+"payment/month",
            method:"get",
            success:function (res) {
                if (res.data!=null){
                    $("#month").text(res.data);
                }
            }
        });

        var dataPoints = [];

        var options = {
            animationEnabled: true,
            theme: "light2",
            title: {
                text: "Monthly Sales Income"
            },
            axisX: {
                valueFormatString: "#",
            },
            axisY: {
                title: "LKR",
                titleFontSize: 24
            },
            data: [{
                type: "spline",
                yValueFormatString: "$#,###.##",
                dataPoints: dataPoints
            }]
        };

        $.ajax({
            url: baseurl + "payment/monthly",
            method: "get",
            success: function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    dataPoints.push({
                        x: res.data[i][0],
                        y: res.data[i][1]
                    });
                }
                $("#chart").CanvasJSChart(options);
            }
        });

    });

}
