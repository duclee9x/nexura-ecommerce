export type Currency = 'USD' | 'VND'

const currencyConfig = {
  USD: {
    locale:   'en-US',
    currency: 'USD',
  },
  VND: { locale:   'vi-VN',
    currency: 'VND',  },
}

let currentCurrency: Currency = 'VND'

export function setCurrency(currency: Currency) {
  currentCurrency = currency
}

export function formatPrice(price: number): string {
  const config = currencyConfig[currentCurrency]
  return new Intl.NumberFormat(config.locale, {
    style:                 'currency',
    currency:              config.currency,
    minimumFractionDigits: currentCurrency === 'VND' ? 0 : 2,
    maximumFractionDigits: currentCurrency === 'VND' ? 0 : 2,
  }).format(price)
} 