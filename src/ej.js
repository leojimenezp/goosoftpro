const xlsxtojson = require("xlsx-to-json-lc");
const xlsx = require("xlsx");

const workbook = xlsx.readFile(`./public/hojaTrabajo.xlsx`);
const sheet_name_list = workbook.SheetNames;
console.log(xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]));
