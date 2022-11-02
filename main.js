"use strict";
document.addEventListener("DOMContentLoaded", init);

import './style.css'

const url = "https://pfgscytowfvxabrpcxym.supabase.co/rest/v1/Recipes";
const headers = {
  apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZ3NjeXRvd2Z2eGFicnBjeHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1OTg5MTcsImV4cCI6MTk4MjE3NDkxN30.bgLR1zZm8um7UTaebly3sZtu6dKDNsxb8eTZAYFoAAM',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZ3NjeXRvd2Z2eGFicnBjeHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1OTg5MTcsImV4cCI6MTk4MjE3NDkxN30.bgLR1zZm8um7UTaebly3sZtu6dKDNsxb8eTZAYFoAAM',
  'Content-Type': 'application/json',
  Prefer: 'return=representation'
};




function init() {
  getRecipes();
  const add = document.querySelector("#newRecipe");
  add.addEventListener("click", addRecipe);
}

async function getRecipes() {
  const options = {
    method: "GET",
    headers: headers,
  }
  const res = await fetch(url, options);
  const recipes = await res.json();
  handleRecipes(recipes);
}

async function addRecipe(newRecipe) {
  const options = {
    method: "POST",
    headers: headers,
    body: JSON.stringify(newRecipe) //the stringify method converts a JavaScript value to a JSON string
  };
  const res = await fetch(url, options);
  const recipes = await res.json();
  //console.log(recipes);
}


const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {
    name: form.elements.name.value,
    ingredients: form.elements.ingredients.value.split("\n"),
    preparation: form.elements.preparation.value.split("\n"),
  }
  addRecipe(obj);
})


async function deleteRecipe(id) {
  const options = {
    method: "DELETE",
    headers: headers
  };

  const res = await fetch(url + `?id=eq.` + id, options);
  const recipes = await res.json();

}

async function handleRecipes(recipes) {
  recipes.forEach(showRecipe);

}

async function showRecipe(recipe) {
  // 1. Wrap the template
  const template = document.querySelector("template").content;
  //2. Make a clone
  const clone = template.cloneNode(true);
  // 3. Populate data
  clone.querySelector("h2").textContent = recipe.name;
  const ingrList = recipe.ingredients;
  for (let i = 0; i < ingrList.length; i++) {
    const ingreList = clone.querySelector("#ingredients");

    const listElement = document.createElement("li");
    listElement.textContent = ingrList[i]

    ingreList.appendChild(listElement);
  }

  const prepList = recipe.preparation;
  for (let i = 0; i < prepList.length; i++) {
    const prepItem = clone.querySelector("#preparation");

    const prepStep = document.createElement("li");
    prepStep.textContent = prepList[i];

    prepItem.appendChild(prepStep);

  }

  const button = clone.querySelector("button");
  button.addEventListener("click", () => {
    deleteRecipe(recipe.id);
  });

  // 4. Select the parent & Append child
  document.querySelector("main").appendChild(clone);
}

/* document.querySelector('#app').innerHTML = `
  <div>
  <form action="">
  <label for="number">Number</label>
  <input type="text" id=" " name="number">

  <label for="title">Title</label>
  <input type="text" id=" " name="title">
  
  <label for="ingredients">Ingredients</label>
  <input type="text" id=" " name="ingredients">

  <label for="preparation">Preparation</label>
  <textarea name="preparation" id="preparation" cols="30" rows="10"></textarea>

  <button type="submit">Save</button>
</form>

  </div>
` */

//setupCounter(document.querySelector('#counter'))