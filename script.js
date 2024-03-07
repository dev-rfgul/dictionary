

const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;
  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                  1: ${data[0].meanings[0].definitions[0].definition}
                   
                </p>
                <p class="word-meaning">
                <br>
                    2:${data[0].meanings[0].definitions[1].definition} 
                   
                </p>
                <p class="word-meaning">
                <br>
                    2:${data[0].meanings[0].definitions[2].definition} 
                   
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
      sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
      console.log(sound);

      // Get a reference to the audio element by its ID
      const audioElement = document.getElementById("sound");

      // Get the value of the src attribute
      const srcValue = audioElement.getAttribute("src");

      // Now, srcValue contains the URL of the audio source
      console.log(srcValue);
    })
    // .catch(() => {
    //   result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    // });
});
function playSound() {
    sound.play();
}


btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (Array.isArray(data) && data.length > 0) {
          const wordData = data[0];
          const pronunciation = wordData.phonetic || "";
  
          // Clear the result container before adding new content
          result.innerHTML = "";
  
          // Display the word and pronunciation
          const wordHeader = document.createElement("div");
          wordHeader.classList.add("word");
          wordHeader.innerHTML = `
            <h3>${inpWord}</h3>
            <button onclick="playSound()">
              <i class="fas fa-volume-up"></i>
            </button>
          `;
          result.appendChild(wordHeader);
  
          const details = document.createElement("div");
          details.classList.add("details");
          details.innerHTML = `
            <p>${wordData.meanings[0].partOfSpeech || ""}</p>
            <p> /${pronunciation}/</p>
          `;
          result.appendChild(details);
  
          // Iterate through the meanings and display the first two meanings and examples
          for (let i = 0; i < 2 && i < wordData.meanings.length; i++) {
            const meaning = wordData.meanings[i];
            const definitions = meaning.definitions || [];
            const examples = definitions
              .filter((definition) => definition.example)
              .slice(0, 2); // Display up to 2 examples
  
            const meaningElement = document.createElement("p");
            meaningElement.classList.add("word-meaning");
            meaningElement.innerHTML = `
              ${i + 1}: ${definitions[0].definition || ""}
            `;
            result.appendChild(meaningElement);
  
            examples.forEach((example, index) => {
              const exampleElement = document.createElement("p");
              exampleElement.classList.add("word-example");
              exampleElement.innerHTML = `
                Example ${index + 1}: ${example.example}
              `;
              result.appendChild(exampleElement);
            });
  
            if (meaning.synonyms && meaning.synonyms.length > 0) {
              const synonymElement = document.createElement("p");
              synonymElement.classList.add("word-synonym");
              synonymElement.innerHTML = `
                Synonym: ${meaning.synonyms[0]}
              `;
              result.appendChild(synonymElement);
            }
  
            if (meaning.antonyms && meaning.antonyms.length > 0) {
              const antonymElement = document.createElement("p");
              antonymElement.classList.add("word-antonym");
              antonymElement.innerHTML = `
                Antonym: ${meaning.antonyms[0]}
              `;
              result.appendChild(antonymElement);
            }
          }

          
          sound.setAttribute("src", `${data[0].phonetics[1].audio}`);
          //       console.log(sound);
          // Handle audio pronunciation here, possibly by offering options for multiple pronunciations.

        } else {
          result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
      });

      function playSound() {
               sound.play();
         }
  });
  
  