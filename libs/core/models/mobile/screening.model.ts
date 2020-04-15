export interface Screening {
  id: string;
  instanceId: string;
  collectedAt: Date;
  language: string;
  payload: object;
  userAgent?: object;
  evaluationResult?: object;
}
