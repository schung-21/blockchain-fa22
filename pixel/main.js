const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, provider);

getCanvas();

let x;
let y;
let index;
let color = $("#colorpicker").val();

async function getCanvas() {
    const canvas = await contract.getCanvas();
    const pixels = await contract.getPixels();

    console.log(canvas);

    for (let i = 0; i < canvas.length; i++) {
        for (let j = 0; j < canvas.length; j++) {
            $("#canvas").append(`<input 
                type='radio' 
                name='canvas' 
                row='${i}' 
                col='${j}' 
                class='pixel' 
                style='background:${canvas[i][j]};'
            >`);
        }
    }

    $('.pixel').click(function() {
        x = parseInt($(this).attr('row'));
        y = parseInt($(this).attr('col'));
        id = (x * 32) + y;

        let paint = pixels[id][1];
        let cost = pixels[id][2];
        let painter = pixels[id][3];
        $('#transaction').css('opacity', 1);
        $('#color').html(paint ? paint : 'N/A');
        $('#painter').html(painter.slice(0, 5) + '...' + painter.slice(-4));
        $('#repaint-price').html(cost > 0 ? price : '0');
    });
}

$('#colorpicker').change(function() {
    color = $(this).val();
});

$('#submit').click(function() {
    paint();
});

async function paint() {
    await provider.send("eth_requestAccounts", []);
    const tokenWithSigner = contract.connect(signer);

    const pixels = await contract.getPixels();
    let price = pixels[id][2].toString();

    // paint
    await tokenWithSigner.paintPixel(x, y, color); // { value: ethers.utils.parseEther(price) }

    // setting price
    let newPrice;
    $('#setprice').show();

    $('#price').change(function() {
        newPrice = $(this).val();
    });

    $('#confirm').click(function() {
        tokenWithSigner.setPrice(id, newPrice);
    });
}