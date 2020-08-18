import "./app.css";
import { default as Web3} from 'web3';
var accounts;
var account;

var FoodTransportationContract;
var web3;


function addRow(tb,col1, col2, col3) {
    console.log(tb.FetchRowCount);
    var row = tb.insertRow(tb.FetchRowCount);
    row.insertCell(0).innerHTML = col1;
    row.insertCell(1).innerHTML = col2;
    row.insertCell(2).innerHTML = col3;
};

function resetTable(tb) {
    var rowNum=tb.rows.length;
    for (var i=1;i<rowNum;i++)
    {
        tb.deleteRow(i);
        rowNum=rowNum-1;
        i=i-1;
    }
};


function timestampToTime (timestamp){
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate() + ' ';
    var h = date.getHours() + ':';
    var m = (date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
    return Y+M+D+h+m+s;
};


window.App = {
    start: function() {

        var web3Provider;
        if (window.ethereum) {
            web3Provider = window.ethereum;
            try {
                // 请求用户授权
                window.ethereum.enable();
            } catch (error) {
                // 用户不授权时
                console.error("User denied account access")
            }
        } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
            web3Provider = window.web3.currentProvider;
        } else {
            web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(web3Provider);


        var self = this;
        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }
            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            console.log(accs);

            accounts = accs;
            account = accounts[0];
            web3.eth.defaultAccount= account;
            FoodTransportationContract = web3.eth.contract([{"constant": false, "inputs": [{"internalType": "string", "name": "food", "type": "string"}, {"internalType": "string", "name": "locationName", "type": "string"}, {"internalType": "string", "name": "transPerson", "type": "string"}], "name": "addNewLocation", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": true, "inputs": [], "name": "getLocationNum", "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [], "name": "getFoodName", "outputs": [{"internalType": "string", "name": "", "type": "string"}], "payable": false, "stateMutability": "view", "type": "function"}, {"constant": true, "inputs": [{"internalType": "uint8", "name": "locationNo", "type": "uint8"}], "name": "getLocation", "outputs": [{"internalType": "string", "name": "", "type": "string"}, {"internalType": "string", "name": "", "type": "string"}, {"internalType": "uint256", "name": "", "type": "uint256"}], "payable": false, "stateMutability": "view", "type": "function"}]);
        });
    },
    createContract: function()
    {
        var FoodTransportation = FoodTransportationContract.new(
            {
                from: web3.eth.accounts[0],
                data: '0x608060405234801561001057600080fd5b506108c7806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806305708e1c146100515780630b3de1b41461023a5780632efbd70d1461025e578063c0d25cf8146102e1575b600080fd5b6102386004803603606081101561006757600080fd5b810190808035906020019064010000000081111561008457600080fd5b82018360208201111561009657600080fd5b803590602001918460018302840111640100000000831117156100b857600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561011b57600080fd5b82018360208201111561012d57600080fd5b8035906020019184600183028401116401000000008311171561014f57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290803590602001906401000000008111156101b257600080fd5b8201836020820111156101c457600080fd5b803590602001918460018302840111640100000000831117156101e657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103fe565b005b6102426104fd565b604051808260ff1660ff16815260200191505060405180910390f35b610266610514565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156102a657808201518184015260208101905061028b565b50505050905090810190601f1680156102d35780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b610310600480360360208110156102f757600080fd5b81019080803560ff1690602001909291905050506105b6565b604051808060200180602001848152602001838103835286818151815260200191508051906020019080838360005b8381101561035a57808201518184015260208101905061033f565b50505050905090810190601f1680156103875780820380516001836020036101000a031916815260200191505b50838103825285818151815260200191508051906020019080838360005b838110156103c05780820151818401526020810190506103a5565b50505050905090810190601f1680156103ed5780820380516001836020036101000a031916815260200191505b509550505050505060405180910390f35b600080805460018160011615610100020316600290049050141561043457826000908051906020019061043292919061074c565b505b61043c6107cc565b828160000181905250818160200181905250428160400181815250508060016000600260009054906101000a900460ff1660ff168152602001908152602001600020600082015181600001908051906020019061049a9291906107ed565b5060208201518160010190805190602001906104b79291906107ed565b50604082015181600201559050506002600081819054906101000a900460ff168092919060010191906101000a81548160ff021916908360ff1602179055505050505050565b6000600260009054906101000a900460ff16905090565b606060008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105ac5780601f10610581576101008083540402835291602001916105ac565b820191906000526020600020905b81548152906001019060200180831161058f57829003601f168201915b5050505050905090565b6060806000600160008560ff168152602001908152602001600020600001600160008660ff168152602001908152602001600020600101600160008760ff16815260200190815260200160002060020154828054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561069c5780601f106106715761010080835404028352916020019161069c565b820191906000526020600020905b81548152906001019060200180831161067f57829003601f168201915b50505050509250818054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107385780601f1061070d57610100808354040283529160200191610738565b820191906000526020600020905b81548152906001019060200180831161071b57829003601f168201915b505050505091509250925092509193909250565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061078d57805160ff19168380011785556107bb565b828001600101855582156107bb579182015b828111156107ba57825182559160200191906001019061079f565b5b5090506107c8919061086d565b5090565b60405180606001604052806060815260200160608152602001600081525090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061082e57805160ff191683800117855561085c565b8280016001018555821561085c579182015b8281111561085b578251825591602001919060010190610840565b5b509050610869919061086d565b5090565b61088f91905b8082111561088b576000816000905550600101610873565b5090565b9056fea265627a7a72315820182a1b65e3ab647ec725b05e04255a7cfad597a676b169b4a610d3984ed2e38864736f6c63430005100032',
                gas: '4752388'
            }, function (e, myContract){
                if (myContract.address) {
                    console.log('Contract mined! address: ' + myContract.address + ' transactionHash: ' + myContract.transactionHash);
                    document.getElementById("contractAddress").value = myContract.address;
                    document.getElementById("foodName").value = "";
                    var tbFoodName = document.getElementById("table_foodName");
                    tbFoodName.innerText = "";
                    var tb = document.getElementById("tb");
                    resetTable(tb);

                    // 合约发布成功后，才能调用后续的方法
                } else {
                    console.log("contract deploy transaction hash: " + myContract.transactionHash) //部署合约的交易哈希值
                }

                //  console.log(e, contract);
                //  if (typeof contract.address !== 'undefined') {
                //       console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
                //       document.getElementById("contractAddress").value = contract.address;
                //     }
            });
    },
    addNewLocation: function()
    {
        var contractAddress = document.getElementById("contractAddress").value;
        var deployedFoodTransportation = FoodTransportationContract.at(contractAddress);
        var foodName = document.getElementById("foodName").value;
        var locationName = document.getElementById("locationName").value;
        var personName = document.getElementById("personName").value;

        deployedFoodTransportation.addNewLocation(foodName, locationName, personName, function(error){
            console.log(error);
        });
        document.getElementById("locationName").value = "";
        document.getElementById("personName").value = "";
    },
    getCurrentLocation: function()
    {
        var contractAddress = document.getElementById("contractAddress").value;
        var info = "";

        // document.getElementById("textArea").value = "该食品运输信息如下:";
        var deployedFoodTransportation = FoodTransportationContract.at(contractAddress);
        var food;
        deployedFoodTransportation.getFoodName.call(function (error,foodName) {
            food = foodName;
        })
        deployedFoodTransportation.getLocationNum.call(function (error, locationNum){
            var tbFoodName = document.getElementById("table_foodName");
            tbFoodName.innerText = "FoodName: "+food;
            var tb = document.getElementById("tb");
            resetTable(tb);
            while (locationNum >= 1){
                deployedFoodTransportation.getLocation.call(locationNum-1, function(error, returnValues){
                    // var encryptedSecret = returnValues[4];
                    // var decryptedSecret = CryptoJS.AES.decrypt(encryptedSecret, passPhrase).toString(CryptoJS.enc.Utf8);
                    // var info = food + "\n\n位置名称:" + returnValues[0] + "\t时间:" + timestampToTime(returnValues[1]);
                    // document.getElementById("textArea").value += info;
                    addRow(tb,returnValues[0],returnValues[1],timestampToTime(returnValues[2]))
                })
                locationNum--;
            }
        })
    }
};

window.addEventListener('load', function() {
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source.  If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)



        //  /* 新版的方式 */
        // var web3Provider;
        // if (window.ethereum) {
        //   web3Provider = window.ethereum;
        //   try {
        //     // 请求用户授权
        //      window.ethereum.enable();
        //   } catch (error) {
        //     // 用户不授权时
        //     console.error("User denied account access")
        //   }
        // } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
        //   web3Provider = window.web3.currentProvider;
        // } else {
        //   web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        // }
        // window.web3 = new Web3(web3Provider);

        //web3js就是你需要的web3实例

        // web3.eth.getAccounts(function (error, result) {
        //   if (!error)
        //     console.log(result)//授权成功后result能正常获取到账号了
        // });




        // window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    App.start();
});
