document.querySelector("#photo").addEventListener("submit", event => {
  
   event.preventDefault()

   const photoForm = document.querySelector("#photo")
   const photo = new FormData(photoForm)

   photo.append("image", image.files[0], image.files[0].name)
   photo.append("location", document.querySelector("#location").value)
   photo.append("caption", document.querySelector("#caption").value)

   const configObject = {
     method: "POST",
     headers: {
       "Accept": "application/json"
     },
     body: photo
   }
   createPhoto(configObject)
})

function createPhoto(configObject) {
  debugger
  fetch('http://localhost:3000/api/photos', configObject)
    .then(response => response.json())
    .then(object => {
      image = object.data.attributes.photo_image_url
      location = object.data.attributes.location.city
      caption = object.data.attributes.caption
      photo = new Photo(image, location, caption)
    })
    // .then(object => document.body.innerHTML = photo.id)
    .catch(error => document.body.innerHTML = error.message)
}