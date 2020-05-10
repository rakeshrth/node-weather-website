// console.log('client side javascript file is loaded')



// fetch('http://localhost:3000/weather?address=!').then((response) =>{
//     response.json().then((data) =>{
//         if (data.error) {
//             console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

//used to select html elements. # is used for p id.
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-1')
const messageTwo= document.querySelector('#message-2')

// messageOne.textContent = 'from javascript'

//e is event
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location= search.value
    const url= 'http://localhost:3000/weather?address=' + location

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch(url).then((response) =>{
    response.json().then((data) =>{
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent= data.location
            messageTwo.textContent= data.forecast
            
        }
    })
})
})






//we are using fetch api. it doesnt work in nodejs, instead it works in the client side browser.
// fetch('http://puzzle.mead.io/puzzle').then((response) =>{
//     response.json().then ((data) => {
//         console.log(data)
//     })      
// })