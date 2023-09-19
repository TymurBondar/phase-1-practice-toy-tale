const addToyForm = document.querySelector(".add-toy-form");
const addBtn = document.querySelector("#new-toy-btn");

let addToy = false;
let currentId = 1;

addBtn.addEventListener("click", () => {
  addToy = !addToy;
  document.querySelector(".container").style.display = addToy ? "block" : "none";
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
  let name = document.createElement("h2");
  name.textContent = toy.name;
  let img = createImg(toy.image);
  let likes = createLike(toy.likes);
  let btn = createBtn(toy.id);
  card.append(name, img, likes, btn);
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