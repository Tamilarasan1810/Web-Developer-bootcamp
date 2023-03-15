console.log("Hello");
const btn3=document.querySelector('#btn3');
btn3.onmouseenter=function()
{
  
    alert("AHHH\nStop hovering over me");
}
function scream(){
    alert("STOP touching me");
}
const btn4=document.querySelector('#btn4');
btn4.addEventListener('dblclick',scream);

const btn5=document.querySelector('#btn5');
btn5.addEventListener('click',function(){
   const randcolor=getrandomcolor();
    document.body.style.backgroundColor=randcolor;
    document.getElementById("coldetails").innerText=randcolor;
})

const getrandomcolor=()=>{ 
    const r=Math.floor(Math.random()*255);
    const g=Math.floor(Math.random()*255);
    const b=Math.floor(Math.random()*255);
    return `rgb(${r},${g},${b})`;
}