window.onload = function () {
    displayData();
};

function displayData() {
    var data = JSON.parse(localStorage.getItem("crudData")) || [];
    var displayDiv = document.getElementById("display-data");

    displayDiv.innerHTML = "";

    if (data.length === 0) {
        displayDiv.innerHTML = "<p>No data found.</p>";
    } else {
        var table = "<table><tr><th>Name</th><th>Email</th><th>Actions</th></tr>";

        for (var i = 0; i < data.length; i++) {
            table += "<tr><td>" + data[i].name + "</td><td>" + data[i].email + "</td><td><button onclick='editData(" + i + ")'>Edit</button><button onclick='deleteData(" + i + ")'>Delete</button></td></tr>";
        }

        table += "</table>";
        displayDiv.innerHTML = table;
    }
}

document.getElementById("crud-form").onsubmit = function (event) {
    event.preventDefault();
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;

    if (name && email) {
        var data = JSON.parse(localStorage.getItem("crudData")) || [];
        data.push({ name: name, email: email });
        localStorage.setItem("crudData", JSON.stringify(data));

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        displayData();
    }
};

function editData(index) {
    var data = JSON.parse(localStorage.getItem("crudData")) || [];
    var newName = prompt("Enter updated name:", data[index].name);
    var newEmail = prompt("Enter updated email:", data[index].email);

    if (newName && newEmail) {
        data[index].name = newName;
        data[index].email = newEmail;
        localStorage.setItem("crudData", JSON.stringify(data));
        displayData();
    }
}

function deleteData(index) {
    var data = JSON.parse(localStorage.getItem("crudData")) || [];
    data.splice(index, 1);
    localStorage.setItem("crudData", JSON.stringify(data));
    displayData();
}
