document.querySelector(".control-buttons span").onclick = function(){
    let yourName = prompt("what's your name?");
    if(yourName == null || yourName ==""){
document.querySelector(".name span").innerHTML = 'unknown';

    }else{
        document.querySelector(".name span").innerHTML = yourName;
    }
    document.querySelector(".control-buttons").remove();
};
let duration = 1000;
let blockcontainer = document.querySelector(".memory-game-block");
let block = Array.from(blockcontainer.children);
let orderRange =[...Array(block.length).keys()];
  
shuffle(orderRange);

block.forEach((blockk , index) => {
    blockk.style.order = orderRange[index];

    blockk.addEventListener('click',function (){
     flipBlock(blockk);
    });
});


function flipBlock(selectedBlock){

    selectedBlock.classList.add('is-flipped');
    let allFlippedBlock = block.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));
    if(allFlippedBlock.length === 2){
        stopClicking();
        checkMatchedBlock(allFlippedBlock[0],allFlippedBlock[1]);

    }
}
function stopClicking(){
    blockcontainer.classList.add('no-clicking');
    setTimeout(() => {
        blockcontainer.classList.remove('no-clicking');
    }, duration);
};

function checkMatchedBlock(firstBlock , secBlock){
    let triesElement = document.querySelector('.tries span');
    if(firstBlock.dataset.club ===secBlock.dataset.club){
        firstBlock.classList.remove('is-flipped');
        secBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secBlock.classList.add('has-match');
        document.getElementById('success').play();
    }
    else{
        triesElement.innerHTML = parseInt(triesElement.innerHTML) +1;
        
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secBlock.classList.remove('is-flipped');
        }, duration);

    }document.getElementById('fail').play();
}

function shuffle(array){
    let current =array.length,
    temp,
    random;
while (current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
}
 return array;
}
