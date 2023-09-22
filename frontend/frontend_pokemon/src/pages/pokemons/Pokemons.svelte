<script>
    import axios from "axios";

    let pokemons = [];

    function getPokemons() {
        axios.get("http://localhost:3001/api/pokemons").then((response) => {
            pokemons = response.data;
        });
    }
    getPokemons();
</script>

<div class="container mt-3">
    <h1 class="mt-3">List of all Pokemon</h1>

    <table class="table">
        <thead>
            <tr>
                <th>Pokedex</th>
                <th>Name</th>
                <th>Type 1</th>
                <th>Type 2</th>
            </tr>
        </thead>
        <tbody>
            {#each pokemons as pokemon}
                <tr>
                    <td>
                        {pokemon.Id}
                    </td>
                    <td>
                        <a href={"#/pokemons/" + pokemon._id}>
                            {pokemon.Name}
                        </a>
                    </td>
                    <td>
                        {pokemon.Type1}
                    </td>
                    <td>
                        {pokemon.Type2}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
