const tweetForm=document.querySelector("#tweetform");
const tweetslist=document.querySelector("#tweets");

tweetForm.addEventListener('submit',function(event){
    event.preventDefault();
    const username=tweetForm.elements.username.value;
    const tweet=tweetForm.elements.tweet.value;
    addTweet(username,tweet);
    tweetForm.elements.username.value="";
    tweetForm.elements.tweet.value="";
})

const addTweet=(username,tweet)=>{
    const newTweet=document.createElement('li');
    const boldtag=document.createElement('b');
    boldtag.append(username);
    newTweet.append(boldtag);
    newTweet.append(` - ${tweet}`);
    tweetslist.append(newTweet);
}

tweetslist.addEventListener('click',function(event){
    event.target.nodeName==='LI'&& event.target.remove();
})