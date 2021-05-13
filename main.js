// Constructor function for Drinks
function Drink(name, sugar, ice) {
  this.name = name
  this.sugar = sugar
  this.ice = ice
}

Drink.prototype.price = function () {
  switch (this.name) {
    case 'Black Tea':
    case 'Oolong Tea':
    case 'Baozong Tea':
    case 'Green Tea':
      return 30
    case 'Bubble Milk Tea':
    case 'Lemon Green Tea':
      return 50
    case 'Black Tea Latte':
    case 'Matcha Latte':
      return 55
    default:
      alert('No this drink')
  }
}

// AlphaPos constructor function
function AlphaPos() { }

AlphaPos.prototype.getCheckedValue = function (inputName) {
  let selectedOption = ''
  document.querySelectorAll(`[name=${inputName}]`).forEach(function (item) {
    if (item.checked) {
      selectedOption = item.value
    }
  })
  return selectedOption
}

// let blackTea = new Drink('Black Tea', 'Half Sugar', 'No Ice')
// console.log(blackTea)
// console.log(blackTea.price())

// let lemonGreenTea = new Drink('Lemon Green Tea', 'No Sugar', 'Less Ice')
// console.log(lemonGreenTea)
// console.log(lemonGreenTea.price())

// let matchaLatte = new Drink('Matcha Latte', 'Less Sugar', 'Regular Ice')
// console.log(matchaLatte)
// console.log(matchaLatte.price())
const alphaPos = new AlphaPos()

const addDrinkButton = document.querySelector('[data-alpha-pos="add-drink"]')
addDrinkButton.addEventListener('click', function () {
  const drinkName = alphaPos.getCheckedValue('drink')
  const ice = alphaPos.getCheckedValue('ice')
  const sugar = alphaPos.getCheckedValue('sugar')

  if (!drinkName) {
    alert('Please choose at least one item!!')
    return
  }
  const drink = new Drink(drinkName, sugar, ice)

  alphaPos.addDrink(drink)
})

const orderLists = document.querySelector('[data-order-lists]')

let orderItemHTML = ``
orderLists.insertAdjacentHTML('afterbegin', orderItemHTML)

AlphaPos.prototype.addDrink = function (drink) {
  let orderItemHTML = `
    <div class="card mb-3">
          <div class="card-body pt-3 pr-3">

            <div class="text-right">
              <span data-alpha-pos="delete-drink">×</span>
            </div>
            <h6 class="card-title">${drink.name}</h6>
            <div class="card-text">${drink.ice}</div>
            <div class="card-text">${drink.sugar}</div>
          </div>

          <div class="card-footer text-right py-2">
            <div class="card-text text-muted">
              $ <span data-drink-price>${drink.price()}</span>
            </div>
          </div>
        </div>
  `

  orderLists.insertAdjacentHTML('afterbegin', orderItemHTML)
}

orderLists.addEventListener('click', e => {
  const target = e.target
  if (!target.matches('[data-alpha-pos="delete-drink"]')) {
    return
  }
  alphaPos.deleteDrink(target.parentElement.parentElement.parentElement)
})

AlphaPos.prototype.deleteDrink = function (target) {
  target.remove()
}

const checkoutButton = document.querySelector('[data-alpha-pos="checkout"]')
checkoutButton.addEventListener('click', e => {
  alert(`Total amount of drinks: $${alphaPos.checkout()}`)

  alphaPos.clearOrder(orderLists)
})

AlphaPos.prototype.checkout = function () {
  let totalAmount = 0
  document.querySelectorAll('[data-drink-price]').forEach(drink => {
    totalAmount += Number(drink.textContent)
  })
  return totalAmount
}

AlphaPos.prototype.clearOrder = function (target) {
  target.querySelectorAll('.card').forEach(card => {
    card.remove()
  })
}