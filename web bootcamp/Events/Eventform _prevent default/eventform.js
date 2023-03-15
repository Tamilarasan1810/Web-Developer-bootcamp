const tweetForm=document.querySelector("#tweetform");
const tweetslist=document.querySelector("#tweets");
tweetForm.addEventListener('submit',function(event){
    event.preventDefault();

    // const usernameinput=document.querySelector('#uname').value;
    // const usertweetinput=document.querySelector('#tweet').value;
    // console.log(usernameinput);
    const username=tweetForm.elements.username.value;
    const tweet=tweetForm.elements.tweet.value;
    addTweet(username,tweet);
    tweetForm.elements.username.value="";
    tweetForm.elements.tweet.value="";

    // console.log(username);
    // const newTweet=document.createElement('li');
    // const boldtag=document.createElement('b');
    // boldtag.append(username);
    // newTweet.append(boldtag);
    // newTweet.append(` - ${tweet}`);
    // tweetslist.append(newTweet);
    // console.log(newTweet);
})

const addTweet=(username,tweet)=>{
    const newTweet=document.createElement('li');
    const boldtag=document.createElement('b');
    boldtag.append(username);
    newTweet.append(boldtag);
    newTweet.append(` - ${tweet}`);
    tweetslist.append(newTweet);
}