<script>
    import axios from "axios";

    let trainers = [];

    function getTrainers() {
        axios.get("http://localhost:3001/api/trainers").then((response) => {
            trainers = response.data;
        });
    }
    getTrainers();
</script>

<div class="mb-5">
    <h1 class="mt-3">List of all Trainers</h1>
    <a href="#/add-trainer">+ Add Trainer</a>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Gym Badges</th>
                <th>Age</th>
            </tr>
        </thead>
        <tbody>
            {#each trainers as trainer}
                <tr>
                    <td>
                        <a href={"#/trainers/" + trainer._id}>
                            {trainer.name}
                        </a>
                    </td>
                    <td>
                        {trainer.gymbadges}
                    </td>
                    <td>
                        {trainer.age}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>
