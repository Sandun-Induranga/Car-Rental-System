/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

loadAllCars();

function loadAllCars() {

    $.ajax({
        url: baseurl + "car",
        method: "get",

        success: function (res) {
            for (let car of res.data) {
                $("#cars").append(`<div class="col">
            <div class="card">
                <img src="http://localhost:8080/AvatarMaker.png" class="card-img-top" alt="car">

                <div class="card-body">
                    <h5 class="card-title">${car.brand}</h5>

                    <section class="mb-4">
                        <img src="http://localhost:8080/easy/AvatarMaker.png" class="w-25" alt="${car.photos.back}">
                        <img src="../assets/image/background.png" class="w-25" alt="car">
                        <img src="../assets/image/background.png" class="w-25" alt="car">
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

                        <p class="card-text text-secondary" id="registerNum"><i class="bi bi-car-front me-1"></i>${car.regNum}</p>
                        
                        <section class="d-flex justify-content-between flex-lg-row flex-column gap-1">
                        <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="btnRequest"><p class="card-text"><i class="bi bi-upc-scan"></i> Rent </p></button>
                        <button class="btn btn-warning"><p class="card-text"><i class="bi bi-cart-check-fill"></i> Add to cart</p></button>
                    </section>

                </div>

            </div>
        </div>`);
            }
        }

    });

}

$("#btnRequestCar").on("click", function () {

    let json = {
        rentId: "",
        pickUpDate: $("#pickUpDate").val(),
        nic:"",
        pickUpTime: $("#pickUpTime").val(),
        returnDate: $("#returnDate").val(),
        returnTime: $("#returnTime").val(),
        driverRequest: $("#driverRequest").val(),
        status: "Pending",
        cost: $("#cost").val(),
        description: $("#description").val(),
        rentDetails: [
            {
                rentId: "",
                regNum: $("#registerNum").text(),
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
