'use strict';

async function onstart() {
    let path = location.href.split("/").slice(-1)[0] === 'index.html' ? "main" : "canvas"; 
    let data = await fetch(`http://127.0.0.1:5000/${path}`,
        {
            method: 'GET'
        }).then(res => res.json());
    let style = document.body.appendChild(document.createElement('style'));
    style.textContent = data['style'];
    document.body.innerHTML += data['html'];
    document.getElementById('article6').innerHTML += data['central']
    return data["buttons"]
}
