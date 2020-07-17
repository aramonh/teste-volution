import { Router } from "express";
const router = Router();

import { connect } from "../server/database";
import { ObjectID } from "mongodb";

//GET ALL USERS
router.get("/", async (req, res) => {
	try {
		const db = await connect();
		const result = await db.collection("users").find({}).toArray();
		console.log(result);
		res.json(result);
	} catch (err) {
		console.log(err);
	}
});

//GET USER BY ID
router.get("/:id", async (req, res) => {
	try {
		//------------------------------------------------------------
		const { id } = req.params;
		//------------------------------------------------------------
		const db = await connect();
		const result = await db.collection("users").findOne({ _id: ObjectID(id) });

		res.json(result);
	} catch (err) {
		console.log(err);
	}
});

//DELETE USER
router.delete("/:id", async (req, res) => {
	try {
		//------------------------------------------------------------
		const { id } = req.params;
		//------------------------------------------------------------
		const db = await connect();
		await db.collection("users").deleteOne({ _id: ObjectID(id) });
		res.json({
			message: `user ${id} deleted`,
		});
	} catch (err) {
		console.log(err);
	}
});

//UPDATE USER
router.put("/:id", async (req, res) => {
	try {
		//------------------------------------------------------------
		const { id } = req.params;
		//------------------------------------------------------------
		const user = {
			email: req.body.email,
			password: req.body.password,
			name: req.body.name,
		};
		//------------------------------------------------------------
		const db = await connect();
		const result = await db
			.collection("users")
			.updateOne({ _id: ObjectID(id) }, { $set: user });
		res.json({
			result: `${result}`,
			message: `user ${id} update`,
		});
	} catch (err) {
		console.log(err);
	}
});

export default router;
