const person={
    firstname:'Tamil',
    lastname:'Arasan..',
    fullname:function()
    {
        console.log (`${this.firstname} ${this.lastname}`);
    },
    shortname:function()
    {
        setTimeout(()=>{
            console.log(this.fullname)
        },3000) 
    }
}

// to return full name using arrow function
person.fullname();
person.shortname();
