/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

$('#viewCar').fadeIn();

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

                </div>

            </div>
        </div>`);
    }

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

$("#searchBy, #fuelTypes").change(function () {
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
