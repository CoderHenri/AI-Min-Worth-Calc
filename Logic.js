function SelectAddress() {
    var txt;
    var PopUp = prompt("Please enter your ETH Address with your Axies:", "0x...");
    if (PopUp == null || PopUp == "") 
    {
        txt = "User cancelled the prompt.";
        document.getElementById("WorthCalculator").disabled = true;
    } else if (PopUp.startsWith("0x") && PopUp.length == 42) {
        txt = PopUp;
        document.getElementById("WorthCalculator").disabled = false; 
    } else {
        txt = "Please enter a real ETH Address (starts with 0x... and has 42 Characters)";
        document.getElementById("WorthCalculator").disabled = true;
    }
    document.getElementById("ETHAddress").innerHTML = txt;
}

function CalculateWorth() {
    var Address;
    Address = document.getElementById("ETHAddress").innerHTML;
    alert(Address);
}