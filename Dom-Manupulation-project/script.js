
// DOM Elements
const studentForm = document.getElementById('student-form');
const studentTable = document.querySelector('#studentTable tbody');

// Initialize local storage data
let students = JSON.parse(localStorage.getItem('students')) || [];

// Function to render student records
function renderTable() {
    studentTable.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.id}</td>
            <td>${student.email}</td>
            <td>${student.contact}</td>
            <td>
                <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
                <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        studentTable.appendChild(row);
    });
}

// Add student record
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('studentName').value.trim();
    const id = document.getElementById('studentID').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contactNumber').value.trim();

    if (name && id && email && contact) {
        const newStudent = { name, id, email, contact };
        students.push(newStudent);
        localStorage.setItem('students', JSON.stringify(students));
        renderTable();
        studentForm.reset();
    } else {
        alert('Please fill out all fields.');
    }
});

// Edit student record
function editStudent(index) {
    const student = students[index];
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentID').value = student.id;
    document.getElementById('email').value = student.email;
    document.getElementById('contactNumber').value = student.contact;

    students.splice(index, 1);
    renderTable();
}

// Delete student record
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    renderTable();
}

// Initial render
renderTable();
