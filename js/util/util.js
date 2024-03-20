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
    if (sectionName === 'gallery') {
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].classList.contains('editor') || sections[i].classList.contains('saved-memes')) {
                sections[i].classList.add('hide')
            }
            else {
                sections[i].classList.remove('hide')
            }
        }

    }
    else {
        for (var i = 0; i < sections.length; i++) {
            if (sections[i].classList.contains(sectionName)) {
                sections[i].classList.remove('hide')
            }
            else {
                sections[i].classList.add('hide')
            }
        }
    }
    if (sectionName === 'gallery') {
        document.querySelector('.gallery-header').classList.add('current')
        document.querySelector('.saved-memes-header').classList.remove('current')
    } else if (sectionName === 'saved-memes') {
        document.querySelector('.gallery-header').classList.remove('current')
        document.querySelector('.saved-memes-header').classList.add('current')
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