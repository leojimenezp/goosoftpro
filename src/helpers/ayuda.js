
    $("#planeacionSelect").change(function(){   
        $.ajax({
            url: "http://localhost:4000/repor/busqueda",
            method: "POST",
            data: { id_planeacion: $("#planeacionSelect").val() },
            dataType: "json"
        })
            .done(function(msg){
                console.log(msg)
                const data = [] , data1 = [] , data2 = [];  
                data.push(
                    msg.costo_cotizacion[0] ? msg.costo_cotizacion[0].total : 0,
                    msg.costo_cotizacion[1] ? msg.costo_cotizacion[0].total : 0,
                    msg.costo_cotizacion[2] ? msg.costo_cotizacion[0].total : 0,
                    msg.costo_cotizacion[3] ? msg.costo_cotizacion[0].total : 0
                );
                Grafica1(data);
                data1.push(
                    msg.costo_cotizaciontbr[0] ? msg.costo_cotizaciontbr[0].total : 0,
                    msg.costo_cotizaciontbr[1] ? msg.costo_cotizaciontbr[0].total : 0,
                    msg.costo_cotizaciontbr[2] ? msg.costo_cotizaciontbr[0].total : 0,
                    msg.costo_cotizaciontbr[3] ? msg.costo_cotizaciontbr[0].total : 0
                );
                 Grafica2(data1);
                data2.push(
                    msg.costo_cotizaciontbrc[0] ? msg.costo_cotizaciontbrc[0].total : 0,
                    msg.costo_cotizaciontbrc[1] ? msg.costo_cotizaciontbrc[0].total : 0,
                    msg.costo_cotizaciontbrc[2] ? msg.costo_cotizaciontbrc[0].total : 0,
                    msg.costo_cotizaciontbrc[3] ? msg.costo_cotizaciontbrc[0].total : 0
                );
                 Grafica3(data2);
                 console.log(data ,data1 ,data2)
            });
    });

    /***Grafica1*************************************/
    function Grafica1(data){
        let cv = document.getElementById('myChart');
        let ctx = cv.getContext('2d');
        let chart = new Chart(ctx, {
            type: 'bar',
            data:{
                datasets: [{
                    data: data,
                    backgroundColor: ['blue', 'yellow','red'],
                    label: 'Cantidad consignacion por estado'
                }],
                labels: ['Equipo', 'Personal', 'Otros', 'Movilizacion']
            },
            options: {responsive: true, 
            tooltips: {
                callbacks: {
                        label: function(tooltipItem, data) {
                            var value = data.datasets[0].data[tooltipItem.index];
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        }
                } // end callbacks:
                },
                scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            userCallback: function(value, index, values) {
                                // Convert the number to a string and splite the string every 3 charaters from the end
                                value = value.toString();
                                value = value.split(/(?=(?:...)*$)/);
                                value = value.join(',');
                                return value;
                            }
                        }
                    }]
                }
            }
        });

        cv.onclick = function(evt){
            let activePoint = chart.getElementAtEvent(evt);
            let index = activePoint[0]._index;
            let url = "http://localhost:4000/legalizacion/consignacion_grafica_consignacion"
            if(index == 0) window.location = url + '?estado=confirmado';
            else if(index == 1) window.location = url + '?estado=no aprobado';
            else if(index == 2) window.location = url + '?estado=rechazado';
        };
    }
    /************************************************/

    /***Grafica2*************************************/
    function Grafica2(data1){
        let cv1 = document.getElementById('myChart1');
        let ctx1 = cv1.getContext('2d');
        let chart1 = new Chart(ctx1, {
            type: 'bar',
            data:{
                datasets: [{
                    data: data1,
                    backgroundColor: ['blue', 'red'],
                    label: 'Legalizadas vs no legalizadas'
                }],
                labels: ['Equipo', 'Personal', 'Otros', 'Movilizacion']
            },
            options: {responsive: true, 
            tooltips: {
                callbacks: {
                        label: function(tooltipItem, data) {
                            var value = data.datasets[0].data[tooltipItem.index];
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        }
                } // end callbacks:
                },
                scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            userCallback: function(value, index, values) {
                                // Convert the number to a string and splite the string every 3 charaters from the end
                                value = value.toString();
                                value = value.split(/(?=(?:...)*$)/);
                                value = value.join(',');
                                return value;
                            }
                        }
                    }]
                }
            }
        });

        cv1.onclick = function(evt){
            let activePoint = chart1.getElementAtEvent(evt);
            let index = activePoint[0]._index;
            let url = "http://localhost:4000/legalizacion/consignacion_grafica_legalizada"
            if(index == 0) window.location = url + '?estado=1';
            else if(index == 1) window.location = url + '?estado=0';
        };
    }
    /************************************************/

    /***Grafica3*************************************/
    function Grafica3(data2){
        let cv2 = document.getElementById('myChart2');
        let ctx2 = cv2.getContext('2d');
        let chart2 = new Chart(ctx2, {
            type: 'bar',
            data:{
                datasets: [{
                    data: data2,
                    backgroundColor: ['blue', 'red'],
                    label: 'Legalizadas vs no legalizadas'
                }],
                labels: ['Equipo', 'Personal', 'Otros', 'Movilizacion', 'Gastos', 'Descuentos']
            },
            options: {responsive: true, 
            tooltips: {
                callbacks: {
                        label: function(tooltipItem, data) {
                            var value = data.datasets[0].data[tooltipItem.index];
                            value = value.toString();
                            value = value.split(/(?=(?:...)*$)/);
                            value = value.join(',');
                            return value;
                        }
                } // end callbacks:
                },
                scales: {
                yAxes: [{
                        ticks: {
                            beginAtZero:true,
                            userCallback: function(value, index, values) {
                                // Convert the number to a string and splite the string every 3 charaters from the end
                                value = value.toString();
                                value = value.split(/(?=(?:...)*$)/);
                                value = value.join(',');
                                return value;
                            }
                        }
                    }]
                }
            }
        });

        cv2.onclick = function(evt){
            let activePoint = chart2.getElementAtEvent(evt);
            let index = activePoint[0]._index;
            let url = "http://localhost:4000/legalizacion/consignacion_grafica_legalizada"
            if(index == 0) window.location = url + '?estado=1';
            else if(index == 1) window.location = url + '?estado=0';
        };
    }