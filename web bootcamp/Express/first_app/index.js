const express= require ("express");
const app=express();

// app.use((req,res)=>{
//     console.log("we got a new request");
//     res.send("Hello we got your request");
// })

//  /cats => "meow"
//  /dogs => "boww"
//  /     => "welcome to our home page"
app.get('/cats',(req,res)=>{
    console.log("cat requests");

    res.send("Mewo");
    
})
app.get('/r/:animals',(req,res)=>{
    console.log(req.params);
    var {animals}=req.params;
    res.send(`<h1>Browsing ${animals} from Animals</h1>`);
})

app.get('/r/:animals/:id',(req,res)=>{
    var{animals,id}=req.params;
    console.log(req.params);
    res.send(`<h1>${id} is browsing ${animals} from Animals`);
})

app.get('/dogs',(req,res)=>{
    res.send("Boww");
})
app.get('/',(req,res)=>{
    res.send("Welcome to our home page");
})
//passing query string
app.get('/search',(req,res)=>{
    console.log(req.query);
    const {q}=req.query;
   // res.send("got your search key")
   if(!q)
   {
    res.send("Nothing Found If Nothing is Searched!!!");
   }
   else
    {
        res.send(`<h1>Search result for: ${q}</h1>`)
    }    
})

app.get('*',(req,res)=>{
    res.send("I don't know that path!!!");
})

app.listen(3000,()=>{
    console.log("Listeneing on Port 3000!");
})