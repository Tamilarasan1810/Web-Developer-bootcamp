// SOME: it is similar to every but return true if ANY of the array element passes the test function 

const words=["Dog","Cat","Cow","Mouse"];

let y=words.some(word=>{
    return word.length>4;
})
console.log(y);



//EVERY: tests whether all the elements in the array pass the test provided function. It return boolean values

const letters=["dig","dug","dump","duck","funny"]
let x=letters.every(letter=> letter[0]==='d')
console.log(x);

//REDUCE:  executes a reducer function on each element of the array, resulting in a single value

const prices=[12.34,43.67,23,67.34,76.3]
let total=prices.reduce((total,price)=>{
    return total+price;
})
console.log(`total price: ${total}`);