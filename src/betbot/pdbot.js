import Bot from './Bot'
import randomstring from 'randomstring'

class PDBot extends Bot {
    constructor($config) {
        super($config)
    }

    start() {
        if (this.session.isPaused)
            this.throwError("Can't start a paused bot. Did you mean 'resume'?'")

        if (this.config.baseBet === 0) {
            this.throwError("Need to specify a baseBet greater than 0")
            this.pause()
        }

        const { delay, baseBet, resetOnWin, increaseOnLoss, handleBet, maxRolls } = this.config

        this.session.currentBet = baseBet
        this.session.currentRoll = 0
        
        this.session.bettingIntervalTimer = setInterval(() => {
            if (this.session.isPaused) return

            let id = randomstring.generate({ length: 10 })
            let win = Math.floor(Math.random() * 2) + 1 === 1 ? true : false

            this.session.currentRoll++
            this.session.wagered += this.session.currentBet

            if (win) {
                this.session.lossesInARow = 0
                this.session.winsInARow++
            } else {
                this.session.winsInARow = 0
                this.session.lossesInARow++
            }

            if (increaseOnLoss > 0) this.session.currentBet *= increaseOnLoss
            if (win && resetOnWin) this.session.currentBet = baseBet
            if (maxRolls > 0 && this.session.currentRoll >= maxRolls) this.stop()

            if (handleBet != null) {
                handleBet({
                    id: id,
                    amount: this.session.currentBet,
                    win
                })
            }

        }, delay)
    }
}

export default Betbot