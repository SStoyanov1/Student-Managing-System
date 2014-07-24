(function () {
    var $errorMessage, $successMessage, addStudent, delStudent, reloadStudents, resourceUrl;

    resourceUrl = 'http://localhost:3000/students';

    $successMessage = $('.messages .success');

    $errorMessage = $('.messages .error');

    reloadStudents = function () {
        $.ajax({
            url: resourceUrl,
            type: 'GET',
            contentType: 'application/json',
            success: function (data) {
                var student, $studentsList, i, len;
                $studentsList = $('<ul/>').addClass('students-list');
                for (i = 0, len = data.students.length; i < len; i++) {
                    student = data.students[i];
                    $('<li />')
                       .append($('<span/>'))
                        .html(student.id)
                        .append('. ')
                      .append($('<strong /> ')
                        .html(student.name))
                        .append(': ')
                      .append($('<span />')
                        .html(student.grade))
                        .append(' grade')
                      .appendTo($studentsList)
                      .on('click', function (ev) {
                          if ($(this).hasClass('selected')) {
                              $(this).removeClass('selected');
                          }
                          else {
                              $('.selected').removeClass('selected');
                              $(this).addClass('selected');
                          }
                      });
                }
                $('#students-container').html($studentsList);
            },
            error: function () {
                $errorMessage
                  .html("Error happened: " + err)
                  .show()
                  .fadeOut(2000);
            }
        });
    };

    addStudent = function (data) {
        return $.ajax({
            url: resourceUrl,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                $successMessage
                  .html('' + data.name + ' successfully added')
                  .show()
                  .fadeOut(2000);
                reloadStudents();
            },
            error: function (err) {
                $errorMessage
                  .html('Error happened: ' + err)
                  .show()
                  .fadeOut(2000);
            }
        });
    };

    delStudent = function (data) {
        return $.ajax({
            url: 'http://localhost:3000/students/:id',
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function (data) {
                $successMessage
                  .html('Successfully deleted')
                  .show()
                  .fadeOut(2000);
                reloadStudents();
            },
            error: function (err) {
                $errorMessage
                  .html('Error happened: ' + err)
                  .show()
                  .fadeOut(2000);
            }
        });
    };

    $(function () {
        reloadStudents();
        $('#btn-add-student').on('click', function () {
            var student;
            student = {
                name: $('#tb-name').val(),
                grade: $('#tb-grade').val()
            };
            addStudent(student);
        });
        $('#btn-del-student').on('click', function () {
            var student;
            student = {
                id: $('#tb-id').val()
            };
            delStudent(student);
        });
    });

}).call(this);