import React, {useEffect, useState} from 'react';
import Recipe from "./Recipe"; 
import './App.css';

const App = () => {

const APP_ID = "ffdb7b3c";
const APP_KEY = "d522d23447c1d71db4989e5805bc6c7d";

const [recipes, setRecipies] = useState([]);
const [search, setSearch] = useState("");
const [query, setQuery] = useState('chicken');

useEffect(()=> {
  getRecepies();
}, [query])

const getRecepies = async ()=> {
  const response = await fetch (
    `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
  const data = await response.json();
  setRecipies(data.hits);
}

const updateSearch = e => {
  setSearch(e.target.value);

}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

  return (
    <div className="App"> 
      <form onSubmit = {getSearch} className ="search-form">
        <input className ="search-bar" type="text" value ={search} onChange = {updateSearch}/>
        <button  className ="search-button" type="submit"> 
         Search
        </button>
      </form>
      <h1 className ="recipes">You can find all recipes using the search field above</h1>
      <div className="recipes">
      {recipes.map(recipe =>(
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        image={recipe.recipe.image}   
        ingredients = {recipe.recipe.ingredients}    
        
        />
      ))}
     </div>
     </div>
  )

}

export default App;
