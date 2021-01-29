class Jugador {
    constructor(ficha, nombre){
        this.ficha = ficha;
        this.nombre = nombre;
    }
    getficha(){
        return this.ficha;
    }
    getNombre(){
        return this.nombre;
    }
}

//variable que almacena las celdas del juego
let celdas = $('.celda');
var ganador = 0;
var marcadorJugador = 0;
var marcadorPc = 0;


let empate = () =>{
    let contador = 0;
    for (const i of celdas) {
        if ($(i.children).text() == 'X' || $(i.children).text() == '0') {
            contador++;
        }
    }
    console.log(contador);
    if (contador == 9) {
        return true;
    }else{
        return false;
    }
}

//funcion para pintar tablero
let turno = (jugadores)=>{
    for (const iterator of celdas) {
        $(iterator).on('click', (e)=>{
            if ($(iterator.children).text() == '') {
                $(iterator.children).text(jugadores[0].getficha());
                $('#cartelTurno').text('Turno: ' + jugadores[1].getficha() + ' Pc...');
                if (win(celdas)) {
                    marcadorJugador++;
                    $('.dialogoWin').html('<h1> Felicidades!!! </h1>');
                    $('a[name=modal]').click();
                    

                }else if (empate()){
                    $('.dialogoWin').html('<h1> Empate </h1>');
                    $('a[name=modal]').click();
                    
                }else{
                setTimeout(()=> {movimientoCPU(celdas,jugadores);
                    if (win(celdas)) {
                        marcadorPc++;
                        $('.dialogoWin').html('<h1> Buen intento... </h1>');
                        $('a[name=modal]').click();
                        
                    }
                    if (empate()){
                        $('.dialogoWin').html('<h1> Empate </h1>');
                        $('a[name=modal]').click();
                    }
                    }, 0);
                }
                $('#cartelTurno').text('Turno: ' + jugadores[1].getficha() + ' Pc...');
                
            }
            
            
        })
    }
}

let win = (celdas)=>{
    // Las líneas horizontales
    if (($(celdas[0].children).text() == $(celdas[1].children).text() && $(celdas[1].children).text() == $(celdas[2].children).text()) && ($(celdas[0].children).text() != '' && $(celdas[1].children).text() != '' && $(celdas[2].children).text() != '') ) {return true}
    if (($(celdas[3].children).text() == $(celdas[4].children).text() && $(celdas[4].children).text() == $(celdas[5].children).text()) && ($(celdas[3].children).text() != '' && $(celdas[4].children).text() != '' && $(celdas[5].children).text() != '') ) {return true}
    if (($(celdas[6].children).text() == $(celdas[7].children).text() && $(celdas[7].children).text() == $(celdas[8].children).text()) && ($(celdas[6].children).text() != '' && $(celdas[7].children).text() != '' && $(celdas[8].children).text() != '') ) {return true}

    // Las líneas verticales
    if (($(celdas[0].children).text() == $(celdas[3].children).text() && $(celdas[3].children).text() == $(celdas[6].children).text()) && ($(celdas[0].children).text() != '' && $(celdas[3].children).text() != '' && $(celdas[6].children).text() != '') ) {return true}
    if (($(celdas[1].children).text() == $(celdas[4].children).text() && $(celdas[4].children).text() == $(celdas[7].children).text()) && ($(celdas[1].children).text() != '' && $(celdas[4].children).text() != '' && $(celdas[7].children).text() != '') ) {return true}
    if (($(celdas[2].children).text() == $(celdas[5].children).text() && $(celdas[5].children).text() == $(celdas[8].children).text()) && ($(celdas[2].children).text() != '' && $(celdas[5].children).text() != '' && $(celdas[8].children).text() != '') ) {return true}

    // Las diagonales
    if (($(celdas[0].children).text() == $(celdas[4].children).text() && $(celdas[4].children).text() == $(celdas[8].children).text()) && ($(celdas[0].children).text() != '' && $(celdas[4].children).text() != '' && $(celdas[8].children).text() != '') ) {return true}
    if (($(celdas[2].children).text() == $(celdas[4].children).text() && $(celdas[4].children).text() == $(celdas[6].children).text()) && ($(celdas[2].children).text() != '' && $(celdas[4].children).text() != '' && $(celdas[6].children).text() != '') ) {return true}

    // no hay condicion win
    return false;
}

//funcion que llena casilla a la cpu
let movimientoCPU = (celdas,jugador)=>{
    $('#cartelTurno').text('Turno: ' + jugador[0].getficha()  + ' Humano');
    sleep(500);
    let posicion = numeroRandom();
    if (empate()){
        main();
    }
    if ($(celdas[posicion].children).text() == '') {
        $(celdas[posicion].children).text(jugador[1].getficha());
    }else{
        movimientoCPU(celdas,jugador);
    }
}

//ciclo principal del juego
let main = ()=>{
    for (const iterator of celdas) {
        $(iterator.children).text('');
    }
    $('#marcadorJug').text(marcadorJugador);
    $('#marcadorPc').text(marcadorPc);
    let jugador = new Jugador('X','Humano');
    let maquina = new Jugador('0', 'Maquina');
    let jugadores = [jugador,maquina];
    $('#cartelTurno').html('Turno: ' + jugador.getficha()  + ' Humano')

    return jugadores;
}

let numeroRandom = ()=>{
    return Math.round(Math.random() * (8 - 0) + 0);
}


turno(main());

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    }
}

$('#volver').on('click', ()=>{
    main();
})


$(document).ready(function() {  

    //select all the a tag with name equal to modal
    $('a[name=modal]').click(function(e) {
            //Cancel the link behavior
            e.preventDefault();
            //Get the A tag
            var id = $(this).attr('href');
            
    
            //Get the window height and width
            var winH = $(window).height();
            var winW = $(window).width();
          
            //Set the popup window to center
            $(id).css('top',  winH/2-$(id).height()/2);
            $(id).css('left', winW/2-$(id).width()/2);
    
            //transition effect
            $(id).fadeIn(2000); 
    
    });
    
    //if close button is clicked
    $('.window .close').click(function (e) {
            //Cancel the link behavior
            e.preventDefault();
            
    });             
          
    
});

$('#yes').on('click', ()=>{
    $('#mask, .window').hide();
    main();
})

$('#no').on('click', ()=>{
    $('#mask, .window').hide();
    marcadorJugador = 0;
    marcadorPc = 0;
    main();
})

$('a').on('click', (e)=>{
    e.preventDefault();
})