const body = document.querySelector("body");

const IMG_NUMBER = 3;

function paintImage(imgNumber){
    const img = new Image();
    img.src = `./images/background_${imgNumber< 10 ? `0${imgNumber+1}` : imgNumber+1}.jpg`;
    img.classList.add("bgImage");
    body.prepend(img);
    //API를 이용해서 로딩할 때 사용 됨.
    //img.addEventListener('loadend',hadleImgLoad);

}
function genRandom(){
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber);
    
    
}

init();