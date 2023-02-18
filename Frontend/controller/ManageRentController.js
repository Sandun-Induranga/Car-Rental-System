/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

$.ajax({

    url:baseurl+"rent/all",
    method:"get",
    contentType:"application/json",
    dataType:"json",
    success:function (res) {

        for (let rent of res.data) {

            $("#rent-context").append(`
            <div class="card text-center p-2 w-50">
            <div class="card-body">
                <h5 class="card-title">${res.rentId}</h5>
                <p class="card-text">Customer NIC : 123456</p>
                <p class="card-text">Driver NIC : 123456</p>
                <p class="card-text">Lost Damage Payment : Bank Receipt 123456</p>
                <p class="card-text">Total Cost : 42000.00</p>
                <p class="card-text">Pick Up Date : 21/02/2023 | Pick Up Time : 12:24</p>
                <p class="card-text">Return Date : 25/02/2023 | Return Time : 12:24</p>
                <section>
                    <button class="btn btn-success me-2">Accept</button>
                    <button class="btn btn-warning">Deny</button>
                </section>
            </div>
        </div>
        `);

        }

    }

})
