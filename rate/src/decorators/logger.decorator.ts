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
      const now = new Date().toISOString();
      logger.log(`Fetching data from ${targetUrl} at ${now}`);
      try {
        const result = await originalMethod.apply(this, args);
        logger.log(
          `Data was successfully fetched from ${targetUrl} at ${now}. Response: ${JSON.stringify(
            result,
          )}`,
        );
        return result;
      } catch (error) {
        logger.error(
          `Error during fetch from ${targetUrl} at ${now}. Error: ${error}`,
        );
        throw error;
      }
    };
  };
}
