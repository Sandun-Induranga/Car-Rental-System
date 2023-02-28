/**
 * @author : Sandun Induranga
 * @since : 0.1.0
 **/

function saveAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully Saved..!',
        showConfirmButton: false,
        timer: 1500
    });
}

function updateAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully Updated..!',
        showConfirmButton: false,
        timer: 1500
    });
}

function deleteAlert() {
    Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Successfully Deleted..!',
        showConfirmButton: false,
        timer: 1500
    });
}

function errorAlert(title) {
    Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: title,
        showConfirmButton: false,
        timer: 1500
    });
}
