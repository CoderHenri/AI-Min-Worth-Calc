var FirstOnclickCheck = 0; //stops the 'Start Calculation button from always substracting Axies from the Amount if the button is clicked more than once

function SelectAddress() {
  FirstOnclickCheck = 0; 
  
  document.getElementById("AccountCalculator").disabled = true;
  document.getElementById("AccountCalculator").style.cursor = "not-allowed";

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

    document.getElementById("PlayerOwned").innerHTML = 'Please Click the "Get Prices & Axies" Button after selecting a valid ETH Address';
    document.getElementById("AccountWorthField").innerHTML = 'Please Click the "Get Prices & Axies" Button after selecting a valid ETH Address';
    
}

function GetAxieFloor() {
  FirstOnclickCheck = 0;

  document.getElementById("AccountCalculator").disabled = true;
  document.getElementById("AccountCalculator").style.cursor = "not-allowed";

    var Address;
    Address = document.getElementById("ETHAddress").innerHTML;
    alert(Address);

    
    var PriceNormalURL = "https://axieinfinity.com/api/v2/axies?sale=1&sorting=lowest_price";
    getAxiePrice(PriceNormalURL, "NormalAxiePrice");
    var PriceOriginURL = "https://axieinfinity.com/api/v2/axies?title=Origin&sale=1&sorting=lowest_price";
    getAxiePrice(PriceOriginURL, "OriginAxiePrice");
    var PriceMystic1URL = "https://axieinfinity.com/api/v2/axies?mystic=true&num_mystic=1&offset=0&sale=1&sorting=lowest_price";
    getAxiePrice(PriceMystic1URL, "Mystic1AxiePrice");
    var PriceMystic2URL = "https://axieinfinity.com/api/v2/axies?mystic=true&num_mystic=2&offset=0&sale=1&sorting=lowest_price";
    getAxiePrice(PriceMystic2URL, "Mystic2AxiePrice");
    var PriceMystic3URL = "https://axieinfinity.com/api/v2/axies?mystic=true&num_mystic=3&offset=0&sale=1&sorting=lowest_price";
    getAxiePrice(PriceMystic3URL, "Mystic3AxiePrice");
    var PriceMystic4URL = "https://axieinfinity.com/api/v2/axies?mystic=true&num_mystic=4&offset=0&sale=1&sorting=lowest_price";
    getAxiePrice(PriceMystic4URL, "Mystic4AxiePrice");
    var PriceMEOURL = "https://axieinfinity.com/api/v2/axies?title=meo%20corp&sale=1&sorting=lowest_price";
    getAxiePrice(PriceMEOURL, "MEOAxiePrice");

  async function getAxiePrice(url, id) {
    const resp = await fetch(url);
    const data = await resp.json()
    var Price = data.axies[0].auction.buyNowPrice;
    Price = Price / Math.pow(10, 18);
    Price = Math.round((Price + 0.0000001) * 10000) / 10000
    document.getElementById(id).innerHTML = Price + " ETH";
  }

    var AmountNormalURL = "https://axieinfinity.com/api/v2/addresses/" + Address + "/axies?";
    getAxieAmount(AmountNormalURL, "NormalAxieAmount");
    var AmountOriginURL = "https://axieinfinity.com/api/v2/addresses/" + Address + "/axies?title=Origin";
    getAxieAmount(AmountOriginURL, "OriginAxieAmount");
    var AmountMystic1URL = "https://axieinfinity.com/api/v2/addresses/" + Address + "/axies?mystic=true&num_mystic=1";
    getAxieAmount(AmountMystic1URL, "Mystic1AxieAmount");
    var AmountMystic2URL = "https://axieinfinity.com/api/v2/addresses/" + Address + "/axies?mystic=true&num_mystic=2";
    getAxieAmount(AmountMystic2URL, "Mystic2AxieAmount");
    var AmountMystic3URL = "https://axieinfinity.com/api/v2/addresses/" + Address + "/axies?mystic=true&num_mystic=3";
    getAxieAmount(AmountMystic3URL, "Mystic3AxieAmount");
    var AmountMystic4URL = "https://axieinfinity.com/api/v2/addresses/" + Address + "/axies?mystic=true&num_mystic=4";
    getAxieAmount(AmountMystic4URL, "Mystic4AxieAmount");
    var AmountMEOURL = "https://axieinfinity.com/api/v2/addresses/" + Address + "/axies?title=meo%20corp";
    getAxieAmount(AmountMEOURL, "MEOAxieAmount");

  async function getAxieAmount(url, id) {
    const resp = await fetch(url);
    const data = await resp.json()
    var Amount = data.totalAxies;
    document.getElementById(id).innerHTML = Amount + " Axies";
  }

  document.getElementById("PlayerOwned").innerHTML = 'Please Click the "Start Calculation" Button to correct the Amount of Total to Normal Axies and start the Calculation';
  document.getElementById("AccountWorthField").innerHTML = 'Please Click the "Start Calculation" Button to correct the Amount of Total to Normal Axies and start the Calculation';


  setTimeout(function(){
    document.getElementById("AccountCalculator").disabled = false;
    document.getElementById("AccountCalculator").style.cursor = "default"; 
  }, 3000);
}

