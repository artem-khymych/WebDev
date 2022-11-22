function taskOne(){
    let article4 = document.getElementById("article4");
    let article5 = document.getElementById("article5");
    let temp = article5.innerHTML;
    article5.innerHTML = article4.innerHTML;
    article4.innerHTML = temp;

}
taskOne();

function taskTwo(){
   let a = 10;
   let b = 7;
   let c = 5;
   let p = (a+b+c)/2
    var s;
   s = Math.sqrt(p*(p-a)*(p-b)*(p-c));
  document.getElementById("article3").innerText += "\n\nsquare of triangle: ";
  document.getElementById("article3").innerText += s;

}
taskTwo();
function compareNumbers(a, b) {
    return a - b;
}
function taskThree() {
    if (!(document.cookie === 'undefined' || document.cookie==="")) {
        alert(document.cookie)
        let confirm = window.confirm('Видалити cookies?');
        if (confirm) {
            document.cookie = 'undefined';
            confirm = window.confirm('Наявні cookies були видалені Перезавантажити сторінку?');
            if (confirm) {
                location.reload();
            }
        }
    }
}
function findMax(){
    let data = document.getElementById("numbers").value;
    let numbers = data.split(",");
    let numbersInt = [];
    numbers.forEach(element => numbersInt.push(parseInt(element)));
    numbersInt.sort(compareNumbers);
    numbersInt.reverse();
    let max = numbersInt[0];
    document.cookie = max;
    alert(document.cookie);
}
document.cookie='undefined';
taskThree();
function taskFour(){
    if(!(localStorage.getItem("solidity")==="")){
        document.getElementById("article6").style.fontWeight=parseInt(localStorage.getItem("solidity"));
    }
    else{
        window.addEventListener('scroll',changeSolidity);
    }
}
taskFour();
function changeSolidity() {
    console.log(pageYOffset);
    localStorage.setItem("solidity","900");
    document.getElementById("article6").style.fontWeight="900";
}