"use strict";

$(document).ready(() => {


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const eventID = urlParams.get('eventID');
    console.log(eventID);
    if (eventID != null) {
        fetch(parseInt(eventID));
        fetch2(parseInt(eventID));
        var urlservices='https://hyp-project.herokuapp.com/api/events/'+eventID+'/services';
        fetchServices(urlservices);
        
        
    }

});




function drawEventDetailes(data) {

    document.getElementById("eventDay").innerHTML = data[0].event_date;

    document.getElementById("eventtitle").innerHTML = data[0].title;
    document.getElementById("eventdescription").innerHTML = data[0].description;
    document.getElementById("eventstart_time").innerHTML = data[0].start_time;
    document.getElementById("eventend_time").innerHTML = data[0].end_time;
    document.getElementById("eventName").innerHTML = data[0].title;
    //document.getElementById("eventimage").src = data[0].image;
    document.getElementById("eventimage").style.backgroundImage = "url(" + data[0].image + ") ";
    // $('#eventimage').css("background-image", "url(" + data[0].image + ")");
    $('#iFramelocation').attr('src', data[0].location);
}


function fetch(eventId) {
    jQuery.ajax({
        url: 'https://hyp-project.herokuapp.com/api/events/' + eventId,
        type: 'GET',
        dataType: 'json',
        Origin: "https://hyp-project.herokuapp.com",
        success: (data) => {
            console.log('ajax success');

            drawEventDetailes(data);

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
function fetch2(eventId) {
    jQuery.ajax({
        url: 'https://hyp-project.herokuapp.com/api/events/' + eventId + '/volunteers/',
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






function fetchServices(ApiUrl) {
    jQuery.ajax({
        url: ApiUrl ,
        type: 'GET',
        dataType: 'json',
        Origin: "https://hyp-project.herokuapp.com",
        success: (data) => {
            console.log('ajax success');
            var s = drawServices(data);
            
            $('#services').html(s);
        },
        error: ()=>{
            notifyerror("error");
        }
    });
}

 

function drawServices(data) {
    
   var s='';
         

  for (var i = 0; i < data.length; i++) {
        //data.length
             s = s    +'<div class="col-md-4 padding d-flex align-items-stretch">'
                      +'<div class="card shadow-sm sechover">'				
                      +'<a href="/serviceDetailes.html?serviceID='+data[i].id_activity+'"> <img class="img-fluid padding2" src="'+data[i].image+'" alt="'+data[i].image+'"></a>'
                      +'<div class="card-body">'
                      +'<h5><b>'+data[i].title+'</b></h5>'
                      +'<h6 class="card-text">'+data[i].description.substring(0,40)+'...'+' <u class="linkcolor"> <a href="/serviceDetailes.html?serviceID='+data[i].id_activity+'">more</a> </u></h6>'
                      +'<div class="d-flex justify-content-between align-items-center">  '
                      +'<small class="text-muted">Service day: '+data[i].service_day+'</small>'
                      +'</div></div></div></div>'
                            
                                 

    }
    
    if(0==data.length){
        s =  '<ul class="list-group"> <li class="list-group-item">No services for this event </li> </ul>'
    }
     
    return s;
}




