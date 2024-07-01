import { IGetExchangeRateResponse } from '../../src/rate/interfaces/nbu-api-response.interface';
import { RateService } from '../../src/rate/services/rate.service';
import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { of, throwError } from 'rxjs';

describe('RateService', () => {
  let rateService: RateService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RateService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    rateService = module.get<RateService>(RateService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return exchange rate data on success', async () => {
    const exchangeRateResponse: IGetExchangeRateResponse[] = [
      {
        cc: 'USD',
        exchangedate: '2024-06-17',
        r030: 840,
        rate: 27.5,
        txt: 'Dollar',
      },
    ];

    const axiosResponse: AxiosResponse<IGetExchangeRateResponse[]> = {
      config: {
        headers: {} as AxiosRequestHeaders,
        method: 'get',
        url: '',
      },
      data: exchangeRateResponse,
      headers: {},
      status: 200,
      statusText: 'OK',
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(axiosResponse));

    const result = await rateService.getExchangeRate();

    expect(result).toEqual({
      currencyCode: 'USD',
      date: '2024-06-17',
      rate: 27.5,
    });
  });

  it('should throw HttpException on failure', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => new Error('Network Error')));

    await expect(rateService.getExchangeRate()).rejects.toThrow(HttpException);
    await expect(rateService.getExchangeRate()).rejects.toThrow(
      'Invalid status value',
    );
    await expect(rateService.getExchangeRate()).rejects.toThrow(
      new HttpException('Invalid status value', HttpStatus.BAD_REQUEST),
    );
  });
});
