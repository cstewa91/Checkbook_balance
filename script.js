$(document).ready(initializeApp);

var studentArray = []; 


function initializeApp(){
      addClickHandlersToElements();
}

function addClickHandlersToElements(){
      $('#add-button').on('click', handleAddClicked);
      $('#cancel-button').on('click', handleCancelClick);
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
      studentArray.push(student)
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
