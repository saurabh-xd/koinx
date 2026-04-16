import holdingsData from "@/data/holdings.json"
import capitalGainsData from "@/data/capitalGains.json"

export const getHoldings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(holdingsData)
    }, 500)
  })
}

export const getCapitalGains = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(capitalGainsData.capitalGains)
    }, 500)
  })
}