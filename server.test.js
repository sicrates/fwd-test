const http = require('http');

describe('GET /api/top100', () => {

    beforeAll(async() => {
        await require('./server')
    });

    let url = 'http://localhost:5000/api/top100';

    test('is status code 200', (done) => {
        http.get(url, (res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });

    test('is json object', (done) => {
        http.get(url, (res) => {
            let body = '';
        
            res.on('data', (d) => {
                body += d;
            });
    
            res.on('end', function(){
                expect(typeof JSON.parse(body)).toEqual('object');
                done();
            });
            
        });
    });

    test('have 100 entry', (done) => {
        http.get(url, (res) => {
            let body = '';
        
            res.on('data', (d) => {
                body += d;
            });
    
            res.on('end', function(){
                let json = JSON.parse(body);
                expect(json.feed.entry.length).toEqual(100);
                done();
            });
            
        });
    });

    test('contain name, category, artist, summary', (done) => {
        http.get(url, (res) => {
            let body = '';
        
            res.on('data', (d) => {
                body += d;
            });
    
            res.on('end', function(){
                let json = JSON.parse(body);
                let name = json.feed.entry[0]['im:name'].label
                let category = json.feed.entry[0].category.attributes.label
                let artist = json.feed.entry[0]['im:artist'].label
                let summary = json.feed.entry[0].summary.label
                expect(name != 'undefined' && category != 'undefined' && artist != 'undefined' && summary != 'undefined').toEqual(true);
                done();
            });
            
        });
    });

});

describe('GET /api/lookup/1459074261', () => {

    beforeAll(async() => {
        await require('./server')
    });

    let url = 'http://localhost:5000/api/lookup/1459074261';

    it('is status code 200', (done) => {
        http.get(url, (res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });

    test('is json object', (done) => {
        http.get(url, (res) => {
            let body = '';
        
            res.on('data', (d) => {
                body += d;
            });
    
            res.on('end', function(){
                expect(typeof JSON.parse(body)).toEqual('object');
                done();
            });
            
        });
    });

    test('have only 1 result', (done) => {
        http.get(url, (res) => {
            let body = '';
        
            res.on('data', (d) => {
                body += d;
            });
    
            res.on('end', function(){
                let json = JSON.parse(body);
                expect(json.results.length).toEqual(1);
                done();
            });
            
        });
    });

    test('contain averageUserRating, userRatingCount', (done) => {
        http.get(url, (res) => {
            let body = '';
        
            res.on('data', (d) => {
                body += d;
            });
    
            res.on('end', function(){
                let json = JSON.parse(body);
                let averageUserRating = json.results[0].averageUserRating
                let userRatingCount = json.results[0].userRatingCount
                expect(averageUserRating != 'undefined' && userRatingCount != 'undefined').toEqual(true);
                done();
            });
            
        });
    });

});

describe('GET /api/top10', () => {

    beforeAll(async() => {
        await require('./server')
    });

    let url = 'http://localhost:5000/api/top10';

    test('is status code 200', (done) => {
        http.get(url, (res) => {
            expect(res.statusCode).toEqual(200);
            done();
        });
    });

    test('is json object', (done) => {
        http.get(url, (res) => {
            let body = '';
        
            res.on('data', (d) => {
                body += d;
            });
    
            res.on('end', function(){
                expect(typeof JSON.parse(body)).toEqual('object');
                done();
            });
            
        });
    });

    test('have 10 entry', (done) => {
        http.get(url, (res) => {
            let body = '';
        
            res.on('data', (d) => {
                body += d;
            });
    
            res.on('end', function(){
                let json = JSON.parse(body);
                expect(json.feed.entry.length).toEqual(10);
                done();
            });
            
        });
    });

    test('contain name, category, artist, summary', (done) => {
        http.get(url, (res) => {
            let body = '';
        
            res.on('data', (d) => {
                body += d;
            });
    
            res.on('end', function(){
                let json = JSON.parse(body);
                let name = json.feed.entry[0]['im:name'].label
                let category = json.feed.entry[0].category.attributes.label
                let artist = json.feed.entry[0]['im:artist'].label
                let summary = json.feed.entry[0].summary.label
                expect(name != 'undefined' && category != 'undefined' && artist != 'undefined' && summary != 'undefined').toEqual(true);
                done();
            });
            
        });
    });

});