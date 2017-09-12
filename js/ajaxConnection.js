/*definicja funkcji ajax*/
function ajax( ajaxOptions ) {
    /*parametry polaczenia i typu*/

    var options = {
        type: ajaxOptions.type || 'POST',
        url: ajaxOptions.url || '',
        onError: ajaxOptions.onError || function () {},
        onSuccess: ajaxOptions.onSuccess || function () {},
        dataType: ajaxOptions.dataType || 'text'
    };
    /*funckja sprawdzająca status połączenia - czy połączenie się udało, funckja za parametr przyjmuje obeikt XMLHttpRequest*/
    function httpSucces( httpRequest ) {
        try {
            return (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 || navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefined');
        } catch (e) {
            return false;
        }
    }
/*utworzenie obiektu XMLhttpRequest*/
    var httpReq = new XMLHttpRequest();
/*otwarcie połączenia na obiekcie*/
    httpReq.open(options.type, options.url, true);
/*sprawdź stan dokumentu -onreadystatechange*/
    httpReq.onreadystatechange = function() {
        /*sprawdzamy czy dane są zwrócone i gotowe do użycia*/
        if(httpReq.readyState == 4) {
            if( httpSucces(httpReq) ) {
                var returnData = (options.dataType== 'XML')? httpReq.responseXML : httpReq.responseText;
                /*jeśli wszystko ok to funkcja onSuccess*/
                options.onSuccess( returnData );
                /*zeruj obiekt, żeby nie wysyłać żądań do serwera i nie utrzymywać połączenia*/
                httpReq = null;
            } else {
                options.onError( httpReq.statusText );
            }
        }
    }
    /*wysyłamy obrobione żądanie do serwera*/
    httpReq.send();
}

