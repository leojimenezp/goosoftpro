const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/a', (req, res )=>{

const xlsx = require("xlsx");
const tipe = "xlsx";
const workbook = xlsx.readFile(`${__dirname}/../public/hojaTrabajo.${tipe}`);
const sheet_name_list = workbook.SheetNames;
console.log(workbook+" "+tipe);
console.log(sheet_name_list);
console.log(xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));
});

module.exports = router;