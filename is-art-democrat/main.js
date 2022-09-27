// Provider = MetaMask
const provider = new ethers.providers.Web3Provider(window.ethereum);
// Signer = me (whoever signed into metamask)
const signer = provider.getSigner();
console.log(signer);
// Contract = call functions from smart contract
const contract = new ethers.Contract(contractAddress, contractABI, provider);

viewStatus();
viewVotes();

$('#contractAddress').text(contractAddress);

setInterval(function () {
  viewStatus();
  viewVotes();
}, 2000);


$('#voteYes').click(function () {
  voteYes();
})

$('#voteNo').click(function () {
  voteNo();
})

async function viewVotes() {
  const voteCount = await contract.viewVotes();
  $('#yesVotes').text(`${voteCount[0]}`);
  $('#noVotes').text(`${voteCount[1]}`);
}


async function viewStatus() {
  const artStatus = await contract.viewStatus();

  // console.log(artStatus)

  if (artStatus == true) {
    $('#status').text('art').css('color', 'palegreen');
  } else if (artStatus == false) {
    $('#status').text('not art').css('color', 'pink');
  } else {
    $('#status').text('maybe art, maybe not...more votes are required').css('color', 'gray');
  }

  return artStatus;
}

async function voteYes() {
  await provider.send("eth_requestAccounts", []);
  const tokenWithSigner = contract.connect(signer);
  tokenWithSigner.voteYes();
}

async function voteNo() {
  await provider.send("eth_requestAccounts", []);
  const tokenWithSigner = contract.connect(signer);
  tokenWithSigner.voteNo();
}