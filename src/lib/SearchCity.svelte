<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Coord, LocationCity } from "../../types/Location";

  const url = import.meta.env.VITE_BASE_URL;
  const apiKey = import.meta.env.VITE_API_KEY;

  let searchValue = "";
  let cities: LocationCity[];

  const dispatch = createEventDispatcher<{ citySelected: { coord: Coord } }>();

  async function fetchCities(searchValue: string) {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=3&appid=${apiKey}`
    );
    cities = await response.json();
  }

  function handleSubmit(e: SubmitEvent) {
    if (!searchValue) return;
    fetchCities(searchValue);
  }

  function handleClick(coord: Coord) {
    dispatch("citySelected", {
      coord,
    });
    cities = null;
  }
</script>

<div class="search">
  <form class="search__form" on:submit|preventDefault={(e) => handleSubmit(e)}>
    <input
      type="search"
      placeholder="Rechercher une ville"
      id="search"
      name="search"
      bind:value={searchValue}
    />
    <button>Rechercher</button>
  </form>

  {#if cities}
    <ul class="result">
      {#each cities as { name, lat, lon, country, state }}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li class="result__item" on:click={() => handleClick({ lat, lon })}>
          <img
            height="32"
            width="32"
            src={`https://flagsapi.com/${country}/flat/64.png`}
            alt=""
          />
          <span class="item__name">{name},</span>
          <span class="item__state">{state}</span>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style scoped>
  .search {
    position: relative;
    display: flex;
    justify-content: center;
    width: 400px;
  }
  .search__form {
    display: flex;
    gap: 0.5rem;
    width: clamp(200px, 100%, 400px);
  }

  .search__form input {
    flex-grow: 1;
  }

  .result {
    position: absolute;
    top: calc(100% + 1rem);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;
    width: 100%;
    padding: 0;
  }

  .result__item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    background-color: var(--sky-700);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }

  .result__item:hover {
    background-color: #333;
    cursor: pointer;
  }

  .item__name {
    font-weight: bold;
  }

  .item__state {
    color: var(--sky-200);
  }
</style>
