// LOGIN
function login() {
    let role = roleEl().value;
    let u = id("username").value;
    let p = id("password").value;

    if (role === "admin" && u === "admin" && p === "admin123") {
        location.href = "admin.html";
    } else if (role === "user" && u === "user" && p === "user123") {
        location.href = "user.html";
    } else {
        alert("Invalid login");
    }
}

function roleEl() { return document.getElementById("role"); }
function id(x) { return document.getElementById(x); }

// ADD NOTICE (ADMIN)
function addNotice() {
    let text = id("noticeText").value;
    let type = id("type").value;
    if (text === "") return alert("Enter notice");

    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    notices.push({
        text,
        type,
        date: new Date().toLocaleString(),
        views: 0
    });

    localStorage.setItem("notices", JSON.stringify(notices));
    id("noticeText").value = "";
    loadNotices();
}

// LOAD NOTICES
function loadNotices() {
    let notices = JSON.parse(localStorage.getItem("notices")) || [];
    let box = id("noticeBox");
    if (!box) return;

    box.innerHTML = "";
    let isAdmin = location.href.includes("admin");

    notices.forEach((n, i) => {
        if (!isAdmin) {
            n.views++;
            localStorage.setItem("notices", JSON.stringify(notices));
        }

        let div = document.createElement("div");
        div.className = "notice-card";
        div.innerHTML = `
            <b>[${n.type}]</b> ${n.text}<br>
            <small>${n.date}</small><br>
            ${isAdmin ? `Views: ${n.views}<br><button onclick="deleteNotice(${i})">Delete</button>` : ""}
        `;
        box.appendChild(div);
    });
}

// DELETE (ADMIN ONLY)
function deleteNotice(i) {
    let notices = JSON.parse(localStorage.getItem("notices"));
    notices.splice(i, 1);
    localStorage.setItem("notices", JSON.stringify(notices));
    loadNotices();
}

// AUTO LOAD
window.onload = loadNotices;

// PWA
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
}
