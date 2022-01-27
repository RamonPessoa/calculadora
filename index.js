const numButtons = document.querySelectorAll('.num')
const operatorButtons = document.querySelectorAll('.operador')
const deleteButton = document.querySelector('.deletar')
const clearButton = document.querySelector('.limpar')
const visorAtual = document.querySelector('.valor-atual')
const visorAnterior = document.querySelector('.valor-anterior')
let prevValue = ''
let actualValue = ''
let operator = ''
let overwrite = true


class Calculator {
    constructor(prevValue, actualValue, operator){
        this.prevValue = prevValue
        this.actualValue = actualValue
        this.operator = operator
    }

    clear(){
        this.prevValue = ''
        this.actualValue = ''
        this.operator = ''

        this.updateScreen()
    }

    updateScreen(){
        visorAtual.innerText = this.actualValue
        visorAnterior.innerText = this.prevValue + this.operator
    }

    selectOperator(operator){
        operator == "=" ? this.operator = '' : 
        this.operator = operator
    }

    calc(){
        if(this.prevValue.length != 0){
            switch (this.operator){
                case "+":
                    this.prevValue = parseFloat(this.prevValue) + parseFloat(this.actualValue)
                    break;
                case "-":
                    this.prevValue = parseFloat(this.prevValue) - parseFloat(this.actualValue)
                    break;
                case "*":
                    this.prevValue = parseFloat(this.prevValue) * parseFloat(this.actualValue)
                    break;
                default:
                    console.log("deu bosta")
            }
        }
    }

}

const calculator = new Calculator(prevValue, actualValue, operator)

numButtons.forEach(e => {
    e.addEventListener('click', e => {
        if (overwrite && calculator.operator != '' && calculator.prevValue != ''){
            calculator.actualValue = ''
            overwrite = false
        }
        calculator.actualValue = calculator.actualValue + e.target.value
        calculator.updateScreen()
    })
})

clearButton.addEventListener('click', e => {
    operator = ''
    actualValue = ''
    prevValue = ''
    calculator.clear()
})

operatorButtons.forEach(e => {
    e.addEventListener('click', e => {
        calculator.calc()
        overwrite = true
        calculator.selectOperator(e.target.value)
        if(e.target.value == '='){
            calculator.actualValue = calculator.prevValue
        }
        if(calculator.prevValue == ''){
            calculator.prevValue = calculator.actualValue
        }

        console.log(calculator.prevValue)
        calculator.updateScreen()
    })
})
