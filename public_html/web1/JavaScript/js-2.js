console. log("JS 2 in action")

// step 1 - selecgt the element 
const myShape = document.getElementById ("heart")

//step 2 - adding a click event 
myShape.addEventListener("click",() => {
myShape.style.borderColor = "rgb(254, 168, 250)"

})

// step 1 selecting the element
const myShape = document.getElementById ("heart")

//step 2 adding a click event
// myShape.style.addEventListener("click", function()) {-}
myShape.classList.toggle("change-me")