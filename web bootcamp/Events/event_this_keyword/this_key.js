const getrandomcolor=()=>
{
    const r=Math.floor(Math.random()*255);
    const g=Math.floor(Math.random()*255);
    const b=Math.floor(Math.random()*255);
    return `rgb(${r},${g},${b})`;
}

const allbuttons=document.querySelectorAll('button');

for(let button of allbuttons)
{
    button.addEventListener('click',colorize)
}

function colorize()
{
    this.style.backgroundColor=getrandomcolor();
    this.style.color=getrandomcolor();
}