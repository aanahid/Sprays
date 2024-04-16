async function fetchSprays() {
    let response = await fetch("https://valorant-api.com/v1/sprays");
    let allSprays = await response.json();
    allSprays =  allSprays.data.filter(spray => spray.fullTransparentIcon !== null);
    return allSprays;
}

async function getSpray(allSprays) {
    let max = allSprays.length;
    let num = Math.floor(Math.random() * max)

    if (allSprays[num].animationGif !== null) {
        return allSprays[num].animationGif;
    } 
    else {
        return allSprays[num].fullTransparentIcon;
    } 
}

async function fetchCosmetics() {
    let response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
    let cosmetics = await response.json();
    cosmetics = cosmetics.data.filter(cosmetic => cosmetic.type?.value == "spray" && cosmetic.images.other?.decal !== null);
    return cosmetics;
}

async function getCosmetic(cosmetics) {

    let max = cosmetics.length;
    let num = Math.floor(Math.random() * max)

    return cosmetics[num].images.other.decal;
}

let allSprays = await fetchSprays(); 
let someCosmetics = await fetchCosmetics();

let sprayDivs = document.querySelectorAll('.spray');

// Loop through each div and add a click event listener
sprayDivs.forEach(function(div) {
    div.addEventListener('click', async function() {
        const boo = Math.random() < 0.5;
        let sprayUrl = "";

        if (boo) {
            sprayUrl = await getSpray(allSprays); 
        }
        else {
            sprayUrl = await getCosmetic(someCosmetics);
        }

        div.querySelector("img").src = sprayUrl;
        div.querySelector("img").alt = "spray";
        console.log('Div clicked:', div.querySelector("img").id);
    });
});
