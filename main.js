let $boton = document.querySelector('.btn');
let colores = ['red', 'red', 'blue', 'blue', 'yellow', 'yellow', 'green', 'green', 'orange', 'orange', 'pink', 'pink'];
let $cuadros = document.querySelectorAll('.cuadros');
let cuadrosColoreados = new Object();

for (let i=0;i<12;i++){
    const randomIndex = Math.floor(Math.random() * colores.length);
    cuadrosColoreados[`cuadro-${i+1}`] = colores[randomIndex];
    colores.splice(randomIndex, 1);
}
let coloresAComparar = [];
let cuadrosAComparar = [];
desbloquearInputUsuario();
        

function bloquearInputUsuario(){
    $cuadros.forEach(function($cuadro){
        $cuadro.onclick = function(){

        }
    })
}

function desbloquearInputUsuario(){
    $cuadros.forEach(function($cuadro){ 
        $cuadro.onclick = function(e){
            let cuadroClickeado = e.target.id;
            cuadrosAComparar.push($cuadro);
            coloresAComparar.push(cuadrosColoreados[cuadroClickeado]);
            $cuadro.style.setProperty("background-color", `${cuadrosColoreados[cuadroClickeado]}`, "important");
            if(cuadrosAComparar.length == 2){
                comparadorDeCuadros();
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
        }
        else{
            cuadrosAComparar[0].style.setProperty("background-color", '#6c757d', "important");
            cuadrosAComparar[1].style.setProperty("background-color", '#6c757d', "important");
            }
        cuadrosAComparar.length = 0;
        coloresAComparar.length = 0;
        desbloquearInputUsuario();
            }, 700);
}
