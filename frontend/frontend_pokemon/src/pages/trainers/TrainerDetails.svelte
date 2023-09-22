<script>
    import axios from "axios";

    export let params = {};

    let trainer_id;
    let pokemon_id;

    $: {
        trainer_id = params.id;
        getTrainer();
        getPokemon();
    }

    let trainer = {
        _id: "",
        name: "",
        pokemon: [],
        gymbadges: "",
        age: "",
    };

    let pokemons = [];

    function getTrainer() {
        axios.get("http://localhost:3001/api/trainers/" + trainer_id)
            .then((response) => {
                trainer = response.data;
            });
    }

    function getPokemon() {
        axios.get("http://localhost:3001/api/pokemons").then((response) => {
            pokemons = response.data;
        });
    }

    function addPokemonToTrainer() {
        trainer.pokemon.push(pokemon_id);
        axios.put("http://localhost:3001/api/trainers/" + trainer_id, trainer)
            .then((response) => {
                getTrainer();
            });
    }
</script>

<div class="container mt-3">
    <h1>{trainer.name}</h1>
    <p>Pokemon:</p>
    <ul>
        {#each trainer.pokemon as pokemon}
            <li>{pokemon}</li>
        {/each}
    </ul>

    <h2>Add Pokemon</h2>
    <label for="pokemons">Add Pokemon to Trainer</label>
    <select class="form-select" bind:value={pokemon_id} id="pokemons">
        {#each pokemons as pokemon}
            <option value={pokemon._id}>{pokemon.Name}</option>
        {/each}
    </select>
    <button class="btn btn-primary mt-2" on:click={addPokemonToTrainer}
        >Add</button
    >
</div>
