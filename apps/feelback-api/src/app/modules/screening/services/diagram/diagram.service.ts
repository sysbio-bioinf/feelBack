import { Injectable } from '@nestjs/common';
import { EvaluationService } from '../evaluation/evaluation.service';
import {
  DiagramPlotClass,
  DiagramPlotDataClass,
  ScreeningEntity,
  DiagramPlotAxisDataClass,
} from '@cancerlog/api/data';
import {
  DiagramDataPointObject,
  DiagramAxisObject,
  DiagramDataObject,
} from '@cancerlog/api/interfaces';

@Injectable()
export class DiagramService {
  constructor(private evaluationService: EvaluationService) {}

  createPlots(
    plots: DiagramPlotClass,
    screenings: ScreeningEntity[],
  ): DiagramDataObject[] {
    const result: DiagramDataObject[] = [];

    for (const [key, value] of Object.entries(plots)) {
      result.push(this.createPlot(key, value, screenings));
    }

    return result;
  }

  createPlot(
    name: string,
    plotData: DiagramPlotDataClass,
    screenings: ScreeningEntity[],
  ): DiagramDataObject {
    const axisData = this.createAxis(plotData, screenings);

    return {
      name: name,
      type: plotData.type,
      axis: axisData,
    };
  }

  createAxis(
    plotData: DiagramPlotDataClass,
    screenings: ScreeningEntity[],
  ): DiagramAxisObject[] {
    const result: DiagramAxisObject[] = [];

    for (const axis of plotData.axis) {
      const axisData = this.createAxisDataPoints(axis, screenings);

      const axisResult: DiagramAxisObject = {
        name: axis.name,
        data: axisData,
      };

      result.push(axisResult);
    }

    return result;
  }

  createAxisDataPoints(
    plotAxisData: DiagramPlotAxisDataClass,
    screenings: ScreeningEntity[],
  ): DiagramDataPointObject[] {
    const result: DiagramDataPointObject[] = [];

    for (const screening of screenings) {
      result.push(this.createAxisDataPoint(plotAxisData, screening));
    }

    return result;
  }

  createAxisDataPoint(
    plotAxisData: DiagramPlotAxisDataClass,
    screening: ScreeningEntity,
  ): DiagramDataPointObject {
    const evaluationResult = this.evaluationService.evaluateRule(
      plotAxisData.rule,
      screening.payload,
    );

    return {
      screeningId: screening.id,
      x: screening.collectedAt,
      y: evaluationResult,
    };
  }
}
