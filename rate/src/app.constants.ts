export const NBU_HANDLER_TOKEN = Symbol('NbuHandler');
export const CURRENCY_API_HANDLER_TOKEN = Symbol('CurrencyApiHandler');
export const PRIVATBANK_HANDLER_TOKEN = Symbol('PrivatbankHandler');
export const RATE_SERVICE_TOKEN = Symbol('RateService');
export const CHAIN_MANAGER_TOKEN = Symbol('ChainManager');

export const NBU_EXCHANGE_API_URL =
  'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?valcode=USD&json';

export const CURRENCY_API_URL =
  'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json';

export const PRIVATBANK_API_URL =
  'https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11';