function CalcAccWorth() {

  if(FirstOnclickCheck == 0) {
    AxieCountCorrector();
    FirstOnclickCheck = 1;
  }

  var NormAxieWorth;
  NormAxieWorth = Number(document.getElementById("NormalAxiePrice").innerHTML.replace(/[^0-9\.]+/g,"")) * 
  parseFloat(document.getElementById("NormalAxieAmount").innerHTML.replace(/[^0-9]/g,''));
  console.log(parseFloat(document.getElementById("NormalAxiePrice").innerHTML.replace(/[^0-9]/g,'')));
  NormAxieWorth = Math.round((NormAxieWorth + 0.0000001) * 10000) / 10000;
  document.getElementById("NormalAxieWorth").innerHTML = NormAxieWorth + " ETH";

  var OriginAxieWorth;
  OriginAxieWorth = Number(document.getElementById("OriginAxiePrice").innerHTML.replace(/[^0-9\.]+/g,"")) * 
  parseFloat(document.getElementById("OriginAxieAmount").innerHTML.replace(/[^0-9]/g,''));
  console.log(parseFloat(document.getElementById("OriginAxiePrice").innerHTML.replace(/[^0-9]/g,'')));
  OriginAxieWorth = Math.round((OriginAxieWorth + 0.0000001) * 10000) / 10000;
  document.getElementById("OriginAxieWorth").innerHTML = OriginAxieWorth + " ETH";

  var MEOAxieWorth;
  MEOAxieWorth = Number(document.getElementById("MEOAxiePrice").innerHTML.replace(/[^0-9\.]+/g,"")) * 
  parseFloat(document.getElementById("MEOAxieAmount").innerHTML.replace(/[^0-9]/g,''));
  console.log(parseFloat(document.getElementById("MEOAxiePrice").innerHTML.replace(/[^0-9]/g,'')));
  MEOAxieWorth = Math.round((MEOAxieWorth + 0.0000001) * 10000) / 10000;
  document.getElementById("MEOAxieWorth").innerHTML = MEOAxieWorth + " ETH";

  var Mystic1AxieWorth;
  Mystic1AxieWorth = Number(document.getElementById("Mystic1AxiePrice").innerHTML.replace(/[^0-9\.]+/g,"")) * 
  parseFloat(document.getElementById("Mystic1AxieAmount").innerHTML.replace(/[^0-9]/g,''));
  console.log(parseFloat(document.getElementById("Mystic1AxiePrice").innerHTML.replace(/[^0-9]/g,'')));
  Mystic1AxieWorth = Math.round((Mystic1AxieWorth + 0.0000001) * 10000) / 10000;
  document.getElementById("Mystic1AxieWorth").innerHTML = Mystic1AxieWorth + " ETH";

  var Mystic2AxieWorth;
  Mystic2AxieWorth = Number(document.getElementById("Mystic2AxiePrice").innerHTML.replace(/[^0-9\.]+/g,"")) * 
  parseFloat(document.getElementById("Mystic2AxieAmount").innerHTML.replace(/[^0-9]/g,''));
  console.log(parseFloat(document.getElementById("Mystic2AxiePrice").innerHTML.replace(/[^0-9]/g,'')));
  Mystic2AxieWorth = Math.round((Mystic2AxieWorth + 0.0000001) * 10000) / 10000;
  document.getElementById("Mystic2AxieWorth").innerHTML = Mystic2AxieWorth + " ETH";

  var Mystic3AxieWorth;
  Mystic3AxieWorth = Number(document.getElementById("Mystic3AxiePrice").innerHTML.replace(/[^0-9\.]+/g,"")) * 
  parseFloat(document.getElementById("Mystic3AxieAmount").innerHTML.replace(/[^0-9]/g,''));
  console.log(parseFloat(document.getElementById("Mystic3AxiePrice").innerHTML.replace(/[^0-9]/g,'')));
  Mystic3AxieWorth = Math.round((Mystic3AxieWorth + 0.0000001) * 10000) / 10000;
  document.getElementById("Mystic3AxieWorth").innerHTML = Mystic3AxieWorth + " ETH";

  var Mystic4AxieWorth;
  Mystic4AxieWorth = Number(document.getElementById("Mystic4AxiePrice").innerHTML.replace(/[^0-9\.]+/g,"")) * 
  parseFloat(document.getElementById("Mystic4AxieAmount").innerHTML.replace(/[^0-9]/g,''));
  console.log(parseFloat(document.getElementById("Mystic4AxiePrice").innerHTML.replace(/[^0-9]/g,'')));
  Mystic4AxieWorth = Math.round((Mystic4AxieWorth + 0.0000001) * 10000) / 10000;
  document.getElementById("Mystic4AxieWorth").innerHTML = Mystic4AxieWorth + " ETH";

  var TotalWorth;
  TotalWorth = NormAxieWorth + OriginAxieWorth + MEOAxieWorth + Mystic1AxieWorth +
  Mystic2AxieWorth + Mystic3AxieWorth + Mystic4AxieWorth;
  TotalWorth = Math.round((TotalWorth + 0.0000001) * 10000) / 10000;
  document.getElementById("EntireAccountWorthField").innerHTML = TotalWorth + " ETH";

  document.getElementById("PlayerOwned").innerHTML = 'Axies owned by the input Account';
  document.getElementById("AccountWorthField").innerHTML = 'Minimum Worth of the Account according to price floor of the Axie Marketplace';
}

