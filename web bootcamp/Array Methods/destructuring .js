//it is a nice way of extracting or unpacking our values from arrays or from objects
// put them into distinct variables

const raceResult=['Charles','Robin','jimmy','elixer'];
const first=raceResult[0];
const second=raceResult[1];
console.log(first);
console.log(second);
// we can do by this ^^^ or by using desturcturing
console.log("After desturcturing from array");
const [gold,silver,...bronze]=raceResult;
console.log(gold);
console.log(silver);
console.log(...bronze);

// desturcturing for object

const user={
    email:'steve@gmail.com',
    username:'steve',
    password:'StEvEhArVeY',
    born:'1987',
  //  died:'2020'
}

const username=user.username;
console.log(username," by using normal method");

console.log("By using destructuring for objects\n");
const {email,username:name,password,born:birthyear,died:deadyear="still alive"}=user;
console.log(email,"\n",name,"\n",password,"\n",birthyear,"\n",deadyear);

// desturcturing in params
console.log("\n\ndesturcturing in params");
names(user);
function names({email,username})
{
    console.log(`${username}\n${email}`);
}
