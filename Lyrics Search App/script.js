const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiUrl = "https://api.lyrics.ovh";

async function searchSong(term) {
  const response = await fetch(`${apiUrl}/suggest/${term}`);
  const data = await response.json();

  showData(data);
}

async function getLyrics(artist, songTitle) {
  const response = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`);
  const data = await response.json();
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");
  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;
  more.innerHTML = "";
}

function showData(data) {
  //   let output = "";

  //   data.data.forEach((song) => {
  //     output += `
  //         <li>
  //             <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //             <button class="btn" data-artis="${song.artist.name}"
  //             data-songtitle="${song.title}">Get Lyrcis</button>
  //         </li>
  //         `;
  //   });

  //   result.innerHTML = `
  //     <ul class='songs'>${output}</ul>
  //   `;

  result.innerHTML = `
    <ul class='songs'>
    ${data.data
      .map(
        (song) => `
    <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}" 
        data-songtitle="${song.title}">Get Lyrcis</button>
    </li>
    `
      )
      .join("")}
    </ul>
  `;

  if (data.prev || data.next) {
    more.innerHTML = `
      ${
        data.prev
          ? `<button class ="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
          : ""
      }
      ${
        data.next
          ? `<button class ="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
          : ""
      }
      `;
  } else {
    more.innerHTML = "";
  }
}

async function getMoreSongs(url) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`); //heroku is here because of CORS
  const data = await response.json();

  showData(data);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (!searchTerm) {
    alert("Please type in a search");
  } else {
    searchSong(searchTerm);
  }
});

result.addEventListener("click", (e) => {
  const clickedElement = e.target;
  if (clickedElement.tagName === "BUTTON") {
    const artist = clickedElement.getAttribute("data-artist");
    const songTitle = clickedElement.getAttribute("data-songtitle");

    getLyrics(artist, songTitle);
  }
});
