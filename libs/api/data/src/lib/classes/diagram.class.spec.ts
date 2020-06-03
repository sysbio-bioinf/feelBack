import {
  DiagramPlotAxisDataClass,
  DiagramPlotDataClass,
  DiagramPlotClass,
  DiagramClass,
} from './diagram.class';

describe('DiagramPlotAxisDataClass', () => {
  it('should be defined', () => {
    expect(new DiagramPlotAxisDataClass()).toBeDefined();
  });
});

describe('DiagramPlotDataClass', () => {
  it('should be defined', () => {
    expect(new DiagramPlotDataClass()).toBeDefined();
  });
});

describe('DiagramPlotClass', () => {
  it('should be defined', () => {
    expect(new DiagramPlotClass()).toBeDefined();
  });
});

describe('DiagramModelClass', () => {
  it('should be defined', () => {
    expect(new DiagramClass()).toBeDefined();
  });
});
