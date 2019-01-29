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

function addItem() {
      var name = $('#itemName').val();
      var type = $('#itemType').val();
      var amount = parseFloat($('#amount').val());
      var renderedAmount = formatAmount(amount, type)
      var date = $('#dueDate').val();
      var account = $('#account').val();
      var dueDate = new Date(date)
      var newDate = dueDate.toLocaleDateString([], {
            timeZone: 'UTC',
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
      });
      var item = {
            'type': type,
            'name': name,
            'amount': amount,
            'formatAmount': renderedAmount,
            'dueDate': newDate,
            'account': account
      }
      itemsArray.push(item)
      updateItemList(itemsArray);
      clearAddItemFormInputs();
}

function formatAmount(amount, type) {
      var formattedAmount = null;
      if (isNaN(amount)) {
            return;
      } else {

            if (type === 'Expense') {
                  formattedAmount = "$ -" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            } else {
                  formattedAmount = "$ +" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
            }
      }
      return formattedAmount
}

function validateItem(item) {

}


function clearAddItemFormInputs() {
      $('#itemName').val('');
      $('#amount').val('');
      $('#dueDate').val('');
}

function renderStudentOnDom(itemObject) {
      var itemName = $('<td>').append(itemObject.name)
      var itemAmount = $('<td>').append(itemObject.formatAmount)
      var itemDueDate = $('<td>').append(itemObject.dueDate)
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
      var itemInput = $('<tr>').append(itemName, itemAmount, itemDueDate, itemAccount, tdDeleteButton)
      $('.tBody').append(itemInput);
}


function updateItemList(itemsArray) {
      $('.tBody').empty();
      for (var i = 0; i < itemsArray.length; i++) {
            var itemObject = itemsArray[i]
            renderStudentOnDom(itemObject);
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
            } else {
                  if (itemsArray[i].account === "Checkings") {
                        checkingIncome += itemsArray[i].amount
                  } else {
                        savingIncome += itemsArray[i].amount
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