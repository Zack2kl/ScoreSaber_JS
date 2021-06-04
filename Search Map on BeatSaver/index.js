function OnScoreSaber() {
    const tElement = document.getElementsByClassName('title is-5')[0];
    const infoElement = document.getElementsByClassName('column')[0];
    const info = infoElement.innerText.split('\n');

    const AutoOpen = document.createElement('button');
    let mapId = '';

    for (let el in info) {
        if (info[el].indexOf('ID: ') != -1) {
            mapId = info[el].replace('ID: ', '');
            break;
        }
    }

    AutoOpen.innerText = 'Go to Download Page';
    AutoOpen.onclick = () => window.open(`https://beatsaver.com/search?auto_open=1&q=${mapId}`);
    tElement.insertBefore(AutoOpen, tElement.Node);
}

function OnBSaver() {
    const results = document.getElementsByClassName('beatmap-result');
    const loop = () => {
        if (results[0] === undefined)
            setTimeout(loop, 50);
        else 
            window.location.href = 'https://beatsaver.com/beatmap/' + results[0].id;
    }

    loop();
}

if (window.location.host == 'scoresaber.com') {
    OnScoreSaber();
} else {
    OnBSaver();
}
