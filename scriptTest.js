class Calculator {
    constructor(previousOpText, currentOpText) {
        this.previousOpText = previousOpText;
        this.currentOpText = currentOpText;
        this.clearAll();
    }




    clearAll() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    }


    deleteDigit() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);  

    }


    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }


    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }


    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current
                break;
            case '-':
                computation = prev - current
                break;
            case '*':
                computation = prev * current
                break;
            case '/':
                computation = prev / current
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 })
            }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }
    

    updateScreenDisplay() {
        this.currentOpText.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOpText.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOpText.innerText = ''
        }
    }
}
const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const allClearBtn = document.querySelector('[data-all-clear]');
const previousOpText = document.querySelector('[data-previous-operand]');
const currentOpText = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOpText, currentOpText);


numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateScreenDisplay();
    })
})


operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateScreenDisplay();
    })
})


equalsBtn.addEventListener('click', button => {
    calculator.compute();
    calculator.updateScreenDisplay();
})

allClearBtn.addEventListener('click', button => {
    calculator.clearAll();
    calculator.updateScreenDisplay();
})

deleteBtn.addEventListener('click', button => {
    calculator.deleteDigit();
    calculator.updateScreenDisplay();
})

