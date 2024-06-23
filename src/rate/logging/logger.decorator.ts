import { Logger } from '@nestjs/common';

export function LogRateRequest(targetUrl: string) {
  const logger = new Logger('Handler');

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      logger.log(`Fetching data from ${targetUrl}`);
      try {
        const result = await originalMethod.apply(this, args);
        logger.log(
          `Data was successfully fetched. Response: ${JSON.stringify(result)}`,
        );
        return result;
      } catch (error) {
        logger.error(`There was an error during fetch. Response: ${error}`);
        throw error;
      }
    };
  };
}
