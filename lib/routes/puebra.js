
let valorTxt = $("#valorTxt");
let totalTxt = $("#totalTxt");
let cantidadTxt = $("#cantidadTxt");
let unidadTxt = $("#unidadTxt");
let tipoSelect = $("#tipoSelect");
let descripcionTextArea = $("#descripcionTextArea");
let monedaSelect = $("#monedaSelect");
let itemSelect = $("#itemSelect");
let ticket = $("#ticket");
let bandera = 0;
let id_planeacion = $("#id_planeacion");

itemSelect.change(() => {
    if (itemSelect.val() == 0) {
        $("#addItem").hide();
        $("#descuento").show();
    } else {
        $("#descuento").hide();
        $("#addItem").show();
    }

    if (itemSelect.val() > 0) {
        $.ajax({
            url: host + "ticket/get/items",
            method: "POST",
            data: { item: itemSelect.val() },
            dataType: "json"
        }).done(function (msg) {

            bandera = 0;
            tipoSelect.val(msg.item[0].tipo).change();
            monedaSelect.val(msg.item[0].id_moneda).change();
            descripcionTextArea.val(msg.item[0].descripcion);
            cantidadTxt.val(msg.item[0].cant);
            unidadTxt.val(msg.item[0].und);
            valorTxt.val(msg.item[0].valor);
            totalTxt.val(msg.item[0].total);
            id_planeacion.val(msg.item[0].id_servicio);
        });
    }
});

function editar(id) {
    $.ajax({
        url: host + "ticket/editarl",
        method: "POST",
        data: { ticket: id },
        dataType: "json"
    }).done(function (msg) {

        console.log(msg);

        itemSelect.val(msg.ticket);
        console.log(itemSelect);
        bandera = 1;
        tipoSelect.val(msg.tipo).change();
        monedaSelect.val(msg.ticket[0].id_moneda).change();
        descripcionTextArea.val(msg.ticket[0].descripcion);
        cantidadTxt.val(msg.ticket[0].cant);
        unidadTxt.val(msg.ticket[0].und);
        valorTxt.val(msg.ticket[0].valor);
        totalTxt.val(msg.ticket[0].total);
    });
}

$("#btnAdd").click(() => {
    if (itemSelect.val() == 0) {
        $.ajax({
            url: host + "ticket/save/descuento",
            method: "POST",
            data: { ticket: ticket.val(), descuento: $("#descuentoTxt").val() },
            dataType: "json"
        }).done(function (msg) {
            if (msg.resp == "ok") window.location = "/ticket/ver?ticket=" + ticket.val();
        });
    }
    if (itemSelect.val() > 0) {
        $.ajax({
            url: host + "ticket/save/item",
            method: "POST",
            data: {
                item: itemSelect.val(),
                bandera: bandera,
                und: unidadTxt.val(),
                descripcion: descripcionTextArea.val(),
                cant: cantidadTxt.val(),
                valor: valorTxt.val(),
                id_moneda: monedaSelect.val(),
                total: totalTxt.val(),
                id_ticket: ticket.val(),
                tipo: tipoSelect.val(),
                id_planeacion: id_planeacion.val()
            },
            dataType: "json"
        }).done(function (msg) {
            if (msg.resp == "ok") window.location = "/ticket/ver?ticket=" + ticket.val();
        });
    }
});

function eliminar(id) {
    $.ajax({
        url: "http://localhost:4000/hojas-trabajo/eliminar-detalle",
        method: "POST",
        data: { id: id },
        dataType: "json"
    }).done(function (msg) {
        if (msg.resp == "ok") window.location = "/hojas-trabajo/ver?hoja=" + $("#hoja").val();
    });
}