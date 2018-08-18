// getHttpList();
// render();
getHttpList();

function render(){
    let viewer = document.createElement('div');
    viewer.setAttribute('class','viewer');
    document.body.appendChild(viewer);
    
}

function getHttpList(){
  let newQuery = new XMLHttpRequest();
  newQuery.open("GET", 'https://randomuser.me/api/', false);
  newQuery.send( null );

  let response = JSON.parse(newQuery.response);
  console.log(response.results[0].gender);

  console.log(response);
  // if result.

  return new Promise((resolve,reject)=>{
    if (response.results[0].gender === 'female') { resolve(response.results[0])}
    else {reject('nothing found');}
  })

}