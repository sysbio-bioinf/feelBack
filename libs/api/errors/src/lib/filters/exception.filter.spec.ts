import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionFilter } from './exception.filter';

const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));
const URL = 'url';
const mockGetRequest = jest.fn().mockImplementation(() => ({
  url: URL,
}));
const mockSwitchToHttp = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: mockGetRequest,
}));

const mockHttpHost = {
  switchToHttp: mockSwitchToHttp,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn().mockImplementation(() => 'http'),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

const mockGraphQLHost = {
  switchToHttp: jest.fn(),
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn().mockImplementation(() => 'graphql'),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
const dateRegExp = new RegExp('[0-9]{4}-[0-9]{1,2}-[0-9]{1,2}.*');

describe('ExceptionFilter', () => {
  let exceptionFilter: ExceptionFilter;
  const msg = 'Test message!';
  const status = HttpStatus.FORBIDDEN;
  const exception = new HttpException(msg, status);

  beforeEach(() => {
    jest.clearAllMocks();
    exceptionFilter = new ExceptionFilter();
  });

  it('should be defined', () => {
    expect(exceptionFilter).toBeDefined();
  });

  describe('catch', () => {
    it('should execute http exception', () => {
      exceptionFilter.catch(exception, mockHttpHost);
      expect(mockSwitchToHttp).toBeCalledTimes(1);
      expect(mockSwitchToHttp).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockGetRequest).toBeCalledTimes(1);
      expect(mockGetRequest).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(status);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        message: msg,
        statusCode: status,
        path: URL,
        timestamp: expect.stringMatching(dateRegExp),
      });
    });

    it('should execute graphql exception', () => {
      expect(exceptionFilter.catch(exception, mockGraphQLHost)).toStrictEqual(
        exception,
      );
      expect(consoleSpy).toBeCalledTimes(1);
      expect(consoleSpy).toBeCalledWith(exception);
    });
  });

  describe('handleHttpException', () => {
    it('should send exception', () => {
      exceptionFilter.handleHttpException(exception, mockHttpHost);
      expect(mockSwitchToHttp).toBeCalledTimes(1);
      expect(mockSwitchToHttp).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockGetRequest).toBeCalledTimes(1);
      expect(mockGetRequest).toBeCalledWith();
      expect(mockStatus).toBeCalledTimes(1);
      expect(mockStatus).toBeCalledWith(status);
      expect(mockJson).toBeCalledTimes(1);
      expect(mockJson).toBeCalledWith({
        message: msg,
        statusCode: status,
        path: URL,
        timestamp: expect.stringMatching(dateRegExp),
      });
    });
  });

  describe('handleGraphQLException', () => {
    it('should print and return exception', () => {
      expect(
        exceptionFilter.handleGraphQLException(exception, mockGraphQLHost),
      ).toStrictEqual(exception);
      expect(consoleSpy).toBeCalledTimes(1);
      expect(consoleSpy).toBeCalledWith(exception);
    });
  });
});
