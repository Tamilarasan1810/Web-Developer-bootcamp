//SPREAD
// spread syntax allows an iterable such as an array to be expanded in place where zero or more 
// arguements (for function calls) or elements(for array literals) are expected,or an object expression to
// expanded in places where zero or more key-value pairs (for object literalss) are expected.

// to call a function with multiple parameters we need to pass the parms seperately
//eg
var x;
x=Math.max(2,4,5,23,345,5334,2,34,534,5,564,5645,3,6,7,867);
console.log("Max is: ",x);
x=Math.min(2,4,5,23,345,5334,2,34,534,5,564,5645,3,6,7,867);
console.log("Min is: ",x);
// to pass all this value in a single param use array and use spread operator to call it
// eg 
var values=[2,4,5,23,345,5334,2,34,534,5,564,5645,3,6,7,867];
x=Math.max(...values);
console.log("Max using SPREAD : ",x);
// basically ... will change each value as a parameter to the function
console.log(...values);

// using spread in arrays

var cats=["blue","Scout","Rocket"];
var dogs=["Rusty","Jacky"];
var pets=[...cats,...dogs];
console.log(pets);

// using spread in objects

const feline={legs:4,family:'Felidae'};
const canine={legs:2,family:'Cananae'};
const catdog={...feline,...canine};
console.log(catdog);