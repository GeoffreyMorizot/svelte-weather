<script lang="ts">
  export let forecastByDay: any;
  export let day: any;
</script>

<ul class="cards">
  {#each forecastByDay()[day] as item}
    <li class="card">
      <span class="card__hour">{new Date(item.dt * 1000).getHours()}H</span>
      <div class="weather">
        <img
          src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
          alt="weather icon"
        />

        <span class="weather__temp">{Math.round(item.main.temp)} C°</span>
      </div>
    </li>
  {/each}
</ul>

<style scoped>
  .cards {
    display: flex;
    gap: 0.5rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    background-color: var(--sky-200);
    border-radius: var(--border-radius);
    align-items: center;
    gap: 0.25rem;
    color: var(--sky-800);
  }

  .card__hour {
    padding: 0.25rem;
    text-align: center;
    width: 100%;
    background-color: var(--sky-500);
    color: var(--sky-50);
  }

  .card .weather {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5rem;
  }

  .card .weather__temp {
    font-size: 1rem;
    font-weight: 600;
  }
</style>
