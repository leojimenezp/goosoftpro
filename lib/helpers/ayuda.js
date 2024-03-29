
    let cv = document.getElementById('myChart'),
    ctx = cv.getContext('2d'),
    chart;
$("#planeacionSelect").change(function(){   
    $.ajax({
        url: "http://localhost:4000/repor/busqueda",
        method: "POST",
        data: { id_planeacion: $("#planeacionSelect").val() },
        dataType: "json"
    })
        .done(function(msg){
            let data = [0, 0, 0, 0], data1 = [0, 0, 0, 0] , data2 = [0, 0, 0, 0];  
            console.log(msg)


            
            msg.costo_cotizaciontbr.forEach(element => {
                if(element.tipo == '1') data[0] = element.total;
                if(element.tipo == '2') data[2] = element.total;
                if(element.tipo == '3') data[1] = element.total;
                if(element.tipo == '4') data[3] = element.total;
            });
            Grafica1(data);

             msg.costo_cotizaciontbrc.forEach(element => {
                if(element.tipo == '1') data1[0] = element.total;
                if(element.tipo == '2') data1[2] = element.total;
                if(element.tipo == '3') data1[1] = element.total;
                if(element.tipo == '4') data1[3] = element.total;
            });
            
             Grafica2(data1);
        });
});

/***Grafica1*************************************/
function Grafica1(data){
    chart = new Chart(ctx, {
        type: 'bar',
        data:{
            datasets: [{
                data: data,
                backgroundColor: ['blue', 'yellow','red'],
                label: 'Cantidad consignacion por estado'
            }],
            labels: ['Equipo', 'Personal' , 'Movilizacion' ,  'Otros']
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
            labels: ['Equipo', 'Personal' , 'Movilizacion' ,  'Otros']
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