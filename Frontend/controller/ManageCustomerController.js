/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

manageCarPage();

function manageCarPage() {

    $("#btnCar").on("click", function () {

        $("#manageCar").attr("style", "display : block !important");
        $("#manageCart").attr("style", "display : none !important");

        let regNum;
        let dailyMileage;
        let monthlyMileage;
        let dailyPrice;
        let monthlyPrice;
        let rentId;
        let currentUser;
        let customer;
        let cart = [];

        loadAllCars();

        $.ajax({
            url: baseurl + "login",
            method: "get",
            async: false,
            dataType: "json",
            contentType: "application/json",
            success: function (res) {
                currentUser = res.data;
                $("#username").text(res.data.username);
                getCustomer();
            }
        });

        getCustomer();

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

        function loadAllCars() {

            $.ajax({
                url: baseurl + "car",
                method: "get",

                success: function (res) {
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

                    <section class="row justify-content-between">
                        <p class="card-text col col-md-5">Free Mileage</p>
                        <p class="card-text text-secondary col col-lg-3 mb-lg-0 mb-4">${car.freeMileage.dailyRate}km Daily</p>
                        <p class="card-text text-secondary col col-lg-3 mb-lg-0 mb-4">${car.freeMileage.monthlyRate}km Monthly</p>
                    </section>

                    <section class="row justify-content-between">
                        <p class="card-text col col-4">Price</p>
                        <p class="card-text text-secondary col col-lg-4 mb-lg-0 mb-4">${car.price.dailyPriceRate} LKR Daily</p>
                        <p class="card-text text-secondary col col-lg-4 mb-lg-0 mb-4">${car.price.monthlyPriceRate} LKR Monthly</p>
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
                        <button class="btn btn-success rent" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><p class="card-text"><i class="bi bi-upc-scan"></i> Rent </p></button>
                        <button class="btn btn-warning cart" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><p class="card-text"><i class="bi bi-cart-check-fill"></i> Add to cart</p></button>
                    </section>

                </div>

            </div>
        </div>`);
                        getDetail();
                    }

                    bindButtonEvents();

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

        function bindButtonEvents() {

            $(".rent").on("click", function () {
                $("#btnRequestCar").text("Request");
            });

            $(".cart").on("click", function () {
                $("#btnRequestCar").text("Add To Cart");
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

            if ($(this).text() == "Request") {

                $.ajax({
                    url: baseurl + "rent",
                    method: "post",
                    data: JSON.stringify(json),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (res) {

                    }
                });

            } else {

                cart.push(json);
                console.log(cart)

            }

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

    });

}

function manageCartPage() {

    $("#btnCart").on("click", function () {

        $("#manageCar").attr("style", "display : none !important");
        $("#manageCart").attr("style", "display : block !important");

    });

}
