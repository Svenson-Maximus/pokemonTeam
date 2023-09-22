// Pages
import Home from "./pages/Home.svelte";

import Trainers from "./pages/trainers/Trainers.svelte"
import TrainerDetails from "./pages/trainers/TrainerDetails.svelte"

import Pokemons from "./pages/pokemons/Pokemons.svelte"
import PokemonDetails from "./pages/pokemons/PokemonDetails.svelte"
import AddTrainer from "./pages/trainers/AddTrainer.svelte"

export default {
    // Home
    '/': Home,
    '/home': Home,

    // Trainer
    '/trainers': Trainers,
    '/trainers/:id': TrainerDetails,
    '/add-trainer': AddTrainer,
    
    // Pokemon
    '/pokemons': Pokemons,
    '/pokemons/:id': PokemonDetails,
    
}