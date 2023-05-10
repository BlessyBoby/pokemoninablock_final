App = {
  web3: null,
  contracts: {},
  address: "0xa6763B5B418F9B527dA1Bec778e2f13a61fAe927",
  url: "http://127.0.0.1:7545",
  network_id: 5, 
  handler: null,
  value: 1000000000000000000,
  index: 0,
  margin: 10,
  left: 15,
  init: function () {
    return App.initWeb3();
  },

  initWeb3: function () {
    if (typeof web3 !== "undefined") {
      App.web3 = new Web3(Web3.givenProvider);
    } else {
      App.web3 = new Web3(App.url);
    }
    ethereum.request({ method: "eth_requestAccounts" });
    return App.initContract();
  },

  initContract: async function () {
    App.contracts.PokemonInABlock = new App.web3.eth.Contract(App.abi, App.address, {});
    return App.bindEvents();
  },

  bindEvents: function () {

    // $(document).ready(function () {
    //    App.givecount();
    // });

    $(document).on("click", "#newcard", function () {
      console.log(jQuery("#name").val(), )
      App.handleNewCard(jQuery("#name").val(), jQuery("#ability").val());      
    });

    $(document).on("click", "#buycard", function () {
      App.handleBuyCard(jQuery("#tokenid3").val());
    });
    $(document).on("click", "#transfercard", function () {
      App.handleTransferCard(jQuery("#toadress").val(),jQuery("#tokenid1").val());
    });
    $(document).on("click", "#on-sale", function () {
      App.handleOnSale(jQuery("#tokenId").val(),jQuery("#price").val());
    });
    $(document).on("click", "#off-sale", function () {
      App.handleOffSale(jQuery("#tokenId").val());
    });
    $(document).on("click", "#join", function () {
      App.handleJoin();
    });
    $(document).on("click", "#remove", function () {
      App.handleRemove(jQuery("#address").val());
    });
    App.populateAddress();
  },

  givecount: async function() {
    App.current_account = await ethereum.request({method: 'eth_accounts'});
    App.contracts.PokemonInABlock.events.giveCount(function(error,result){
      console.log(result.returnValues.tokens)
      App.contracts.PokemonInABlock.events.onCreatePokemonCard(function(error, result) {
      
        if (!error){
          
          
          console.log("func is called");
         
         let res =  result.returnValues.pokemon
   //       console.log("res",result)
         const card = '<div class="col-lg-3 mb-4"><div class="card">' + 
           '<div class="card-header p-0">' +
           '<img src="images/card.jpg" alt="Header Image" class="w-100">' +
         '</div>' +
         '<div class="card-body">' +
         '<p class="card-text font-weight-bold">Token Id: ' + res.tokenId+ '</p>' +
           '<p class="card-text font-weight-bold">Pokemon Name: ' + res.name + '</p>' +
           '<p class="card-text font-weight-bold">Ability: ' + res.ability+ '</p>' +
           '<p class="card-text font-weight-bold">Owner: ' + res.owner+ '</p>' +
          '<p class="card-text font-weight-bold">isOnSale: ' + res.isOnSale + '</p>' +
           '</div>' +
           '</div></div>';
         
         $('#assets').append(card);
          
   //       //App.fetchAllAssets(res.name,res.ability,res.owner,res.tokenId,res.isOnSale);
        } else {
          toastr.error(App.getErrorMessage(error), "Reverted!");
        }
      
     });
      for(let i=1;i<result.returnValues.tokens;i++){
        App.contracts.PokemonInABlock.methods.displayCards(i).send({from:App.current_account[0]}).on('onCreatePokemonCard', function(event){
          console.log(event); 
    
      })
         .on("error", (err) => {
           toastr.error(App.getErrorMessage(err), "Reverted!");
        });
      }
    })
    App.contracts.PokemonInABlock.methods.showCount().send({from:App.current_account[0]}).on('giveCount', function(event){
      console.log(event); 

  })
     .on("error", (err) => {
       toastr.error(App.getErrorMessage(err), "Reverted!");
    });
  },
  populateAddress: async function () {
    const accounts = await App.web3.eth.getAccounts();
    App.handler = accounts[0];
  },

  handleRemove: function (address) {
    if ( address === "" ) {
      
      console.log("blank")
      
      return false;
    }
    var option = { from: App.handler };
    App.contracts.PokemonInABlock.methods
      .removeMember(address)
      .send(option)
       .on('transactionHash',(hash)=>{
        
        alert("success")
        
      })
       .on("error", (err) => {
        alert("fail")
         toastr.error(App.getErrorMessage(err), "Reverted!");
      });

  },

  handleJoin: function () {
    var option = { from: App.handler };
    App.contracts.PokemonInABlock.methods
      .joinMember()
      .send(option)
       .on('transactionHash',(hash)=>{
        
        alert("success")
        
      })
       .on("error", (err) => {
        alert("fail")
         toastr.error(App.getErrorMessage(err), "Reverted!");
      });

  },


  handleNewCard: async function (name,ability) {
    if (name === "" ||  ability === "" ) {
      
      console.log("blank")
      //App.fetchAllAssets();
      return false;
    }

    console.log(name, ability)
    var option = { from: App.handler };
    App.current_account = await ethereum.request({method: 'eth_accounts'});
    console.log(App.current_account);
    console.log(App.contracts.PokemonInABlock);
    let count =0;
  //    App.contracts.PokemonInABlock.events.onCreatePokemonCard(function(error, result) {
  //      if (!error){
  //        count = count+1;
  //        if(count == 1)
  //        {
  //        console.log("func is called");
        
  //       let res =  result.returnValues.pokemon
  // //       console.log("res",result)
  //       const card = '<div class="col-lg-3 mb-4"><div class="card">' + 
  //         '<div class="card-header p-0">' +
  //         '<img src="images/card.jpg" alt="Header Image" class="w-100">' +
  //       '</div>' +
  //       '<div class="card-body">' +
  //       '<p class="card-text font-weight-bold">Token Id: ' + res.tokenId+ '</p>' +
  //         '<p class="card-text font-weight-bold">Pokemon Name: ' + res.name + '</p>' +
  //         '<p class="card-text font-weight-bold">Ability: ' + res.ability+ '</p>' +
  //         '<p class="card-text font-weight-bold">Owner: ' + res.owner+ '</p>' +
  //        '<p class="card-text font-weight-bold">isOnSale: ' + res.isOnSale + '</p>' +
  //         '</div>' +
  //         '</div></div>';
        
  //       $('#assets').append(card);
  //        }
  //       //App.fetchAllAssets(res.name,res.ability,res.owner,res.tokenId,res.isOnSale);
       //} else {
         //toastr.error(App.getErrorMessage(error), "Reverted!");
      // }
     
   // });

     App.contracts.PokemonInABlock.methods.createPokemonCard(name,ability)
    //   // .send(option)
    //   // .call()
       .send({from:App.current_account[0]})

        .on('transactionHash',(hash)=>{
          const card = '<div class="col-lg-3 mb-4"><div class="card">' + 
          '<div class="card-header p-0">' +
          '<img src="images/card.jpg" alt="Header Image" class="w-100">' +
        '</div>' +
        '<div class="card-body">' +
          '<p class="card-text font-weight-bold">Pokemon Name: ' +name + '</p>' +
          '<p class="card-text font-weight-bold">Ability: ' + ability+ '</p>' +
          '</div>' +
          '</div></div>';
        
        $('#assets').append(card);
        
       })
       .on('onCreatePokemonCard', function(event){
         console.log(event); // same results as the optional callback above
     })
        .on("error", (err) => {
          toastr.error(App.getErrorMessage(err), "Reverted!");
       });
      
  },

  handleOnSale: function (tokenId,price) {
    console.log("here")
    if ( tokenId === "" || price === "" ) {
      
      console.log("blank")
      
      return false;
    }

    var option = { from: App.handler };
    App.contracts.PokemonInABlock.methods
      .setOnSale(tokenId,price)
      .send(option)
       .on('transactionHash',(hash)=>{
        alert("success!");
        
      })
       .on("error", (err) => {
         toastr.error(App.getErrorMessage(err), "Reverted!");
      });
      
  },
  
  handleOffSale: function (tokenId,price) {
    console.log("here")
    if ( tokenId === "" ) {
      
      console.log("blank")
      
      return false;
    }
    

    var option = { from: App.handler };
    App.contracts.PokemonInABlock.methods
      .setOffSale(tokenId)
      .send(option)
       .on('transactionHash',(hash)=>{
        alert("success!");
        
      })
       .on("error", (err) => {
         toastr.error(App.getErrorMessage(err), "Reverted!");
      });
      
  },
  // pokemonCards
fetchAllAssets:function(name,ability,owner,tokenId,isOnSale){  
  const web3 = new Web3('http://127.0.0.1:7545');
  
     ethereum.request({ method: 'eth_requestAccounts' });
     ;

ethereum.request({ method: 'eth_accounts' })
.then((accounts) => {
  const account = accounts[0];
  web3.eth.getBalance(account).then((balance) => {
    const balanceInEther = web3.utils.fromWei(balance, 'ether');
    // const card = '<div class="col-lg-3 mb-4"><div class="card">' + 
    //     '<div class="card-header p-0">' +
    //     '<img src="images/card.jpg" alt="Header Image" class="w-100">' +
    //     '</div>' +
    //     '<div class="card-body">' +
    //     '<p class="card-text font-weight-bold">Token Id: ' + tokenId+ '</p>' +
    //     '<p class="card-text font-weight-bold">Pokemon Name: ' + name + '</p>' +
    //     '<p class="card-text font-weight-bold">Ability: ' + ability+ '</p>' +
    //     '<p class="card-text font-weight-bold">isOnSale: ' + isOnSale+ '</p>' +
    //     '<p class="card-text font-weight-bold">Owner: ' + owner+ '</p>' +
    //     '</div>' +
    //     '</div></div>';
    // $('#assets').append(card);
  });
})
.catch((error) => {
  console.error(error);
});


    //})              
        },

  handleBuyCard: function (tokenid) {
    
    if (tokenid === "") {
      toastr.error("Please enter a valid value.", "Reverted!");
  
      return false;
    }
    var option = { from: App.handler };
    App.contracts.PokemonInABlock.methods
      .buyPokemonCard(tokenid)
      .send(option)
      .on("transactionHash", (receipt) => {
         toastr.success("Success! ");
        alert('success')
      
       })
       .on("error", (err) => {
        alert('error!')
         toastr.error(App.getErrorMessage(err), "Reverted!");
       });
  },

  handleTransferCard: function (toadress, tokenid1) {
    if (toadress === "" || tokenid1 == "") {
      alert("reverted")
      return false;
    }
    console.log(toadress,tokenid1)
    var option = { from: App.handler };
    App.contracts.PokemonInABlock.methods
      .transferPokemonCard(toadress, tokenid1)
      .send(option)
      .on("transactionHash", (receipt) => {
         alert("Success")
       })
       .on("error", (err) => {
        alert('Error')
        //toastr.error(App.getErrorMessage(err), "Reverted!");
       });
  },

  getErrorMessage: function (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    let errorReason = "";

    if (errorCode === 4001) {
      return "User rejected the request!";
    } else if (
      errorMessage.includes("Access Denied")
    ) {
      return "Access Denied";
    } else if (
      errorMessage.includes(
        "Access Denied"
      )
    ) {
      return "Access Denied";
    } else {
      return "Unexpected Error!";
    }
  },
  abi: [
    {
      "inputs": [],
      "stateMutability": "payable",
      "type": "constructor",
      "payable": true
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "approved",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "count",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "members",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "ownership",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "pokemonCards",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ability",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isOnSale",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "bytes",
          "name": "data",
          "type": "bytes"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes4",
          "name": "interfaceId",
          "type": "bytes4"
        }
      ],
      "name": "supportsInterface",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "tokenURI",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "joinMember",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "memberAddr",
          "type": "address"
        }
      ],
      "name": "removeMember",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "ability",
          "type": "string"
        }
      ],
      "name": "createPokemonCard",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "setOnSale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "setOffSale",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "buyPokemonCard",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "ability",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isOnSale",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "internalType": "struct PokemonInABlock.PokemonCard",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "toAddr",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferPokemonCard",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "ability",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isOnSale",
              "type": "bool"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            }
          ],
          "internalType": "struct PokemonInABlock.PokemonCard",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  
};
$(function () {
  $(window).load(function () {
    App.init();
    //App.givecount();
  });
});

/* Detect when the account on metamask is changed */
window.ethereum.on("accountsChanged", () => {
  App.populateAddress();
});

/* Detect when the network on metamask is changed */
window.ethereum.on("chainChanged", () => {
  App.populateAddress();
});
