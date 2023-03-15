let choice=prompt("What would you like to do?");
const todoList=[];
let x;
function printList()
{
    console.log("**********************");
        for(let i=0;i<todoList.length;i++)
        {
            console.log(`${i+1}: ${todoList[i]}\n`);
        }
        console.log("**********************");
}
while(choice!=='quit')
{
    if(choice==='add')
    {
      x=prompt("Enter the work to do!")
      todoList.push(x);   
    }
    else if(choice==="list")
    {
        printList();
    }
    else if(choice==="delete")
    {
        printList();
        x=parseInt(prompt("Enter the work index to delete"));
        if(!Number.isNaN(x))
        {
            let del=todoList.splice(x-1,1);
        console.log(`Ok, deleted ${del} `);
        }
        else{
            console.log("Unknown Index")
        }
        
    }
 
    if(choice==='quit')
    {
        break;
    }
    choice=prompt("What would you like to do?")
}
console.log("Ok, You Quit the App !");