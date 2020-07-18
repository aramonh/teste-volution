import express from "express";
const app = express();
const session = require('express-session');


//Middlewares
app.use(express.json());
const middleware = require ('./../middlewares/auth.middleware');
    
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
  


//Import Routes
import IndexRoutes from "../routes/index.routes";
import AuthRouter from "../routes/auth.routes";
import TaskRouter from "../routes/tasks.routes";
import UserRouter from "../routes/users.routes";

//Settings
app.set("port", process.env.PORT || 3000);

//Routes
app.use(IndexRoutes);
app.use("/api/auth", AuthRouter);
app.use("/api/tasks",middleware.isAuth, TaskRouter);
app.use("/api/users", middleware.isAuth, UserRouter);
app.get("/get", middleware.isAuth, function (req, res) {
	res.send("YES");
});

export default app;
