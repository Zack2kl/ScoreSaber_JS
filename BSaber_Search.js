// ==UserScript==
// @name         Scoresaber map search on bsaber
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://scoresaber.com/leaderboard/*
// @grant        none
// ==/UserScript==

function main() {
    const titleElement = document.getElementsByClassName('title is-5');
    const infoElement = document.getElementsByClassName('column')[0];
    const info = infoElement.innerText.split('\n');

    const searchSongEl   = document.createElement('button');
    const searchArtistEl = document.createElement('button');
    const searchMapperEl = document.createElement('button');

    const artist   = info[0].split(' - ')[0];
    const songName = info[0].replace(artist + ' - ', '');
    const mapper   = info[1].replace('Mapped by: ', '');

    searchSongEl.innerText   = `Search "${songName}" on bsaber`;
    searchArtistEl.innerText = `Search "${artist}" on bsaber`;
    searchMapperEl.innerText = `Search "${mapper}" on bsaber`;

    const open = (text) => window.open('https://bsaber.com/?s=' + encodeURI(text));
    searchSongEl.onclick   = () => open(songName);
    searchArtistEl.onclick = () => open(artist);
    searchMapperEl.onclick = () => open(mapper);

    const z = titleElement[0]
    z.insertBefore(searchSongEl, z.Node);
    z.insertBefore(document.createElement('br'), z.Node);
    z.insertBefore(searchArtistEl, z.Node);
    z.insertBefore(document.createElement('br'), z.Node);
    z.insertBefore(searchMapperEl, z.Node);
};

try{
    main()
} catch (e) {
    console.log(e)
}
