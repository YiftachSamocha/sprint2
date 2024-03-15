'use strict'

function createId() {
    let id = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 7; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        id += characters.charAt(randomIndex)
    }
    return id
}