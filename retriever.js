const fetch = require('node-fetch');

( async() => {

    let res = await fetch('https://api.compound.finance/api/v2/ctoken');
    let data = await res.json();

    let cToken = data['cToken'];

    let supplyRates = {}

    for(let t in cToken) {
        supplyRates[cToken[t]["symbol"]] = parseFloat(cToken[t]["supply_rate"]['value']);
    }


    //TODO :  - améliorer le tri, de facon plus fluide ?
    //        - récup les autres données du Token selon ce qui est nécessaire
    
    let token;
    let max = -1;
    for(let t in supplyRates){
        if(supplyRates[t] > max){
            max = supplyRates[t];
            token = t;
        }
    }

    console.log('Most valuable Compound Token to Supply is ' + token);
    console.log('With a Supply Rate of : ' + max)

})();