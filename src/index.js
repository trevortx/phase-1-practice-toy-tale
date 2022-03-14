let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

let toyCollection = document.querySelector("#toy-collection")

function fetchToys() {
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
}

function createToys(toys) {

  // h2
  let toyH2 = document.createElement("h2")
  toyH2.innerText = `${toys.name}`

  // img
  let toyImg = document.createElement("img")
  toyImg.setAttribute("src", toys.image)
  toyImg.setAttribute("class", "toy-avatar")

  // p
  let toyP = document.createElement("p")
  toyP.innerText = `${toys.likes} Likes`

  // button
  let toyBtn = document.createElement("button")
  toyBtn.setAttribute("class", "like-btn") 
  toyBtn.setAttribute("id", `${toys.id}`)
  toyBtn.innerText = "Like ❤️"

  let divCard = document.createElement("div")
  divCard.classList.add("card")
  divCard.appendChild(toyH2)
  divCard.append(toyImg)
  divCard.append(toyP)
  divCard.append(toyBtn)
  
  toyCollection.append(divCard)
}

fetchToys()
.then(toys => {
  toys.forEach(toy => {
    createToys(toy)
  })
})

let toyForm = document.getElementById("toy-form")
toyForm.addEventListener("submit", e => formHandler(e))

function formHandler(e) {
  e.preventDefault()
  let toyName = document.getElementById("toy-name").value
  let toyURL = document.getElementById("toy-URL").value
  postToy(toyName, toyURL)
  toyForm.reset()
}

function postToy(toyName, toyURL) {
  console.log(toyName, toyURL)
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": `${toyName}`,
      "image": `${toyURL}`,
      "likes": 0
    })
  })
    .then(res => res.json())
    .then(toy => fetchToys(toy))
}