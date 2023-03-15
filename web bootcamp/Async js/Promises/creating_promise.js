// A Promise is an object representing the eventual completion or failure of an
// asynchronous operation

const fakeResponse=(url)=>{
    return new Promise((resolve,reject)=>{
        const rand=Math.random();
        setTimeout(()=>{
            if(rand<0.5)
            {
                resolve("Your fake data Here");
            }
            reject("Request Error!");
        },1000)
    })
}

fakeResponse('/dogs/1').then((data)=>{
    console.log("Done with It");
    console.log("data is: ",data);
}).catch((err)=>{
    console.log("OH, NO",err);
})


const delayedColorChange=(color,delay)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            document.body.style.backgroundColor=color;
            resolve();
        },delay)
    });
}

delayedColorChange('red',1000)
.then(()=>delayedColorChange('green',1000))
.then(()=>delayedColorChange('blue',1000))
.then(()=>delayedColorChange('yellow',1000))
.then(()=>delayedColorChange('orange',1000))
.then(()=>delayedColorChange('purple',1000))
.then(()=>delayedColorChange('pink',1000))
.then(()=>delayedColorChange('violet',1000))
.then(()=>delayedColorChange('grey',1000))
.then(()=>delayedColorChange('cyan',1000))
.then(()=>delayedColorChange('lightgreen',1000))
