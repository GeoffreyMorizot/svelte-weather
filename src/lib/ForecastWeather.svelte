<script lang="ts">
  import type { ForecastItem } from "../../types/Forecast";
  import { timeStampToDate } from "../utils/date";
  import ForecastCard from "./ForecastCard.svelte";

  export let forecast: any;

  function forecastByDay() {
    return forecast.list.reduce((acc: ForecastItem, item: ForecastItem) => {
      const date = new Date(item.dt * 1000);
      const key = timeStampToDate(item.dt, false);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key] = [...acc[key], item];
      return acc;
    }, {});
  }
</script>

<section class="forecast">
  <h2 class="forecast__title">Prévisions</h2>
  <ul class="days-list">
    {#each Object.keys(forecastByDay()) as day}
      <li>
        <span class="day">{day}</span>
        <ForecastCard {forecastByDay} {day} />
      </li>
    {/each}
  </ul>
</section>

<style>
  .forecast {
    grid-column: 1 / span-1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
  }

  .forecast__title {
    width: 100%;
    color: var(--sky-700);
    font-size: 2.5rem;
  }

  .days-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
  }
  .day {
    color: var(--sky-800);
    font-weight: 600;
    font-size: 1.25rem;
  }
</style>
