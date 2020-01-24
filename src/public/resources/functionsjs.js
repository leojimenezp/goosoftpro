 
    $("#ticket").change(function(){
        $.ajax({
                url: "http://localhost:4000/ticket",
                method: "POST",
                data: { servicio: $("#ticket").val() },
                dataType: "json"
            })
                .done(function(msg){
                    let resp = "";
                    msg.tickets.forEach(element => {
                        resp += `
                            <tr>
                                <td class="text-center">${element.titulo}</td>
                                <td class="text-center">${element.fecha}</td>
                                <td class="text-center">${element.fecha_estimada}</td>
                                <td class="text-center">
                                    <a href="/ticket/ver?ticket=${element.id}" class="btn-eliminar-planeacion btn btn-success text-white dt-fab-btn">
                                        <i class="icon icon-eye icon-1x"></i>
                                    </a>
                                    <a href="/ticketeliminar/${element.id} " class="btn-eliminar-planeacion btn btn-success text-white dt-fab-btn">
                                         <img src="/icons-planeacion/trash.svg" ></i>
                                    </a>
                                    </button>
                                </td>
                            </tr>
                        `;
                    });
                    $("#table").html(resp);
                });
    });

    function eliminarHojaTrabajo(id){
        $.ajax({
            url: "http://localhost:4000/hojas-trabajo/eliminar",
            method: "POST",
            data: {
                id: id
            },
            dataType: "json"
        })
            .done(function(msg){
                if(msg.resp == "ok") window.location = "/hojas-trabajo";
            });
    }

    function agregarHojaTrabajo(){
        $("#exampleModalLabel").text("Agregar ticket");
        $("#guardar").attr("onclick", "guardarTicket()");
        $("#servicioSelect").change(function(){
            $.ajax({
                url: "http://localhost:4000/hojas-trabajo/servicio",
                method: "POST",
                data: { servicio: $("#servicioSelect").val() },
                dataType: "json"
            })
                .done(function(msg){

                    /***POZO*************************************************/
                    let pozoOption = '<option value="0">Sin asignar</option>';

                    msg.pozo.forEach(element => {
                        pozoOption += `<option value="${element.id}">${element.nombre_pozo}</option>`;
                    });

                    $("#pozoSelect").html(pozoOption);
                    /********************************************************/
                    
                    /***EQUIPO***********************************************/
                    let equipoOption = '<option value="0">Sin asignar</option>';
                    
                    msg.equipo.forEach(element => {
                        equipoOption += `<option value="${element.id}">${element.nombre_equipo} - ${element.placa_equipo}</option>`;
                    });

                    $("#equipoSelect").html(equipoOption);
                    /********************************************************/
                });
        });
    }

    function guardarTicket(){
        $.ajax({
            url: "http://localhost:4000/ticket/guardar",
            method: "POST",
            data: {
                servicio: $("#servicioSelect").val(),
                equipo: $("#equipoTxt").val(),
                descrip: $("#descripTxt").val()
            },
            dataType: "json"
        })
            .done(function(msg){
                if(msg.resp == "ok") window.location = "/ticket";
            });
    }