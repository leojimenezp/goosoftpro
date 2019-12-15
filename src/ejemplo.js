const fs = require('fs');
const pdf = require('html-pdf');
const options = { format: 'Letter' };

/**
 * @data
 * {
 * 		dia: int,
 * 		mes: int,
 * 		ano: int,
 * 		monto: int,
 * 		nombreSolicitante: string,
 * 		nombreBeneficiario: string,
 * 		servicio: string,
 * 		cedulaBeneiciario: int,
 * 		diasEstimados: int,
 * 		placaVehiculo: string,
 * 		items:[
 * 			{
 * 				item: int,
 * 				concepto: string,
 * 				cantidad: int,
 * 				costoUnitario: int,
 * 				costoTotal: int,
 * 			}, ..., ...
 * 		],
 * 		total: int,
 * 		observaciones: string
 * }
 */

class SolicitudAnticipoPdf{
	constructor(data){
		this.data = data;
		this.formatoPesos();
		this.formarHtml();
		this.startPdf();
	}
	
	/**
	 * Methodo para separar el numero cada tres cifras
	 */
	formatoPesos(){
		this.data.monto = Intl.NumberFormat().format(this.data.monto);
		this.data.cedulaBeneiciario = Intl.NumberFormat().format(this.data.cedulaBeneiciario);
		this.data.total = Intl.NumberFormat().format(this.data.total);
		this.data.items.forEach(element => {
			element.costoUnitario = Intl.NumberFormat().format(element.costoUnitario);
			element.costoTotal = Intl.NumberFormat().format(element.costoTotal);
		});
	}

