$(document).ready(initializeApp);

var itemsArray = [];


function initializeApp() {
      addClickHandlersToElements();
      if (itemsArray.length === 0) {
            $('.checkings-balance').val(0)
            $('.savings-balance').val(0)
      }
}

function addClickHandlersToElements() {
      $('#add-button').on('click', handleAddClicked);
      $('#cancel-button').on('click', handleCancelClick);
      $("form").submit(preventFormSubmit)
      $('#itemType').on('click', switchForm)
      $('#accountFrom').on('click', switchAccount)
      $('#accountTo').on('click', switchAccount)
}

function handleAddClicked() {
      addItem();
}

function handleCancelClick() {
      clearAddItemFormInputs();
}

function preventFormSubmit(event) {
      event.preventDefault()
}

function switchForm() {
      if ($('#itemType').val() === "Expense") {
            $('#expense-header').removeClass('hide-input')
            $('#income-header').addClass('hide-input')
            $('#transfer-header').addClass('hide-input')
            $('#add-item-inputs').removeClass('hide-input');
            $('#transfer-inputs').addClass('hide-input');
      } else if ($('#itemType').val() === "Income") {
            $('#expense-header').addClass('hide-input')
            $('#income-header').removeClass('hide-input')
            $('#transfer-header').addClass('hide-input')
            $('#add-item-inputs').removeClass('hide-input');
            $('#transfer-inputs').addClass('hide-input');
      } else {
            $('#expense-header').addClass('hide-input')
            $('#income-header').addClass('hide-input')
            $('#transfer-header').removeClass('hide-input')
            $('#add-item-inputs').addClass('hide-input');
            $('#transfer-inputs').removeClass('hide-input');
      }
}

function switchAccount() {
      if ($('#accountFrom').val() === "Checking") {
            $('#fromChecking').attr('Selected', 'selected')
            $('#toSaving').attr('Selected', 'selected')
            $('#fromSaving').removeAttr('Selected', 'selected')
            $('#toChecking').removeAttr('Selected', 'selected')
      } else {
            $('#fromSaving').attr('Selected', 'selected')
            $('#toChecking').attr('Selected', 'selected')
            $('#fromChecking').removeAttr('Selected', 'selected')
            $('#toSaving').removeAttr('Selected', 'selected')
      }
}

function addItem() {
      if ($('#itemType').val() !== "Transfer") {
            addExpenseorIncome();
      } else {
            transferMoney();
      }
}

function transferMoney() {
      var type = $('#itemType').val();
      var transferFrom = $('#accountFrom').val();
      var transferTo = $('#accountTo').val();
      var transferAmount = parseFloat($('#transferAmount').val());
      var renderedAmount = formatAmount(transferAmount, type)
      var transferDate = $('#transferDate').val();
      var newDate = formatDate(transferDate)
      var transfer = {
            'type': type,
            'from': transferFrom,
            'to': transferTo,
            'amount': transferAmount,
            'formatAmount': renderedAmount,
            'date': newDate
      }
      validateItem(transfer)
}

function addExpenseorIncome() {
      var name = $('#itemName').val();
      var type = $('#itemType').val();
      var itemAmount = parseFloat($('#itemAmount').val());
      var renderedAmount = formatAmount(itemAmount, type)
      var itemDate = $('#itemDate').val();
      var newDate = formatDate(itemDate)
      var account = $('#account').val();
      var item = {
            'type': type,
            'name': name,
            'amount': itemAmount,
            'formatAmount': renderedAmount,
            'date': newDate,
            'account': account
      }
      validateItem(item)
}

function formatAmount(amount, type) {
      var formattedAmount = null;
      if (isNaN(amount)) {
            return;
      } else {

            if (type === 'Expense') {
                  formattedAmount = "-" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            } else if (type === 'Income') {
                  formattedAmount = "+" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            } else {
                  formattedAmount = "-" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            }
      }
      return formattedAmount
}

function formatDate(date) {
      var dueDate = new Date(date)
      var newDate = dueDate.toLocaleDateString([], {
            timeZone: 'UTC',
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
      });
      return newDate;
}

