import app from "./app.js" //index arranque de aplicacion y servidor
import { ConnectDB } from "./db.js"  

ConnectDB();
app.listen(3000)
console.log('Server on port',3000)