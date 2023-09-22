<script>
    import axios from "axios";
    
    export let params = {};

    let id;

    $: {
        // "Reactive Statement":
        // This block of is executed whenever the value of a variable in it changes.
        // See https://svelte.dev/tutorial/reactive-statements
        id = params.id;
        getPokemons();
    }

    let pokemon = {};

    function getPokemons() {
        axios.get("http://localhost:3001/api/pokemons/" + id)
            .then((response) => {
                pokemon = response.data;
            });
    }
</script>

<div >
<div class="container-lg">
    <h1>{pokemon.Name}</h1>
    <div class="row">
        <div class="col-lg-6">
            Container Left
        </div>
        <div class="col-lg-6">
            Container Right
        </div>
    </div>
</div>
</div>