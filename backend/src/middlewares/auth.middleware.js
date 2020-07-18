"use strict";

const config = require("../config/config");
const  llave  = config.llave; 
var jwt = require("jsonwebtoken");

module.exports = {
	isAuth: function (req, res, next) {
		const headerReq = req.headers.authorization;

		if (headerReq) {
			var tokenArray = headerReq.split(" ");
			var token = tokenArray[1];
			console.log("HERE IS TOKEN O YES:", token);
			jwt.verify(token, llave, (err, decoded) => {
				if (err) {
					return res.json({ mensaje: "Token inválida" });
				} else {
					console.log("user logueado",decoded.payload._id);
					req.session.uid=decoded.payload._id;
					next();
				}
			});
		} else {
			res.send({
				mensaje: "Token no proveída.",
			});
		}
	},
	//---TO DO MORE MIDDLEWARES
};
