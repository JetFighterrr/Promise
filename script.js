getHttpList();


function render(){
    let viewer = document.createElement('div');
    viewer.setAttribute('class','viewer');
}

function getHttpList(){
  let newQuery = new XMLHttpRequest();
  newQuery.open("GET", 'https://randomuser.me/api/', false);
  newQuery.send( null );

  let result = JSON.parse(newQuery.response);
  // let resultNum = Math.floor(Math.random()*10);

  console.log(result);
  render();
}