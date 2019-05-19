# fwd-test

To start:
```
redis-server
```
```
cd fwd-test
yarn start
```
Important!
1. required [Redis](https://redis.io/) at local
2. required [Nodejs](https://nodejs.org/en/)

Some notes:
1. Reactjs
- it is init by create-react-app
- main structure is under ./client
- used bootstrap for UI component, e.g. Image, Table
- custom component is under ./client/components/
- most of the UI is implemented in ./client/App.js 
- the api call is implemented in ./client/network.js, fetch backend api
2. Backend
- it is ./server.js, Nodejs with using express as web server
- for api call from frontend and get data from itunes
- connect Redis for caching
3. DB (Redis)
- at ./server.js
- each url is as a key for caching, expire after 24hr
