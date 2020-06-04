import { CoreClass } from '@cancerlog/api/core';

export class DiagramPlotAxisDataClass extends CoreClass {
  name!: string;
  rule!: string;
}

export class DiagramPlotDataClass extends CoreClass {
  type!: string;
  axis!: DiagramPlotAxisDataClass[];
}

export class DiagramPlotClass extends CoreClass {
  [k: string]: DiagramPlotDataClass;
}

export class DiagramClass extends CoreClass {
  collection!: DiagramPlotClass;
  instance!: DiagramPlotClass;
}
