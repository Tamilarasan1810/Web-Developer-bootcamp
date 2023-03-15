// default params is used to pass default parameters when we want to set parameters as default

function rolldie(numSides=6)
{
    console.log( Math.floor(Math.random()  *numSides)+1);
}
// passing parameters
rolldie(29);
//not passing parameters and it takes default parameter
rolldie();