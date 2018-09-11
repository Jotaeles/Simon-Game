const azul = document.getElementById('azul')
const amarillo = document.getElementById('amarillo')
const rojo = document.getElementById('rojo')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ultimo_nivel = 10;

class Juego {
    constructor() {
        this.elegirColor = this.elegirColor.bind(this);
        this.inicializar();
        this.generarSecuencia();
        this.siguienteNivel();
    }
    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.inicializar = this.inicializar.bind(this);
        this.toggleBtnEmpezar()
        this.nivel = 1;
        this.colores = {
            azul,
            amarillo,
            rojo,
            verde
        }
    }
    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide');
        }else{
            btnEmpezar.classList.add('hide');
        }
    }
    generarSecuencia(){
        this.secuencia = new Array(ultimo_nivel).fill(0).map(n => Math.floor(Math.random() * 4));
    }
    siguienteNivel(){
        this.subnivel = 0;
        this.iluminarSecuencia();
        this.agregarEventoClick();
    }
    transformarNumeroAColor(numero){
        switch (numero) {
            case 0:
                return 'azul'
            case 1:
                return 'amarillo'
            case 2:
                return 'rojo'
            case 3:
                return 'verde'
        }
    }
    transformarColorANumero(color){
        switch (color) {
            case 'azul':
                return 0
            case 'amarillo':
                return 1
            case 'rojo':
                return 2
            case 'verde':
                return 3
        }
    }
    iluminarSecuencia(){
        for(let i = 0; i < this.nivel; i++){
            const color = this.transformarNumeroAColor(this.secuencia[i]);
            setTimeout( () => this.iluminarColor(color), 1000 * i )
        }
    }
    iluminarColor(color){
        this.colores[color].classList.add('light');
        setTimeout( () => this.apagarColor(color), 350 )
    }
    apagarColor(color){
        this.colores[color].classList.remove('light');
    }
    agregarEventoClick(){
        this.colores.azul.addEventListener('click', this.elegirColor);
        this.colores.verde.addEventListener('click', this.elegirColor);
        this.colores.amarillo.addEventListener('click', this.elegirColor);
        this.colores.rojo.addEventListener('click', this.elegirColor);
    }
    eliminarEventoClick(){
        this.colores.azul.removeEventListener('click', this.elegirColor);
        this.colores.verde.removeEventListener('click', this.elegirColor);
        this.colores.amarillo.removeEventListener('click', this.elegirColor);
        this.colores.rojo.removeEventListener('click', this.elegirColor);
    }
    elegirColor(e){
        const nombreColor = e.target.dataset.color;
        const numeroColor = this.transformarColorANumero(nombreColor);
        this.iluminarColor(nombreColor);
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++;
            if(this.subnivel === this.nivel){
                this.nivel++;
                this.eliminarEventoClick();
                if(this.nivel ===(ultimo_nivel + 1)){
                    this.ganoElJuego();
                }else{
                    setTimeout( this.siguienteNivel, 1500 );
                }
            }
        }else{
            this.perdioElJuego();
        }
    }
    ganoElJuego(){
        swal('Felicidades!', 'Lograste superar todos los niveles', 'success')
            .then(()=>{
                this.inicializar();
            });
    }
    perdioElJuego(){
        swal('Game Over', 'Vuelve a intentarlo', 'error')
            .then(()=>{
                this.eliminarEventoClick();
                this.inicializar();
            });
    }
}
function empezarJuego() {
    const juego = new Juego();
}