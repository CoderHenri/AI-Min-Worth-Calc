function SelectAddress() {
    var txt;
    var PopUp = prompt("Please enter your ETH Address with your Axies:", "0x...");
    if (PopUp == null || PopUp == "") 
    {
        txt = "User cancelled the prompt.";
    } else if (PopUp.startsWith("0x") && PopUp.length == 42) {
        txt = PopUp;
    } else {
        txt = "Please enter a real ETH Address (starts with 0x... and has 42 Characters)";
    }
    document.getElementById("ETHAddress").innerHTML = txt;
}