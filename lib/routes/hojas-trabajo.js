const express = require('express');

const router = express.Router();

const pool = require('../database');

const {
  isLoggedIn
} = require('../lib/auth');

const xlsx = require("xlsx");

router.get('/hojas-trabajo', isLoggedIn, async (req, res) => {
  const hojasTrabajo = await pool.query("SELECT tht.id_servicio id, tp.titulo FROM tb_hojas_trabajo tht INNER JOIN tb_planeacion tp ON tht.id_servicio = tp.id_planeacion GROUP BY tht.id_servicio");
  const planeacion = await pool.query("SELECT * FROM tb_planeacion WHERE estado = ?", ['Ejecucion']);
  res.render('hojas-trabajo/hojas-trabajo', {
    hojasTrabajo: hojasTrabajo,
    planeacion: planeacion
  });
});
router.get('/hojas-trabajo/ver', isLoggedIn, async (req, res) => {
  const {
    hoja,
    type
  } = req.query;
  let graf;

  if (type) {} else graf = await pool.query("SELECT if(thtd.desde > thtd.hasta, thtd.hora1, ' ') hora1, if(thtd.desde > thtd.hasta, thtd.hora2, ' ') hora2, if(thtd.desde > thtd.hasta, thtd.desde, ' ') desde, if(thtd.desde > thtd.hasta, thtd.hasta, ' ') hasta FROM tb_hojas_trabajo_detalle thtd WHERE thtd.id_hojas_trabajo = ? ORDER BY thtd.hora1", [hoja]);

  const bombeo = await pool.query("SELECT SUM(IF(thtd.tipo = 'acido', thtd.volumen, 0)) acido, SUM(IF(thtd.tipo = 'no acido', thtd.volumen, 0)) noacido, SUM(IF(thtd.tipo = 'N2', thtd.volumen, 0)) n2 FROM tb_hojas_trabajo_detalle thtd WHERE thtd.id_hojas_trabajo= ? ORDER BY thtd.hora1", [hoja]);
  const profundidad = await pool.query("	SELECT SUM(IF(thtd.desde > thtd.hasta, thtd.desde - thtd.hasta, 0)) profPos, SUM(IF(thtd.desde < thtd.hasta, thtd.hasta - thtd.desde, 0)) profNeg FROM tb_hojas_trabajo_detalle thtd WHERE thtd.id_hojas_trabajo= ? ORDER BY thtd.hora1", [hoja]);
  const hojaDetalle = await pool.query("SELECT * FROM tb_hojas_trabajo_detalle thtd WHERE thtd.id_hojas_trabajo = ?", [hoja]);
  res.render('hojas-trabajo/hojas-trabajo-ver', {
    hoja: hoja,
    hojaDetalle: hojaDetalle,
    graf: JSON.stringify(graf),
    bombeo: bombeo[0],
    profundidad: profundidad[0]
  });
});
router.get('/hojas-trabajo/ver1', isLoggedIn, async (req, res) => {
  const {
    hoja
  } = req.query;
  const fecha = await pool.query("SELECT fecha FROM tb_hojas_trabajo tht WHERE tht.id = ?", [hoja]);
  const personal = await pool.query("SELECT tp.id, tp.nombre_personal, tp.apellido_personal, tht.fecha FROM tb_hojas_trabajo tht INNER JOIN tb_equipo_item_personal teip ON tht.id_servicio = teip.id_planeacion INNER JOIN tb_personal tp ON teip.id_personal = tp.id WHERE tht.id = ? AND (SELECT COUNT(*) FROM tb_hojas_trabajo_personal_turno thtpt WHERE thtpt.id_personal = tp.id AND thtpt.id_hojas_trabajo_detalle = ?) = 0", [hoja, hoja]);
  const equipo = await pool.query("SELECT te.id_equipo, te.nombre_equipo, te.placa_equipo FROM tb_hojas_trabajo tht INNER JOIN tb_equipo_item_equipo_herramienta teieh ON tht.id_servicio = teieh.id_planeacion INNER JOIN tb_equipos te ON teieh.vehiculo = te.id_equipo WHERE tht.id = ? AND ( SELECT COUNT(*) FROM tb_hojas_trabajo_equipo_turno thtet WHERE thtet.id_equipo = te.id_equipo AND thtet.id_hojas_trabajo_detalle = tht.id ) = 0 GROUP BY te.id_equipo", [hoja]);
  const diurno = await pool.query("SELECT tp.nombre_personal, tp.apellido_personal, tc.nombre_cargo, thtpt.entrada, thtpt.salida, thtpt.id FROM tb_hojas_trabajo_personal_turno thtpt INNER JOIN tb_personal tp ON thtpt.id_personal = tp.id INNER JOIN tb_cargos tc On tp.id_cargo = tc.id_cargo WHERE thtpt.id_hojas_trabajo_detalle = ? AND thtpt.jornada = ?", [hoja, 'diurno']);
  const nocturno = await pool.query("SELECT tp.nombre_personal, tp.apellido_personal, tc.nombre_cargo, thtpt.entrada, thtpt.salida, thtpt.id FROM tb_hojas_trabajo_personal_turno thtpt INNER JOIN tb_personal tp ON thtpt.id_personal = tp.id INNER JOIN tb_cargos tc On tp.id_cargo = tc.id_cargo WHERE thtpt.id_hojas_trabajo_detalle = ? AND thtpt.jornada = ?", [hoja, 'nocturno']);
  const equipoTurno = await pool.query("SELECT thtet.id, thtet.id_equipo, thtet.entrada, thtet.salida, thtet.stb, thtet.id_hojas_trabajo_detalle, te.nombre_equipo FROM tb_hojas_trabajo_equipo_turno thtet INNER JOIN tb_equipos te ON thtet.id_equipo = te.id_equipo WHERE id_hojas_trabajo_detalle = ?", [hoja]);
  const consulta = await pool.query("SELECT SUM(IF(thtd.desde < thtd.hasta, thtd.hasta - thtd.desde, 0)) profundidad, SUM(IF(thtd.tipo = 'n2', thtd.volumen, 0)) n2, SUM(IF(thtd.tipo = 'acido', thtd.volumen, 0)) acido, SUM(IF(thtd.tipo = 'noacido', thtd.volumen, 0)) noAcido FROM tb_hojas_trabajo_detalle thtd WHERE thtd.id_hojas_trabajo = ?", [hoja]);
  res.render('hojas-trabajo/hojas-trabajo-ver1', {
    personal: personal,
    hoja: hoja,
    equipo: equipo,
    fecha: fecha[0].fecha,
    diurno: diurno,
    nocturno: nocturno,
    equipoTurno: equipoTurno,
    consulta: JSON.stringify(consulta[0])
  });
});
router.post('/hoja-trabajo/actualizar-costo', isLoggedIn, async (req, res) => {
  const {
    hoja
  } = req.body;
});
router.post('/hojas-trabajo/guardar-personal-hora', isLoggedIn, async (req, res) => {
  const {
    personal,
    hoja,
    fecha,
    tipo
  } = req.body;
  console.log(personal, hoja, fecha, tipo);
  if (tipo == 1) await pool.query("INSERT INTO guacamaya.tb_hojas_trabajo_personal_turno (id_personal, entrada, salida, jornada, id_hojas_trabajo_detalle) VALUES(?,?,?,?,?)", [personal, fecha + " 06:00:00", fecha + " 18:00:00", 'diurno', hoja]);
  if (tipo == 2) await pool.query("INSERT INTO guacamaya.tb_hojas_trabajo_personal_turno (id_personal, entrada, salida, jornada, id_hojas_trabajo_detalle) VALUES(?,?,?,?,?)", [personal, fecha + " 18:00:00", fecha + " 06:00:00", 'nocturno', hoja]);
  res.json({
    resp: "ok"
  });
});
router.post('/hojas-trabajo/eliminar-personal-hora', isLoggedIn, async (req, res) => {
  const {
    id
  } = req.body;
  await pool.query("DELETE FROM tb_hojas_trabajo_personal_turno WHERE id = ?", [id]);
  res.json({
    resp: "ok"
  });
});
router.post('/hojas-trabajo/guardar-detalle', isLoggedIn, async (req, res) => {
  const {
    hoja,
    hora1,
    hora2,
    desde,
    hasta,
    ctu,
    whp,
    rih,
    pooh,
    liquido,
    n2,
    tipo,
    des,
    volumen,
    comentario
  } = req.body;
  await pool.query("INSERT INTO tb_hojas_trabajo_detalle (hora1, hora2, desde, hasta, ctu, whp, rih, pooh, liquido, n2, tipo, des_tipo_fluido, volumen, comentarios, id_hojas_trabajo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", [hora1, hora2, desde, hasta, ctu, whp, rih, pooh, liquido, n2, tipo, des, volumen, comentario, hoja]);
  res.redirect("/hojas-trabajo/ver?hoja=" + hoja);
});
router.post('/hojas-trabajo/guardar-equipo-hora', isLoggedIn, async (req, res) => {
  const {
    equipo,
    horaEntrada,
    horaSalida,
    stb,
    fecha,
    hoja
  } = req.body;
  await pool.query("INSERT INTO tb_hojas_trabajo_equipo_turno (id_equipo, entrada, salida, stb, id_hojas_trabajo_detalle) VALUES(?,?,?,?,?)", [equipo, fecha + " " + horaEntrada, fecha + " " + horaSalida, stb, hoja]);
  res.json({
    resp: "ok"
  });
});
router.post('/hojas-trabajo/eliminar-equipo-hora', isLoggedIn, async (req, res) => {
  const {
    id
  } = req.body;
  await pool.query("DELETE FROM tb_hojas_trabajo_equipo_turno WHERE id = ?", [id]);
  res.json({
    resp: "ok"
  });
});
router.post('/hojas-trabajo/subir-excel', isLoggedIn, async (req, res) => {
  const {
    hoja
  } = req.body;
  let tipe,
      file = req.files.file;
  if (!file) return res.send("No se encontro archivo");

  if (file.name.split('.')[file.name.split('.').length - 1] === 'xlsx' || file.name.split('.')[file.name.split('.').length - 1] === 'xls') {
    if (file.name.split('.')[file.name.split('.').length - 1] === 'xlsx') tipe = 'xlsx';else tipe = 'xls';
    file.mv(`${__dirname}/../public/${req.user.id}hojaTrabajo.${tipe}`, err => {
      if (err) return res.send(err);else {
        const workbook = xlsx.readFile(`${__dirname}/../public/${req.user.id}hojaTrabajo.${tipe}`);
        const sheet_name_list = workbook.SheetNames;
        /* sheet_name_list.forEach(async (pestaña, inde) => {
            let arrObj = await xlsx.utils.sheet_to_json(workbook.Sheets[pestaña]);
            for(index = 0; index < arrObj.length; index++){ 
                let fechaSplit, fecha, servicio, hojaTrabajo; 
                if(index == 3){
                    if(arrObj[index].__EMPTY_14){
                        fechaSplit = await arrObj[index].__EMPTY_14.split("-");
                        if(fechaSplit.length == 3){
                            fecha = `${fechaSplit[2]}-${fechaSplit[1]}-${fechaSplit[0]}`;
                            servicio = await pool.query("SELECT * FROM tb_hojas_trabajo tht WHERE tht.id = ?", [hoja]);
                            hojaTrabajo = await pool.query("SELECT * FROM tb_hojas_trabajo tht WHERE tht.id_servicio = ? AND tht.fecha =?", [servicio[0].id_servicio, fecha]);
                            if(hojaTrabajo.length == 0){
                                await pool.query("INSERT INTO tb_hojas_trabajo (id_servicio, id_pozo, id_equipo, fecha, tuberia) VALUES(?, ?, ?, ?, ?)", [servicio[0].id_servicio, servicio[0].id_pozo, servicio[0].id_equipo, `${fechaSplit[2]}-${fechaSplit[1]}-${fechaSplit[0]}`, servicio[0].tuberia]);
                            }
                        }
                    }
                }
            }
             for(index = 0; index < arrObj.length; index++){
                console.log("Isert ", index);
                let fechaSplit, fecha, servicio, hojaTrabajo;
                if(index == 3){
                    console.log(arrObj[index]);
                    if(arrObj[index].__EMPTY_14){
                        fechaSplit = await arrObj[index].__EMPTY_14.split("-");
                        console.log("if 1");
                        console.log(fechaSplit);
                    }else{
                        fechaSplit = ["00", "00", "0000"];
                        console.log("if 2");
                        console.log(fechaSplit);
                    }
                }
                if(index >= 9){
                    console.log(fechaSplit);
                    if(arrObj[index].__EMPTY != "TURNO DIURNO"){
                        if(arrObj[index].__EMPTY_3 != "CAMBIO DE TURNO"){
                            fecha = await `${fechaSplit[2]}-${fechaSplit[1]}-${fechaSplit[0]}`;
                            servicio = await pool.query("SELECT * FROM tb_hojas_trabajo tht WHERE tht.id = ?", [hoja]);
                            hojaTrabajo = await pool.query("SELECT * FROM tb_hojas_trabajo tht WHERE tht.id_servicio = ? AND tht.fecha =?", [servicio[0].id_servicio, fecha]);
                            if(arrObj[index].__EMPTY) await pool.query("INSERT INTO tb_hojas_trabajo_detalle (hora1, hora2, desde, hasta, ctu, whp, rih, pooh, liquido, n2, tipo, des_tipo_fluido, volumen, comentarios, id_hojas_trabajo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", [fecha + " " + arrObj[index].__EMPTY, fecha + " " + arrObj[index].__EMPTY_2, arrObj[index].__EMPTY_3, arrObj[index].__EMPTY_4, arrObj[index]['HOJA DE TRABAJO '], arrObj[index].__EMPTY_5, arrObj[index].__EMPTY_6, arrObj[index].__EMPTY_7, arrObj[index].__EMPTY_8, arrObj[index].__EMPTY_9, arrObj[index].__EMPTY_10, arrObj[index].__EMPTY_11, arrObj[index].__EMPTY_12, arrObj[index].__EMPTY_13, hojaTrabajo[0].id ]);
                        }
                    }else break;
                }
            }
        }); */

        let fechaSplit, fecha, servicio, hojaTrabajo;

        try {
          sheet_name_list.forEach((pestaña, inde) => {
            let arrObj = xlsx.utils.sheet_to_json(workbook.Sheets[pestaña]);
            arrObj.forEach(async (element, index) => {
              if (index == 3) {
                if (element.__EMPTY_14.length > 0) {
                  fechaSplit = element.__EMPTY_14.split("-");

                  if (fechaSplit.length == 3) {
                    fecha = `${fechaSplit[2]}-${fechaSplit[1]}-${fechaSplit[0]}`;
                    servicio = await pool.query("SELECT * FROM tb_hojas_trabajo tht WHERE tht.id = ?", [hoja]);
                    hojaTrabajo = await pool.query("SELECT * FROM tb_hojas_trabajo tht WHERE tht.id_servicio = ? AND tht.fecha =?", [servicio[0].id_servicio, fecha]);
                    hojaId = hojaTrabajo[0].id;

                    if (hojaTrabajo.length > 0) {
                      const hojaId = await hojaTrabajo[0].id;
                      incrementHojaId(hojaId, arrObj);
                    } else {
                      const hojaTrabajoTmp = await pool.query("INSERT INTO guacamaya.tb_hojas_trabajo (id_servicio, id_pozo, id_equipo, fecha, tuberia) VALUES(?, ?, ?, ?, ?)", [servicio[0].id_servicio, servicio[0].id_pozo, servicio[0].id_equipo, `${fechaSplit[2]}-${fechaSplit[1]}-${fechaSplit[0]}`, servicio[0].tuberia]);
                      const hojaId = await hojaTrabajoTmp.insertId;
                      incrementHojaId(hojaId, arrObj);
                    }
                  }
                }
              }
            });
          });

          function incrementHojaId(hojaId, arrObj) {
            arrObj.forEach(async (element, index) => {
              if (index >= 9) {
                if (element.__EMPTY != "TURNO DIURNO") {
                  if (element.__EMPTY_3 != "CAMBIO DE TURNO") {
                    if (element.__EMPTY) await pool.query("INSERT INTO tb_hojas_trabajo_detalle (hora1, hora2, desde, hasta, ctu, whp, rih, pooh, liquido, n2, tipo, des_tipo_fluido, volumen, comentarios, id_hojas_trabajo) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ", [fecha + " " + element.__EMPTY, fecha + " " + element.__EMPTY_2, element.__EMPTY_3, element.__EMPTY_4, element['HOJA DE TRABAJO '], element.__EMPTY_5, element.__EMPTY_6, element.__EMPTY_7, element.__EMPTY_8, element.__EMPTY_9, element.__EMPTY_10, element.__EMPTY_11, element.__EMPTY_12, element.__EMPTY_13, hojaId]);
                  }
                } else {
                  return false;
                }
              }
            });
          }
        } catch (e) {
          console.log(e);
        }

        res.redirect("/hojas-trabajo/ver?hoja=" + hoja);
      }
    });
  }
});
/***API*******************************************************/

