const form=document.querySelector("#searchForm");
form.addEventListener('submit',async function(event){
    event.preventDefault();
    const searchTerm=form.elements.query.value;
    const config={params:{q:searchTerm}}
    const res=await axios.get(`https://api.tvmaze.com/search/shows`,config);
    const imgurl=res.data;
    showimages(imgurl);
    form.elements.query.value="";
})

const showimages=(shows)=>{
    for(let result of shows)
    {   if(result.show.image)
        {
            const newimag=document.createElement('img');
        newimag.src=result.show.image.medium;;
        document.body.append(newimag);
        }
    }
}