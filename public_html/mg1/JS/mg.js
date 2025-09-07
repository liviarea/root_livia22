let items = document.querySelectorAll(".slider .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");

let active = 3;
function loadShow () {
    let  stt = 0;
    for(var i = active = 1; i < items.length; i++) {
    stt++;
    item[i].style.transform = `translateX(${120*stt}px)`
    }
}
loadShow();
