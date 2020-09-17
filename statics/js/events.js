"use strict";

$(document).ready(() => {


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const selectedMonthID = urlParams.get('EventId');
    console.log(selectedMonthID);
    if (selectedMonthID == -1) {
        fetchEvents('https://hyp-project.herokuapp.com/api/events/month');
        document.getElementById("eventSelector").innerHTML = "Current Month Events";
    }

    else if (selectedMonthID == 0) {
        document.getElementById("eventSelector").innerHTML = "Latest Events";
        fetchEvents('https://hyp-project.herokuapp.com/api/events?limit=3&order=event_date');

    }
    else if (selectedMonthID > 0) {
        fetchEvents('https://hyp-project.herokuapp.com/api/events?month=' + parseInt(selectedMonthID));
    } else {
        fetchEvents('https://hyp-project.herokuapp.com/api/events');
    }



});

function drawEvents(data) {
    var date = '';
    var dateData = '';
    var time = '';
    var s = '';
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


    // /eventDetailes.html?eventID='+data[i].id_activity+'
    if (data.length == 0) {
        s = '<div class="tt-no-result ml-5 mt-5">No results found.</div>';
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




function eventsDropdownSelector(sel) {
    var x = document.getElementById("validationCustom03").value;

    var text = $("#validationCustom03 option:selected").text();
    document.getElementById("eventSelector").innerHTML = text + " Events";
    if (x == -1)
        fetchEvents('https://hyp-project.herokuapp.com/api/events/month');
    else if (x == -2) {
        fetchEvents('https://hyp-project.herokuapp.com/api/events');
    }
    else if (x == 0) {
        fetchEvents('https://hyp-project.herokuapp.com/api/events?limit=3&order=event_date');
    }
    else if (x > 0) {
        fetchEvents('https://hyp-project.herokuapp.com/api/events?month=' + parseInt(x));
    } else {
        fetchEvents('https://hyp-project.herokuapp.com/api/events');
    }
}







function fetchEvents(ApiUrl) {
    jQuery.ajax({
        url: ApiUrl,
        type: 'GET',
        dataType: 'json',
        Origin: "https://hyp-project.herokuapp.com",
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






