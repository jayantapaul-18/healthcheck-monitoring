Healthcheck Monitoring Dashboard : Using this application we can easily monitor all the API or Service healthcheck and keep track of their status . This application will monitor preodically based on preconfigured time intervals in config file . Dashboard will show the status check mark with clour code and status code message . In case of any error we can view the Error message .

# Archtecture :

Dashboard --> (ReactJS) --> (NodeJS) --> Target API's \

"proxy": "http://localhost:3838",

![docker view](Dashboard.png)
![docker view](ErrorMessage.png)

# Getting Started with Healthcheck Monitoring

npm install

### `npm run build`

Runs the app [ node server.js / nodemon server.js / pm2 start server.js ]\
Open [http://localhost:3838](http://localhost:3838) to view it in the browser.
