/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

$.ajax({

    url: baseurl + "rent/all",
    method: "get",
    contentType: "application/json",
    dataType: "json",
    success: function (res) {

        for (let rent of res.data) {

            $("#rent-context").append(`
            <div class="card text-center p-2 w-50">
            <div class="card-body" id="${res.rentId}">
                <h5 class="card-title">${rent.rentId}</h5>
                <p class="card-text">Customer NIC : ${rent.nic.nic}</p>
                <p class="card-text">Customer Name : ${rent.nic.name}</p>
                   <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">Register Number</th>
                      <th scope="col">Lost Damage Cost</th>
                      <th scope="col">Car Cost</th>
                      <th scope="col">Driver Cost</th>
                      <th scope="col">Driver NIC</th>
                    </tr>
                  </thead>
                  <tbody>
                  </tbody>
                </table>
                </div>
                <section>
                    <button class="btn btn-success me-2">Accept</button>
                    <button class="btn btn-warning">Deny</button>
                </section>
            </div>
            `);

            for (let rentDetail of rent.rentDetails) {
                $(`.table> tbody`).append(`

                    <tr>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <td colspan="2">Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
           
        `);
            }

        }

    }

})
