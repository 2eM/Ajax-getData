var buttonClickCounter = 0 ;

function getData() {
   
    $.ajax({
        url: "https://akademia108.pl/kurs-front-end/ajax/1-pobierz-dane-programisty.php",
        dataType: 'json',
        success: function (resultJSON) {       
            $('#section-one').append("<div></div>");
                if (buttonClickCounter == 0)$('#section-one div').attr('id', 'dane-programisty');
                else  $('#section-one div:last').attr('id', 'dane-programisty'+buttonClickCounter);
            $('#section-one div:last').prepend(
                    '<h2>Dane programisty. Pobranie nr '+ buttonClickCounter +'</h2>'+
                    'User ID : ' + resultJSON.userId + '<br>' +
                    'User Name : ' + resultJSON.userName + '<br>' +
                    'User URL : ' + resultJSON.userURL + '<br>'
                );
                buttonClickCounter++ ;
        },
        onerror: function (msg) {
            console.log(msg);
        }
    });
}
