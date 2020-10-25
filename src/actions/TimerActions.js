import { TIMER_NEXT, TIMER_START, TIMER_RETRY, TIMER_STOP } from '../constants';

export const timerNext = () => ({
    type: TIMER_NEXT
})

export const timerStart = () => ({
    type: TIMER_START
})

export const timerRetry = () => ({
    type: TIMER_RETRY
})

export const timerStop = () => ({
    type: TIMER_STOP
})