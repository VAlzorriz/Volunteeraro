"use strict";

$(document).ready(() => {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const serviceID = urlParams.get('serviceID');
    console.log(serviceID);
    if (serviceID != null) {
        fetchServices(serviceID);
        fetch2(serviceID);
        
        var urlevents='https://hyp-project.herokuapp.com/api/services/'+serviceID+'/events';
        fetchEvents(urlevents);
    }
});




function drawServiceDetailes(data) {



    try {
        document.getElementById("serviceDay").innerHTML = data[0].service_day;
    }
    catch (err) {
        console.log(err.message);
    }
    try {
        document.getElementById("servicelocation").innerHTML = data[0].location;
    }
    catch (err) {
        console.log(err.message);
    }
    try {
        document.getElementById("servicetitle").innerHTML = data[0].title;
        document.getElementById("servicetitle2").innerHTML = data[0].title;

    }
    catch (err) {
        console.log(err.message);
    }
    try {
        document.getElementById("servicedescription").innerHTML = data[0].description;
    }
    catch (err) {
        console.log(err.message);
    }
    try {

        document.getElementById("servicestart_time").innerHTML = data[0].start_time;
    }
    catch (err) {
        console.log(err.message);
    }
    try {
        document.getElementById("serviceend_time").innerHTML = data[0].end_time;

    }
    catch (err) {
        console.log(err.message);
    }
    try {
        document.getElementById("serviceimage").style.backgroundImage = "url(" + data[0].image + ") ";

    }
    catch (err) {
        console.log(err.message);
    }
    try {
        document.getElementById("serviceName").innerHTML = data[0].title;

    }
    catch (err) {
        console.log(err.message);
    }




    //document.getElementById("serviceimage").innerHTML = data[0].image;


    // document.getElementById("servicecapacity").innerHTML = data[0].capacity;


}


function fetchServices(serviceId) {
    jQuery.ajax({
        url: 'https://hyp-project.herokuapp.com/api/services/' + serviceId,
        type: 'GET',
        dataType: 'json',
        Origin: "https://hyp-project.herokuapp.com",
        success: (data) => {
            console.log('ajax success');

            drawServiceDetailes(data);
            //$('#serviceDay').html(data.service_day);
            // $('#serviceTime').html(s);
            // $('#services').html(s);
        },
        error: () => {
            notifyerror("error");
        }
    });
}




function drawEventDetailes2(data) {
    var s = '';
    //s = s + '<ul class="list-group">';
    for (var i = 0; i < data.length; i++) {

        s = s
            + '<div class="col-md-4 padding d-flex align-items-stretch">'
            + '<div class="card shadow-sm sechover">'
            + '<a href="/personDetailes.html?ID=' + data[i].id_person + '"> <img class="img-fluid padding2" src="' + data[i].photo + '" alt="' + data[i].name + '"></a>'
            + '<div class="card-body">'
            + '<h5><b>' + data[i].name + '</b></h5>'
            + '<h6 class="card-text">' + data[i].description.substring(0, 40) + '...' + ' <u class="linkcolor"> <a href="/personDetailes.html?ID=' + data[i].id_person + '">more</a> </u></h6>'
            + '<div class="d-flex justify-content-between align-items-center">  '
            + '<small class="text-muted">Volunteering since: ' + data[i].volunteer_time + '</small>'
            + '</div></div></div></div>'
    }

    if (data.length == 0) {
        s = s + '<li class="list-group-item">No Person  Assign Yet to Manage this event </li>'
    }

    //s = s + '</ul>';
    $('#persons').html(s);
}

function fetch2(serviceId) {
    jQuery.ajax({
        url: 'https://hyp-project.herokuapp.com/api/services/' + serviceId + '/volunteers/',
        type: 'GET',
        dataType: 'json',
        Origin: "https://hyp-project.herokuapp.com",
        success: (data) => {
            console.log('ajax success');

            drawEventDetailes2(data);

        },
        error: () => {
            notifyerror("error");
        }
    });
}




function fetchEvents(ApiUrl) {
    jQuery.ajax({
        url: ApiUrl,
        type: 'GET',
        dataType: 'json',
        Origin: 'https://hyp-project.herokuapp.com',
        success: (data) => {
            console.log('ajax success');
            var s = drawEvents(data);

            $('#events').html(s);
        },
        error: () => {
            notifyerror("error");
        }
    });
}

function drawEvents(data) {
    var date = '';
    var dateData = '';
    var time = '';
    var s = '';
    var shortDescription = 'hh';
    var backgroung = 'bg-light';
   
    // /eventDetailes.html?eventID='+data[i].id_activity+'
    if (data.length == 0) {
        s = '<ul class="list-group"> <li class="list-group-item">No Events for this service </li> </ul>'
;
    }


    for (var i = 0; i < data.length; i++) {
        //data.length

        s = s
            + '<div class="col-md-4 padding d-flex align-items-stretch">'
            + '<div class="card shadow-sm sechover">'
            + '<a href="/eventDetailes.html?eventID=' + data[i].id_activity + '"> <img class="img-fluid padding2" src="' + data[i].image + '" alt="' + data[i].image + '"></a>'
            + '<div class="card-body">'
            + '<h5><b>' + data[i].title + '</b></h5>'
            + '<h6 class="card-text">' + data[i].description.substring(0, 40) + '...' + ' <u class="linkcolor"> <a href="/eventDetailes.html?eventID=' + data[i].id_activity + '">more</a> </u></h6>'
            + '<div class="d-flex justify-content-between align-items-center">  '
            + '<small class="text-muted">Event date: ' + data[i].event_date + '</small>'
            + '</div></div></div></div>'



    }

    return s;
}

