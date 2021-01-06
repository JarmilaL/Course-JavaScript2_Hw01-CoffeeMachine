const COFFEE_TYPES = Object.freeze({
    espresso: {
        name: 'Espresso',
        milk: 0,
        coffee: 7,
        water: 30,
    },
    cappuccino: {
        name: 'Cappuccino',
        milk: 120,
        water: 30,
        coffee: 7,
    },
    doppio: {
        name: 'Doppio espresso',
        milk: 0,
        water: 60,
        coffee: 14,
    },
    lattemacchiato: {
        name: 'Latte macchiato',
        milk: 300,
        water: 30,
        coffee: 7,
    },
});

const coffeeMachine = {
    maxCoffeeWeight: 20,
    maxMilkVolume: 500,
    maxWaterVolume: 500,
    waterVolume: 0,
    coffeeWeight: 0,
    milkVolume: 0,
    phase: 0,
    pickedCoffee: '',
    output: document.querySelector('.output'),

    loadCoffeeTypes() {
        const coffeeSelectionDOM = document.querySelector('.coffee-types');
        const coffeeSelectionList = this.getNames();
        let newHTML = '';

        for (let item of coffeeSelectionList) {
            newHTML += `<li class="button">${item}</li>`;
        }

        coffeeSelectionDOM.innerHTML = newHTML;
    },

    getTypes() {
        return Object.values(COFFEE_TYPES);
    },

    getNames() {
        return this.getTypes().map(e => e.name);
    },

    handleSwitchButton() {
        if (coffeeMachine.phase === 0) {
            coffeeMachine.turnMachineOn();
        } else {
            coffeeMachine.turnMachineOff();
        }
    },

    turnMachineOn() {
        coffeeMachine.phase = 1;
        document.querySelector('.switch-light').style.backgroundColor = '#0fff05';
        coffeeMachine.setOutput();
        coffeeMachine.pickCoffee();
    },

    turnMachineOff() {
        coffeeMachine.phase = 0;
        document.querySelector('.switch-light').style.backgroundColor = '#ff0e07';
        coffeeMachine.setOutput();
        coffeeMachine.clearBackgroundColorAndTextContent();
    },

    checkPhase() {
        if (coffeeMachine.phase > 0) {
            return true;
        } else {
            coffeeMachine.turnMachineOff();
            return false;
        }
    },

    setOutput() {

        switch (coffeeMachine.phase) {
            case 0: coffeeMachine.output.innerText = '';
                break;
            case 1: coffeeMachine.output.innerText = 'Ahoj! Jakou si dáš kávu?';
                break;
            case 2: coffeeMachine.output.innerText = `Vybráno: ${coffeeMachine.pickedCoffee}`;
                break;
            case 3: coffeeMachine.output.innerText =  `${coffeeMachine.pickedCoffee}: Doplň suroviny!`;
                break;
            case 4: coffeeMachine.output.innerText = `Připravuje se: ${coffeeMachine.pickedCoffee}`
                break;
            case 5: coffeeMachine.output.innerText = 'Hotovo :-)'
        }

    },

    pickCoffee() {
        const coffeeTypes = document.querySelector('.coffee-types');
        coffeeTypes.addEventListener('click', function (event) {
            if (coffeeMachine.checkPhase()) {
                if (coffeeMachine.phase === 4 || coffeeMachine.phase === 5) return;
                coffeeMachine.phase = 2;
                coffeeMachine.pickedCoffee = event.target.innerText;
                coffeeMachine.setOutput();
                coffeeMachine.checkResources();
            } else {
                coffeeMachine.turnMachineOff();
            }
        });

    },

    checkResources() {
        const waterCheck = coffeeMachine.checkWater();
        const coffeeCheck = coffeeMachine.checkCoffee();
        const milkCheck = coffeeMachine.checkMilk();

        if (( waterCheck === true) && (coffeeCheck === true) && (milkCheck === true)) {
            document.querySelector('.start-button').style.backgroundColor = '#9aff8b';
            return true;
        }
        return false;

    },

    checkWater() {
        const waterButton = document.querySelector('.water');
        const pickedCoffeeObject = Object.values(COFFEE_TYPES).filter(item => item.name === coffeeMachine.pickedCoffee);
        const requiredAmount = pickedCoffeeObject[0].water;

        waterButton.innerText = `${coffeeMachine.waterVolume}/${requiredAmount}`;

        if (coffeeMachine.waterVolume >= requiredAmount) {
            waterButton.style.backgroundColor = '#9aff8b';
            return true;
        } else {
            waterButton.style.backgroundColor = '#ff7a6c';
            return false;
        }
    },

    checkCoffee() {
        const coffeeButton = document.querySelector('.coffee');
        const pickedCoffeeObject = Object.values(COFFEE_TYPES).filter(item => item.name === coffeeMachine.pickedCoffee);
        const requiredAmount = pickedCoffeeObject[0].coffee;

        coffeeButton.innerText = `${coffeeMachine.coffeeWeight}/${requiredAmount}`;

        if (coffeeMachine.coffeeWeight >= requiredAmount) {
            coffeeButton.style.backgroundColor = '#9aff8b';
            return true;
        } else {
            coffeeButton.style.backgroundColor = '#ff7a6c';
            return false;
        }
    },

    checkMilk() {
        const milkButton = document.querySelector('.milk');
        const pickedCoffeeObject = Object.values(COFFEE_TYPES).filter(item => item.name === coffeeMachine.pickedCoffee);
        const requiredAmount = pickedCoffeeObject[0].milk;

        milkButton.innerText = `${coffeeMachine.milkVolume}/${requiredAmount}`;

        if (coffeeMachine.milkVolume >= requiredAmount) {
            milkButton.style.backgroundColor = '#9aff8b';
            return true;
        } else {
            milkButton.style.backgroundColor = '#ff7a6c';
            return false;
        }
    },

    refillWater() {
        if (coffeeMachine.phase === 2 || coffeeMachine.phase === 3) {
            if (coffeeMachine.waterVolume < coffeeMachine.maxWaterVolume) {
                if ((coffeeMachine.maxWaterVolume - coffeeMachine.waterVolume) < 100) {
                    coffeeMachine.waterVolume += (coffeeMachine.maxWaterVolume - coffeeMachine.waterVolume);
                } else {
                    coffeeMachine.waterVolume += 100;
                }
            }
            coffeeMachine.checkWater();
            coffeeMachine.checkResources();
        }
    },

    refillCoffee() {
        if (coffeeMachine.phase === 2 || coffeeMachine.phase === 3) {
            if (coffeeMachine.coffeeWeight < coffeeMachine.maxCoffeeWeight) {
                coffeeMachine.coffeeWeight += 1;
            }
            coffeeMachine.checkCoffee();
            coffeeMachine.checkResources();
        }
    },

    refillMilk() {
        if (coffeeMachine.phase === 2 || coffeeMachine.phase === 3) {
            if (coffeeMachine.milkVolume < coffeeMachine.maxMilkVolume) {
                if ((coffeeMachine.maxMilkVolume - coffeeMachine.milkVolume) < 100) {
                    coffeeMachine.milkVolume += (coffeeMachine.maxMilkVolume - coffeeMachine.milkVolume);
                } else {
                    coffeeMachine.milkVolume += 100;
                }
            }
            coffeeMachine.checkMilk();
            coffeeMachine.checkResources();
        }
    },

    makeCoffee() {
        if (!coffeeMachine.checkPhase()) return;
        if (coffeeMachine.phase === 2 || coffeeMachine.phase === 3) {
            if (coffeeMachine.checkResources() === true) {
                coffeeMachine.phase = 4;
                coffeeMachine.setOutput();
                coffeeMachine.subtractUsedResources();
                setTimeout(coffeeMachine.finishCoffee, 3000);
                clearTimeout(coffeeMachine.finishCoffee);
            } else {
                coffeeMachine.phase = 3;
                coffeeMachine.setOutput();
            }
        }
    },

    subtractUsedResources() {
        const pickedCoffeeObject = Object.values(COFFEE_TYPES).filter(item => item.name === coffeeMachine.pickedCoffee);
        coffeeMachine.milkVolume -= pickedCoffeeObject[0].milk;
        coffeeMachine.waterVolume -= pickedCoffeeObject[0].water;
        coffeeMachine.coffeeWeight -= pickedCoffeeObject[0].coffee;
    },

    finishCoffee() {
        coffeeMachine.phase = 5;
        coffeeMachine.setOutput();
        coffeeMachine.clearBackgroundColorAndTextContent();
        setTimeout(coffeeMachine.turnMachineOn, 2000);
    },

    clearBackgroundColorAndTextContent() {
        const waterButton = document.querySelector('.water');
        waterButton.style.backgroundColor = '#e2e2e2';
        waterButton.textContent = '';

        const coffeeButton = document.querySelector('.coffee')
        coffeeButton.style.backgroundColor = '#e2e2e2';
        coffeeButton.textContent = '';

        const milkButton = document.querySelector('.milk')
        milkButton.style.backgroundColor = '#e2e2e2';
        milkButton.textContent = '';

        document.querySelector('.start-button').style.backgroundColor = '#e2e2e2';
    }
};

coffeeMachine.loadCoffeeTypes();