String.prototype.makeName = function(){
  return ( this[0].toUpperCase() + this.slice(1) );
};

function work(){
  let viewer = document.getElementById('main');
  viewer.innerHTML = '';
  viewer.setAttribute('class', '');
  let spinner = document.createElement('div');
  spinner.setAttribute('class','loader');
  viewer.appendChild(spinner);
  setTimeout(call, 1000 + Math.ceil(Math.random()*1000) );
}

function call(){
  getHttpList()
    .then((resolve) => render(resolve))
    .catch( (reject) => renderError(reject));
}

function renderError(message) {
  let viewer = document.getElementById('main');
  viewer.innerHTML = '';
  viewer.setAttribute('class', 'viewer small');

  let infoWatch = document.createElement('div');
  infoWatch.setAttribute('class','plain');
  infoWatch.appendChild(createUserInfo('Sorry,',message));
  viewer.appendChild(infoWatch);

  document.body.appendChild(viewer);
}

function render(lst){
  let viewer = document.getElementById('main');
  viewer.innerHTML = '';
  viewer.setAttribute('class','viewer big');

  viewer.appendChild(createUserPic(lst.picture.large));

  let infoWatch = document.createElement('div');
  infoWatch.setAttribute('class','plain');
  infoWatch.appendChild(createUserInfo('Name:',  lst.name.title.makeName() + ' '
                                              + lst.name.first.makeName() + ' '
                                              + lst.name.last.makeName()));
  infoWatch.appendChild(createUserInfo('Phone Number:', lst.phone.toString()));
  infoWatch.appendChild(createUserInfo('E-mail:', lst.email));
  infoWatch.appendChild(createUserInfo('Gender:', lst.gender.toString().makeName()));
  infoWatch.appendChild(createUserInfo('City:',lst.location.city.makeName()));
  infoWatch.appendChild(createUserInfo('State:',lst.location.state.makeName()));
  viewer.appendChild(infoWatch);

  document.body.appendChild(viewer);
}

function createUserInfo(field, text){
  let webInfo = document.createElement('p');
  webInfo.setAttribute('class','info');
  webInfo.innerHTML = field + ' ' + text;
  return webInfo;
}

function createUserPic(pic){
  let innerDiv = document.createElement('div');
  innerDiv .setAttribute('class','img');

  let image = document.createElement('img');
  image.setAttribute('src', pic);
  innerDiv.appendChild(image);
  return innerDiv;
}

function getHttpList(){
  let newQuery = new XMLHttpRequest();
  newQuery.open("GET", 'https://randomuser.me/api/', false);
  newQuery.send( null );

  let response = JSON.parse(newQuery.response);

  return new Promise((resolve,reject)=>{
    if ( (Math.random() < 0.5) && ( response.results[0].gender !== 'female')) {
      console.log('bad luck');
      return reject('something went wrong, try again later');
    }
    return resolve(response.results[0]);
  })
}