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
        method: "post",
        async: false,
        cache: false,
        data: JSON.stringify(json),
        contentType: "application/json",
        dataType: "json",
        success: function (res) {
            saveAlert();
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
            // saveAlert();
            window.open("login-form.html", '_self');
        },
        error: function (res) {
            alert(res.message);
        }
    });

});

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
