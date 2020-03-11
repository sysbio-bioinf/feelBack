import { CRUDResolver } from '@nestjs-query/query-graphql';
import {
  Parent,
  ResolveProperty,
  Resolver,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { InstrumentAssemblerService } from '../../../../instrument/services/instrument/instrument-assembler.service';
import { InstrumentObject } from '../../../../instrument/ui/graphql/objects/instrument.object';
import { PersonObject } from '../../../../person/ui/graphql/objects/person.object';
import { ScreeningEntity } from '../../../data/entities/screening.entity';
import { EvaluationService } from '../../../services/evaluation/evaluation.service';
import { ScreeningAssemblerService } from '../../../services/screening/screening-assembler.service';
import { CreateScreeningInput } from '../inputs/create-screening.input';
import { EvaluationObject } from '../objects/evaluation.object';
import { ScreeningObject } from '../objects/screening.object';
import { UserAgentObject } from '../objects/user-agent.object';
import { ResolveOneScreeningInputType } from '../types/custom.types';
import { DeepPartial } from '@nestjs-query/core';

@Resolver(of => ScreeningObject)
export class ScreeningResolver extends CRUDResolver(ScreeningObject, {
  create: { many: { disabled: true }, CreateDTOClass: CreateScreeningInput },
  delete: { disabled: true },
  update: { disabled: true },
  relations: {
    one: {
      instrument: {
        relationName: 'instrument',
        DTO: InstrumentObject,
        nullable: true,
        disableRemove: true,
        disableUpdate: false,
      },
      person: {
        relationName: 'person',
        DTO: PersonObject,
        nullable: true,
        disableRemove: true,
        disableUpdate: false,
      },
    },
  },
}) {
  constructor(
    readonly service: ScreeningAssemblerService,
    readonly instrumentService: InstrumentAssemblerService,
    private evaluationService: EvaluationService,
  ) {
    super(service);
  }

  @Mutation(returns => ScreeningObject, { name: 'resolveScreeningIssues' })
  async resolveScreeningIssues(
    @Args('input') input: ResolveOneScreeningInputType,
  ): Promise<ScreeningObject> {
    const dto: DeepPartial<ScreeningObject> = {
      isResolved: true,
      resolvedAt: input.update.resolvedAt,
      resolveComment: input.update.resolveComment,
    };

    return this.service.updateOne(input.id, dto);
  }

  @ResolveProperty('userAgent', returns => UserAgentObject, {
    description: 'UserAgent information',
    nullable: true,
  })
  resolveUserAgent(@Parent() parent: ScreeningEntity) {
    return parent.userAgent;
  }

  @ResolveProperty('evaluationResult', returns => [EvaluationObject], {
    description: 'Evaluation Results for this screening',
    nullable: true,
  })
  async resolveEvaluationResult(
    @Parent() screening: ScreeningObject,
  ): Promise<EvaluationObject[]> {
    const instrument = await this.service.findRelation(
      InstrumentObject,
      'instrument',
      screening,
    );

    if (!instrument) {
      return null;
    }

    const screeningEntity = await this.service.queryService.findById(
      screening.id,
    );
    const instrumentEntity = await this.instrumentService.queryService.findById(
      instrument.id,
    );

    const evaluationResults = await this.evaluationService.evaluate(
      screeningEntity,
      instrumentEntity,
    );

    const resultObject = evaluationResults.map(item => {
      return {
        name: item.name,
        expression: item.expression,
        headline: item.headline,
        text: item.text,
        result: item.result,
      } as EvaluationObject;
    });

    return resultObject;
  }
}
