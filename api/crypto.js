export async function fetchCryptoPrices(symbol = 'bitcoin', days = 50) {
  const url = `https://api.coingecko.com/api/v3/coins/${symbol}/market_chart?vs_currency=usd&days=${days}`

  console.log('Fetching crypto data from:', url)
  const response = await fetch(url)
  if (!response.ok) throw new Error('Crypto API error')

  const data = await response.json()

  return data.prices.map((p) => ({
    label: new Date(p[0]).toLocaleDateString(),
    value: p[1],
  }))
}
