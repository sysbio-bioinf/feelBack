import { CRUDResolver, RelationInputType } from '@nestjs-query/query-graphql';
import {
  Parent,
  ResolveProperty,
  Resolver,
  Mutation,
  Args,
} from '@nestjs/graphql';
import { InstrumentEntity } from '../../../../instrument/data/entities/instrument.entity';
import { InstrumentObject } from '../../../../instrument/ui/graphql/objects/instrument.object';
import { PersonObject } from '../../../../person/ui/graphql/objects/person.object';
import { ScreeningEntity } from '../../../data/entities/screening.entity';
import { EvaluationService } from '../../../services/evaluation.service';
import { ScreeningService } from '../../../services/screening.service';
import { CreateScreeningInput } from '../inputs/create-screening.input';
import { EvaluationObject } from '../objects/evaluation.object';
import { ScreeningObject } from '../objects/screening.object';
import { UserAgentObject } from '../objects/user-agent.object';
import { SetInstrumentOnScreeningInput } from '../types/custom.types';

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
    readonly service: ScreeningService,
    private evaluationService: EvaluationService,
  ) {
    super(service);
  }

  // @Mutation(returns => ScreeningObject, { name: 'resolveScreeningIssues' })
  // async resolveScreeningIssues(
  //   @Args('input') input: ResolveOneScreeningInputType,
  // ): Promise<ScreeningObject> {
  //   const dto: DeepPartial<ScreeningObject> = {
  //     isResolved: true,
  //     resolvedAt: new Date(),
  //   };
  //   const data = deepmerge(input.input, dto);

  //   return this.service.updateOne(input.id, data);
  // }

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

    const screeningEntity = await this.service.assemblerService
      .getAssembler(ScreeningObject, ScreeningEntity)
      .convertToEntity(screening);
    const instrumentEntity = this.service.assemblerService
      .getAssembler(InstrumentObject, InstrumentEntity)
      .convertToEntity(instrument);
    const evaluationResults = await this.evaluationService.evaluate(
      screeningEntity,
      instrumentEntity,
    );

    return evaluationResults.map(item => {
      return {
        name: item.name,
        expression: item.expression,
        headline: item.headline,
        text: item.text,
        result: item.result,
      } as EvaluationObject;
    });
  }

  @Mutation()
  async setInstrumentOnScreening(
    @Args('input') input: SetInstrumentOnScreeningInput,
  ) {
    console.log('---');
    console.log(input.id);
    console.log(input.relationId);
    await this.service.setRelation('instrument', input.id, input.relationId);

    return await this.findById(input.id);
  }
}
