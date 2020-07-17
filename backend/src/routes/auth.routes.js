import { Router } from "express";
const router = Router();

import bytcryp from "bcrypt-nodejs";
import { connect } from "../server/database";

const jwt = require("jsonwebtoken");
//CONFIG KEY
const config = require("./../config/config");
const  llave  = config.llave; 

//LOGIN USER
router.post("/login", async (req, res) => {
	try {
		const db = await connect();
		console.log(req.body);
		//-----------------------------------------------
		const user = {
			email: req.body.email,
			password: req.body.password,
		};
		//-----------------------------------------------
		const userDB = await db.collection("users").findOne({ email: user.email });
		if (!userDB) {
			//USER DONT EXIST
			res.send("Usuario no existe");
		} else {
			if (bytcryp.compareSync(user.password, userDB.password)) {
				//LOGIN
				const payload={
					_id: userDB._id
				}
				const token = createToken(payload);

				const response ={
					email:userDB.email,
					name:userDB.name,
					token:token
				}
				res.json(response);
				console.log(response);
			} else {
				//ERROR
				res.send("Error password Wrong");
			}
		}
	} catch (err) {
		console.log(err);
	}
});

//REGISTER-CREATE USER
router.post("/register", async (req, res) => {
	try {
		const db = await connect();
		console.log(req.body);

		const user = {
			email: req.body.email,
			password: bytcryp.hashSync(req.body.password),
			name: req.body.name,
		};
		const exists = await db.collection("users").findOne({ email: user.email });
		if(!exists){
		const result = await db.collection("users").insert(user);

		const payload={
			_id: result.ops[0]._id
		}
		const token = createToken(payload);
		const response ={
			email:user.email,
			name:user.name,
			token:token
		}
		res.json(response);
		console.log(response);
	}else{
		res.send("User Already Exists");
	}
	} catch (err) {
		console.log(err);
	}
});

//REGISTER-CREATE USER
router.post("/logout", async (req, res) => {
	try {

		const token = req.body.token;

		jwt.destroy(token)
		console.log("Destroy Token");
	} catch (err) {
		console.log(err);
	}
});



function createToken(payload) {
	var token = jwt.sign({ payload }, llave, {
		expiresIn: 1440,
	});
	return token;
}

export default router;
