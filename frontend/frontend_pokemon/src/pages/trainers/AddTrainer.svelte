<script>
    import axios from "axios";

    let trainer = {
        name: "",
        pokemon: [],
        gymbadges: "",
        age: "",
    };

    function addTrainer() {
        axios
            .post("http://localhost:3001/api/trainers", trainer)
            .then((response) => {
                alert("Trainer added");
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });

        /* function addPokemonToTrainer() {
        album.artists.push(artist_id);
        axios.put("http://localhost:3001/api/albums/" + album_id, album)
            .then((response) => {
                getAlbum();
            });*/
    }
</script>

<div class="container mb-3">
    <h1>Add a Trainer</h1>

    <form>
        <div>
            <label for="" class="form-label">Name</label>
            <input class="form-control" type="text" bind:value={trainer.name} />
        </div>
        <div>
            <label for="" class="form-label">Gym Badges</label>
            <input
                class="form-control"
                type="number"
                bind:value={trainer.gymbadges}
            />
        </div>
        <div>
            <label for="" class="form-label">Age</label>
            <input
                class="form-control"
                type="number"
                bind:value={trainer.age}
            />
        </div>
        <br />
        <button on:click={addTrainer} type="button" class="btn btn-primary">
            Add Trainer
        </button>
    </form>
</div>
