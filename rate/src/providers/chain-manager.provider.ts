import { IChainManager } from '../interfaces/chain-manager.interface';
import { IHandler } from '../interfaces/handler.interface';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ChainManager implements IChainManager {
  private readonly logger = new Logger(ChainManager.name);
  private handlers: IHandler[] = [];

  addHandler(handler: IHandler): void {
    this.handlers.push(handler);
  }

  async executeChain(): Promise<any> {
    for (const handler of this.handlers) {
      try {
        const data = await handler.handle();
        this.logger.log(
          `Handler ${handler.constructor.name} successfully fetched data.`,
        );
        return data;
      } catch (error) {
        this.logger.error(
          `Handler ${handler.constructor.name} failed with error: ${error.message}. Moving to the next one.`,
        );
      }
    }
  }
}
