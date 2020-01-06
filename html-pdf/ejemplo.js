const fs = require('fs');
const pdf = require('html-pdf');
const options = { format: 'Letter' };
const html = `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html>
<head>
	
	<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
	<title>Legalización Avance de Gastos</title>
	<meta name="generator" content="LibreOffice 6.0.7.3 (Linux)"/>
	<meta name="author" content="Mariela González Castaño"/>
	<meta name="created" content="2000-08-16T21:37:56"/>
	<meta name="changedby" content="CLAUDIA"/>
	<meta name="changed" content="2019-05-20T17:48:52"/>
	<meta name="AppVersion" content="16.0300"/>
	<meta name="Company" content="WINDOWS"/>
	<meta name="DocSecurity" content="0"/>
	<meta name="HyperlinksChanged" content="false"/>
	<meta name="LinksUpToDate" content="false"/>
	<meta name="ScaleCrop" content="false"/>
	<meta name="ShareDoc" content="false"/>
	
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
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=3 rowspan=3 height="51" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br><img src="7d41601904c142a0bbb63007d1f4d872_htm_a54e83c84315dc2f.png" width=127 height=44 hspace=43 vspace=4>
		</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=6 rowspan=3 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=3>SOLICITUD DE ANTICIPO PARA GASTOS DE OPERACIÓN O VIAJE</font></b></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri">Vigencia: 2017-02-14</font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri">Versión:3</font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri">Página 1 / 1</font></td>
	</tr>
	<tr>
		<td colspan=10 height="12" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri"><br></font></td>
		</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan=2 rowspan=2 height="46" align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri">Fecha de Solicitud: </font></b></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri">DIA </font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri">MES </font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=bottom bgcolor="#FFFFFF"><font face="Calibri">AÑO</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000" rowspan=2 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=3>Monto Solicitado $</font></b></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan=4 rowspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><b><font face="Calibri" size=4><br></font></b></td>
		</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri"><br></font></b></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri"><br></font></b></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri"><br></font></b></td>
		</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan=3 height="24" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri">Nombre del Solicitante: </font></b></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=3 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri"><br></font></b></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri">Nombre Beneficiario:</font></b></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri"><br></font></b></td>
		</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan=3 height="24" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri">Servicio:</font></b></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=3 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri"><br></font></b></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri">Cédula Beneficiario:</font></b></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;#,##0"><b><font face="Calibri"><br></font></b></td>
		</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" colspan=3 height="24" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri">Días estimados  de operación:</font></b></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=3 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri"><br></font></b></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri">Placa Vehículo/ Equipo:</font></b></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri"><br></font></b></td>
		</tr>
	<tr>
		<td style="border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" colspan=10 height="12" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri"><br></font></b></td>
		</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="21" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri">Ítem</font></b></td>
		<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri">Concepto</font></b></td>
		<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri">Cantidad</font></b></td>
		<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri">Costo unitario</font></b></td>
		<td style="border-top: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri">Costo total</font></b></td>
	</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="1" sdnum="1033;"><font face="Calibri">1</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Alojamiento y Manutención</font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="2" sdnum="1033;"><font face="Calibri">2</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Anticipo a Terceros</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="3" sdnum="1033;"><font face="Calibri">3</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Combustible</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="4" sdnum="1033;"><font face="Calibri">4</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Imprevistos</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="5" sdnum="1033;"><font face="Calibri">5</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Lavandería</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="6" sdnum="1033;"><font face="Calibri">6</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Mantenimiento</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="7" sdnum="1033;"><font face="Calibri">7</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Operación </font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="8" sdnum="1033;"><font face="Calibri">8</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Pasajes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="9" sdnum="1033;"><font face="Calibri">9</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Peajes</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="10" sdnum="1033;"><font face="Calibri">10</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Personal</font></td>
		<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-left: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="11" sdnum="1033;"><font face="Calibri">11</font></td>
		<td style="border-top: 1px solid #000000; border-left: 1px solid #000000" align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Química</font></td>
		<td style="border-top: 1px solid #000000" align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000" align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000" align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-right: 1px solid #000000" align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-left: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="12" sdnum="1033;"><font face="Calibri">12</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=5 align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Taxis y Buses</font></td>
		<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 1px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" colspan=2 align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 1px solid #000000" height="18" align="center" valign=middle bgcolor="#FFFFFF" sdval="13" sdnum="1033;"><font face="Calibri">13</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000" align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000">Transporte</font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000" align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-right: 1px solid #000000" align="left" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-right: 1px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
		<td style="border-top: 1px solid #000000; border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="center" valign=middle bgcolor="#FFFFFF" sdnum="1033;0;_(&quot;$&quot; * #,##0.00_);_(&quot;$&quot; * \(#,##0.00\);_(&quot;$&quot; * &quot;-&quot;??_);_(@_)"><font face="Calibri" color="#000000"><br></font></td>
	</tr>
	<tr>
		<td style="border-bottom: 2px solid #000000; border-left: 2px solid #000000" colspan=9 height="19" align="center" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" color="#000000">Total Gastos </font></b></td>
		<td style="border-bottom: 2px solid #000000; border-left: 1px solid #000000; border-right: 2px solid #000000" align="right" valign=middle bgcolor="#FFFFFF" sdval="0" sdnum="1033;0;[$$-240A] #,##0_ ;-[$$-240A] #,##0 "><b><font face="Calibri" color="#000000">$ 0 </font></b></td>
	</tr>
	<tr>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000" colspan=2 height="19" align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" size=3 color="#000000">Observaciones:</font></b></td>
		<td style="border-top: 2px solid #000000; border-bottom: 1px solid #000000" colspan=8 align="left" valign=middle bgcolor="#FFFFFF"><b><font face="Calibri" color="#000000"><br></font></b></td>
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
		<td style="border-top: 2px solid #000000; border-bottom: 2px solid #000000; border-left: 2px solid #000000; border-right: 2px solid #000000" colspan=10 height="51" align="justify" valign=middle bgcolor="#FFFFFF"><font face="Calibri">Nota: Autorizo a GUACAMAYA OIL SERVICES S.A.S., a efectuar el descuento por nómina o liquidación del total del valor recibido en calidad de Anticipo estipulado en este formato, en caso de no efectuar la legalización pertinente a dichos dineros en los términos establecidos por la compañía.</font></td>
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
<!-- ************************************************************************** -->
</body>

</html>

`;

pdf
    .create(html, options)
    .toFile('./ejemplo.pdf', function(err, res) {
		if (err) return console.log(err);
		console.log(res); // { filename: '/app/businesscard.pdf' }
	});
