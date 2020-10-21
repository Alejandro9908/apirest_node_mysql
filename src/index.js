const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 


//Settings: configuracion de servidor
app.set('port', process.env.PORT || 3000);//pedir puerto

//Midelwares: funcionen que se ejecutan antes
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//Routes: urls
app.use(require('./routes/clima'));



//correr servidor
app.listen(app.get('port'), () => {
    console.log("Server activo en puerto: " + app.get('port'));
});