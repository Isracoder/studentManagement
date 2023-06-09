const studentsArray = [];
const student = {
	ID: 1,
	FirstName: "Jane",
	LastName: "Smith",
	age: 22,
	Gender: "Female",
	Email: "janesmith@example.com",
	PhoneNumber: "987-654-3210",
	Address: "456 Elm Street",
	Major: "Psychology",
	YearOfStudy: "4",
	Status: "Pending",
	isDelete: false,
	dataShowing: false,
};

const student2 = {
	ID: 2,
	FirstName: "John",
	LastName: "Doe",
	age: 20,
	Gender: "Male",
	Email: "johndoe@example.com",
	PhoneNumber: "123-456-7890",
	Address: "123 Main Street",
	Major: "Computer Science",
	YearOfStudy: "2",
	Status: "Active",
	isDelete: false,
	dataShowing: false,
};
studentsArray.push(student);
studentsArray.push(student2);
window.onload = function () {
	printTable(studentsArray);
	let submitForm = document.getElementById("submitForm");
	submitForm.addEventListener("submit", (e) => {
		e.preventDefault();
		console.log("prevented");
		addStudent();
	});
};

const addStudent = () => {
	let idInp = document.getElementById("id").value;
	let firstnameInp = document.getElementById("firstName").value;
	let secondnameInp = document.getElementById("lastName").value;
	let ageInp = document.getElementById("age").value;
	let majorInp = document.getElementById("major").value;
	let genderInp = document.getElementById("gender").value;
	let emailInp = document.getElementById("email").value;
	let phoneInp = document.getElementById("phoneNumber").value;
	let addressInp = document.getElementById("address").value;
	let yearInp = document.getElementById("yearOfStudy").value;
	let different = true;
	if (idInp)
		studentsArray.filter((std) => std.ID == idInp).length != 0
			? (different = false)
			: (different = true);
	if (!different) {
		alert("The ID must be unique!");
		return;
	}
	if (
		idInp &&
		firstnameInp &&
		secondnameInp &&
		ageInp &&
		majorInp &&
		genderInp &&
		emailInp &&
		phoneInp &&
		addressInp &&
		yearInp
	) {
		//alert("All information has been entered");
		genderInp = genderInp.charAt(0).toUpperCase() + genderInp.slice(1);
		// to capitalize the first letter
		let newStud = {
			ID: Number(idInp),
			FirstName: firstnameInp,
			LastName: secondnameInp,
			age: Number(ageInp),
			Gender: genderInp,
			Email: emailInp,
			PhoneNumber: phoneInp,
			Address: addressInp,
			Major: majorInp,
			YearOfStudy: Number(yearInp),
			Status: "Pending",
			isDelete: false,
			dataShowing: false,
		};
		studentsArray.push(newStud);
		// console.log(studentsArray);
		printTable(studentsArray);
	} else {
		alert("Deficient information! Try again");
	}
};