function validateItem(item) {
      var date = parseInt(item.date)
      var allVaild = true
      console.log(item)
      if (item.type !== 'Transfer') {
            var formFields = [{
                        name: item.name,
                        select: 'name',
                        regex: /\S/,
                        error: 'Please enter an item'
                  },
                  {
                        name: item.amount,
                        select: 'amount',
                        regex: /\d/,
                        error: 'Please enter an amount'
                  },
                  {
                        name: date,
                        select: 'date',
                        regex: /\d/,
                        error: 'Please enter a date'
                  }
            ]
            for (var arrayIndex = 0; arrayIndex < formFields.length; arrayIndex++) {
                  var currentField = formFields[arrayIndex];
                  $('#' + currentField.select + '-error').removeClass('error-border');
                  if (!currentField.regex.test(currentField.name)) {
                        $('#' + currentField.select + '-error').addClass('error-border');
                        allVaild = false;
                  }
            }
      } else {
            var formFields = [{
                        name: item.amount,
                        select: 'amount',
                        regex: /\d/,
                        error: 'Please enter an amount'
                  },
                  {
                        name: date,
                        select: 'date',
                        regex: /\d/,
                        error: 'Please enter a date'
                  }
            ]
            for (var arrayIndex = 0; arrayIndex < formFields.length; arrayIndex++) {
                  var currentField = formFields[arrayIndex];
                  $('#transfer-' + currentField.select + '-error').removeClass('error-border');
                  if (!currentField.regex.test(currentField.name)) {
                        $('#transfer-' + currentField.select + '-error').addClass('error-border');
                        allVaild = false;
                  }
            }
      }
      if (allVaild) {
            itemsArray.push(item)
            updateItemList(itemsArray);
            clearAddItemFormInputs();
      }
}


function clearAddItemFormInputs() {
      $('#itemName').val('');
      $('#itemAmount').val('');
      $('#itemDate').val('');
      $('#transferAmount').val('');
      $('#transferDate').val('');
}

function renderItemOnDom(itemObject) {
      if (itemObject.type !== 'Transfer') {
            var itemName = $('<td>').append(itemObject.name).addClass('item-width')
            var itemAmount = $('<td>').append(itemObject.formatAmount)
            var itemDate = $('<td>').append(itemObject.date)
            var itemAccount = $('<td>').append(itemObject.account)
            var deleteButton = $('<button>', {
                  text: 'Delete',
                  addClass: 'btn btn-danger btn-sm',
                  on: {
                        click: function () {
                              var deletePosition = itemsArray.indexOf(itemObject);
                              itemsArray.splice(deletePosition, 1);
                              updateItemList(itemsArray);
                        }
                  }
            });
            var tdDeleteButton = $('<td>').append(deleteButton)
            var itemInput = $('<tr>').append(itemName, itemAmount, itemDate, itemAccount, tdDeleteButton)
            $('.tBody').append(itemInput);
      } else {
            var itemName = $('<td>').append(itemObject.type + " to " + itemObject.to).addClass('item-width')
            var itemAmount = $('<td>').append(itemObject.formatAmount)
            var itemDate = $('<td>').append(itemObject.date)
            var itemAccount = $('<td>').append(itemObject.from)
            var deleteButton = $('<button>', {
                  text: 'Delete',
                  addClass: 'btn btn-danger btn-sm',
                  on: {
                        click: function () {
                              var deletePosition = itemsArray.indexOf(itemObject);
                              itemsArray.splice(deletePosition, 1);
                              updateItemList(itemsArray);
                        }
                  }
            });
            var tdDeleteButton = $('<td>').append(deleteButton)
            var itemInput = $('<tr>').append(itemName, itemAmount, itemDate, itemAccount, tdDeleteButton)
            $('.tBody').append(itemInput);
      }
}


function updateItemList(itemsArray) {
      $('.tBody').empty();
      for (var i = 0; i < itemsArray.length; i++) {
            var itemObject = itemsArray[i]
            renderItemOnDom(itemObject);
      }
      calculateExpenses(itemsArray);

}

function calculateExpenses(itemsArray) {
      var checkingExpense = 0;
      var savingExpense = 0;
      var checkingIncome = 0;
      var savingIncome = 0;
      for (var i = 0; i < itemsArray.length; i++) {
            if (itemsArray[i].type === 'Expense') {
                  if (itemsArray[i].account === "Checkings") {
                        checkingExpense += itemsArray[i].amount
                  } else {
                        savingExpense += itemsArray[i].amount
                  }
            } else if(itemsArray[i].type === 'Income'){
                  if (itemsArray[i].account === "Checkings") {
                        checkingIncome += itemsArray[i].amount
                  } else {
                        savingIncome += itemsArray[i].amount
                  }
            } else {
                  if(itemsArray[i].from === "Checking") {
                        checkingIncome -= itemsArray[i].amount;
                        savingIncome += itemsArray[i].amount
                  } else {
                        checkingIncome += itemsArray[i].amount;
                        savingIncome -= itemsArray[i].amount
                  }
            }
      }

      renderBalance(checkingExpense, savingExpense, checkingIncome, savingIncome);
}

function renderBalance(checkingExpense, savingExpense, checkingIncome, savingIncome) {
      var checkingBalance = parseFloat($('.checkings-balance').val()) - checkingExpense + checkingIncome;
      var savingBalance = parseFloat($('.savings-balance').val()) - savingExpense + savingIncome;
      $('.checkings-balance').text("$ " + checkingBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
      $('.savings-balance').text("$ " + savingBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
}