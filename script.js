// getHttpList();
// render();
// getHttpList();

String.prototype.makeName = function(){
  return (this[0].toUpperCase() + this.slice(1));
};

function work(){
    // getHttpList()
    //   .then(render(resolve))
    //   .catch( console.log(reject) );
  render(getHttpList());
}

function render(lst){
  document.getElementsByTagName('div').innerHTML = '';

  let viewer = document.createElement('div');

  viewer.setAttribute('class','viewer');

  let innerDiv = document.createElement('div');
  innerDiv .setAttribute('class','img');


  let image = document.createElement('img');
  image.setAttribute('src',lst.picture.large);
  image.setAttribute('class',100);
  // image.setAttribute('height',100);
  innerDiv.appendChild(image);

  viewer.appendChild(innerDiv);

  let infoWatch = document.createElement('div');
  infoWatch.appendChild(createUserInfo('Name',  lst.name.title.makeName() + ' '
                                              + lst.name.first.makeName() + ' '
                                              + lst.name.last.makeName()));
  infoWatch.appendChild(createUserInfo('Phone Number', lst.phone.toString()));
  infoWatch.appendChild(createUserInfo('e-mail', lst.email));
  infoWatch.appendChild(createUserInfo('Gender', lst.gender.toString().makeName()));
  viewer.appendChild(infoWatch);




  document.body.appendChild(viewer);
}

function createUserInfo(field, text){
  let webInfo = document.createElement('p');
  webInfo.setAttribute('class','info');
  webInfo.innerHTML = field + ': ' + text;
  return webInfo;
}

function getHttpList(){
  let newQuery = new XMLHttpRequest();
  newQuery.open("GET", 'https://randomuser.me/api/', false);
  newQuery.send( null );

  let response = JSON.parse(newQuery.response);
  console.log(response.results[0].gender);

  console.log(response);
  // if result.

  return response.results[0];
  // return new Promise((resolve,reject)=>{
  //   if (response.results[0].gender === 'female') { resolve(response.results[0])}
  //   reject('nothing found');
  // })

}