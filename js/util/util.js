'use strict'
function onInit() {
    renderGallery()
    showSection('gallery')
}


function showSection(sectionName) {
    const sections = document.querySelectorAll('section')
    for (var i = 0; i < 3; i++) {
        if (sections[i].classList.contains(sectionName)) {
            sections[i].classList.remove('hide')
        }
        else {
            sections[i].classList.add('hide')
        }
    }
}

function createId() {
    let id = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        id += characters.charAt(randomIndex)
    }
    return id
}