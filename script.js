const API_URL = "https://jsonplaceholder.typicode.com/users";
const userContainer = document.getElementById("userContainer");
const reloadBtn = document.getElementById("reloadBtn");
const searchBox = document.getElementById("searchBox");
const sortSelect = document.getElementById("sortSelect");

const modal = document.getElementById("userModal");
const closeModal = document.getElementById("closeModal");
const modalName = document.getElementById("modalName");
const modalEmail = document.getElementById("modalEmail");
const modalPhone = document.getElementById("modalPhone");
const modalWebsite = document.getElementById("modalWebsite");
const modalCompany = document.getElementById("modalCompany");
const modalAddress = document.getElementById("modalAddress");

let allUsers = [];

async function fetchUsers() {
    userContainer.innerHTML = "<p>Loading...</p>";
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const users = await response.json();
        allUsers = users;
        displayUsers(allUsers);
    } catch (error) {
        userContainer.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
}

function displayUsers(users) {
    userContainer.innerHTML = "";
    users.forEach(user => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.innerHTML = `
            <h3>${user.name}</h3>
            <p>${user.email}</p>
            <p>${user.address.city}</p>
        `;
        userCard.addEventListener("click", () => showUserDetails(user));
        userContainer.appendChild(userCard);
    });
}

// Search functionality
searchBox.addEventListener("input", () => {
    const searchValue = searchBox.value.toLowerCase();
    const filteredUsers = allUsers.filter(user =>
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
    );
    displayUsers(filteredUsers);
});

// Sort functionality
sortSelect.addEventListener("change", () => {
    let sortedUsers = [...allUsers];
    if (sortSelect.value === "asc") {
        sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortSelect.value === "desc") {
        sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
    }
    displayUsers(sortedUsers);
});

// Show user details in modal
function showUserDetails(user) {
    modalName.textContent = user.name;
    modalEmail.textContent = `Email: ${user.email}`;
    modalPhone.textContent = `Phone: ${user.phone}`;
    modalWebsite.textContent = `Website: ${user.website}`;
    modalCompany.textContent = `Company: ${user.company.name}`;
    modalAddress.textContent = `Address: ${user.address.street}, ${user.address.city}`;
    modal.style.display = "block";
}

// Close modal
closeModal.addEventListener("click", () => modal.style.display = "none");
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

reloadBtn.addEventListener("click", fetchUsers);

// Initial load
fetchUsers();
