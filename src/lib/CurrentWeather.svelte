<script lang="ts">
  import type { WeatherData } from "../../types/Weather";
  import { capitalize } from "../utils/capitalize";

  export let weather: WeatherData;

  $: temp = Math.round(weather.main.temp);
  $: tMax = Math.round(weather.main.temp_max);
  $: tMin = Math.round(weather.main.temp_min);

  const formatter = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateNow = formatter.format(new Date());
</script>

<!-- <pre>{JSON.stringify(weather, null, 2)}</pre> -->
{#if weather}
  <section class="weather">
    <div class="weather__header">
      <p class="header__date">{dateNow}</p>
      <div class="header__location">
        <img
          height="32"
          width="32"
          src={`https://flagsapi.com/${weather.sys.country}/flat/32.png`}
          alt=""
        />
        <p>{weather.name}, {weather.sys.country}</p>
      </div>
    </div>
    <div class="weather__content">
      <div class="weather__temp-desc-icon">
        <div class="weather__temp-desc">
          <p class="weather__temp">{temp} C°</p>
          <p class="weather__description">
            {capitalize(weather.weather[0].description)}
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt=""
        />
      </div>
      <div class="temps">
        <p class="temp__min">{tMin} C° min</p>
        <p class="temp__max">{tMax} C° max</p>
      </div>
    </div>
  </section>
{/if}

<style scoped>
  .weather {
    display: flex;
    flex-direction: column;
    grid-column: 1 / span 2;
    border-radius: var(--border-radius);
    background-color: var(--sky-200);
    color: var(--sky-700);
    overflow: hidden;
  }

  .weather__header {
    padding: 1rem;
    background-color: var(--sky-500);
    color: var(--sky-50);
  }

  .weather__content {
    padding: 1rem;
  }

  .weather__temp-desc-icon {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .header__date {
    font-size: 1rem;
  }

  .weather__temp {
    font-size: 3rem;
    line-height: 1;
    font-weight: bold;
    color: var(--sky-700);
    text-edge: text;
  }

  .header__location {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .temps {
    display: flex;
    gap: 1rem;
    margin-top: 0.75rem;
  }

  .temp__min {
    color: var(--sky-500);
  }

  .temp__max {
    color: var(--sky-500);
  }
</style>
