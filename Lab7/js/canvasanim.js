'use strict';

async function main(){
    let buttonsettings = await onstart();
    for (const [key, value] of Object.entries(buttonsettings)) {
        document.getElementById(key).value = value;
    }
    let work = document.getElementById('work');
    let anim = document.getElementById('anim');

    let intx, inty;

    anim.width = window.innerWidth;
    let width = window.innerWidth;
    anim.height = window.innerHeight;
    let height = window.innerHeight;

    let ctx = anim.getContext("2d");

    //TODO server image
    anim.style.backgroundImage = `url(http://127.0.0.1:5000/static/serverimage/texture.jpg)`;

    let playbutton = document.getElementById('playbutton');
    let closebutton = document.getElementById('closebutton');
    let button = document.getElementById('squarebutton');
    let messagebox = document.getElementById('messagebox');
    let intid, sum, OrangeX, BlueY;

    let BlueTop, OrangeLeft;

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

    function changebutton(val) {
        if (button.value !== val) {
            button.disabled = true;
            button.classList.add('buttonchangeroff');
            setTimeout(() => {button.classList.remove('buttonchangeroff'); 
                button.value = val;
                button.classList.add('buttonchangeron');
                setTimeout(() => {
                    button.classList.remove('buttonchangeron');
                    button.disabled = false;
                }, 5);
            }, 5);
        }
    }
    function movesquares(){

        intx  = setInterval( movex,10);
        inty = setInterval(movey,20);

        function movex()
        {
            if (OrangeLeft) {
                ctx.clearRect(OrangeX-15,height-15, 30, 15);
                ctx.fillStyle = 'orange';
                OrangeX-=5;
                ctx.fillRect(OrangeX,height-15, 15, 15)
                if (OrangeX <= 0) {
                    OrangeLeft = !OrangeLeft;
                    addmessage('Orange reached left border');
                }
            }
            else
            {
                ctx.clearRect(OrangeX-15,height-15, 30, 15);
                ctx.fillStyle = 'orange';
                OrangeX+=5;
                ctx.fillRect(OrangeX,height-15, 15, 15)
                if (OrangeX >= width-5) {
                    OrangeLeft = !OrangeLeft;
                    addmessage('Orange reached right border');
                }
            }
            if (((BlueY >= anim.height-30) && (OrangeX >= anim.width-30)))
            {
                clearInterval(intx);
                clearInterval(inty);
                addmessage('Colision detected');
                changebutton('reload');
            }

        }
        function movey()
        {
            if (BlueTop) {
                ctx.clearRect(width-15, BlueY, 15, 30);
                ctx.fillStyle = 'blue';
                BlueY-=2;
                ctx.fillRect(width - 15, BlueY, 15, 15)
                if (BlueY <= 0) {
                    BlueTop = !BlueTop;
                    addmessage('Blue reached top border');
                }
            }
            else
            {
                ctx.clearRect(width-15, BlueY-1, 15, 30);
                ctx.fillStyle = 'blue';
                BlueY+=2;
                ctx.fillRect(width - 15, BlueY, 15, 15)
                if (BlueY >= height-15) {
                    BlueTop = !BlueTop;
                    addmessage('Blue reached bottom border');
                }
            }
        }
    }

    function changesquare()
    {
        BlueY = Math.random() * (height);
        BlueTop = BlueY <= anim.height / 2;

        OrangeX = Math.random() * (width);
        OrangeLeft = OrangeX <= anim.width / 2;

        ctx.fillStyle='blue';
        ctx.fillRect(anim.width-15,BlueY, 15,15);
        ctx.fillStyle='orange';
        ctx.fillRect(OrangeX,anim.height -15, 15,15);
    }


    playbutton.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.localStorage.setItem('messages', JSON.stringify([]));
        sum = 0;
        addlocal('Play pressed');
        playbutton.disabled = true;
        document.body.style.overflow = 'hidden';
        work.style.display = 'initial';
        changesquare();

        messagebox.style.height = `${work.clientHeight - anim.clientHeight - work.clientHeight * 0.02 - 10}px`;
        messagebox.style.width = `${work.clientWidth - closebutton.clientWidth - work.clientWidth * 0.2}px`;
    })

    closebutton.addEventListener('click', function(evt) {
        evt.preventDefault();
        if (intid){
            clearInterval(intid);
            intid = null;
        }
        messagebox.style.height = '';
        messagebox.style.width = '';
        addlocal('Close pressed');
        messagebox.innerHTML = '';
        document.body.style.overflow = 'visible';
        work.style.display = 'none';
        button.value = 'start';
        clearInterval(intx);
        clearInterval(inty);
        ctx.clearRect(0,0,width,height);
        printlocal();
        playbutton.disabled = false;
    })

    button.addEventListener('click', function(evt)
    {
        evt.preventDefault();
        if ((button.value === 'start')) {
            addmessage('Start pressed')
            changebutton('stop');
            movesquares();
        }
        if(button.value==='stop')
        {
            clearInterval(intx);
            clearInterval(inty);
            changebutton('start');
            addmessage('Process stopped');
        }
        if (button.value === 'reload')
        {
            ctx.clearRect(0,0,width,height);
            changesquare();
            changebutton('start');
            addmessage(('reloaded'));
        }

    })
}
main()