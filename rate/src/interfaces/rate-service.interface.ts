import { IRate } from './rate.interface';

export interface IRateService {
  getExchangeRate(): Promise<IRate>;
}
