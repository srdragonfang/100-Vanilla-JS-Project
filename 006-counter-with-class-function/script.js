function getElement(selection) {
    const element = document.querySelector(selection) 

    if(element) {
        return element
    }
    throw new Error(`Can not find "${selection}" selector.`)
}

class Counter {
    constructor(element, value) {
        // this.counaher = element;
        this.value = value;

        this.increaseBtn = element.querySelector('.increase')
        this.resetBtn = element.querySelector('.reset')
        this.decreaseBtn = element.querySelector('.decrease')

        this.valueDOM = element.querySelector('.value')
        this.valueDOM.textContent = this.value

        this.increase = this.increase.bind(this)
        this.reset = this.reset.bind(this)
        this.decrease = this.decrease.bind(this)


        this.increaseBtn.addEventListener('click', this.increase)
        this.resetBtn.addEventListener('click', this.reset)
        this.decreaseBtn.addEventListener('click', this.decrease)
    }

    increase() {
        this.value++;
        this.valueDOM.textContent = this.value

    }

    reset() {
        this.value = 0;
        this.valueDOM.textContent = this.value
    }

    decrease() {
        this.value--;
        this.valueDOM.textContent = this.value
    }
}

firstCounter = new Counter(getElement('.first-counter'), 100)