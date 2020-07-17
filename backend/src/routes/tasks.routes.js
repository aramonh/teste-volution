import { Router } from "express";
const router = Router();

import { connect } from "../server/database";
import { ObjectID } from "mongodb";

router.get("/", async (req, res) => {
	try {
		const db = await connect();

		const result = await db.collection("tasks").find({}).toArray();

		console.log(result);
		res.json(result);
	} catch (error) {
		console.log(error);
	}
});

router.post("/", async (req, res) => {
	try {
		const db = await connect();
		console.log(req.body);

		const task = {
			name: req.body.name,
			priority: req.body.priority,
			expiration_date : req.body.expiration_date
		};
		const result = await db.collection("tasks").insert(task);
		res.json(result.ops[0]);
		res.send("Task created");
	} catch (err) {
		console.log(err);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const db = await connect();
		const result = await db.collection("tasks").findOne({ _id: ObjectID(id) });

		res.json(result);
	} catch (err) {
		console.log(err);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const db = await connect();
		await db.collection("tasks").deleteOne({ _id: ObjectID(id) });
		res.json({
			message: `Task ${id} deleted`,
		});
	} catch (err) {
		console.log(err);
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const task = {
			name: req.body.name,
			priority: req.body.priority,
			expiration_date : req.body.expiration_date
		};
		const db = await connect();
		const result = await db
			.collection("tasks")
			.updateOne({ _id: ObjectID(id) }, { $set: task });
		res.json({
			result: `${result}`,
			message: `Task ${id} update`,
		});
	} catch (err) {
		console.log(err);
	}
});

export default router;
