document.addEventListener('DOMContentLoaded', function() {
  var visitorForm = document.getElementById('visitorForm');
  var signOutForm = document.getElementById('signOutForm');
  var signOutBtn = document.getElementById('signOutBtn');

  signOutBtn.addEventListener('click', function() {
    visitorForm.reset();
    visitorForm.style.display = 'none';
    signOutForm.style.display = 'block';
  });

  signOutForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var phone = document.getElementById('signOutPhone').value;
    var leavedateTime = document.getElementById('leavedateTime').value;

    // Send an AJAX request to check the phone number and update the sign-out time
    fetch('signout.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'phone=' + encodeURIComponent(phone) + '&leavedateTime=' + encodeURIComponent(leavedateTime)
    })
      .then(function(response) {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(data) {
        // Update the modal message based on the PHP response
        if (data.includes('signed in')) {
        document.getElementById('modal-message').textContent = 'Thank you, you have signed in.';
        document.getElementById('modal-message').setAttribute('style', 'color: blue;');
        } else if (data.includes('signed out')) {
          document.getElementById('modal-message').textContent = 'Thank you, you have signed out.';
          document.getElementById('modal-message').setAttribute('style', 'color: red;');
        } 
        else {
           document.getElementById('modal-message').textContent = 'You have typed the wrong number. You are still in.' + data;
          document.getElementById('modal-message').setAttribute('style', 'color: red;');
        }
        
        // Show the modal
        document.getElementById('modal').style.display = 'block';
        var closeButton = document.getElementById('closeButton');

        closeButton.addEventListener('click', function() {
        document.getElementById('modal').style.display = 'none';
        });
        // Reset the form and show the sign-in form again
        signOutForm.reset();
        signOutForm.style.display = 'none';
        visitorForm.style.display = 'block';
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  });

  visitorForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Serialize the form data
    var formData = new FormData(this);
    var serializedData = Array.from(formData)
      .map(function(pair) {
        return pair.map(encodeURIComponent).join('=');
      })
      .join('&');

    // Send an AJAX request to process.php to handle the form submission
    fetch('process.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: serializedData
    })
      .then(function(response) {
        if (response.ok) {
          return response.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then(function(data) {
        // Update the modal message based on the PHP response
        if (data.includes('signed in')) {
            document.getElementById('modal-message').textContent = 'Thank you, you have signed in.';
        document.getElementById('modal-message').setAttribute('style', 'color: blue;');
        } else if (data.includes('signed out')) {
         document.getElementById('modal-message').textContent = 'Thank you, you have signed out.';
            document.getElementById('modal-message').setAttribute('style', 'color: red;');
        } else {
          document.getElementById('modal-message').textContent = 'Error: ' + data;
        }
        
        // Show the modal
        document.getElementById('modal').style.display = 'block';
        var closeButton = document.getElementById('closeButton');

        closeButton.addEventListener('click', function() {
        document.getElementById('modal').style.display = 'none';
        });

        visitorForm.reset(); // Clear the form
      })
      .catch(function(error) {
        console.error('Error:', error);
      });
  });
});


// display visitors table on the same page below form container.
document.addEventListener('DOMContentLoaded', function() {
    var visitorsTable = document.getElementById('visitorsTable');
    var container = document.getElementById('formContainer');

    fetchVisitorsTable();

    function fetchVisitorsTable() {
        fetch('fetch_visitors.php')
            .then(function(response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(function(data) {
                var visitorsTableBody = document.getElementById('visitorsTable').getElementsByTagName('tbody')[0];
                visitorsTableBody.innerHTML = ''; // Clear any existing table rows

                if (data.length > 0) {
                    // Generate table rows with the fetched visitor data
                    data.forEach(function(visitor) {
                        var row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${visitor.first_name}</td>
                            <td>${visitor.last_name}</td>
                            <td>${visitor.phone}</td>
                            <td>${visitor.company}</td>
                            <td>${visitor.emergency_contact}</td>
                            <td>${visitor.site}</td>
                            <td>${visitor.reason}</td>
                            <td>${visitor.date_visited}</td>
                            <td>${visitor.sign_out_time}</td>
                        `;
                        visitorsTableBody.appendChild(row);
                    });
                } else {
                    // Show a message when no visitors are found
                    visitorsTableBody.innerHTML = '<tr><td colspan="9">No visitors found.</td></tr>';
                }

                // Display the form container and table container
                container.style.display = 'block';
                visitorsTable.style.display = 'table';
            })
            .catch(function(error) {
                console.error('Error:', error);
            });
    }
});















































// display table list on another page.
// document.addEventListener('DOMContentLoaded', function() {
//     var openVisitorsListLink = document.getElementById('openVisitorsList');
//     var visitorsTable = document.getElementById('visitorsTable');
//     var toggleFormLink = null;
//     var container = document.querySelector('.container');
//     var visitorForm = document.getElementById('visitorForm');

//     openVisitorsListLink.addEventListener('click', function(e) {
//         e.preventDefault();

//         // Hide the form container and show the visitors table
//         container.style.display = 'none';
//         visitorsTable.style.display = 'table';
//         visitorsTable.style.width = '100%';
//         fetchVisitorsTable();

//         // Create the toggle link only if it doesn't exist
//         if (!toggleFormLink) {
//             // Create the toggle link to go back to the form container
//             toggleFormLink = document.createElement('a');
//             toggleFormLink.href = '#';
//             toggleFormLink.textContent = 'Go Back to Form';
//             toggleFormLink.id = 'toggleFormLink';

//             // Add click event listener to the toggle link
//             toggleFormLink.addEventListener('click', function(e) {
//                 e.preventDefault();

//                 // Show the form container and hide the visitors table
//                 container.style.display = 'block';
//                 visitorsTable.style.display = 'none';

//                 // Remove the toggle link
//                 toggleFormLink.remove();
//                 toggleFormLink = null;
//             });

//             // Append the toggle link after the visitors table
//             visitorsTable.parentNode.insertBefore(toggleFormLink, visitorsTable.nextSibling);
//         }
//     });
// });


// //fetch and display visitors table

// function fetchVisitorsTable() {
//   fetch('fetch_visitors.php')
//     .then(function(response) {
//       if (response.ok) {
//         return response.json();
//       }
//       throw new Error('Network response was not ok.');
//     })
//     .then(function(data) {
//       var visitorsTableBody = document.getElementById('visitorsTable').getElementsByTagName('tbody')[0];
//       visitorsTableBody.innerHTML = ''; // Clear any existing table rows

//       if (data.length > 0) {
//         // Generate table rows with the fetched visitor data
//         data.forEach(function(visitor) {
//           var row = document.createElement('tr');
//           row.innerHTML = `
//             <td>${visitor.first_name}</td>
//             <td>${visitor.last_name}</td>
//             <td>${visitor.phone}</td>
//             <td>${visitor.company}</td>
//             <td>${visitor.emergency_contact}</td>
//             <td>${visitor.site}</td>
//             <td>${visitor.reason}</td>
//             <td>${visitor.date_visited}</td>
//             <td>${visitor.sign_out_time}</td>
//           `;
//           visitorsTableBody.appendChild(row);
//         });
//       } else {
//         // Show a message when no visitors are found
//         visitorsTableBody.innerHTML = '<tr><td colspan="8">No visitors found.</td></tr>';
//       }

//       // Toggle the visibility of the form container and table container
//       document.getElementById('formContainer').style.display = 'none';
//       document.getElementById('tableContainer').style.display = 'block';
//     })
//     .catch(function(error) {
//       console.error('Error:', error);
//     });
// }







