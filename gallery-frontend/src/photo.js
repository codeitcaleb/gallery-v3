 class Photo {
   constructor(id, image, location, caption) {
     this.id = id
     this.image = image;
     this.location = location;
     this.caption = caption;
   }

   renderPhoto() {
      return `
      <div class = "pic-card" id = "${this.id}">
        <img src="${this.image}" height="250" width="500"  alt="${this.caption}">
        <p>${this.location}</p>
        <p>${this.caption}</p>
        <button class="delete" onclick="deletePhoto(${this.id})">Delete</button>
      </div>
    `
   }
 }
