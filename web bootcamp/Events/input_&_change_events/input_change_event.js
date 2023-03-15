const input=document.querySelector("#input");
const para=document.querySelector("#data");
// input.addEventListener('change',function(e){
//     console.log("input changed!!!");
// })\

input.addEventListener('input',function(event){
    para.innerText=input.value;
})