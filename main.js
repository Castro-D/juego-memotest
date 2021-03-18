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

$cuadros.forEach(function($cuadro){
    $cuadro.classList.add('cuadro-gris');
})

$boton.onclick = function(){
    empezarCronometro();
    document.querySelector('#boton-inicio').classList.add('d-none');
    for (let i=0;i<$cuadros.length;i++){
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
            if (!$cuadro.classList.contains('cuadro-blanco')){
                let cuadroClickeado = e.target.id;
                bloquearCuadroClickeado($cuadro);
                cuadrosAComparar.push($cuadro);
                coloresAComparar.push(cuadrosColoreados[cuadroClickeado]);
                $cuadro.classList.remove('cuadro-gris');
                $cuadro.style.backgroundColor = cuadrosColoreados[cuadroClickeado];
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
            cuadrosAComparar[0].classList.add('cuadro-blanco');
            cuadrosAComparar[1].classList.add('cuadro-blanco');
            cuadrosGanados.push(cuadrosAComparar[0], cuadrosAComparar[1]);
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
