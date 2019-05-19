const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

const https = require('https')
const u = require('url')

const redis = require("redis"),
    client = redis.createClient();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

client.on("error", function (err) {
    console.log("Error " + err);
});

app.get('/api/top100', (req, response) => {

    let url = 'https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json'

    client.hget("top100", url, function (err, obj) {

        if (obj == null) {
            
            https.get(url, (res) => {

                let body = '';
        
                res.on('data', (d) => {
                    body += d;
                });
        
                res.on('end', function(){
                    var json = JSON.parse(body);

                    client.hset("top100", url, JSON.stringify(json))

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

app.get('/api/lookup', (req, response) => {

    var parts = u.parse(req.url, true);
    var query = parts.query;

    let url = 'https://itunes.apple.com/hk/lookup?id=' + req.query.id

    client.hget("lookup", url, function (err, obj) {

        if (obj == null) {
            
            https.get(url, (res) => {

                let body = '';
        
                res.on('data', (d) => {
                    body += d;
                });
        
                res.on('end', function(){
                    var json = JSON.parse(body);

                    client.hset("lookup", url, JSON.stringify(json))

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

    client.hget("top10", url, function (err, obj) {

        if (obj == null) {
            
            https.get(url, (res) => {

                let body = '';
        
                res.on('data', (d) => {
                    body += d;
                });
        
                res.on('end', function(){
                    var json = JSON.parse(body);

                    client.hset("top10", url, JSON.stringify(json))

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

app.listen(port, () => console.log(`Listening on port ${port}`));