let addToy = false;
const addToyForm = document.querySelector(".add-toy-form");

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

addToyForm.onsubmit = (e) => {
  e.preventDefault();
  console.log("submitted");
};

function listToys() {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => {
      let newToy = document.createElement("div");
      newToy.className = 'card';
      let newImage = document.createElement("img");
      newImage.src = toy.image;
      newImage.className = "toy-avatar";
      let likes = document.createElement("p");
      likes.textContent = `${toy.likes} Likes`
      let likeBtn = document.createElement("button")
      likeBtn.className = "like-btn";
      likeBtn.id = toy.id;
      likeBtn.textContent = "Like ❤️";
      newToy.textContent = toy.name;
      newToy.append(newImage, likes, likeBtn);
      document.querySelector("#toy-collection").append(newToy);
    });
  })
};

listToys();