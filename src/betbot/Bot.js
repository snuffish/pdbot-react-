import { $config, $session } from './defaultData'

class Bot {
    session = { ...$session }
    config = { ...$config }
    
    constructor($config) {
        this.config = { ...this.config, ...$config }
    }

    get Session() {
        return this.session
    }

    get ChildClass() {
        console.log("CHILDCLASS => ", this)
        return this.__proto__.constructor.name
    }

    set Config($config) {
        this.config = { ...this.config, ...$config }
    }

    get Config() {
        return this.config
    }

    start() {
        this.throwError("You need to implement the start() method in your '" + this.ChildClass + "' class!")
    }

    pause() {
        this.session.isPaused = true
        const { handlePause } = this.config

        if (handlePause != null) {
            handlePause(this.getConfigSessionObject())
        }
    }

    resume() {
        this.session.isPaused = false
        const { handleResume } = this.config

        if (handleResume != null) {
            handleResume(this.getConfigSessionObject())
        }
    }

    stop() {
        const { handleStop } = this.config
        const { bettingIntervalTimer } = this.session
        clearInterval(bettingIntervalTimer)

        if (handleStop != null) {
            handleStop(this.getConfigSessionObject())
        }
    }

    getConfigSessionObject() {
        const config = this.formatObject(this.config)
        const session = this.formatObject(this.session)
        return { config, session }
    }

    clearSession() {
        this.session = { ...$session }
    }

    formatObject($object) {
        const object = { ...$object }
        Object.keys(object).forEach(key => {
            if (typeof object[key] === 'function' || object[key] === null) {
                delete object[key]
            }
        });

        return object
    }

    throwError(message) {
        const { handleError } = this.config

        if (handleError != null) {
            handleError(new Error(message))
        }
    }
}

export default Bot