router.post('/hojas-trabajo/eliminar-detalle', isLoggedIn, async (req, res) => {
  const {
    id
  } = req.body;
  await pool.query("DELETE FROM tb_hojas_trabajo_detalle WHERE id = ?", [id]);
  res.json({
    resp: "ok"
  });
});
router.post('/hojas-trabajo', isLoggedIn, async (req, res) => {
  const {
    servicio
  } = req.body;
  let hojaTrabajo;
  if (servicio > 0) hojaTrabajo = await pool.query("SELECT tpl.titulo, tht.fecha, tpo.nombre_pozo, te.nombre_equipo, te.placa_equipo, tht.tuberia, tht.id FROM tb_hojas_trabajo tht INNER JOIN tb_planeacion tpl ON tht.id_servicio = tpl.id_planeacion INNER JOIN tb_equipo_item_equipo_herramienta teieh ON tht.id_equipo = teieh.id_equipo_item_equipo_herramienta INNER JOIN tb_equipos te ON teieh.vehiculo = te.id_equipo INNER JOIN tb_pozos_planeacion tpp ON tht.id_pozo = tpp.id_pozo_planeacion INNER JOIN tb_pozos tpo ON tpp.id_pozo = tpo.id_pozo WHERE tht.id_servicio = ?", [servicio]);else hojaTrabajo = await pool.query("SELECT tpl.titulo, tht.fecha, tpo.nombre_pozo, te.nombre_equipo, te.placa_equipo, tht.tuberia, tht.id FROM tb_hojas_trabajo tht INNER JOIN tb_planeacion tpl ON tht.id_servicio = tpl.id_planeacion INNER JOIN tb_equipo_item_equipo_herramienta teieh ON tht.id_equipo = teieh.id_equipo_item_equipo_herramienta INNER JOIN tb_equipos te ON teieh.vehiculo = te.id_equipo INNER JOIN tb_pozos_planeacion tpp ON tht.id_pozo = tpp.id_pozo_planeacion INNER JOIN tb_pozos tpo ON tpp.id_pozo = tpo.id_pozo");
  res.json({
    hojaTrabajo: hojaTrabajo
  });
});
router.post('/hojas-trabajo/servicio', isLoggedIn, async (req, res) => {
  const {
    servicio
  } = req.body;
  const equipo = await pool.query("SELECT teieh.id_equipo_item_equipo_herramienta id, te.nombre_equipo, te.placa_equipo FROM tb_equipo_item_equipo_herramienta teieh INNER JOIN tb_equipos te ON teieh.vehiculo = te.id_equipo WHERE teieh.id_planeacion = ?", [servicio]);
  const pozo = await pool.query("SELECT tpp.id_pozo_planeacion id, tp.nombre_pozo FROM tb_pozos_planeacion tpp INNER JOIN tb_pozos tp ON tpp.id_pozo = tp.id_pozo WHERE tpp.id_planeacion=?", [servicio]);
  res.json({
    equipo: equipo,
    pozo: pozo
  });
});
router.post('/hojas-trabajo/guardar', isLoggedIn, async (req, res) => {
  const {
    servicio,
    equipo,
    pozo,
    fecha,
    tuberia
  } = req.body;
  await pool.query("INSERT INTO tb_hojas_trabajo (id_servicio, id_pozo, id_equipo, fecha, tuberia) VALUES(?,?,?,?,?)", [servicio, pozo, equipo, fecha, tuberia]);
  res.json({
    resp: "ok"
  });
});
router.post('/hojas-trabajo/eliminar', isLoggedIn, async (req, res) => {
  const {
    id
  } = req.body;
  await pool.query("DELETE FROM tb_hojas_trabajo WHERE id=?", [id]);
  res.json({
    resp: "ok"
  });
});
/*************************************************************/

module.exports = router;