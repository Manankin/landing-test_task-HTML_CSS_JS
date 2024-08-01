export default async function getResult () {
  const result = await fetch('https://swapi.dev/api/people/1/')
    .then(response => response.json())

    console.log(result)

  return result;
}
