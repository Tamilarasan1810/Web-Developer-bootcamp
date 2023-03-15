// axios.get("https://swapi.dev/api/people/1/");

// const getstarwarsperson=async()=>
// {
//     const res=await axios.get("https://swapi.dev/api/people/1/");
//     console.log(res.data);
// }
// getstarwarsperson();


const getdadjoke=async()=>{
    const config={headers:{Accept:'application/json'}};
    const res=await axios.get('https://icanhazdadjoke.com/',config);
    console.log(res.data.joke);
    appendjokes( res.data.joke);
}
const jokelist=document.querySelector('#jokes');
function appendjokes(joke)
{
    const newjoke=document.createElement("li");
    newjoke.append(joke);
    jokelist.append(newjoke);
}

const getnewjoke=document.querySelector("#getjoke");
getnewjoke.addEventListener('click',getdadjoke);

// getdadjoke();