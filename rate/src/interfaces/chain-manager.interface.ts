import { IHandler } from './handler.interface';

export interface IChainManager {
  addHandler(handler: IHandler): void;
  executeChain(): Promise<any>;
}
