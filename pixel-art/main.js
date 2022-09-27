const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, provider);

getCanvas();

let pixelRow;
let pixelCol;
let color = $("#colorpicker").val();

$('#submit').click(function() {
    paintPixel();
});

async function getCanvas() {
    const canvasData = await contract.getCanvas();
    console.log(canvasData);

    for (let i = 0; i < canvasData.length; i++) {
        for (let j = 0; j < canvasData.length; j++) {

            $("#canvas").append(`<input 
                type='radio' 
                name='canvas' 
                id='x${i}y${j}' 
                class='pixel' 
                style='background:${canvasData[i][j]};'
            >`);
        }
    }

    $('.pixel').click(function() {
        let pixelId=$(this).attr('id');
        let row = parseInt(pixelId[1]);
        let col = parseInt(pixelId[3]);
        
        pixelRow = row;
        pixelCol = col;
    });
}

$('#colorpicker').change(function() {
    color = $(this).val();
});

async function paintPixel() {
    await provider.send("eth_requestAccounts", []);
    const tokenWithSigner = contract.connect(signer);

    tokenWithSigner.paintPixel(pixelRow, pixelCol, color);
}

