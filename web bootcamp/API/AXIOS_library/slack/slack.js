async function  testapi() 
{
   const res= await axios.get("https://hooks.slack.com/services/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")
   console.log(res);
}
testapi();
