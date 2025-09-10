/*tic tac toe*/
let cases = document.querySelectorAll(".case");
let replayBtn = document.querySelector("#replay");
let panneauMessageGagnant = document.querySelector("#message img");

let joueurX = true; 
let gagnant = '';
const patrons = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

for (let boite of cases) {
    boite.active = true;
   boite.addEventListener( "click", function() {
   if (boite.active) {
        if (joueurX) {
            /* boite.style.backgroundImage = "url(x.png)" */
           boite.style.backgroundImage = "url('img/cow.svg')";
            joueurX = false;
        }
            else {
            boite.style.backgroundImage = "url('img/pig.svg')";
            joueurX = true;
        }
   }
   boite.active = false;
   valide();
   });
}



replayBtn.addEventListener("click", function() {
        for (let boite of cases) {
        boite.active = true
        boite.style.backgroundImage = '';
        joueurX = true;
        }
})

const valide = function () {
    for (let patron of patrons) { 
        let val1 = cases [patron[0]].style.backgroundImage.slice(5,16)
        let val2 = cases [patron[1]].style.backgroundImage.slice(5,16)
        let val3 = cases [patron[2]].style.backgroundImage.slice(5,16)


        if (val1 &&
            val1 === val2 &&
            val1 === val3) {
        console.log(`Le gagnant est ${val1}`);
        console.log(panneauMessageGagnant);
        panneauMessageGagnant.src = val1;
        for (let boite of cases) {
            boite.active = false;
        }
        }
    }
}

