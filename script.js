String.prototype.makeName = function(){
  return ( this[0].toUpperCase() + this.slice(1) );
};

function work(){
  let viewer = setViewer('');
  viewer.appendChild(setSpinner());
  setTimeout(call, 1000 + Math.ceil(Math.random()*1000) );
}

function call(){
  getHttpList()
    .then((resolve) => render(resolve))
    .catch( (reject) => renderError(reject));
}

function render(lst){
  const viewer = setViewer('viewer big');
  viewer.appendChild(createUserPic(lst.picture.large));
  const infoWatch = fillInfoList(lst);
  viewer.appendChild(infoWatch);
  document.body.appendChild(viewer);
}

function renderError(message) {
  const viewer = setViewer('viewer small');
  const infoWatch = fillInfoListError(message);
  viewer.appendChild(infoWatch);
  document.body.appendChild(viewer);
}

function setViewer(className){
  let viewerDiv = document.getElementById('main');
  viewerDiv.innerHTML = '';
  viewerDiv.setAttribute('class', className);
  return viewerDiv;
}

function setSpinner(){
  let spinner = document.createElement('div');
  spinner.setAttribute('class','loader');
  return spinner;
}

function fillInfoList(someData) {
  const infoList = document.createElement('div');
  infoList.setAttribute('class','plain');
  infoList.appendChild(createUserInfo('Name:', someData.name.title.makeName() + ' '
                                                + someData.name.first.makeName() + ' '
                                                + someData.name.last.makeName()));
  infoList.appendChild(createUserInfo('Phone Number:', someData.phone.toString()));
  infoList.appendChild(createUserInfo('E-mail:', someData.email));
  infoList.appendChild(createUserInfo('Gender:', someData.gender.toString().makeName()));
  infoList.appendChild(createUserInfo('City:', someData.location.city.makeName()));
  infoList.appendChild(createUserInfo('State:', someData.location.state.makeName()));
  return infoList;
}

function fillInfoListError(msg){
  const infoList = document.createElement('div');
  infoList.setAttribute('class','plain');
  infoList.appendChild(createUserInfo('Sorry,',msg));
  return infoList;
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