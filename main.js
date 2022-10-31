"use strict";
document.addEventListener("DOMContentLoaded", init);

import './style.css'

const url="https://pfgscytowfvxabrpcxym.supabase.co/rest/v1/Recipes";
const headers={ apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZ3NjeXRvd2Z2eGFicnBjeHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1OTg5MTcsImV4cCI6MTk4MjE3NDkxN30.bgLR1zZm8um7UTaebly3sZtu6dKDNsxb8eTZAYFoAAM',
Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmZ3NjeXRvd2Z2eGFicnBjeHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjY1OTg5MTcsImV4cCI6MTk4MjE3NDkxN30.bgLR1zZm8um7UTaebly3sZtu6dKDNsxb8eTZAYFoAAM',
'Content-Type': 'application/json',
Prefer: 'return=representation'};


function init(){
  getRecipes();
}

async function getRecipes(){
  const options={
    method:"GET",
    headers:headers,
    }
    const res= await fetch(url,options);
    const data= await res.json();
    return console.log(data);
    handleData();
}

async function addRecipe(newRecipe){
const options={
  method:"POST",
  header:headers,
  body:{
    "name":"Vegetarian Burguers",
    "ingredients":["chickpeas","beats","carrots", "tahini","oatmeal"],
    "preparation":["1:Fried the vegies","2:mash the veggies with the oalmeal and the cheackpeas with season"]
  }//JSON.stringify(newRecipe), //the stringify method converts a JavaScript value to a JSON string
}
const res= await fetch(url, options);
const data= await res.json();
return data;
}

function handleData(){
  // 1. Wrap the template
  const template= document.querySelector(template).content;
  //2. Make a clone
  const clone=template.cloneNode(true);
  //3. 

  // 4. Select the parent & Append child
  document.querySelector("main").appendChild(clone);

  

}

document.querySelector('#app').innerHTML = `
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
`

//setupCounter(document.querySelector('#counter'))


