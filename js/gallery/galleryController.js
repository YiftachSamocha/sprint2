'use strict'

function renderGallery() {
    const imgs = getImgs()
    setImgs(imgs)
    const gallery = document.querySelector('.gallery')
    var galleryHTML = ''
    for (var i = 0; i < imgs.length; i++) {
        galleryHTML += `<div class="image"> <img src="${imgs[i].url}" id="${imgs[i].id}" onclick="onImgSelect(this.id)"></div>`
    }
    gallery.innerHTML = galleryHTML
    
}
