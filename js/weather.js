export async function getWeatherTicker() {
  const cities = [
    { name: 'RICHMOND', lat: 37.7479, lon: -84.2947 },
    { name: 'BEREA', lat: 37.5693, lon: -84.2963 },
    { name: 'KIRKSVILLE', lat: 37.6907, lon: -84.1855 },
  ];
  const codeToDesc = (code) => {
    if (code === 0) return 'CLEAR';
    if (code === 1 || code === 2) return 'PARTLY CLOUDY';
    if (code === 3) return 'OVERCAST';
    if (code === 45 || code === 48) return 'FOG';
    if ([51, 53, 55, 56, 57].includes(code)) return 'DRIZZLE';
    if ([61, 63, 65, 66, 67].includes(code)) return 'RAIN';
    if ([71, 73, 75, 77].includes(code)) return 'SNOW';
    if ([80, 81, 82].includes(code)) return 'SHOWERS';
    if ([95, 96, 99].includes(code)) return 'THUNDERSTORMS';
    return 'UNSETTLED';
  };
  try {
    const results = await Promise.all(cities.map(async (c) => {
      const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + c.lat + '&longitude=' + c.lon + '&current=temperature_2m,weather_code&temperature_unit=fahrenheit';
      const res = await fetch(url);
      const data = await res.json();
      const temp = Math.round(data.current.temperature_2m);
      const desc = codeToDesc(data.current.weather_code);
      return c.name + ' ' + temp + '°F ' + desc;
    }));
    return 'MADISON COUNTY WEATHER · ' + results.join(' · ') + ' · ALL EYES ON THE SKY';
  } catch (e) {
    return 'MADISON COUNTY WEATHER · CONDITIONS UNDER SURVEILLANCE · ALL EYES ON THE SKY';
  }
}
