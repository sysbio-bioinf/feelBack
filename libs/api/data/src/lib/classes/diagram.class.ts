import { CoreClass } from '@cancerlog/api/core';

export class DiagramPlotAxisData extends CoreClass {
  name!: string;
  rule!: string;
}

export class DiagramPlotData extends CoreClass {
  type!: string;
  axis!: [DiagramPlotAxisData];
}

export class DiagramPlot extends CoreClass {
  [k: string]: DiagramPlotData;
}

export class DiagramModel extends CoreClass {
  collection!: DiagramPlot;
  instance!: DiagramPlot;
}
