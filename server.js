const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const https = require('https')

const redis = require("redis"),
    client = redis.createClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

client.on("error", function (err) {
    console.log("Error " + err);
});

app.get('/api/top100', (req, response) => {

    let url = 'https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json'

    client.get(url, function (err, obj) {

        if (obj == null) {
            
            https.get(url, (res) => {

                let body = '';
        
                res.on('data', (d) => {
                    body += d;
                });
        
                res.on('end', function(){
                    var json = JSON.parse(body);

                    client.set(url, JSON.stringify(json))
                    client.expireat(url, parseInt((+new Date)/1000) + 86400);

                    response.send(json);
                });
        
            }).on('error', (e) => {
                console.error(e);
            });

        }
        else {
            let json = JSON.parse(obj);
            response.send(json);
        }

     });

});

app.get('/api/lookup/:id', (req, response) => {  

    let url = 'https://itunes.apple.com/hk/lookup?id=' + req.params.id

    client.get(url, function (err, obj) {

        if (obj == null) {
            
            https.get(url, (res) => {

                let body = '';
        
                res.on('data', (d) => {
                    body += d;
                });
        
                res.on('end', function(){
                    var json = JSON.parse(body);

                    client.set(url, JSON.stringify(json))
                    client.expireat(url, parseInt((+new Date)/1000) + 86400);

                    response.send(json);
                });
        
            }).on('error', (e) => {
                console.error(e);
            });

        }
        else {
            let json = JSON.parse(obj);
            response.send(json);
        }

     });

});

app.get('/api/top10', (req, response) => {

    let url = 'https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json'

    client.get(url, function (err, obj) {

        if (obj == null) {
            
            https.get(url, (res) => {

                let body = '';
        
                res.on('data', (d) => {
                    body += d;
                });
        
                res.on('end', function(){
                    var json = JSON.parse(body);

                    client.set(url, JSON.stringify(json))
                    client.expireat(url, parseInt((+new Date)/1000) + 86400);

                    response.send(json);
                });
        
            }).on('error', (e) => {
                console.error(e);
            });

        }
        else {
            let json = JSON.parse(obj);
            response.send(json);
        }

     });

});

app.listen(port);