const showStudent = (studId) => {
	let matchingIds = studentsArray
		.filter((student) => student.isDelete == false)
		.filter((student) => student.ID == studId);
	matchingIds.forEach((stdObj) => {
		const studentData = document.getElementById("std-data");
		if (stdObj.Status === "Pending") {
			studentData.classList.remove("display-block");
			studentData.classList.add("display-none");
			alert(
				"The Student is Pending , activate the student and try again"
			);
			studentsArray.forEach((std) => (std.dataShowing = false));
		} else if (stdObj.dataShowing) {
			studentData.classList.remove("display-block");
			studentData.classList.add("display-none");
			studentsArray.forEach((std) => (std.dataShowing = false));
		} else {
			studentData.classList.remove("display-none");
			studentData.classList.add("display-block");
			stdObj.dataShowing = true;
			studentData.innerHTML = `
        <h2>Student Information</h2>
						<p><strong>ID:</strong> <span id="id">${stdObj.ID}</span></p>
						<p>
							<strong>First Name:</strong>
							<span id="firstName">${stdObj.FirstName}</span>
						</p>
						<p>
							<strong>Last Name:</strong>
							<span id="lastName">${stdObj.LastName}</span>
						</p>
						<p><strong>Age:</strong> <span id="age">${stdObj.age}</span></p>
						<p>
							<strong>Gender:</strong>
							<span id="gender">${stdObj.Gender}</span>
						</p>
						<p>
							<strong>Email:</strong>
							<span id="email">${stdObj.Email}</span>
						</p>
						<p>
							<strong>Phone Number:</strong>
							<span id="phoneNumber">${stdObj.PhoneNumber}</span>
						</p>
						<p>
							<strong>Address:</strong>
							<span id="address">${stdObj.Address}</span>
						</p>
						<p>
							<strong>Major:</strong>
							<span id="major">${stdObj.Major}</span>
						</p>
						<p>
							<strong>Year of Study:</strong>
							<span id="yearOfStudy">${stdObj.YearOfStudy}</span>
						</p>
						<p>
							<strong>Status:</strong>
							<span id="status">${stdObj.Status}</span>
						</p>
						<p>
							<strong>Is Deleted:</strong>
							<span id="isDelete">${stdObj.isDelete}</span>
						</p>`;
		}
		printTable(studentsArray);
	});
};
const changeStatus = (studId) => {
	let matchingIds = studentsArray
		.filter((student) => student.isDelete == false)
		.filter((student) => student.ID == studId);
	matchingIds.forEach((stud) => {
		console.log(`Status for ${studId} ${stud.Status}`);
		if (stud.Status == "Pending") stud.Status = "Active";
		else if (stud.Status == "Active") stud.Status = "Pending";
		console.log(`Status for ${studId} ${stud.Status}`);
	});
	printTable(studentsArray);
};
const deleteStudent = (studId) => {
	let matchingIds = studentsArray
		.filter((student) => student.isDelete == false)
		.filter((student) => student.ID == studId);
	matchingIds.forEach((stud) => {
		stud.isDelete = true;
	});
	printTable(studentsArray);
};
const printTable = (stdarr) => {
	document.getElementById("tableBody").innerHTML = stdarr
		.filter((std) => std.isDelete == false)
		.map((studObj) => {
			return `<tr>
        <td> ${studObj.ID}</td>
        <td>${studObj.FirstName} ${studObj.LastName}</td>
        <td>
            <button onclick="changeStatus(${studObj.ID})">${
				studObj.Status == "Pending" ? "Activate" : "De-activate"
			}</button>
            <button onclick="showStudent(${studObj.ID})">
                ${studObj.dataShowing ? "Hide data" : "Show Data"}
            </button>
            <button onclick="deleteStudent(${studObj.ID})">Delete</button>
        </td>
    </tr>`;
		})
		.join("");
};
const filter = () => {
	let ageFilter = document.getElementById("filter-age").value;
	let majorFilter = document.getElementById("filter-major").value;
	if (majorFilter)
		majorFilter = majorFilter.replace(/\s+/g, " ").trim().toLowerCase();
	let filteredArr;
	if (ageFilter && majorFilter) {
		filteredArr = studentsArray
			.filter((std) => std.isDelete == false)
			.filter(
				(stdObj) =>
					stdObj.age == ageFilter &&
					stdObj.Major.trim().toLowerCase().includes(majorFilter)
			);
	} else if (ageFilter) {
		filteredArr = studentsArray
			.filter((std) => std.isDelete == false)
			.filter((stdObj) => stdObj.age == Number(ageFilter));
	} else if (majorFilter) {
		filteredArr = studentsArray
			.filter((std) => std.isDelete == false)
			.filter((stdObj) =>
				stdObj.Major.trim().toLowerCase().includes(majorFilter)
			);
	} else {
		alert("You have chosen to filter by nothing");
		filteredArr = studentsArray;
	}
	printTable(filteredArr);
};
