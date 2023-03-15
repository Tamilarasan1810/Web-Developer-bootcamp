// creates an array with all elements that passes a test implemented by the provider function  

const number=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
const evennumber=number.filter(n=>{
    if(n%2===0)
    {
        return n;
    }
})
console.log(evennumber);