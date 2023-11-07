const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");
const showDog = document.querySelector(".show-dog");

const endpoint = `https://dog.ceo/api/breeds/list/all`;

const allBreeds = [];

fetch(endpoint)
   .then((resp) => resp.json())
   .then((resp) => {
      const breeds = resp.message;
      for (let breed in breeds) {
         breeds[breed].length > 0
            ? breeds[breed].forEach((subBreed) => {
                 allBreeds.push(`${breed} ${subBreed}`);
              })
            : allBreeds.push(breed);
      }
   });

function findMatches(wordToMatch, allBreeds) {
   return allBreeds.filter((breed) => {
      const regex = new RegExp(wordToMatch, "gi");
      return breed.match(regex);
   });
}

function displayMatches() {
   const matchArray = findMatches(this.value, allBreeds);
   const html = matchArray
      .map((breed) => {
         return `
         <li>
            <span class="breed">${breed}</span>
         </li>
         
         `;
      })
      .join("");
   suggestions.innerHTML = html;
   const selTarget = document.querySelectorAll(".breed");
   selTarget.forEach((el) => {
      el.addEventListener("click", (e) => {
         const eTargetValue = e.target.innerText;
         showDogImg(eTargetValue);
         searchInput.value = eTargetValue;
         suggestions.innerHTML = "";
      });
   });
}

function showDogImg(target) {
   console.log(typeof target);
   const newTarget = target.split(/[,.\s]/);
   console.log(newTarget);
   let breed = newTarget[0];
   let subBreed = newTarget[1];

   if (subBreed === undefined) {
      fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
         .then((resp) => resp.json())
         .then((resp) => {
            console.log(resp.message);
            showDog.innerHTML = `<img src="${resp.message}"/>`;
         });
   } else {
      fetch(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`)
         .then((resp) => resp.json())
         .then((resp) => {
            console.log(resp.message);
            showDog.innerHTML = `<img src="${resp.message}"/>`;
         });
   }
}

searchInput.addEventListener("onfocusout", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
