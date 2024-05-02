const html = document.getElementsByTagName('html')[0];
const btnFocus = document.getElementsByClassName('app__card-button--foco')[0];
const btnCurto = document.getElementsByClassName('app__card-button--curto')[0];
const btnLongo = document.getElementsByClassName('app__card-button--longo')[0];
const todosBtn = document.querySelectorAll('.app__card-button');
const btnIniciar = document.getElementById('start-pause');
const btnAlteraAcao = document.querySelectorAll('#start-pause span');
const banner = document.getElementsByClassName('app__image')[0];
const titulo = document.getElementsByClassName('app__title')[0];
const musicaFoco = document.getElementById('alternar-musica')
const musica = new Audio('sons/luna-rise-part-one.mp3');
const play = new Audio('sons/play.wav');
const pause = new Audio('sons/pause.mp3');
const endTempo = new Audio('sons/beep.mp3');
const iconeAudio = document.getElementsByClassName('app__card-primary-butto-icon')[0];
const tempoTela = document.getElementById('timer');
let tempoDecorrido = 1500;
let posicaoTempo = null;

musica.loop = true;
musicaFoco.addEventListener('change', () =>{
    if(musica.paused){
        musica.play();
    }else{
        musica.pause();
    }
})


btnFocus.addEventListener('click', () => {
    tempoDecorrido = 1500;
    alterandoContexto('foco');
});

btnCurto.addEventListener('click', () => {
    tempoDecorrido = 300;
    alterandoContexto('descanso-curto');
});

btnLongo.addEventListener('click', () => {
    tempoDecorrido = 900;
    alterandoContexto('descanso-longo')
});

function alterandoContexto(contexto){
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    todosBtn.forEach((btn) => btn.classList.remove('active'));
    if(contexto === 'foco'){
        titulo.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`;
        btnFocus.classList.add('active');
        mostrarTempo();
    }else if(contexto === 'descanso-curto'){
        titulo.innerHTML = `Que tal dar uma respirada?<br>
        <strong class="app__title-strong"> Faça uma pausa curta!</strong>`;
        btnCurto.classList.add('active');
        mostrarTempo();
    }else if(contexto === 'descanso-longo'){
        titulo.innerHTML = `Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
        btnLongo.classList.add('active');
        mostrarTempo();
    }else{
        console.log('Error!!');
    }

    
}
btnIniciar.addEventListener('click', iniciarOuPausar);

function contagemRegressiva(){
    if(tempoDecorrido <= 0){
        endTempo.play();
        alert('Tempo finalizado!')
        tempoFinal();
        iconeAudio.setAttribute('src', '/imagens/play_arrow.png');  
        btnAlteraAcao[0].textContent = 'Começar';
        endTempo.pause();
        return;
    }
    tempoDecorrido -= 1;
    mostrarTempo();
}

function iniciarOuPausar(){
    if(posicaoTempo){
        btnAlteraAcao[0].textContent = 'Começar';
        iconeAudio.setAttribute('src', '/imagens/play_arrow.png');
        pause.play();
        tempoFinal();
        return;
    }
    btnAlteraAcao[0].textContent = 'Pausar';
    iconeAudio.setAttribute('src', '/imagens/pause.png');
    play.play();
    posicaoTempo = setInterval(contagemRegressiva, 1000);
}

function tempoFinal(){
   clearInterval(posicaoTempo);
   posicaoTempo = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoTela.innerHTML = `${tempoFormatado}`

}

mostrarTempo();

