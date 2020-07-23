const fetch = require('node-fetch');

( async() => {

    let supplyRates = []

    //Compound
    let res = await fetch('https://api.compound.finance/api/v2/ctoken');
    let data = await res.json();
    let cToken = data['cToken'];
    for(let t in cToken) {
        supplyRates.push({
            "symbol" : cToken[t]["symbol"],
            "lendingRate" : parseFloat(cToken[t]["supply_rate"]['value'])*100,
            "platform" : "Compound"
        });
    }

    //Aave
    // -> API ne donne pas les lending rates, voir comment récupérer autrement

    //dYdX
    res = await fetch('https://api.dydx.exchange/v1/markets');
    data = await res.json();
    data['markets'].forEach((token) => {
        supplyRates.push({
            "symbol" : token["symbol"],
            "lendingRate" : parseFloat(token['totalSupplyAPY'])*100,
            "platform" : "dXdY"
        });
    });

    //Fulcrum
    res = await fetch('https://api.bzx.network/v1/supply-rate-apr');
    data = await res.json();
    for(t in data['data']){
        supplyRates.push({
            "symbol" : t,
            "lendingRate" : data['data'][t],
            "platform" : "Fulcrum",
            "APR": true
        });
    }


    //Nuo
    //Pas trouvé d'API


    //BlockFi
    //Pas trouvé d'API


    //CoinList
    //Pas d'API pour obtenir les lending rates


    //Bitfinex
    //Pareil que précedent


    //Voir pour remplacer les différents appel par une API qui gère tous les protocles : exemple -> Paradigm/DeFi Pulse/LoanScan
    //Permet aussi de gérer quels protocoles on observe et lesquels on ignore, à voir.


    //TODO :  - améliorer le tri, de facon plus fluide ?
    //        - récup les autres données du Token selon ce qui est nécessaire
    //        - Voir à faire différence APY et APR => conversion, ou recupérer que des APR, etc ...
    
    let bestToken;
    let max = -1;
    supplyRates.forEach((token, index, array) => {
        if(token.lendingRate > max){
            max = token.lendingRate;
            bestToken = token;
        }
    });

    console.log('Most valuable DeFi Token to Supply is ' + bestToken['symbol'] + ' on the ' + bestToken['platform'] + ' platform');
    if('APR' in bestToken){
        console.log('With a Supply Rate APR of : ' + max + '%')
    }
    else{
        console.log('With a Supply Rate APY of : ' + max + '%')
    }


})();