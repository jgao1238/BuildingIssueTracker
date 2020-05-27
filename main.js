document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
  var issueDate = document.getElementById('issueDateInput').value;
  var issueTime = document.getElementById('issueTimeInput').value;
  var issueDesc = document.getElementById('issueDescInput').value;
  var issueSeverity = document.getElementById('issueSeverityInput').value;
  var issueResponder = document.getElementById('issueResponderInput').value;
  var issueId = chance.guid();
  var issueStatus = 'Open';

  var issue = {
    date: issueDate,
    time: issueTime,
    id: issueId,
    description: issueDesc,
    severity: issueSeverity,
    responder: issueResponder,
    status: issueStatus
  }

  if (localStorage.getItem('issues') == null) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem('issues'));
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
  }

  document.getElementById('issueInputForm').reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for (var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = 'Closed';
      }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
  }

function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    if(confirm("Are you sure you want to delete this event?")){
      for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
          issues.splice(i, 1);
        }
      }
      localStorage.setItem('issues', JSON.stringify(issues));
      fetchIssues();
    }
  }

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem('issues'));
  var issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    var date = issues[i].date;
    var time = issues[i].time;
    var id = issues[i].id;
    var desc = issues[i].description;
    var severity = issues[i].severity;
    var responder = issues[i].responder;
    var status = issues[i].status;

    issuesList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h5><b>Date:</b> ' + date + '<b>  Time: </b>' + time + '</h4>'+
                              '<h3>' + desc + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + responder + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}