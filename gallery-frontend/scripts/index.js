document.querySelector("#photo-form").addEventListener("submit", event => {

   event.preventDefault();

   const photoForm = document.querySelector("#photo-form");
   const photo = new FormData(photoForm);

   photo.append("image", image.files[0], image.files[0].name);
   photo.append("location", document.querySelector("#location").value);
   photo.append("caption", document.querySelector("#caption").value);

   const configObject = {
     method: "POST",
     headers: {
       "Accept": "application/json"
     },
     body: photo
   }
   createPhoto(configObject);
   photoForm.reset();
})

function createPhoto(configObject) {

  fetch("http://localhost:3000/api/photos", configObject)
    .then(response => response.json())
    .then(fetchNewPhoto())
    .catch(error => (document.body.innerHTML = error.message));
}

async function fetchNewPhoto() {

  const response = await fetch('http://localhost:3000/api/photos');
  const object = await response.json();

  let newPhoto = object.data[object.data.length - 1];
  
      let id = newPhoto.id
      let image = newPhoto.attributes.photo_image_url;
      let location = newPhoto.attributes.location.city;
      let caption = newPhoto.attributes.caption;
      
      let pic = new Photo(id, image, location, caption);
  
      renderPhoto(pic);
}

function deletePhoto(pic) {
  fetch(`http://localhost:3000/api/photos/${pic.id}`, {
    method: 'DELETE'
  })
  .then(location.reload())
  .then(fetchAllPhotos())
}

async function fetchAllPhotos() {

  const response = await fetch('http://localhost:3000/api/photos');
  const object = await response.json();

  let allPhotos = object.data;
  
  allPhotos.forEach(photo => {
    
    let id = photo.id
    let image = photo.attributes.photo_image_url;
    let location = photo.attributes.location.city;
    let caption = photo.attributes.caption;

    let pic = new Photo(id, image, location, caption);

    renderPhoto(pic);
  })
}

function renderPhoto(pic) {
  const main = document.querySelector('#main-content');
  
  const img = document.createElement('img');
  img.src = `${pic.image}`;
  
  const pLocation = document.createElement('p');
  pLocation.innerHTML = `${pic.location}`;

  const pCaption = document.createElement('p');
  pCaption.innerHTML = `${pic.caption}`;

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = `Delete`
  deleteBtn.onclick = () => {deletePhoto(pic)}
  deleteBtn.setAttribute("class", "delete")
  deleteBtn.setAttribute("id", `${pic.id}`)

  main.appendChild(img);
  main.appendChild(pLocation);
  main.appendChild(pCaption);
  main.appendChild(deleteBtn)
}

async function goodBye(pic) {
  console.log(`The delete button of ${pic.id} was clicked and was successfully deleted. Good Bye!`)
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAllPhotos()
})
