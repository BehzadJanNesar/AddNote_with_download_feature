const addBox = document.querySelector(".add_box"),
popupBox = document.querySelector(".popup_box"),
popupTitle = document.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("input"),
descTag = popupBox.querySelector("textarea"),
addBtn = popupBox.querySelector("button");

var saveBox = document.querySelector(".saving_box"),
fileName = document.querySelector(".file_name"),
saveCloseIcon = saveBox.querySelector("header i"),
SaveBtn = saveBox.querySelector("button");

const months = ["January" , "February" , "March" , "April" , "May" ,
"June" , "August" , "October" , "November" , "December"];

const Notes = JSON.parse(localStorage.getItem("info") || "[]");


addBox.addEventListener("click" , ()=> {
    popupBox.classList.add("show");
    titleTag.focus()
})
closeIcon.addEventListener("click" , ()=> {
    activeUpdate = false ;
    titleTag.value = "";
    descTag.value = "";
    addBtn.innerHTML = "Add Note";
    popupTitle.innerHTML = "Add a new Note";
    popupBox.classList.remove("show");
})


function createNotes() {
    document.querySelectorAll(".note").forEach(note=> note.remove());
    Notes.forEach( (info , index) => {
        let liTag = `<li class="note">
                        <div class="details">
                            <p>${info.title}</p>
                            <span>${info.description}</span>
                        </div>
                        <div class="bottom_content">
                            <span>${info.date}</span>
                            <div class="setting">
                                <i onclick="activeSetting(this)" class="fa-solid fa-ellipsis"></i>
                                <ul class="menu">
                                    <li onclick="editNotes(${index} , '${info.title}' , '${info.description}')"><i class="fa-solid fa-pen"></i>Edit</li>
                                    <li onclick="deleteNote(${index})"><i class="fa-solid fa-trash"></i>Delete</li>
                                    <li class="saveNote" onclick="savebtn()"> <i class="fa-solid fa-download"></i> Save</li>
                                </ul>
                            </div>
                        </div>
                    </li>`;
    addBox.insertAdjacentHTML("afterend" , liTag)
    });
};

window.onload = createNotes();


function activeSetting(e) {
    e.parentElement.classList.add("active")

    document.addEventListener("click" , elem=> {
        if (elem.target != e || elem.target.tagName != "I" ) {
            e.parentElement.classList.remove("active")
        }
    })
}

function deleteNote(arr) {
    let alert = confirm("Are you sure you want to delete this note?")
    if(!alert) return;
    Notes.splice(arr,1);
    localStorage.setItem("info" , JSON.stringify(Notes));
    createNotes()
    window.location.reload(); 
}

let activeUpdate = false , update;
function editNotes(Id , title , desc ) {
    activeUpdate = true ;
    addBox.click();
    update = Id;
    titleTag.value = title; 
    descTag.value = desc;
    addBtn.innerHTML = "Update Note";
    popupTitle.innerHTML = "Update a Note";
}

// Save File section
var note = document.querySelectorAll(".note"),
detail = document.querySelectorAll(".note .details span"),
saveMy = document.querySelectorAll(".saveNote");
let zakhire ;
let fileUrl;
let blob;
        
saveMy.forEach((info , index)=> {
    info.addEventListener("click" , ()=>{
        zakhire = detail[index].innerText;
        savebtn();
        blob = new Blob([zakhire] , ["text/plain"]);
        fileUrl = URL.createObjectURL(blob);
        fileName.focus();
    })
})
function saveIt() {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName.value;
    link.click();
    saveClose()
}

function saveClose() {
    fileName.value = "";
    saveBox.classList.remove("active");
}
function savebtn() {
    saveBox.classList.add("active")
}


addBtn.addEventListener("click" , ()=> {

    let titleVal = titleTag.value,
    descVal = descTag.value;
    
    if(titleVal || descVal) {
        let dateObj = new Date(),
        day = dateObj.getDate(),
        month = months[dateObj.getMonth()],
        year = dateObj.getFullYear();
        
        let dateInfo = {
            title : titleVal,
            description : descVal,
            date : `${month} ${day}, ${year}`
        }

        if(!activeUpdate) {
            Notes.push(dateInfo);
        }else {
            activeUpdate = false ;
            Notes[update] = dateInfo;
        }

        localStorage.setItem( "info" , JSON.stringify(Notes));
        createNotes();
        closeIcon.click();
        window.location.reload();
    }
})

// navbar feature
var darkModeToggle = document.getElementById("toggle");
var darkLightName = document.getElementById("color_page");


function darkMode() {

    if(darkLightName.innerHTML === "Light"){
        darkLightName.innerHTML = "Dark";
        darkModeToggle.classList.add("fa-moon");
        darkModeToggle.classList.remove("fa-sun");
        
    }else{
        darkModeToggle.classList.add("fa-sun");
        darkModeToggle.classList.remove("fa-moon");
        darkLightName.innerHTML = "Light"
    }    

}
var nav = document.querySelector("nav"),
body = document.querySelector("body"),
rightSec = document.querySelector(".section_right"),
leftSec = document.querySelector(".section_left");

darkModeToggle.addEventListener("click" , ()=> { 
    nav.classList.toggle("active");
    darkMode();
    rightSec.classList.toggle("active")
    leftSec.classList.toggle("active")
    body.classList.toggle("active")
    
})

