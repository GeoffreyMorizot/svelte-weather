<script lang="ts">
  import CurrentWeather from "./lib/CurrentWeather.svelte";
  import SearchCity from "./lib/SearchCity.svelte";
  import type { WeatherData } from "../types/Weather";
  import type { Coord } from "../types/Location";
  import ForecastWeather from "./lib/ForecastWeather.svelte";

  const url = import.meta.env.VITE_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  let weather: WeatherData | null = null;
  let forecast: ForecastWeather | null = null;

  async function fetchWeather(e: CustomEvent<{ coord: Coord }>) {
    const response = await fetch(
      `${url}/weather?lat=${e.detail.coord.lat}&lon=${e.detail.coord.lon}&&units=metric&lang=fr&appid=${apiKey}`
    );
    weather = await response.json();
  }

  async function fetchForecast(e: CustomEvent<{ coord: Coord }>) {
    const response = await fetch(
      `${url}/forecast?lat=${e.detail.coord.lat}&lon=${e.detail.coord.lon}&&units=metric&lang=fr&appid=${apiKey}`
    );
    forecast = await response.json();
  }

  function handleCitySelected(e: CustomEvent<{ coord: Coord }>) {
    fetchWeather(e);
    fetchForecast(e);
  }

  console.log();
</script>

<header class="header">
  <SearchCity
    on:citySelected={(e) => {
      handleCitySelected(e);
    }}
  />
</header>

<main class="main">
  <div class="container">
    {#if weather && forecast}
      {#if weather}
        <CurrentWeather {weather} />
      {/if}
      <div class="map" />
      {#if forecast}
        <ForecastWeather {forecast} />
      {/if}
    {:else}
      <h1 class="no-data">Rechercher une ville</h1>
    {/if}
  </div>
</main>

<style scoped>
  .header {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 3rem 0;
    background-color: var(--sky-500);
  }

  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    flex-grow: 1;
    background-color: var(--sky-100);
    width: 100%;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2rem;
    margin: 3rem;
    width: 100%;
    max-width: 900px;
  }

  .no-data {
    font-size: 6vw;
    font-weight: 600;
    color: var(--sky-200);
    grid-column: 1 / span-1;
    place-items: center;
    margin: 0 auto;
  }

  .map {
    grid-column: 3 / span 3;
    border-radius: var(--border-radius);
    background-color: var(--sky-200);
  }
</style>
