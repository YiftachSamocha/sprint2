'use strict'
const IMAGES_KEY = 'Images'
const SAVES_MEMES_KEY = 'Saved Memes'

const EDITOR_DESKTOP_SIZE = 550
const EDITOR_MOBILE_SIZE = 340
const GALLERY_DESKTOP_SIZE = 350
const GALLERY_MOBILE_SIZE = 165

var gEditorImgSize = 550
var gGalleryImgSize = 350



function onInit() {
    determineImgSize()
    insertKeywordsDataOptions()
    showSection('gallery')
   

}

function determineImgSize() {
    window.addEventListener('resize', function () {
        if (window.innerWidth <= 350 && (gGalleryImgSize !== GALLERY_MOBILE_SIZE || gEditorImgSize !== EDITOR_MOBILE_SIZE)) {
            gGalleryImgSize = GALLERY_MOBILE_SIZE
            gEditorImgSize = EDITOR_MOBILE_SIZE
            document.querySelector('.gallery').innerHTML = ''
            renderGallery()
            console.log(1)
        } else if (window.innerWidth >= 350 && (gGalleryImgSize !== GALLERY_DESKTOP_SIZE || gEditorImgSize !== EDITOR_DESKTOP_SIZE)) {
            gGalleryImgSize = GALLERY_DESKTOP_SIZE
            gEditorImgSize = EDITOR_DESKTOP_SIZE
            document.querySelector('.gallery').innerHTML = ''
            renderGallery()
        }
    })
}


function showSection(sectionName) {
    if (window.innerWidth <= 350 && document.body.classList.contains('menu-open')) {
        toggleMenu()
    }
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
        renderGallery()
    }
    if (sectionName === 'saved-memes') {
        renderSavedMemes()
    }
    if (sectionName === 'gallery') {
        document.querySelector('.gallery-header').classList.add('current')
        document.querySelector('.saved-memes-header').classList.remove('current')
    } else if (sectionName === 'saved-memes') {
        document.querySelector('.gallery-header').classList.remove('current')
        document.querySelector('.saved-memes-header').classList.add('current')
    } else {
        document.querySelector('.gallery-header').classList.remove('current')
        document.querySelector('.saved-memes-header').classList.remove('current')
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

function toggleMenu() {
    document.body.classList.toggle('menu-open')

    var button = document.querySelector('.menu-btn')
    if (document.body.classList.contains('menu-open')) {
        button.innerHTML = 'X'
    }
    else {
        button.innerHTML = '☰'

    }
}

function toggleHide() {
    document.getElementById('imgInput').classList.toggle('hide')
}