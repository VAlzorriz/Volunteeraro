"use strict";

$(document).ready(() => {



    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const serviceID = urlParams.get('CategoryId');
    console.log(serviceID);
    if (serviceID != null) {
        fetchServices('https://volunteeraro.herokuapp.com/api/categories/' + serviceID + '/services');
        document.getElementById("validationCustom03").value = serviceID;

        var text = $("#validationCustom03 option:selected").text();
        document.getElementById("servicesSelector").innerHTML = text + " Services";
    }


    else {
        fetchServices('https://volunteeraro.herokuapp.com/api/services');
    }

});

function drawServices(data) {

    var shortDescription = 'hh';
    var backgroung = 'bg-light';
    /*
    var id_activity='';
    var location= '';
    var title= '';
    
    var start_time= '';
    var end_time= '';
    var image= '';
    var service_day= '';
    var capacity= '';
    var age= '';
    var id_category= '';
    
    */

    var s = '';


    for (var i = 0; i < data.length; i++) {
        //data.length
        s = s + '<div class="col-md-4 padding d-flex align-items-stretch">'
            + '<div class="card shadow-sm sechover">'
            + '<a href="/serviceDetailes.html?serviceID=' + data[i].id_activity + '"> <img class="img-fluid padding2" src="' + data[i].image + '" alt="' + data[i].image + '"></a>'
            + '<div class="card-body">'
            + '<h5><b>' + data[i].title + '</b></h5>'
            + '<h6 class="card-text">' + data[i].description.substring(0, 40) + '...' + ' <u class="linkcolor"> <a href="/serviceDetailes.html?serviceID=' + data[i].id_activity + '">more</a> </u></h6>'
            + '<div class="d-flex justify-content-between align-items-center">  '
            + '<small class="text-muted">Service day: ' + data[i].service_day + '</small>'
            + '</div></div></div></div>'



    }

    return s;
}




function servicesDropdownSelector(sel) {
    var x = document.getElementById("validationCustom03").value;

    var text = $("#validationCustom03 option:selected").text();
    document.getElementById("servicesSelector").innerHTML = text + " Services";
    if (x == 0)
        fetchServices('https://volunteeraro.herokuapp.com/api/services');
    else
        fetchServices('https://volunteeraro.herokuapp.com/api/categories/' + x + '/services');
}







function fetchServices(ApiUrl) {
    jQuery.ajax({
        url: ApiUrl,
        type: 'GET',
        dataType: 'json',
        Origin: "https://volunteeraro.herokuapp.com",
        success: (data) => {
            console.log('ajax success');
            var s = drawServices(data);

            $('#services').html(s);
        },
        error: () => {
            notifyerror("error");
        }
    });
}






