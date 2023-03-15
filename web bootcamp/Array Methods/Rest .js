// looks like spread but it's not
// REST collects all the arguments into an actual array
var nums=[2,4,5,23,345,5334,2,34,534,5,564,5645,3,6,7,867];
function sum(...array)
{
    return array.reduce((total,element)=>total+element);
}
var x=sum(...nums);
console.log(x);

function raceResult(first,second,...everyoneelse)
{
    console.log("Gold medal goes to ", first);
    console.log("Silver medal goes to ",second);
    console.log("every others ",everyoneelse);
}
raceResult('Tommy','Tamil','arasan','selvan','sam');
