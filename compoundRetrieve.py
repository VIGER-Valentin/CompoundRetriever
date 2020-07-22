import requests

response = requests.get('https://api.compound.finance/api/v2/ctoken')

data = response.json()

tokens = data['cToken']

supplyRates = {}

for t in tokens:
    supplyRates[t["symbol"]] = float(t["supply_rate"]['value'])

sortedSupplyRates = {k: v for k, v in sorted(supplyRates.items(), key=lambda item: -item[1])}

#TODO :
# - Recupérer les données du Token selon nécessaire

print('Most valuable Compound Token to Supply is ' + next(iter(sortedSupplyRates.keys())))
print('With a Supply Rate of : ' + str(next(iter(sortedSupplyRates.values()))))