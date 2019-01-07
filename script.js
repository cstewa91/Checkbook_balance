$(document).ready(initializeApp);

var studentArray = []; 
var ajaxConfig = {
      data: {api_key:'LTCfS9b4jQ'},
      dataType:'json',
      method: 'POST',
      url: 'https://s-apis.learningfuze.com/sgt/get',
      success: getData
};
$.ajax(ajaxConfig);

function initializeApp(){
      addClickHandlersToElements();
      getData();
}

function addClickHandlersToElements(){
      $('#add-button').on('click', handleAddClicked);
      $('#cancel-button').on('click', handleCancelClick);
      $('#get-data').on('click', getData)
}

function handleAddClicked(){
      addStudent();
}

function handleCancelClick(){
      clearAddStudentFormInputs();
}

function addStudent(){
      var name = $('#studentName').val();
      var course = $('#course').val();
      var grade = $('#studentGrade').val();
      var student = {'name': name, 'course': course, 'grade': grade}
      addStudentToDb(student);
      student_array.push(student)
      updateStudentList(studentArray);
      clearAddStudentFormInputs();
}

function clearAddStudentFormInputs(){
      $('#studentName').val('');
      $('#course').val('');
      $('#studentGrade').val('');
}

function renderStudentOnDom(studentObject) {
      var studentName = $('<td>').append(studentObject.name)
      var studentCourse = $('<td>').append(studentObject.course)
      var studentGrade = $('<td>').append(studentObject.grade)
      var deleteButton = $('<button>', {
            text:'Delete', 
            addClass: 'btn btn-danger btn-sm',
            on: {
                  click: function() {
                     var deletePosition = studentArray.indexOf(studentObject);
                     studentArray.splice(deletePosition, 1);  
                     delStudentDb(studentObject.id);
                     console.log(studentArray); 
                     updateStudentList(studentArray);
                  }
            } 
      });
      var tdDeleteButton = $('<td>').append(deleteButton)
      var combineStuff = $('<tr>').append(studentName, studentCourse, studentGrade, tdDeleteButton)
      $('.tBody').append(combineStuff); 
}


function updateStudentList(studentArray){
      $('.tBody').empty(); 
      for (var i=0; i < studentArray.length; i++) {
            var studentObject = studentArray[i]
            renderStudentOnDom(studentObject);
      }
      renderGradeAverage(calculateGradeAverage(studentArray));

}

function calculateGradeAverage(studentArray){
      var totalGrade = 0;
      for (var i=0; i<studentArray.length; i++) {
            totalGrade += parseFloat(studentArray[i].grade);
      }
      var averageGrade = (totalGrade/studentArray.length)
      var fixedAvgGrade = parseInt(averageGrade) + '%'
      return fixedAvgGrade;
}

function renderGradeAverage(number){
      if (studentArray.length <= 0) {
            $('.avgGrade').text('0')
            return;
      }
      $('.avgGrade').text(number)
}

function getData(responseData) {
      var ajaxConfig = {
            data: {
                  api_key:'LTCfS9b4jQ', 
            },
            dataType:'json',
            method: 'POST',
            url: 'http://s-apis.learningfuze.com/sgt/get',
            success: function (responseData) {
                  console.log(responseData);
                  studentArray = responseData.data
                  updateStudentList(studentArray);
            },
            error: function (responseData) {
                  console.log('is there an error?', responseData)
                  var errorMsg = $('.errorBody').text(responseData.statusText);
                  $('#error').modal('show');
            }
      }
      $.ajax(ajaxConfig);
}

function addStudentToDb(studentObj, responseData) {
      var ajaxConfig = {
            data: {
                  api_key:'LTCfS9b4jQ',
                  name: studentObj.name,
                  course: studentObj.course,
                  grade: studentObj.grade,
            },
            dataType:'json',
            method: 'POST',
            url: 'http://s-apis.learningfuze.com/sgt/create',
            success: function (responseData) {
                  console.log(responseData);
            },
            error: function (responseData) {
                  console.log(responseData.statusText)
                  var errorMsg = $('.errorBody').text(responseData.statusText);
                  $('#error').modal('show');
            }
      }
      $.ajax(ajaxConfig);
}
function delStudentDb(studentID, responseData) {
      var ajaxConfig = {
            data: {api_key:'LTCfS9b4jQ', student_id: studentID},
            dataType:'json',
            method: 'POST',
            url: 'http://s-apis.learningfuze.com/sgt/delete',
            success: function (responseData) {
                  console.log(responseData);
            }
      }
      $.ajax(ajaxConfig);
}