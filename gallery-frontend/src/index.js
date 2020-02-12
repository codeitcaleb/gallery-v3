const baseUrl = 'http://localhost:3000'

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

  fetch(`${baseUrl}/api/photos`, configObject)
    
 .then(response => response.json())
 .then(object => addNewPhoto(object))
 .catch(error => (document.body.innerHTML = error.message));
}

function addNewPhoto(object) {
  let main = document.querySelector('#main-content')
  let photo = object.data;

  let id = photo.id;
  let image = photo.attributes.photo_image_url;
  let location = photo.attributes.location.city;
  let caption = photo.attributes.caption;

  let pic = new Photo(id, image, location, caption);

  main.innerHTML += pic.renderPhoto()
}

function deletePhoto(id) {
  
  fetch(`${baseUrl}/api/photos/${id}`, {
    method: 'DELETE'
  })
  .then(() => fetchAllPhotos())
}

async function fetchAllPhotos() {
  const main = document.querySelector('#main-content');
  
  const response = await fetch(`${baseUrl}/api/photos`);
  const object = await response.json();

  let allPhotos = object.data;

  clearPhotos()
  
  allPhotos.forEach(photo => {
    let id = photo.id;
    let image = photo.attributes.photo_image_url;
    let location = photo.attributes.location.city;
    let caption = photo.attributes.caption;

    let pic = new Photo(id, image, location, caption);
    main.innerHTML += pic.renderPhoto()
  })
  
}

async function fetchAllLocations() {
  const response = await fetch(`${baseUrl}/api/locations`);
  const object = await response.json();
  
  let allLocations = object.data;
  
  let locationSelect = document.querySelector("#location-select");

  allLocations.forEach(location => {
    
    let id = location.id;
    let city = location.attributes.city;

    locationSelect.innerHTML = locationSelect.innerHTML + 
      `<option value="${id}" onchange="fetchPhotosByLocation(${id})">${city}</option>`;
  })
}

function selectOption(e) {
  let id = e.target.value;
  
  if (id === "all-photos") {
    fetchAllPhotos()
  } else {
    fetchPhotosByLocation(id)
  }
}

async function fetchPhotosByLocation(id) {
  const main = document.querySelector('#main-content');

  const response = await fetch(`${baseUrl}/api/locations/${id}`);
  const object = await response.json();
  
  let allPhotosAtLocation = object.included;
  
  clearPhotos()

  allPhotosAtLocation.forEach(photo => {
         let id = photo.id;
         let image = photo.attributes.photo_image_url;
         let location = photo.attributes.location.city;
         let caption = photo.attributes.caption;

         let pic = new Photo(id, image, location, caption);
         main.innerHTML += pic.renderPhoto()
   })    
}

function clearPhotos() {
    const main = document.querySelector('#main-content');

    while (main.hasChildNodes()) {
      main.removeChild(main.firstChild);
    }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAllPhotos()
  fetchAllLocations()
})