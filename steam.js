
const API = "https://cs-steam-api.herokuapp.com/features";

// set dom
const display = document.querySelector("#display");
const displayTitle = document.querySelector(".conten-display");
const searchInput = document.querySelector("#searchForm");
const searchButton = document.querySelector("#icon-search");
const categoryGroup = document.querySelector(".category-group");
const homeButton = document.querySelector(".home");
const logo = document.querySelector(".logo-header")
// set API
const dataFetch = async () => {
    try {
        const response = await fetch(API);
        const data = await response.json();
        const resuft = data["data"];
        return resuft;
    } catch (e) {
        console.log(e)
        return;
    }
}

// Create Element render game dislay
const createDislayGame = (el) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<div class="game-wapper">
    <div class="children" onclick="detail(${el["appid"]})">
    <img src="${el["header_image"]}" data-id="${el["appid"]}" />
    </div>
    <div class="game-info">
        <p>${el["name"]}</p>
        <p>price:${el["price"]}$</p>
    </div>`
    display.appendChild(newDiv)
}

// Create Elemen reden detail 
const createDetailGame = (data) => {

    displayTitle.innerHTML = data.genres;
    const newDiv = document.createElement("div")
    newDiv.style = ` background-image: url(${data.background})`
    newDiv.innerHTML = `<div class="show-detail">
    <div class="title-contain">
        <div class="title">${data.name}</div>
    <div class="price">price:${data.price}$</div>
    </div >
    <div class="img-detail">
        <div class=" container-img-backgroud">
            <div>
                <img class="img-detail-left"
                    src="${data.header_image}"
                    alt="${data.name}">
            </div>
            <div class="detail-contain">
                <div class="detail-description">
                    ${data.description}
                </div>
                <div class="game-informations">
                    <p>RELEASE DATE:${data.release_date}</p>
                    <P>DEVELOER :${data.developer}</P>
                    <P>PUBLISHER :${data.publisher}</P>
                </div>
            </div>
        </div>
        <div class="tas-contain">Popular user-defined tags for this product:
            <div class="tags">
                <div class="tag"> <a href="#">${data.steamspy_tags[0]}</a></div>
                <div class="tag"> <a href="#">${data.steamspy_tags[1]}</a></div>
                <div class="tag"> <a href="#">${data.steamspy_tags[2]}</a></div>
                <div class="tag"> <a href="#">Shooter</a></div>
                <div class="tag"> <a href="#">Muilitiplayer</a></div>
                <div class="tag"> <a href="#">RPG</a></div>
            </div>
        </div>
    </div>
</div > `
    display.appendChild(newDiv)
}

// display
const renderDisplay = async () => {
    display.innerHTML = `<div class="loader"></div>`
    const data = await dataFetch();
    display.innerHTML = "";
    displayTitle.innerHTML = "FEATURED & RECOMMENDED"
    data.map(element => {
        createDislayGame(element)
    });
};

// Detail
const detail = async (appid) => {
    display.innerHTML = "";
    const data = await dataFetch();
    data.find((el) => {
        if (el.appid == ("detail", appid)) {
            createDetailGame(el)
        }
    })
}

// CategoryGroup
categoryGroup.addEventListener("click", async (e) => {
    display.innerHTML = "";
    const value = e.target.innerText;
    const data = await dataFetch();

    data.filter((data) => {
        if (data.genres[0].toLowerCase() === value.toLowerCase()) {
            displayTitle.innerHTML = value;
            createDislayGame(data)
        }
    })
});

//Search-Button
searchButton.addEventListener("click", async (e) => {
    const value = searchInput.value;
    display.innerHTML = "";
    const data = await dataFetch();
    data.filter((data) => {
        if (data.name.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
            displayTitle.innerHTML = value;
            createDislayGame(data);
        }
    })
    searchInput.value = "";
});

// Home
homeButton.addEventListener("click", renderDisplay)

// Logo
logo.addEventListener("click", renderDisplay)

// load list game home
renderDisplay()