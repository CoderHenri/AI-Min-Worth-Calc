function SelectAddress() {
    var txt;
    var PopUp = prompt("Please enter your ETH Address with your Axies:", "0x...");
    if (PopUp == null || PopUp == "") 
    {
        txt = "User cancelled the prompt.";
        document.getElementById("AxieFloorButton").disabled = true;
        document.getElementById("AxieFloorButton").style.cursor = "not-allowed";
    } else if (PopUp.startsWith("0x") && PopUp.length == 42) {
        txt = PopUp;
        document.getElementById("AxieFloorButton").disabled = false;
        document.getElementById("AxieFloorButton").style.cursor = "default"; 
    } else {
        txt = "Please enter a real ETH Address";
        document.getElementById("AxieFloorButton").disabled = true;
        document.getElementById("AxieFloorButton").style.cursor = "not-allowed";
    }
    document.getElementById("ETHAddress").innerHTML = txt;
}

function GetAxieFloor() {
    var Address;
    Address = document.getElementById("ETHAddress").innerHTML;
    alert(Address);

    

    var PriceNormalVirinURL;

    var PriceNormalNonVirginURL;
    var PriceOriginURL;
    var PriceMystic1URL = "https://axieinfinity.com/api/v2/axies?mystic=true&offset=1&sale=1&sorting=lowest_price";
    getAxiePrice(PriceMystic1URL);
    var PriceMystic2URL;
    var PriceMystic3URL;
    var PriceMystic4URL;
    var PriceMEOURL;

  async function getAxiePrice(url) {
    const resp = await fetch(url);
    const data = await resp.json()
    var Price = data.axies[0].auction.buyNowPrice;
    Price = Price / Math.pow(10, 18);
    console.log(Price);
    document.getElementById("Mystic1AxiePrice").innerHTML = Price + " ETH";
  }
}





// alte teilweise funktionierende API aufruf Code Stücke:

    /*
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var List = JSON.parse(this.responseText);
            console.log(List.axies[0].auction.buyNowPrice)
            PriceMystic1 = List.axies[0].auction.buyNowPrice;
            }
    };
    xmlhttp.open("GET", "https://axieinfinity.com/api/v2/axies?mystic=true&offset=1&sale=1&sorting=lowest_price", true);
    xmlhttp.send(); 

    console.log(PriceMystic1);
    */

    /*
   PriceMystic1 = await fetch('https://axieinfinity.com/api/v2/axies?mystic=true&offset=1&sale=1&sorting=lowest_price')
   .then((response) => {
     return response.json();
   })
   .then((data) => {
     console.log(data.axies[0].auction.buyNowPrice);
     PriceMystic1 = data.axies[0].auction.buyNowPrice;
     console.log(PriceMystic1);
     return data.axies[0].auction.buyNowPrice;
   });
   console.log(PriceMystic1);
*/

/*
async function getAxiePrice(name) 
{
  let response = await fetch("https://axieinfinity.com/api/v2/axies?mystic=true&offset=1&sale=1&sorting=lowest_price");
  let data = await response.json()
  return data;
}

getAxiePrice('yourUsernameHere')
  .then(data => console.log(data.axies[0].auction.buyNowPrice));
  let PriceMystic1 = getAxiePrice().then(data => return data.axies[0].auction.buyNowPrice);
    console.log(PriceMystic1);


console.log(PriceMystic1);
*/