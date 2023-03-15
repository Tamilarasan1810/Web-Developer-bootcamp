const container=document.querySelector('#container');
for(let i=1;i<906;i++)
  {
    const newImage=document.createElement('img');
newImage.src= `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i}.png`;
container.appendChild(newImage);
  }