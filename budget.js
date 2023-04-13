//SELECT ELEMENTS
const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

//SELECT BUTTONS
const expenseBtn = document.querySelector(".first-tab");
const incomeBtn = document.querySelector(".second-tab");
const allBtn = document.querySelector(".third-tab");

//INPUT BTS
const addExpense = document.querySelector(".add-expense");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");

const addIncome = document.querySelector(".add-income");
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");

//VARIABLES
let ENTRY_LIST = [];
let balance = 0,
  income = 0,
  outcome = 0;

const DELETE = "delete",
  EDIT = "edit";

//EVENT LISTENERS
expenseBtn.addEventListener("click", function () {
  show(expenseEl);
  hide([incomeEl, allEl]);
  active(expenseBtn);
  inactive([incomeBtn, allBtn]);
});
incomeBtn.addEventListener("click", function () {
  show(incomeEl);
  hide([expenseEl, allEl]);
  active(incomeBtn);
  inactive([expenseBtn, allBtn]);
});
allBtn.addEventListener("click", function () {
  show(allEl);
  hide([incomeEl, expenseEl]);
  active(allBtn);
  inactive([incomeBtn, expenseBtn]);
});

addExpense.addEventListener("click", function () {
  // CHECK IF ONE OF THE INPUT IS EMPTY => EXIT
  if (!expenseTitle.value || !expenseAmount.value) return;

  // ADD INPUTs TO ENTRY_LIST
  let expense = {
    type: "expense",
    title: expenseTitle.value,
    amount: expenseAmount.value,
  };
  ENTRY_LIST.push(expense);

  updateUI();
  clearInput([expenseTitle, expenseAmount]);
});

addIncome.addEventListener("click", function () {
  // CHECK IF ONE OF THE INPUT IS EMPTY => EXIT
  if (!incomeTitle.value || !incomeAmount.value) return;

  // ADD INPUTs TO ENTRY_LIST
  let income = {
    type: "income",
    title: incomeTitle.value,
    amount: incomeAmount.value,
  };
  ENTRY_LIST.push(income);

  updateUI();
  clearInput([incomeTitle, incomeAmount]);
});

//HELEPER FUNCS

function updateUI() {
  income = calculateTotal("income", ENTRY_LIST);
  outcome = calculateTotal("outcome", ENTRY_LIST);
  balance = calculateBalance(income, outcome);

  //UPDATE UI
  clearElement([expenseList, incomeList, allList]);

  let sign = income >= outcome ? "$" : "-$";

  ENTRY_LIST.forEach((entry, index) => {
    if (entry.type == "expense") {
      showEntry(expenseList, entry.type, entry.title, entry.amount, index);
    } else if (entry.type == "income") {
      showEntry(incomeList, entry.type, entry.title, entry.amount, index);
    }
    showEntry(allList, entry.type, entry.title, entry.amount, index);
  });
}

function showEntry(list, type, title, amount, id) {
  const entry = `<li id="${id}" class="${type}">
                    <div class="entry">${title} : $${amount}</div>
                    <div id="edit"></div>
                    <div id="delete"></div>
                  </li>`;
  const position = "afterbegin";
  list.insertAdjacentHTML(position, entry);
}

function clearElement(elements) {
  elements.forEach((element) => {
    element.innerHTML = "";
  });
}

function calculateTotal(type, list) {
  let sum = 0;
  list.forEach((entry) => {
    if (entry.type == type) {
      sum += entry.amount;
    }
  });
  return sum;
}

function calculateBalance(income, outcome) {
  return income - outcome;
}
function clearInput(inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}

function show(element) {
  element.classList.remove("hide");
}

function hide(elements) {
  elements.forEach((element) => {
    element.classList.add("hide");
  });
}

function active(element) {
  element.classList.add("focus");
}
function inactive(elements) {
  elements.forEach((element) => {
    element.classList.remove("focus");
  });
}
