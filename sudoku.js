const $txtN_0_0 = $('#txtN_0_0');
var myTable = document.getElementById('myTable');

const $btnResolver = $('#btnResolver');  // Objeto jQuery que representa al elemento input button 

// Handling del evento click del button.
$btnResolver.on('click', function(e) {
    e.preventDefault();
    const tableroSudoku = obtenerTableroSudoku();
    console.log("Tablero ingresado");
    console.log(tableroSudoku);
    //console.log(JSON.stringify(tableroSudoku))
    // TODO: Enviar el tablero mediante llamada AJAX, esperar la respuesta -> mostrar la respuesta.
    $.ajax({
        type: 'GET',
        url: 'resolviendo.php',
        data: {json: JSON.stringify(tableroSudoku)},
        dataType: 'json'
    })
    .done (function (sudoku) {
        console.log("---------------------------------------");
        console.log('Resultado final.');
        console.log(sudoku);
        ingresar(sudoku);
    })
    .fail( function (sudoku) {
        console.log("---------------------------------------");
        console.log('No se pudo obtener un resultado.');
        console.log(sudoku);
    });
});


function ingresar(data){
        for(let x=0;x<9;x++){
            for(let y=0;y<9;y++){
                let celdas = document.getElementById('tabla1').rows[x].cells;
                celdas[y].innerHTML = data[x][y];
            }
        }
}



function obtenerTableroSudoku() {
    const tableroSudoku = [];
    for (let r = 0; r < 9; r++) {
        const row = [];
        for (let c = 0; c < 9; c++) {
            row.push(valorMatrix(r, c));
        }
        tableroSudoku.push(row);
    }
    return tableroSudoku;
}

function numeroONull(s) {
    const v = parseInt(s);
    return isNaN(v) ? null : v;
}

function valorMatrix(r, c) {
    return numeroONull($(`#txtN_${r}_${c}`).val());
}