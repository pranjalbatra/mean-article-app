# Article Manager MEAN APP

For this assignment to create an Article Manager I have used MongoDB,Express, Angular and Node.js. There is a log-in and a sign-up feature too. 

There are two directories called article-manager-angular and article-manager-node containing the client-side and server-side code respectively.

## Start the Node server

In the directory article-manager-node, install the dependencies using `npm install`.

Make sure `mongod` is running on your local machine.

Environment variables PORT, JWT_KEY and MONGO are stored in the `.env` file in the directory.

.env
```
JWT_KEY=rand@JWTKey123
PORT=5000
MONGO='mongodb://localhost/article_manager_db'
```

Run `node app.js` to start the server.


### Start the Angular app

In the directory article-manager-angular, install the dependencies using `npm install`.

In case you change the port for the node server, you will need to change the variable `baseurl` in the angular service file called `http.service.ts` 

Run `ng serve` to start the app.
