import "@babel/polyfill";
const bodyParser = require("body-parser");
import app from "./server/server";

//Settings
const port = app.get("port");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Funcion Main
async function main() {
	await app.listen(port);
	console.log("Server on Port:", port);
	console.log(`Enter Server Test here: http://localhost:${port}/`);
}

main();
