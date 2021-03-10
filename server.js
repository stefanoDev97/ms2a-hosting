const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');

//configEnv
dotenv.config({ path: './config.env' });

process.on("uncaughtException", (er) => {
    console.log(er);
    process.exit(1);
});

const credential = {
    accessKeyId:process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY,
    region:'eu-west-3'
};

AWS.config.update(credential);

const DB = process.env.DATABASE.split('<password>');
DB.splice(1, 0, process.env.DATABASE_PASSWORD);

mongoose.connect(DB.join(''), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(conn => {
    console.log('connect to database...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`server is running on port : ${PORT}`);
});
process.on('unhandledRejection', (er) => {
    console.log(er);
    process.exit(1);
});