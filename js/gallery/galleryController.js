'use strict'
function onInit() {
    renderGallery()
}

function renderGallery() {
    const imgs = getImgs()
    const gallery = document.querySelector('.gallery')
    var galleryHTML = ''
    for (var i = 0; i < imgs.length; i++) {
        galleryHTML += `<div class="image"> <img src="${imgs[i].url}" onclick="renderMeme(this)"></div>`
    }
    gallery.innerHTML= galleryHTML
}
function hideGallery() {
    const gallery = document.querySelector('.gallery')
    gallery.classList.add('hide')
}