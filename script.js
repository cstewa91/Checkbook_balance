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
}

function handleAddClicked() {
      addItem();
}

function handleCancelClick() {
      clearAddItemFormInputs();
}

function addItem() {
      var name = $('#itemName').val();
      var amount = parseFloat($('#amount').val());
      var date = $('#dueDate').val();
      var account = $('#account').val();
      var formatAmount = "$" + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
      var dueDate = new Date(date)
      var dueDateMonth = dueDate.getMonth() + 1;
      var dueDateDay = dueDate.getDate() + 1;
      var dueDateYear = dueDate.getFullYear();
      var dueDateString = dueDateMonth + '-' + dueDateDay + '-' + dueDateYear;
      var item = {
            'name': name,
            'amount': formatAmount,
            'dueDate': dueDateString,
            'account': account
      }
      itemsArray.push(item)
      updateItemList(itemsArray);
      clearAddItemFormInputs();
}

function clearAddItemFormInputs() {
      $('#itemName').val('');
      $('#amount').val('');
      $('#dueDate').val('');
}

function renderStudentOnDom(itemObject) {
      var itemName = $('<td>').append(itemObject.name)
      var itemAmount = $('<td>').append(itemObject.amount)
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
      for (var i = 0; i < itemsArray.length; i++) {
            if (itemsArray[i].account === "Checkings") {
                  var sliceCheckingAmount = itemsArray[i].amount.slice(1)
                  checkingExpense += parseFloat(sliceCheckingAmount)
            } else {
                  var sliceSavingAmount = itemsArray[i].amount.slice(1)
                  savingExpense += parseFloat(sliceSavingAmount)
            }
      }

      renderBalance(checkingExpense, savingExpense);
}

function renderBalance(checkingExpense, savingExpense) {
      var checkingBalance = parseFloat($('.checkings-balance').val()) - checkingExpense;
      var savingBalance = parseFloat($('.savings-balance').val()) - savingExpense;
      $('.checkings-balance').text("$ " + checkingBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
      $('.savings-balance').text("$ " + savingBalance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'))
}