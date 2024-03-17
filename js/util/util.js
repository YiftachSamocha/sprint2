'use strict'
const IMAGES_KEY = 'Images'
const SAVES_MEMES_KEY = 'Saved Memes'
function onInit() {
    renderGallery()
    renderSavedMemes()
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

function saveToStorage(title, value) {
    localStorage.setItem(title, JSON.stringify(value))
}
function getFromStorage(title) {
    return JSON.parse(localStorage.getItem(title))
}

function createId() {
    let id = 'id'
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        id += characters.charAt(randomIndex)
    }
    return id
}