'use strict'
function renderSavedMemes() {
    const memes = getFromStorage('Saved Memes')

    const saved = document.querySelector('.saved-memes')
    if (memes === null) {
        saved.innerHTML = `<p>There are no saved memes. Go and create one!</p>`
        return
    }
    saved.innerHTML= ''
    for (var i = 0; i < memes.length; i++) {
        const canvas = document.createElement('canvas');
        canvas.classList.add('meme', memes[i].id);
        saved.appendChild(canvas);
        setMeme(memes[i])
        renderMeme()
    }
}
