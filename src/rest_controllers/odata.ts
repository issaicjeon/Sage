var http = require('http');

const odata = (URL: any, cache:any) => {
    getURL(URL);
    function getURL(URL:any) {
    var body = '';
    http.get(URL, function (res:any) {
        res.on('data', function (chunk:any) {
            body+=chunk;
        });
        res.on('end', function () {
            console.log(body);
        });
    }).on('error', function(e:any) {
        console.log('ERROR: ' + e.message);
    });
    }   
}

export default odata;