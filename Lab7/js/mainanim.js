
async function animation(){
    let buttonsettings = await onstart();
    for (const [key, value] of Object.entries(buttonsettings)) {
        document.getElementById(key).value = value;
    }
    let work = document.getElementById('work');
    let anim = document.getElementById('anim');
    anim.style.backgroundImage = `url(http://127.0.0.1:5000/static/serverimage/texture.jpg)`;
    let playbutton = document.getElementById('playbutton');
    let closebutton = document.getElementById('closebutton');
    let button = document.getElementById('squarebutton');
    let messagebox = document.getElementById('messagebox');
    let OrangeX, BlueY,sum, xint,yint;

    function changesquare() {

        let squareOrange = anim.appendChild(document.createElement("div"));
        let squareBlue = anim.appendChild(document.createElement("div"));
        squareOrange.id = 'squareOrange';
        squareBlue.id = 'squareBlue';
        BlueY = Math.random() * (100 - 0) + 0;
        squareBlue.style.right=0;
        squareBlue.style.top= BlueY > 50 ?  `calc(${BlueY}% - 10px)` : `${BlueY}%`
        OrangeX = Math.random() * (100 - 0) + 0;
        squareOrange.style.left = OrangeX > 50 ?  `calc(${OrangeX}% - 10px)` : `${OrangeX}%`;
    }



    function addlocal(message) {
        let localarray = JSON.parse(window.localStorage.getItem('messages'));
        window.localStorage.removeItem('messages');
        let curdate = new Date();
        localarray.push(`${curdate.getFullYear()}-${curdate.getMonth()+1}-${curdate.getDate()} ${curdate.getHours()}:${curdate.getMinutes()}:${curdate.getSeconds()} - ${message}`);
        window.localStorage.setItem('messages', JSON.stringify(localarray));
    }

    function printlocal() {
        let localarray = JSON.parse(window.localStorage.getItem('messages'));
        for (let par of localarray) {
            document.getElementById('log').innerHTML += `<p>${par}</p>`;
        }
        window.localStorage.removeItem('messages');
    }

    function changebutton(val)
    {
        if (button.value !== val) {
            button.disabled = true;
            button.classList.add('buttonchangeroff');
            setTimeout(() => {button.classList.remove('buttonchangeroff');
                button.value = val;
                button.classList.add('buttonchangeron');
                setTimeout(() => {
                    button.classList.remove('buttonchangeron');
                    button.disabled = false;
                }, 1);
            }, 1);
        }
    }


    function addmessage(message) {
        addlocal(message);
        if (sum) {
            sum += document.getElementsByClassName('message')[0].clientHeight;
            if (sum >= messagebox.clientHeight){
                document.getElementsByClassName('message')[0].classList.add('hidesq');
                setTimeout(() => {
                    document.getElementsByClassName('message')[0].classList.remove('hidesq');
                    messagebox.removeChild(document.getElementsByClassName('message')[0]);
                    messagebox.innerHTML += `<p class="message">${message}</p>`;
                }, 1000);
            }
            else {
                messagebox.innerHTML += `<p class="message">${message}</p>`;
            }
        } else {
            messagebox.innerHTML += `<p class="message">${message}</p>`;
            sum += document.getElementsByClassName('message')[0].clientHeight;
        }
    }


    playbutton.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.localStorage.setItem('messages', JSON.stringify([]));
        sum = 0;
        changesquare();
        addlocal('Play pressed');
        playbutton.disabled = true;
        document.body.style.overflow = 'hidden';
        work.style.display = 'initial';
        messagebox.style.height = `${work.clientHeight - anim.clientHeight - work.clientHeight * 0.02 - 10}px`;
        messagebox.style.width = `${work.clientWidth - closebutton.clientWidth - work.clientWidth * 0.2}px`;

    })


    closebutton.addEventListener('click', function(evt) {
        evt.preventDefault();

        document.getElementById('anim').removeChild(squareBlue);
        document.getElementById('anim').removeChild(squareOrange);
        messagebox.style.height = '';
        messagebox.style.width = '';
        addlocal('Close pressed');
        messagebox.innerHTML = '';
        document.body.style.overflow = 'visible';
        work.style.display = 'none';
        button.value = 'start';
        printlocal();
        playbutton.disabled =false;
    })

    function moveSquares(){
        if (!(button.value === 'stop')) {
            changebutton('stop');
            let width = anim.clientWidth;
            let height = anim.clientHeight
            let squareOrange = document.getElementById('squareOrange');
            let squareBlue = document.getElementById('squareBlue');
            OrangeX = squareOrange.offsetLeft;
            BlueY = squareBlue.offsetTop;

             xint = setInterval(movex, 1);
             yint = setInterval(movey, 2);


            function movex() {
                if (squareOrange.classList.contains('right'))
                {
                    squareOrange.style.left = `${OrangeX--}px`;
                    if (OrangeX === 0) {
                        squareOrange.classList.remove('right');
                        squareOrange.classList.add('left');
                        addmessage('Orange reached left border');
                    }
                }
                else
                {
                    squareOrange.style.left = `${OrangeX++}px`;
                    if (OrangeX === width-15) {
                        squareOrange.classList.add('right');
                        squareOrange.classList.remove('left');
                        addmessage('Orange reached right border');
                    }
                }
                if((BlueY>(anim.clientHeight-30) && OrangeX > (anim.clientWidth-30)))
                {

                    clearInterval(xint);
                    clearInterval(yint);
                    addmessage('Collision detected');
                    changebutton('reload');
                }
            }
            function movey() {
                if (squareBlue.classList.contains('top')) {
                    squareBlue.style.top = `${BlueY++}px`;
                    if (BlueY === height-15) {
                        squareBlue.classList.remove('top');
                        squareBlue.classList.add('bottom');
                        addmessage('Blue reached bottom border');
                    }
                } else {
                    squareBlue.style.top = `${BlueY--}px`;
                    if (BlueY === 0) {
                        squareBlue.classList.add('top');
                        squareBlue.classList.remove('bottom');
                        addmessage('Blue reached top border');
                    }
                }
            }
        }
        else  {
            if (xint){
                clearInterval(xint);
                OrangeX = null;
            }
            if (yint) {
                clearInterval(yint);
                BlueY = null;
            }
            changebutton('start');
            addmessage('Process stopped');
        }


    }
    button.addEventListener('click', function(evt) {
        if (button.value === 'reload')
        {
            document.getElementById('anim').removeChild(squareBlue);
            document.getElementById('anim').removeChild(squareOrange);
            changesquare();
            changebutton('start');
        }
        else{
            evt.preventDefault();
            moveSquares();
        }


    })
}

animation();
