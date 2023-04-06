let $config = {
    baseBet: 0,
    increaseOnLoss: 0,
    resetOnWin: false,
    maxRolls: 0,
    delay: 1000,
    handleBet: null,
    handleStop: null,
    handlePause: null,
    handleResume: null,
    handleError: null
}

let $session = {
    bettingIntervalTimer: null,
    isPaused: false,
    currentBet: 0,
    currentRoll: 0,
    wagered: 0,
    lossesInARow: 0,
    winsInARow: 0
}

export { $config, $session }