let addToy = false

function ToyFetch(){
  fetch('http://localhost:3000/toys')
  .then(function(data){return data.json()})
  .then(function(toys) {
    toys.forEach(function(toy){
      AddToy(toy)
    })
  })
}

function LikeFetch(id, likes){
  fetch(`http://localhost:3000/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      likes: likes 
    })
  })
  .then(function(data){return data.json()
  })
}

function NewToyFetch(toy){
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": `${toy.name}`,
      "image": `${toy.image}`,
      "likes": 0 
    })
  })
}

ToyFetch()

function AddToy(toy){
    let newdiv = document.createElement("div")
    newdiv.dataset.id = toy.id
    newdiv.className = "card"
    let h2 = document.createElement("h2")
    h2.innerText = toy.name
    let img = document.createElement("img")
    img.src = toy.image
    img.className = "toy-avatar"
    let p = document.createElement("p")
    p.innerText = `${toy.likes} Likes `
    p.dataset.id = toy.id
    let button = document.createElement("button")
    button.innerText = "Like <3"
    button.className = "like-btn"
    button.dataset.id = toy.id
    button.dataset.likes = toy.likes
    newdiv.append(h2, img, p, button)
    document.getElementById("toy-collection").append(newdiv)
    button.addEventListener("click", function(e){
      IncreaseLikes(e)
      LikeFetch(e.target.dataset.id, e.target.dataset.likes)
    })
}

function NewToy(toy){
  NewToyFetch(toy)
  AddToy(toy)
}

function IncreaseLikes(e){
  let toyP = document.querySelector(`p[data-id = "${e.target.dataset.id}"]`)
  e.target.dataset.likes = parseInt(e.target.dataset.likes) + 1
  toyP.innerText = `${e.target.dataset.likes} Likes `
}

document.addEventListener("DOMContentLoaded", ()=>{
  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let form = document.getElementsByClassName("add-toy-form")
  toyForm.addEventListener("submit", function(e){
    e.preventDefault()
    let toy = {
      "name": e.target[0].value,
      "image": e.target[1].value,
      "likes": 0
    }
    NewToy(toy)
    e.target[0].value = ""
    e.target[1].value = ""
    toyForm.style.display = 'none'
  })
  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
    } else {
      toyForm.style.display = 'none'
    }
  })


})
