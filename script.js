
String.prototype.makeName = function(){
  return ( this[0].toUpperCase() + this.slice(1) );
};

function work(){
  let viewer = setViewer('');
  viewer.appendChild(setSpinner());
  setTimeout(call(), 1000 + Math.ceil(Math.random()*1000) );
}

function call(){

  axios.get(`https://randomuser.me/api/`)
    .then(resolve => {
      const reply = resolve.data.results[0];
      render(reply);
    })
    .catch(reject => {
      console.log(reject);
      renderError(reject)
    });
}

function render(userData){
  const viewer = setViewer('viewer big');
  viewer.appendChild(createUserPic(userData.picture.large));
  const infoWatch = fillInfoList(userData);
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
  const viewerDiv = document.getElementById('main');
  viewerDiv.innerHTML = '';
  viewerDiv.setAttribute('class', className);
  return viewerDiv;
}

function setSpinner(){
  const spinner = document.createElement('div');
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
  const userInfo = document.createElement('p');
  userInfo.setAttribute('class','info');
  userInfo.innerHTML = field + ' ' + text;
  return userInfo;
}

function createUserPic(pic){
  const innerDiv = document.createElement('div');
  innerDiv .setAttribute('class','img');

  let image = document.createElement('img');
  image.setAttribute('src', pic);
  innerDiv.appendChild(image);
  return innerDiv;
}