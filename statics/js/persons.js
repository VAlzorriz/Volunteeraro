"use strict";

$(document).ready(() => {
    fetchEvents('https://hyp-project.herokuapp.com/api/volunteers');
});

function drawEvents(data) {

    var s = '';

    var backgroung = 'bg-light';

    for (var i = 0; i < data.length; i++) {
        //data.length

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
/*
        s = s + '<div class="card col-sm-3  mt-3 ml-4 mb-4 shadow-sm sechover">'
            + '<a href="/personDetailes.html?ID=' + data[i].id_person + '"> <img class="img-fluid" src="' + data[i].photo + '" alt="' + data[i].name + '"></a>'
            + ' <div class="card-body">'
            //    +'  <h5><b>'+data[i].title+'</b></h5>'
            + ' <h6 class="card-text">' + data[i].description.substring(0, 40) + '...' + ' <u class="linkcolor"> <a href="/personDetailes.html?ID=' + data[i].id_person + '">more</a> </u></h6>'
            + '<div class="d-flex justify-content-between align-items-center">  '
            + ' <small class="text-muted">volunteering date: ' + data[i].volunteer_time + '</small>'
            + '</div></div>  </div>'
*/


    }

    return s;
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

            $('#persons').html(s);
        },
        error: () => {
            notifyerror("error");
        }
    });
}






