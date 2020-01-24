const router = require('express').Router();

const pool = require('../database');

const {
  isLoggedIn
} = require('../lib/auth');

router.get('/planeacion/template/clonar', isLoggedIn, async (req, res) => {
  const consulta = await pool.query("SELECT ie.id_planeacion, ie.estado ,ie.titulo, DATE_FORMAT(ie.fecha_estimada, '%Y-%m-%d') fecha_estimada, p.razon_social_proveedor, pe.nombre_personal, pe.apellido_personal, c.abreviatura_centro_costo, co.descripcion_contrato, ca.nombre_campo, m.abreviatura_moneda FROM tb_planeacion ie, tb_proveedor p, tb_personal pe, tb_centro_costos c, tb_contratos co, tb_campos ca, tb_monedas m WHERE ie.id_cliente = p.id_proveedor AND ie.id_personal = pe.id AND ie.id_centro_costo = c.id_centro_costo AND ie.id_contrato = co.id_contrato AND ie.id_campo = ca.id_campo AND ie.id_moneda = m.id_moneda");
  res.render('planeacion/Template/template', {
    consulta: consulta
  });
});
router.get('/clonar/:id_planeacion', isLoggedIn, async (req, res) => {
  const {
    id_planeacion
  } = req.params;
  var contador = 0;
  const datos_planeacion = await pool.query(`SELECT * FROM tb_planeacion WHERE id_planeacion = '${id_planeacion}'`);
  const fecha_contacto = new Date(datos_planeacion[0].fecha_contacto);
  const fecha_estimada = new Date(datos_planeacion[0].fecha_estimada);
  await pool.query(`INSERT INTO tb_planeacion(titulo, id_cliente, contacto, telefono, email, fecha_contacto, hora_contacto, id_personal, id_centro_costo, fecha_estimada, id_contrato, alojamiento, combustible, iluminacion, seguridad_fisica, personal, id_campo, id_personal_supervisor, id_moneda, objetivo_trabajo, requisitos_hse, observacion, trm, estado)
    VALUES('${datos_planeacion[0].titulo}',
    '${datos_planeacion[0].id_cliente}',
    '${datos_planeacion[0].contacto}',
    '${datos_planeacion[0].telefono}',
    '${datos_planeacion[0].email}',
    '${fecha_contacto.toISOString()}',
    '${datos_planeacion[0].hora_contacto}',
    '${datos_planeacion[0].id_personal}',
    '${datos_planeacion[0].id_centro_costo}',
    '${fecha_estimada.toISOString()}',
    '${datos_planeacion[0].id_contrato}',
    '${datos_planeacion[0].alojamiento}',
    '${datos_planeacion[0].combustible}',
    '${datos_planeacion[0].iluminacion}',
    '${datos_planeacion[0].seguridad_fisica}',
    '${datos_planeacion[0].personal}',
    '${datos_planeacion[0].id_campo}',
    '${datos_planeacion[0].id_personal_supervisor}',
    '${datos_planeacion[0].id_moneda}',
    '${datos_planeacion[0].objetivo_trabajo}',
    '${datos_planeacion[0].requisitos_hse}',
    '${datos_planeacion[0].observacion}',
    '${datos_planeacion[0].trm}',
    '${datos_planeacion[0].estado}')`);
  const obtener_id_planeacion = await pool.query(`SELECT id_planeacion FROM tb_planeacion`);
  var array = [];

  for (var ids of obtener_id_planeacion) {
    array.push(ids.id_planeacion);
  }

  const id_planeacion_copia = array[array.length - 1];
  const datos_equipo_item_consumible = await pool.query(`SELECT * FROM tb_equipo_item_combustible WHERE id_planeacion = '${id_planeacion}'`);
  const datos_equipo_item_equipo_herramienta = await pool.query(`SELECT * FROM tb_equipo_item_equipo_herramienta WHERE id_planeacion = '${id_planeacion}'`);
  const datos_equipo_item_imprevisto = await pool.query(`SELECT * FROM tb_equipo_item_imprevistos WHERE id_planeacion = '${id_planeacion}'`);
  const datos_equipo_item_personal = await pool.query(`SELECT * FROM tb_equipo_item_personal WHERE id_planeacion = '${id_planeacion}'`);
  const datos_equipo_rubros_equipo_herramienta = await pool.query(`SELECT * FROM tb_equipo_rubros_equipo_herramienta WHERE id_planeacion = '${id_planeacion}'`);
  const datos_equipo_rubros_personal = await pool.query(`SELECT * FROM tb_equipo_rubros_personal WHERE id_planeacion = '${id_planeacion}'`);
  const datos_mov_item_consumible = await pool.query(`SELECT * FROM tb_mov_item_combustibles WHERE id_planeacion = '${id_planeacion}'`);
  const datos_mov_item_imprevisto = await pool.query(`SELECT * FROM tb_mov_item_imprevistos WHERE id_planeacion = '${id_planeacion}'`);
  const datos_mov_item_personal = await pool.query(`SELECT * FROM tb_mov_item_personal WHERE id_planeacion = '${id_planeacion}'`);
  const datos_mov_item_vehiculos = await pool.query(`SELECT * FROM tb_mov_item_vehiculos WHERE id_planeacion = '${id_planeacion}'`);
  const datos_mov_rubros_personal = await pool.query(`SELECT * FROM tb_mov_rubros_personal WHERE id_planeacion = '${id_planeacion}'`);
  const datos_mov_rubros_vehiculos = await pool.query(`SELECT * FROM tb_mov_rubros_vehiculos WHERE id_planeacion = '${id_planeacion}'`);
  const tipos_trabajo = await pool.query(`SELECT * FROM tb_tipo_trabajo_planeacion WHERE id_planeacion = '${id_planeacion}'`);
  const pozos = await pool.query(`SELECT * FROM tb_pozos_planeacion WHERE id_planeacion = '${id_planeacion}'`);
  const cotizacion = await pool.query(`SELECT * FROM tb_cotizaciones WHERE id_planeacion = '${id_planeacion}'`);
  const costos_cotizacion = await pool.query(`SELECT * FROM tb_cotizaciones_costos WHERE id_planeacion = '${id_planeacion}'`); // datos_equipo_item_consumible

  for (equipo_consumible of datos_equipo_item_consumible) {
    contador++;
  }

  for (var i = 0; i <= contador - 1; i++) {
    await pool.query(`INSERT INTO tb_equipo_item_combustible(id_planeacion, id_item, id_rubro, id_unidad_medida, id_moneda, cantidad, costo_unitario, medio_pago, confirmar)
        VALUES('${id_planeacion_copia}',
        '${datos_equipo_item_consumible[i].id_item}',
        '${datos_equipo_item_consumible[i].id_rubro}',
        '${datos_equipo_item_consumible[i].id_unidad_medida}',
        '${datos_equipo_item_consumible[i].id_moneda}',
        '${datos_equipo_item_consumible[i].cantidad}',
        '${datos_equipo_item_consumible[i].costo_unitario}',
        '${datos_equipo_item_consumible[i].medio_pago}',
        '${datos_equipo_item_consumible[i].confirmar}')`);
  }

  contador = 0; // datos_equipo_item_equipo_herramienta

  for (equipo_equipo_herramienta of datos_equipo_item_equipo_herramienta) {
    contador++;
  }

  for (var o = 0; o <= contador - 1; o++) {
    const fecha_inicio_gasto = new Date(datos_equipo_item_equipo_herramienta[o].fecha_inicio_gasto);
    const fecha_final_gasto = new Date(datos_equipo_item_equipo_herramienta[o].fecha_final_gasto);
    const fecha_inicio_gasto_standby = new Date(datos_equipo_item_equipo_herramienta[o].fecha_inicio_gasto_standby);
    const fecha_final_gasto_standby = new Date(datos_equipo_item_equipo_herramienta[o].fecha_final_gasto_standby);
    const fecha_1 = new Date(datos_equipo_item_equipo_herramienta[o].fecha_1);
    const fecha_2 = new Date(datos_equipo_item_equipo_herramienta[o].fecha_2);
    await pool.query(`INSERT INTO tb_equipo_item_equipo_herramienta(id_planeacion, id_tipo_equipo_herramienta, vehiculo, carga, id_equipo_herramienta, cantidad, id_unidad_medida, id_rubro, id_moneda, medio_pago, costo_unitario, observaciones, id_mov_item_vehiculo, gasto_unitario, gasto_standby_unitario, fecha_inicio_gasto, fecha_final_gasto, fecha_inicio_gasto_standby, fecha_final_gasto_standby, fecha_1, fecha_2)
        VALUES('${id_planeacion_copia}',
        '${datos_equipo_item_equipo_herramienta[o].id_tipo_equipo_herramienta}',
        '${datos_equipo_item_equipo_herramienta[o].vehiculo}',
        '${datos_equipo_item_equipo_herramienta[o].carga}',
        '${datos_equipo_item_equipo_herramienta[o].id_equipo_herramienta}',
        '${datos_equipo_item_equipo_herramienta[o].cantidad}',
        '${datos_equipo_item_equipo_herramienta[o].id_unidad_medida}',
        '${datos_equipo_item_equipo_herramienta[o].id_rubro}',
        '${datos_equipo_item_equipo_herramienta[o].id_moneda}',
        '${datos_equipo_item_equipo_herramienta[o].medio_pago}',
        '${datos_equipo_item_equipo_herramienta[o].costo_unitario}',
        '${datos_equipo_item_equipo_herramienta[o].observaciones}',
        '${datos_equipo_item_equipo_herramienta[o].id_mov_item_vehiculo}',
        '${datos_equipo_item_equipo_herramienta[o].gasto_unitario}',
        '${datos_equipo_item_equipo_herramienta[o].gasto_standby_unitario}',
        '${fecha_inicio_gasto.toISOString()}',
        '${fecha_final_gasto.toISOString()}',
        '${fecha_inicio_gasto_standby.toISOString()}',
        '${fecha_final_gasto_standby.toISOString()}',
        '${fecha_1.toISOString()}',
        '${fecha_2.toISOString()}')`);
  }

  contador = 0; // datos_equipo_item_imprevisto

  for (equipo_imprevisto of datos_equipo_item_imprevisto) {
    contador++;
  }

  for (var p = 0; p <= contador - 1; p++) {
    const fecha_imprevisto = new Date(datos_equipo_item_imprevisto[p].fecha_imprevisto);
    await pool.query(`INSERT INTO tb_equipo_item_imprevistos(id_planeacion, descripcion, id_moneda, fecha_imprevisto, id_rubro, id_unidad_medida, cantidad, costo_unitario, medio_pago, id_mov_item_imprevisto)
        VALUES('${id_planeacion_copia}',
        '${datos_equipo_item_imprevisto[p].descripcion}',
        '${datos_equipo_item_imprevisto[p].id_moneda}',
        '${fecha_imprevisto.toISOString()}',
        '${datos_equipo_item_imprevisto[p].id_rubro}',
        '${datos_equipo_item_imprevisto[p].id_unidad_medida}',
        '${datos_equipo_item_imprevisto[p].cantidad}',
        '${datos_equipo_item_imprevisto[p].costo_unitario}',
        '${datos_equipo_item_imprevisto[p].medio_pago}',
        '${datos_equipo_item_imprevisto[p].id_mov_item_imprevisto}')`);
    console.log(datos_equipo_item_imprevisto[p]);
  }

  contador = 0; // datos_equipo_item_personal

  for (equipo_personal of datos_equipo_item_personal) {
    contador++;
  }

  for (var m = 0; m <= contador - 1; m++) {
    const fecha_inicio_mov = new Date(datos_equipo_item_personal[m].fecha_inicio_mov);
    const fecha_final_mov = new Date(datos_equipo_item_personal[m].fecha_final_mov);
    const fecha_inicio_demov = new Date(datos_equipo_item_personal[m].fecha_inicio_demov);
    const fecha_final_demov = new Date(datos_equipo_item_personal[m].fecha_final_demov);
    await pool.query(`INSERT INTO tb_equipo_item_personal(id_planeacion, id_cargo, id_personal, id_unidad_medida, id_moneda, cantidad, costo, id_tipo_asignacion, costo_unitario_rubro, medio_pago, id_rubro, id_mov_item_personal, fecha_inicio_mov, fecha_final_mov, fecha_inicio_demov, fecha_final_demov)
        VALUES('${id_planeacion_copia}',
        '${datos_equipo_item_personal[m].id_cargo}',
        '${datos_equipo_item_personal[m].id_personal}',
        '${datos_equipo_item_personal[m].id_unidad_medida}',
        '${datos_equipo_item_personal[m].id_moneda}', 
        '${datos_equipo_item_personal[m].cantidad}',
        '${datos_equipo_item_personal[m].costo}', 
        '${datos_equipo_item_personal[m].id_tipo_asignacion}', 
        '${datos_equipo_item_personal[m].costo_unitario_rubro}', 
        '${datos_equipo_item_personal[m].medio_pago}', 
        '${datos_equipo_item_personal[m].id_rubro}', 
        '${datos_equipo_item_personal[m].id_mov_item_personal}',
        '${fecha_inicio_mov.toISOString()}', 
        '${fecha_final_mov.toISOString()}', 
        '${fecha_inicio_demov.toISOString()}',
        '${fecha_final_demov.toISOString()}')`);
  }

  contador = 0; // datos_equipo_rubros_equipo_herramienta

  for (equipo_rubro_equipo_herramienta of datos_equipo_rubros_equipo_herramienta) {
    contador++;
  }

  for (var n = 0; n <= contador - 1; n++) {
    await pool.query(`INSERT INTO tb_equipo_rubros_equipo_herramienta(id_equipo_item_equipo_herramienta, id_planeacion, id_item, id_rubro, id_unidad_medida, cantidad, costo_unitario, medio_pago)
        VALUES('${datos_equipo_rubros_equipo_herramienta[n].id_equipo_item_equipo_herramienta}',
        '${id_planeacion_copia}',
        '${datos_equipo_rubros_equipo_herramienta[n].id_item}',
        '${datos_equipo_rubros_equipo_herramienta[n].id_rubro}',
        '${datos_equipo_rubros_equipo_herramienta[n].id_unidad_medida}',
        '${datos_equipo_rubros_equipo_herramienta[n].cantidad}',
        '${datos_equipo_rubros_equipo_herramienta[n].costo_unitario}',
        '${datos_equipo_rubros_equipo_herramienta[n].medio_pago}')`);
  }

  contador = 0; // datos_equipo_rubros_personal

  for (equipo_rubro_personal of datos_equipo_rubros_personal) {
    contador++;
  }

  for (var a = 0; a <= contador - 1; a++) {
    await pool.query(`INSERT INTO tb_equipo_rubros_personal(id_equipo_item_personal, id_planeacion, id_item, id_rubro, id_unidad_medida, cantidad, costo_unitario, medio_pago)
        VALUES('${datos_equipo_rubros_personal[a].id_equipo_item_personal}',
        '${id_planeacion_copia}',
        '${datos_equipo_rubros_personal[a].id_item}',
        '${datos_equipo_rubros_personal[a].id_rubro}',
        '${datos_equipo_rubros_personal[a].id_unidad_medida}',
        '${datos_equipo_rubros_personal[a].cantidad}',
        '${datos_equipo_rubros_personal[a].costo_unitario}',
        '${datos_equipo_rubros_personal[a].medio_pago}')`);
  }

  contador = 0;
});
module.exports = router;