	/**
	 * Methodo para ajustar el pdf a la salida de texto
	 */
	formarHtml(){
		this.html = `
			<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
			<html>
				<head>
					<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
					<style type="text/css">
						body,div,table,thead,tbody,tfoot,tr,th,td,p { font-family:"Arial"; font-size:x-small }
						a.comment-indicator:hover + comment { background:#ffd; position:absolute; display:block; border:1px solid black; padding:0.5em;  } 
						a.comment-indicator { background:red; display:inline-block; border:1px solid black; width:0.5em; height:0.5em;  }
						comment { display:none;  }
					</style>
				</head>
				<body>
					<table cellspacing="0" border="0">
						<colgroup width="72"></colgroup>
						<colgroup width="71"></colgroup>
						<colgroup span="3" width="68"></colgroup>
						<colgroup width="98"></colgroup>
						<colgroup width="70"></colgroup>
						<colgroup width="78"></colgroup>
						<colgroup width="68"></colgroup>
						<colgroup width="136"></colgroup>
						<tr>
							<!--Imagen-->
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=3 rowspan=3 height="51" align="center" valign=middle bgcolor="#FFFFFF">
								<font face="Calibri">
									<br>
									<img src="7d41601904c142a0bbb63007d1f4d872_htm_a54e83c84315dc2f.png" width=127 height=44 hspace=43 vspace=4>
								</font>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=6 rowspan=3 align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri" size=3>
										SOLICITUD DE ANTICIPO PARA GASTOS DE OPERACIÓN O VIAJE
									</font>
								</b>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF">
								<font face="Calibri">Vigencia: 2017-02-14</font>
							</td>
						</tr>
						<tr>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF">
								<font face="Calibri">Versión: 2</font>
							</td>
						</tr>
						<tr>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF">
								<font face="Calibri">Página 1 / 1</font>
							</td>
						</tr>
						<tr>
							<td colspan=10 height="12" align="center" valign=middle bgcolor="#FFFFFF">
								<font face="Calibri">
									<br/>
								</font>
							</td>
						</tr>
						<tr>
							<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan=2 rowspan=2 height="46" align="left" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">Fecha de Solicitud: </font>
								</b>
							</td>
							<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FFFFFF">
								<font face="Calibri">DIA</font>
							</td>
							<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FFFFFF">
								<font face="Calibri">MES</font>
							</td>
							<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FFFFFF">
								<font face="Calibri">AÑO</font>
							</td>
							<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000" rowspan=2 align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri" size=3>Monto Solicitado $</font>
								</b>
							</td>
							<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan=4 rowspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)">
								<b>
									<font face="Calibri" size=4>
										${this.data.monto}
									</font>
								</b>
							</td>
						</tr>
						<tr>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">
										${this.data.dia}
									</font>
								</b>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">
										${this.data.mes}
									</font>
								</b>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">
										${this.data.ano}
									</font>
								</b>
							</td>
						</tr>
						<tr>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan=3 height="24" align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">Nombre del Solicitante: </font>
								</b>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=3 align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">
										${this.data.nombreSolicitante}
									</font>
								</b>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">Nombre Beneficiario:</font>
								</b>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">${this.data.nombreBeneficiario}</font>
								</b>
							</td>
						</tr>
						<tr>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan=3 height="24" align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">Servicio:</font>
								</b>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=3 align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">
										${this.data.servicio}
									</font>
								</b>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">Cédula Beneficiario:</font>
								</b>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;#,##0">
								<b>
									<font face="Calibri">${this.data.cedulaBeneiciario}</font>
								</b>
							</td>
						</tr>
						<tr>
							<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan=3 height="24" align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">Días estimados  de operación:</font>
								</b>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=3 align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">
										${this.data.diasEstimados}
									</font>
								</b>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">Placa Vehículo/ Equipo:</font>
								</b>
							</td>
							<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">${this.data.placaVehiculo}</font>
								</b>
							</td>
						</tr>
						<tr>
							<td style="border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" colspan=10 height="12" align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri"><br></font>
								</b>
							</td>
						</tr>
						<tr>
							<td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="21" align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">Ítem</font>
								</b>
							</td>
							<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">Concepto</font>
								</b>
							</td>
							<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">Cantidad</font>
								</b>
							</td>
							<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">Costo unitario</font>
								</b>
							</td>
							<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF">
								<b>
									<font face="Calibri">Costo total</font>
								</b>
							</td>
						</tr>`;
						this.data.items.forEach(element =>{
							this.html += `
								<tr>
									<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="1" sdnum="1033;">
										<font face="Calibri">
											${element.item}
										</font>
									</td>
									<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="left" valign=middle bgcolor="#FFFFFF">
										<font face="Calibri" color="#000000">
											${element.concepto}
										</font>
									</td>
									<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF">
										<font face="Calibri" color="#000000">
											${element.cantidad}	
										</font></td>
									<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)">
										<font face="Calibri" color="#000000">
											${element.costoUnitario}
										</font>
									</td>
									<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)">
										<font face="Calibri" color="#000000">
											${element.costoTotal}
										</font>
									</td>
								</tr>
							`;
						});
						this.html += `
							<tr>
								<td style="border-bottom: 2px solid #000000; border-left: 2px solid #000000" colspan=9 height="19" align="center" valign=middle bgcolor="#FFFFFF">
									<b>
										<font face="Calibri" color="#000000">Total Gastos </font>
									</b>
								</td>
								<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="right" valign=middle bgcolor="#FFFFFF" sdval="0" sdnum="1033;0;[$$-240A] #,##0_ ;-[$$-240A] #,##0 ">
									<b>
										<font face="Calibri" color="#000000">
											${this.data.total}
										</font>
									</b>
								</td>
							</tr>
							<tr>
								<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000" colspan=2 height="19" align="left" valign=middle bgcolor="#FFFFFF">
									<b>
										<font face="Calibri" size=3 color="#000000">Observaciones:</font>
									</b>
								</td>
								<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000" colspan=8 align="left" valign=middle bgcolor="#FFFFFF">
									<b>
										<font face="Calibri" color="#000000">
											${this.data.observaciones}
										</font>
									</b>
								</td>
							</tr>
							<tr>
								<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000" colspan=10 height="19" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" color="#000000"><br></font></b></td>
							</tr>
						<tr>
							<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" height="21" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" color="#000000"><br></font></b></td>
							<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" color="#000000"><br></font></b></td>
							<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" color="#000000"><br></font></b></td>
							<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" color="#000000"><br></font></b></td>
							<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" color="#000000"><br></font></b></td>
						</tr>
						<tr>
							<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" colspan=10 height="51" align="justify" valign=middle bgcolor="#FFFFFF">
								<font face="Calibri">
									Nota: Autorizo a GUACAMAYA OIL SERVICES S.A.S., a efectuar el descuento por nómina o liquidación del total del valor recibido en calidad de Anticipo estipulado en este formato, en caso de no efectuar la legalización pertinente a dichos dineros en los términos establecidos por la compañía.
								</font>
							</td>
						</tr>
						<tr>
							<td style="border-top: 2px solid #000000" height="17" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
						</tr>
						<tr>
							<td style="border-bottom: 1px solid #000000" colspan=4 height="17" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-bottom: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-bottom: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-bottom: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
						</tr>
						<tr>
							<td style="border-top: 1px solid #000000" colspan=4 height="25" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1>Firma del Solicitante</font></b></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td style="border-top: 1px solid #000000" colspan=3 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1>Vo.Bo. Operaciones</font></b></td>
							<td align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
						</tr>
						<tr>
							<td height="18" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
						</tr>
						<tr>
							<td height="18" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td style="border-bottom: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td style="border-bottom: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td style="border-bottom: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
						</tr>
						<tr>
							<td height="17" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-top: 1px solid #000000" colspan=3 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1>Vo.Bo. Administración o Contabilidad</font></b></td>
							<td align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
							<td align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=1><br></font></b></td>
						</tr>
						<tr>
							<td style="border-bottom: 1px dotted #000000" height="17" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-bottom: 1px dotted #000000" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-bottom: 1px dotted #000000" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-bottom: 1px dotted #000000" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-bottom: 1px dotted #000000" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-bottom: 1px dotted #000000" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-bottom: 1px dotted #000000" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-bottom: 1px dotted #000000" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-bottom: 1px dotted #000000" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
							<td style="border-bottom: 1px dotted #000000" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
						</tr>
					</table>
				</body>
			</html>`;
	}

