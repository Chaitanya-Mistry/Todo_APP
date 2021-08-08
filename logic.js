function say(m) {
    let msg = new SpeechSynthesisUtterance();
    msg.voice = window.speechSynthesis.getVoices()[4];
    msg.voiceURI = "native";
    msg.volume = 1;
    msg.rate = 1;
    msg.pitch = 1.1;
    msg.text = m;
    msg.lang = 'en-US';
    speechSynthesis.speak(msg);
  }

list = document.getElementsByClassName('individual_list')[0];
input = document.getElementById('list');
add = document.getElementById('add');
pendingContainer = document.getElementsByClassName('pending')[0];

// List Container
listContainer = document.getElementsByClassName('listContainer')[0];

let lcsArray;
let AllLists;

showNotes();
let checks = document.getElementsByClassName('checks');
add.addEventListener('click', () => {

    if (localStorage.getItem('todo') == null) {
        lcsArray = [];
    }
    else {
        lcsArray = JSON.parse(localStorage.getItem('todo'));
    }

    if (input.value == "") {
        listContainer.html = `<h3>Please Enter Something...</h3>`;
    }
    else {
        lcsArray.push(input.value);
        input.value = "";

        // Convert a JavaScript object into a string with JSON.stringify().When sending data to a web server, the data has to be a string..
        localStorage.setItem('todo', JSON.stringify(lcsArray))

        // Populate The List Container
        showNotes();
    }
})
// Populate The List Container
function showNotes() {
    if (localStorage.getItem('todo') == null) {
        lcsArray = [];
        listContainer.innerHTML = `<h3 style="color:white;letter-spacing:0.7px;word-spacing:1px;font-size:1.75rem">Write Something...</h3>`;
        pendingContainer.innerHTML = "";
    }
    else {
        let html = "";
        lcsArray = JSON.parse(localStorage.getItem('todo'));

        for (let i = 0; i < lcsArray.length; i++) {
            html += `<p class="individual_list" onmouseover="showDelete(${i})">${lcsArray[i]}<span class="material-icons delete_icon" onclick="deleteIT(${i})" contenteditable="false">delete</span></p>`;
        }
        listContainer.innerHTML = html;

        if (lcsArray.length == 1) {
            pendingContainer.innerHTML = `<h3 id="pendingTasks">You have only <span style="color:red">${lcsArray.length}</span> pending task !</h3>`;
            hideDustbin();
        }
        else {
            pendingContainer.innerHTML = `<h3 id="pendingTasks">You have <span style="color:red">${lcsArray.length}</span> pending tasks</h3>
            <button id="clearAll" onclick="clearALL()">Clear All</button>`;
            hideDustbin();
        }
    }
}
// Delete individual list Function
function deleteIT(no) {
    say("Do you reallyyy want to delete it ?..");
    confirmation = confirm("It will we deleted permenantly ! , Do you want to contiue ? ");

    if (confirmation) {
        lcsArray = JSON.parse(localStorage.getItem('todo'));
        lcsArray.splice(no, 1);

        if (lcsArray.length == 0) {
            localStorage.clear();
            showNotes();
        }
        else {
            localStorage.setItem('todo', JSON.stringify(lcsArray));
            showNotes();
        }
    }
}
// Delete all items in list
function clearALL() {
    say("warning , It will delete all the list items...");
    confirmation = confirm("All items of the list will be deleted...");

    if (confirmation) {
        // To remove the specific item from the localStorage
        localStorage.removeItem('todo');
        showNotes();
    }
}
// Show delete icon for particular list only...
function showDelete(no) {
    dustbin = document.getElementsByClassName('delete_icon')[no];
    dustbin.style.visibility = "visible";
}
// Hide delete icon when user move his/her mouse out from the individual list
function hideDustbin() {
    AllLists = document.getElementsByClassName('individual_list');
    for (let i = 0; i < lcsArray.length; i++) {
            AllLists[i].addEventListener('mouseleave', () => {
            AllLists[i].children[0].style.visibility = "hidden";
        })
    }
}