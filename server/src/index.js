const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const recordRouter = require('./routes/recordRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const incomeCategoryRouter = require('./routes/incomeCategoryRoutes');

async function connect() {
    try {
        await mongoose.connect("mongodb+srv://hrvoje7979:4J8UNiyRH-r%40CiP@cluster0.0hzshew.mongodb.net/expense-tracker?retryWrites=true&w=majority");
        console.log("Connected to the database!");
    } catch (error) {
        console.log(`Error connecting to the database. \n${error}`);
    }
}
connect();


const app = express();

app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: ["http://localhost:3000", "http://localhost:8080","http://localhost:4200"]
}));

app.use(express.json());

app.use("/api", userRouter);
app.use("/api", categoryRouter);
app.use("/api", incomeCategoryRouter);

app.use("/api", recordRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
})