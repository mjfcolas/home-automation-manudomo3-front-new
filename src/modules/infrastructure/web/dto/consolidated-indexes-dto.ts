export type ConsolidatedIndexesDto = {
    timeStep: string,
    indexInStepList: ConsolidatedIndexInIntervalDto[]
}

type ConsolidatedIndexInIntervalDto = {
    intervalStart: string,
    intervalEnd: string,
    summedIndex: number
}
