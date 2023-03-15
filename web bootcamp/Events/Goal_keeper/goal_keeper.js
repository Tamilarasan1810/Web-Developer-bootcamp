const p1Button=document.querySelector('#p1Button');
const p2Button=document.querySelector("#p2Button");
const p1Display=document.querySelector("#p1Display");
const p2Display=document.querySelector("#p2Display");
const reset=document.querySelector("#reset");
const setWinningscore=document.querySelector('#setscore');

let p1score=0;
let p2score=0;
let winningscore=parseInt(setWinningscore.value);
let isGameOver=false;


setWinningscore.addEventListener('change',function(event){
    winningscore=parseInt(this.value);
    resetall();
})
p1Button.addEventListener('click',function(event){
   if(!isGameOver)
   {
    p1score+=1;
        if(p1score==winningscore)
        {
            isGameOver=true;
            p1Display.classList.add('winner');
            p2Display.classList.add('looser');
            p1Button.disabled=true;
    p2Button.disabled=true;
        }
    p1Display.innerText=p1score;
   }
   
})
p2Button.addEventListener('click',function(event)
{
    if(!isGameOver)
    {
        p2score+=1;
        if(p2score==winningscore)
        {
            isGameOver=true;
            p2Display.classList.add('winner');
            p1Display.classList.add('looser');
            p1Button.disabled=true;
    p2Button.disabled=true;
        }
        p2Display.innerText=p2score;
    }
   
})

reset.addEventListener('click',resetall)


function resetall(){
    isGameOver=false;
    p1score=0;
    p2score=0;
    p1Display.innerText=p1score;
    p2Display.innerText=p2score;
    p2Display.classList.remove('winner','looser');
    p1Display.classList.remove('winner','looser');
    p1Button.disabled=false;
    p2Button.disabled=false;
}