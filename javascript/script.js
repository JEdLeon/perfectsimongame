var buttons = $('button');
var sequence = [];
var gameStarted = false;
var sequenceIndex = 0;
var headerText = $('h1').text();
var wrong = false;

for (let button of buttons){
    button.addEventListener('click', function (){
        compareTo(button);
        if (!wrong) {
            var audio = button.querySelector('audio');
        }
        else{
            var audio = document.querySelector('#footer audio');
            wrong = false;
        }
        audio.play();
        button.classList.add(button.id + '-clicked');
        setTimeout( function(){
            button.classList.remove(button.classList[1] + '-clicked');
        }, 250);
    });
}

document.addEventListener('keydown', function(){
    if (!gameStarted && sequence.length == 0){
        sequenceIndex = 0;
        gameStarted = true;
        randomSequence();
    }
});

function randomSequence() {
    let nextRandom = Math.floor(Math.random()*4);
    sequence.push(buttons[nextRandom].id);
    $('h1').text('Level ' + sequence.length + ' Begins!');
    setTimeout(step,500);
}

function step(){

    if (gameStarted && sequence.length != 0) {
        if (sequenceIndex < (sequence.length)){
            $("button." + sequence[sequenceIndex]).click();
            sequenceIndex ++;
            setTimeout(step, 750);
        }
        else{
            sequenceIndex = 0;
            gameStarted = false;
            $('h1').text('Level ' + sequence.length + ' Your Turn!');
        }
    }
}

function compareTo(button){

    if (!gameStarted && sequence.length != 0){
        if (button.id === sequence[sequenceIndex]){
            sequenceIndex ++;
            if (!(sequenceIndex < (sequence.length))){
                sequenceIndex = 0;
                gameStarted = true;
                setTimeout(randomSequence, 500);
            }
        }
        else {
            wrong = true;
            $('h1').text('What A Looser!!!🤣');
            sequence = [];
            setTimeout(function(){
                $('h1').text(headerText);
            },1500);
        }
    }
}