function AxieCountCorrector() {
  var TotalAxies = parseFloat(document.getElementById("NormalAxieAmount").innerHTML.replace(/[^0-9]/g,''));
  var NonNormalAxies = parseFloat(document.getElementById("OriginAxieAmount").innerHTML.replace(/[^0-9]/g,'')) + parseFloat(document.getElementById("MEOAxieAmount").innerHTML.replace(/[^0-9]/g,'')) +
  parseFloat(document.getElementById("Mystic1AxieAmount").innerHTML.replace(/[^0-9]/g,'')) + parseFloat(document.getElementById("Mystic2AxieAmount").innerHTML.replace(/[^0-9]/g,'')) + 
  parseFloat(document.getElementById("Mystic3AxieAmount").innerHTML.replace(/[^0-9]/g,'')) + parseFloat(document.getElementById("Mystic4AxieAmount").innerHTML.replace(/[^0-9]/g,''));
  var NormalAxies = TotalAxies - NonNormalAxies;
  document.getElementById("NormalAxieAmount").innerHTML = NormalAxies + " Axies";

  var TotalOriginAxies = parseFloat(document.getElementById("OriginAxieAmount").innerHTML.replace(/[^0-9]/g,''));
  var MysticAxies = parseFloat(document.getElementById("Mystic1AxieAmount").innerHTML.replace(/[^0-9]/g,'')) + parseFloat(document.getElementById("Mystic2AxieAmount").innerHTML.replace(/[^0-9]/g,'')) + 
  parseFloat(document.getElementById("Mystic3AxieAmount").innerHTML.replace(/[^0-9]/g,'')) + parseFloat(document.getElementById("Mystic4AxieAmount").innerHTML.replace(/[^0-9]/g,''));
  var OriginAxies = TotalOriginAxies - MysticAxies;
  document.getElementById("OriginAxieAmount").innerHTML = OriginAxies + " Axies";
}

var Verstecken = 1;

function ShowHide() {
  if(Verstecken == 1) {
    document.getElementById("AdvancedAxieFloorButton").style.visibility = "visible";
    document.getElementById("AdvancedAccountCalculator").style.visibility = "visible";
    alert("Please be aware that Categories are not mutually exclusive! So if, for example an Account has a pure Axie that is a Virgin too, it will be counted in both categories!");
    alert("Please be also aware that a chosen Category can be highly illiquid and there is no guarantee that your Axies will sell for the price displayed here!");
    Verstecken --;
  } else {
    document.getElementById("AdvancedAxieFloorButton").style.visibility = "hidden";
    document.getElementById("AdvancedAccountCalculator").style.visibility = "hidden";
    Verstecken ++;
  }
}

function AdvancedGetAxieFloor() {
  ChooseAdvancedFilters();
  
}

function ChooseAdvancedFilters() {
  alert("2");
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