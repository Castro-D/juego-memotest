let $boton = document.querySelector('#boton-inicio');
let colores = ['red', 'red', 'blue', 'blue', 'yellow', 'yellow', 'green', 'green', 'orange', 'orange', 'pink', 'pink'];
let $cuadros = document.querySelectorAll('.cuadros');
let cuadrosColoreados = new Object();
let coloresAComparar = [];
let cuadrosAComparar = [];
let tiempoCronometro = null;
let cuadrosGanados = [];
let valorDeCronometro = 0;
const $filas = document.querySelectorAll('.filas');

$boton.onclick = function(){
    empezarCronometro();
    document.querySelector('#boton-inicio').style.display = 'none';
    for (let i=0;i<12;i++){
        const randomIndex = Math.floor(Math.random() * colores.length);
        cuadrosColoreados[`cuadro-${i+1}`] = colores[randomIndex];
        colores.splice(randomIndex, 1);
    }
    desbloquearInputUsuario();     
}

function bloquearInputUsuario(){
    $cuadros.forEach(function($cuadro){
        $cuadro.onclick = function(){
        }
    })
}

function desbloquearInputUsuario(){
    $cuadros.forEach(function($cuadro){ 
        $cuadro.onclick = function(e){
            const WHITE_BACKGROUND = 'rgb(255, 255, 255)';
            if (window.getComputedStyle($cuadro)['background-color'] != WHITE_BACKGROUND){
                let cuadroClickeado = e.target.id;
                bloquearCuadroClickeado($cuadro);
                cuadrosAComparar.push($cuadro);
                coloresAComparar.push(cuadrosColoreados[cuadroClickeado]);
                $cuadro.style.setProperty("background-color", `${cuadrosColoreados[cuadroClickeado]}`, "important");
                if(cuadrosAComparar.length == 2){
                    comparadorDeCuadros();
                }
            }
        }
    })
}

function comparadorDeCuadros(){
    bloquearInputUsuario(); 
    setTimeout(function(){
        if(coloresAComparar[0] === coloresAComparar[1]){
            cuadrosAComparar[0].style.setProperty("background-color", 'white', "important");
            cuadrosAComparar[1].style.setProperty("background-color", 'white', "important");
            cuadrosGanados.push(cuadrosAComparar[0]);
            cuadrosGanados.push(cuadrosAComparar[1]);
            if (cuadrosGanados.length == 12){
                pararCronometro();
                ocultarCuadros();
                mostrarMensajeDeVictoria();
                mostrarBotonReinicio();
                return;
            } 
        }
        else{
            cuadrosAComparar[0].style.setProperty("background-color", '#6c757d', "important");
            cuadrosAComparar[1].style.setProperty("background-color", '#6c757d', "important");
            }
        cuadrosAComparar.length = 0;
        coloresAComparar.length = 0;
        desbloquearInputUsuario();
            }, 500);
}

function bloquearCuadroClickeado($cuadro){
    $cuadro.onclick = function (){

    }
}

function empezarCronometro(){
    tiempoCronometro = setInterval(cambiarValorDeCronometro, 1000);
}

function cambiarValorDeCronometro(){
    document.querySelector('span').innerHTML = `${++valorDeCronometro} segundos`;
}

function pararCronometro(){
    clearInterval(tiempoCronometro);
}

function retornarTiempoCronometro(){ 
    return valorDeCronometro;
}

function ocultarCuadros(){
    $filas.forEach(function($fila){
        $fila.style.display = 'none';
    })
}

function mostrarMensajeDeVictoria(){
    document.querySelector('.mensaje').classList.remove("d-none");
}

function mostrarBotonReinicio(){
    document.querySelector('#boton-reinicio').classList.remove('d-none');
}
