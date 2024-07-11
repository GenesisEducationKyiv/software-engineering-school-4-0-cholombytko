export interface IApiGatewayService {
  subscribe(): Promise<void>;
  unsubscribe(): Promise<void>;
}
