export interface IHandler {
  handle(): Promise<any>;
  setNext(handler: IHandler): IHandler;
}
