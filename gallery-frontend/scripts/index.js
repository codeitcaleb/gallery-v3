

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


//Make a GET request to the API using fetch()
// Parse the response to JSON
// Iterate through the array of JSON Objects
// And create instance of the Photo class with the returned data
// Append the the pic instances to the DOM (using renderPhoto(pic))

// * Update/re-fetch each time a new photo is uploaded

// Clear form after pic is uploaded.
// Implement delete

async function fetchNewPhoto() {

  const response = await fetch('http://localhost:3000/api/photos');
  const object = await response.json();

  let newPhoto = object.data[object.data.length - 1];

      let image = newPhoto.attributes.photo_image_url;
      let location = newPhoto.attributes.location.city;
      let caption = newPhoto.attributes.caption;
      let pic = new Photo(image, location, caption);
  
      debugger
      renderPhoto(pic);
}

async function fetchAllPhotos() {

  const response = await fetch('http://localhost:3000/api/photos');
  const object = await response.json();

  let allPhotos = object.data;

  allPhotos.forEach(photo => {
    let image = photo.attributes.photo_image_url;
    let location = photo.attributes.location.city;
    let caption = photo.attributes.caption;

    let pic = new Photo(image, location, caption)

    renderPhoto(pic);
  })
}

function renderPhoto(pic) {
  const main = document.querySelector('#main-content')
  
  const img = document.createElement('img');
  img.src = `${pic.image}`
  
  const pLocation = document.createElement('p')
  pLocation.innerHTML = `${pic.location}`

  const pCaption = document.createElement('p')
  pCaption.innerHTML = `${pic.caption}`
    
  main.appendChild(img)
  main.appendChild(pLocation)
  main.appendChild(pCaption)
}

document.addEventListener('DOMContentLoaded', () => {
  fetchAllPhotos()
})