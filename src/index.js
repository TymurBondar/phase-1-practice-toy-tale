let addToy = false;
const addToyForm = document.querySelector(".add-toy-form");
let currentId = 1;

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

function createBtn(id) {
  let btn = document.createElement("button")
  btn.className = "like-btn";
  btn.textContent = "Like ❤️";
  btn.id = id;
  btn.addEventListener('click', (e) => {
    const parentDiv = e.target.closest('.card');
    const counter = parentDiv.querySelector(".like-counter");
    counter.textContent = parseInt(counter.textContent) + 1;
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        likes: parseInt(counter.textContent)
      })
    })
  })
  return btn
}

function createImg(link) {
  let img = document.createElement("img");
  img.src = link;
  img.className = "toy-avatar";
  return img
};

function createLike(nOfLikes) {
  let likes = document.createElement("p");
  let likeCounter = document.createElement("span");
  likeCounter.className = "like-counter";
  likeCounter.textContent = nOfLikes;
  likes.append(likeCounter);
  likes.appendChild(document.createTextNode(" Likes"));
  return likes
}

function appendToy(toy) {
  currentId++;
  let card = document.createElement("div");
  card.className = 'card';
  card.textContent = toy.name;
  let img = createImg(toy.image);
  let likes = createLike(toy.likes);
  let btn = createBtn(toy.id);
  card.append(img, likes, btn);
  return document.querySelector("#toy-collection").append(card)
}

function listToys() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toys => toys.forEach(toy => appendToy(toy))); // <- 10/10 looks super cool
};

addToyForm.onsubmit = (e) => {
  e.preventDefault();
  const { name, image } = e.target.elements; // <- chatGpts work, this is called Destruction
  const newToyData = {
    id: currentId,
    name: name.value,
    image: image.value,
    likes: 0
  }
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(newToyData)
  })
    .then(() => {
      appendToy(newToyData);
    });
}
listToys();