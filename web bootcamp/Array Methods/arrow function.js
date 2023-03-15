// const add=(x,y)=>{
//     return x+y;
// }
// console.log(add(5,3));



// const rolldie=()=>(
//     Math.floor(Math.random()*6)+1
//     )
// console.log("your Die number is : ",rolldie());



const movies=[{name:"iron man",score:97},{name:"dead pool",score:98},{name:"The Hulk",score:88}];

const newMovies= movies.map(function(movie){
    return `${movie.name} - ${movie.score /10}`;
})

console.log(newMovies)