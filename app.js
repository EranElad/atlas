const init = async () => {
  document.querySelector("#content").style.display = "none";
  initEvent();
};

const initEvent = () => {
  document
    .querySelector("#search_button")
    .addEventListener("click", async function () {
      const query = document.querySelector("#search_input").value;
      displayCountry(query);
      document.querySelector("#search_input").value = query;
    });
};

const displayCountry = async (query) => {
  const country = await search(query);
  render(country);
  document.querySelector("#search_input").value = "";
  document.querySelector("#content").style.display = "block";
};

const search = async (country) => {
  let result = await fetch(`https://restcountries.com/v3.1/name/${country}
    `);
  const countryObj = (await result.json())[0];

  result = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${countryObj.borders.join(",")}`
  );
  const fullNames = (await result.json()).map((c) => c.name.common);

  countryObj.borders = fullNames;

  return countryObj;
};

const render = (country) => {
  document.querySelector("#name").innerHTML = `Name: ${country.name.common}`;
  document.querySelector(
    "#pop"
  ).innerHTML = `population: ${country.population}`;
  document.querySelector("#region").innerHTML = `region: ${country.region}`;
  document.querySelector("#lang").innerHTML = `languages: ${Object.values(
    country.languages
  ).join(", ")}`;
  document.querySelector("#coin").innerHTML = `currency: ${
    Object.keys(country.currencies)[0]
  }`;
  document.querySelector("#capital").innerHTML = `capital: ${country.capital}`;
  document.querySelector(
    "#id_map"
  ).src = `https://maps.google.com/maps?hl=en&q=${country.name.common}&ie=UTF8&iwloc=B&z=6&output=embed`;
  document.querySelector("#id_img").src = country.flags.png;
  document.querySelector(
    "#borders"
  ).innerHTML = `Borders: ${country.borders.join(", ")}`;
};

init();
