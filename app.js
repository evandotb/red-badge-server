require('dotenv').config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');
const middleware = require('./middleware');


app.use(Express.json());

app.use(middleware.headers);

const controllers = require('./controllers');
const sequelize = require('./db');

app.use('/user', controllers.userController);
app.use('/post', controllers.postController);
app.use('/comment', controllers.commentController);


dbConnection.authenticate()
    .then(() => dbConnection.sync(
        {force: true}
    ))
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}.`)
        });
        
    })
  .catch((err) => {
        console.log(`[Server]: Server crashed ${err}`);
    })

// app.listen(process.env.PORT, () => {console.log(`App is listening on port ${process.env.PORT}`) ;
// });