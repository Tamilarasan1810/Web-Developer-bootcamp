// fetch("https://swapi.dev/api/people/1/")
// .then(res=>{
//     console.log("Resolved!",res);
//     return res.json()
// })
// .then(data=>{console.log("Json done", data)
//     return fetch("https://swapi.dev/api/people/2/");
// })
// .then((data)=>{
//     console.log("Json done", data);
// })
// .catch(err=>{
//     console.log("Error occured");
//     console.log(err);
// })

const list=document.querySelector("#starwars")
const Heros=[];
const fetchStarWarsPeople=async()=>{
    for(let i=1;i<84;i++)
    {
    const res=await fetch(`https://swapi.dev/api/people/${i}/`);
    const data=await res.json();
   
    print(data.name);
    //console.log(Heros);
    console.log(data.name);
    }
}

function print(hero)
{
    //console.log(hero)
 const newli=document.createElement('li');
    newli.append(hero);
     list.append(newli);
    //list.innerText=hero;
}

fetchStarWarsPeople();