	startPdf(){
		pdf
			.create(this.html, options)
			.toFile('./ejemplo.pdf', (err, res)=>{
				if (err) return console.log(err);
				console.log(res);
			});
	}
}

/***Ejemplo de uso****************************************/
new SolicitudAnticipoPdf(
	{
		dia: 07,
		mes: 10,
		ano: 2018,
		monto: 5000000000,
		nombreSolicitante: "Winifred",
		nombreBeneficiario: "Jose",
		servicio: "De rapido",
		cedulaBeneiciario: 1075301951,
		diasEstimados: 20,
		placaVehiculo: "MAD-53C",
		items:[
			{
				item: 1, //"int"
				concepto: "string",
				cantidad: 2, //"int"
				costoUnitario: 500000000, //"int"
				costoTotal: 1000000000, //"int"
			},
			{
				item: 2, //"int"
				concepto: "string",
				cantidad: 2, //"int"
				costoUnitario: 500000000, //"int"
				costoTotal: 1000000000, //"int"
			},
			{
				item: 3, //"int"
				concepto: "string",
				cantidad: 2, //"int"
				costoUnitario: 500000000, //"int"
				costoTotal: 1000000000, //"int"
			},
			{
				item: 4, //"int"
				concepto: "string",
				cantidad: 2, //"int"
				costoUnitario: 500000000, //"int"
				costoTotal: 1000000000, //"int"
			},
			{
				item: 5, //"int"
				concepto: "string",
				cantidad: 2, //"int"
				costoUnitario: 500000000, //"int"
				costoTotal: 1000000000, //"int"
			}
		],
		total: 5000000000000, //"int"
		observaciones: "string"
	}
);
/*********************************************************/
