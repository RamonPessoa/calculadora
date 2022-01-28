const numbers = document.querySelectorAll('.num')
const operators = document.querySelectorAll('.operador')
const prevElement = document.querySelector('.valor-anterior')
const currentElement = document.querySelector('.valor-atual')
const equals = document.querySelector('.equals')
const clear = document.querySelector('.limpar')
const erase = document.querySelector('.deletar')

class Calculator {
    currentValue = ''
    prevValue = ''
    operator = ''

    constructor(prevElement, currentElement){
        this.prevElement = prevElement
        this.currentElement = currentElement
    }

    clear(){
        this.currentValue = ''
        this.prevValue = ''
        this.operator = ''
    }

    addNum(number){
        if(number == '.' && this.currentValue.includes('.')) return
        this.currentValue = this.currentValue.toString() + number.toString()
    }

    erase(){
        this.currentValue = this.currentValue.slice(0, -1)
    }

    selectOperator(operator){
        if(this.prevValue != ''){
            this.calc()
        }
        if (this.currentValue == '') return
        this.operator = operator
        this.prevValue = this.currentValue
        this.currentValue = ''
    }

    calc(){
        let result
        let prev = parseFloat(this.prevValue)
        let current = parseFloat(this.currentValue)

        if(prev != isNaN & current != isNaN){
            switch(this.operator){
                case "+":
                    result = prev + current
                    break;
                case "-":
                    result = prev - current
                    break;
                case "*":
                    result = prev * current
                    break;
                case "/":
                    result = prev / current
                    break;
                default:
                    return
            }
            this.currentValue = result.toString()
            this.prevValue = ''
            this.operator = ''
        }
    }

    updateScreen(){
        this.currentElement.innerText = this.currentValue
        this.prevElement.innerText = `${this.prevValue} ${this.operator}`

    }
}

const calculator = new Calculator(prevElement, currentElement)

numbers.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.addNum(button.value)
        calculator.updateScreen()
    })
})

clear.addEventListener('click', () => {
    calculator.clear()
    calculator.updateScreen()
})

operators.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.selectOperator(button.value)
        calculator.updateScreen()
    })
})

equals.addEventListener('click', () => {
    calculator.calc()
    calculator.updateScreen()
})

erase.addEventListener('click', () => {
    calculator.erase()
    calculator.updateScreen()
})