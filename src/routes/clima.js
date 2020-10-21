const express = require('express');
const router = express.Router();

const conexion = require('../database');

router.get('/clima', (oReq,oRes) =>{
    let script = "SELECT * FROM tbl_clima";
    conexion.query(script, (oError, oRows, oCols) => {
        if(!oError) { 
            oRes.send(oRows);
            oRes.end();
        } else {
            console.log(oError);
            oRes.end();	 
        }
    });
});


router.get('/clima/:id', (oReq,oRes) => {
    const { id } = oReq.params;
    let script = "SELECT * FROM tbl_clima WHERE id = ?";
    conexion.query(script, [id] ,(oError, oRows, oCols) => {
        if(!oError) {
            oRes.send(oRows[0]); // solo el elemento 0 para que no sea array
            oRes.end();
        } else {
            console.log(oError);
            oRes.end();	 
        }
    });
});

router.post('/clima', (oReq, oRes) => {
    const {ciudad, temperatura, descripcion, sensacion, humedad} = oReq.body;
    let script = "INSERT INTO tbl_clima (ciudad, temperatura, descripcion, sensacion, humedad) VALUES (?,?,?,?,?)";
    
    conexion.query(script,[ciudad, temperatura, descripcion, sensacion, humedad], (oError, oRows, oCols) =>{
        if(!oError) {       
            oRes.send(oRows);
            oRes.end();
        }else{
            console.log(oError);
            oRes.end();
        }
    })
});

router.put('/clima/:id', (oReq, oRes) => {
    const {ciudad, temperatura, descripcion, sensacion, humedad} = oReq.body;
    const { id } = oReq.params;
    let script = "UPDATE tbl_clima SET ciudad=?,temperatura=?,descripcion=?,sensacion=?,humedad=? WHERE id=?";

    conexion.query(script,[ciudad, temperatura, descripcion, sensacion, humedad, id],(oError, oRows, oCols) =>{
        if(!oError) {       
            //oRes.send(oRows);
            oRes.send({
                id: id ,
                status: "Editado correctamente"
            });

            oRes.end();
        }else{
            console.log(oError);
            oRes.end();
        }
    });
});

router.delete('/clima/:id', (oReq, oRes) => {
    const { id } = oReq.params;
    let sSQLDelete = "DELETE FROM tbl_clima WHERE id = ?";
    conexion.query(sSQLDelete,[id], (oError, oRows, oCols) =>{
        if(!oError) {    
            //oRes.send(oRows);
            oRes.send({ 
                id: id,
                status: "Eliminado correctamente",
            });
            
            oRes.end();
        }else{
            console.log(oError);
            oRes.end();
        }
    });
});


module.exports = router;