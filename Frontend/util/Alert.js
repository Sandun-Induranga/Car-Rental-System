/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

function saveAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Saved..!',
        showConfirmButton: false,
        timer: 1500
    });
}

function updateAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Updated..!',
        showConfirmButton: false,
        timer: 1500
    });
}

function deleteAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Deleted..!',
        showConfirmButton: false,
        timer: 1500
    });
}
