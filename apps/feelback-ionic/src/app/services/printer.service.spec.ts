import { PrinterService } from './printer.service';

describe('PrinterService test', () => {
  let printerService: PrinterService;

  const printerMock = {
    isAvailable: jest.fn(() => Promise.resolve()),
    print: jest.fn((data: string, options: any) => Promise.resolve()),
  };

  beforeEach(() => {
    printerService = new PrinterService(printerMock as any);
  });

  it('should print the data', async () => {
    await printerService.printData('datastring', { orientation: 'landscape' });
    expect(printerMock.isAvailable).toBeCalled();
    expect(printerMock.print).toBeCalled();
  });

  it('should handle errors', async () => {
    printerMock.isAvailable.mockImplementationOnce(() => {
      throw new Error('isAvailable mock error');
    });
    expect(
      printerService.printData('datastring', { orientation: 'landscape' }),
    ).rejects.toThrow('app.errors.services.printer.print');
    printerMock.print.mockImplementationOnce((data: string, options: any) => {
      throw new Error('print mock error');
    });
    expect(
      printerService.printData('datastring', { orientation: 'landscape' }),
    ).rejects.toThrow('app.errors.services.printer.print');
  });
});
