async function getCat() {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search`);
  const json = await response.json();
  document.getElementById("img").src = json[0].url;
}
getCat();
