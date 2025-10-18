

if (localStorage.getItem("isLogined") == "false") {
  alert("Please login first!");
  window.location.replace("index.html");
  // stop running rest of the code

} else {

  // click to add task function

  const open = document.getElementById("add")

  const box = document.getElementById("inputfield")

  var title = document.getElementById("add-title1")


  open.addEventListener("click", (event) => {

    if (box.style.display == "none") {



      title.style.display = "none"


      box.style.display = "flex"


      setTimeout(() => {
        box.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    } else {
      box.style.display = "none"
      title.style.display = "block"
    }

  })

  // click to close the add task card

  const close = document.getElementById("close")

  close.addEventListener("click", (event) => {

    if (box.style.display == "flex") {

      box.style.display = "none"
    }
  })

  // logout button

  const Log = document.getElementById("logout")

  Log.addEventListener("click", (event) => {

    let userResult = window.confirm("Logout")

    if (userResult) {


      localStorage.setItem("isLogined", "false")

      //  localStorage.removeItem("loginuser")

      window.location.replace("index.html")
    } else {

      window.location.replace("homepage.html")
    }
  })

  //   add user name
  const displayname = document.getElementById("name");

  displayname.textContent = localStorage.getItem("loginuser") || "Guest"

  

}

// moblie logout

const moblielogout=document.getElementById("logout-moblie")

moblielogout.addEventListener("click",(event)=>{

  let userResult=window.confirm("logout");

  if(userResult){

    localStorage.setItem("isLogined","false")
    
    window.location.replace("index.html")
  }else{
    window.location.replace("homepage.html")
  }



})

// add moblie user

  const  displayMoblieName=document.getElementById("moble-name");
 
displayMoblieName.textContent=localStorage.getItem("loginuser") || "Guest"






// ********************* get task*************************************************************************************************************



let editindex = null;


const ok = document.getElementById("ok")
const enter = document.getElementById("Get-task");

ok.addEventListener("click", (event) => {
  event.preventDefault();

  const box = document.getElementById("inputfield")

  let gettask = document.getElementById("Get-task").value;

  if (gettask === "") {
    alert("please enter the task")
    return;
  } else {
    box.style.display = "none"

  }

  let alltask = JSON.parse(localStorage.getItem("usertask")) || [];

  if (editindex == null) {

    alltask.push(gettask);

  } else {
    alltask[editindex] = gettask;
    editindex = null
  }




  localStorage.setItem("usertask", JSON.stringify(alltask))

  document.getElementById("Get-task").value = "";


  submit();



});
// when user press enter key -------------------------------------------------------------------

enter.addEventListener("keypress", (event) => {


  if (event.key === "Enter") {
    event.preventDefault();
    ok.click();
  }

})

// *************************************************************************************************
function submit() {

  let alltask = JSON.parse(localStorage.getItem("usertask")) || [];
  let completeTask = JSON.parse(localStorage.getItem("completeTask")) || [];

  let Getusertask = "";
  let DisplayCOmpleleteTask = ""

  if (alltask.length === 0) {
    Getusertask = ` <li class="EMPTY-LIST" id="add-title1">
                            <h3 > NO TASK ADDED</h3>
                           </li>`
  } else {

    alltask.forEach((value, index) => {


      Getusertask = Getusertask + `<li class="checklist1" >
                            <div class="taks-details">
                              <input class="check" type="checkbox" data-index="${index}">

                                      <label  style="padding-bottom: 2px;" id="listaTask">${value}</label>
                                        </div>
                                          <div class="E-D-icon">
                                           <i   onclick="edittask(${index})" class="bi bi-pencil"></i>
                                            <i  onclick="cleantask(${index})" class="bi bi-trash"></i> 
                                         
                                              </div>
                                                </li>`

    })

  }
  // ************************************* display complete task*****************************************************************

  if (completeTask.length === 0) {
    DisplayCOmpleleteTask = DisplayCOmpleleteTask + `<li class="EMPTY-LIST" >
                           <h3>  NO TASK COMPLETED</h3> 
                         
                         </li> `


  } else {

    completeTask.forEach((value, index) => {
      DisplayCOmpleleteTask = DisplayCOmpleleteTask + `<li class="checklist2">
                                             <div class="taks-details2">
                                              <input class="check-completed" type="checkbox" checked data-index="${index}">
                                              <label  style="padding-bottom: 2px;"><del style="text-decoration-color:#001A56; text-decoration-thickness:5px;">${completeTask[index]}</del></label>
                                               </div>
                                                <i onclick="deletecompleteTask(${index})" class="bi bi-trash" ></i>                                      
                                                 </li>`

    })
  }

  document.getElementById("getuserTask").innerHTML = Getusertask;
  document.getElementById("listThecompleteTask").innerHTML = DisplayCOmpleleteTask;


}

// ****************************** active task move to complete task******************************************************


document.getElementById("getuserTask").addEventListener("change", function (event) {
  if (event.target && event.target.classList.contains("check")) {
    const index = event.target.dataset.index;
    moveTasktoComplete(index);
  }
})

function moveTasktoComplete(index) {

  setTimeout(() => {
    let alltask = JSON.parse(localStorage.getItem("usertask")) || [];
    let completeTask = JSON.parse(localStorage.getItem("completeTask")) || [];

    const movetask = alltask.splice(index, 1)[0];
    completeTask.push(movetask)


    localStorage.setItem("usertask", JSON.stringify(alltask));
    localStorage.setItem("completeTask", JSON.stringify(completeTask));

    submit();

  }, 300);

}

// ********************************complete task move to active task***********************************************************

document.getElementById("listThecompleteTask").addEventListener("change", function (event) {
  if (event.target && event.target.classList.contains("check-completed")) {
    const index = event.target.dataset.index;
    completeTasktoActive(index);
  }

})




function completeTasktoActive(index) {
  setTimeout(() => {
    let alltask = JSON.parse(localStorage.getItem("usertask")) || [];
    let completeTask = JSON.parse(localStorage.getItem("completeTask")) || [];

    const movetask = completeTask.splice(index, 1)[0];
    alltask.push(movetask)


    localStorage.setItem("usertask", JSON.stringify(alltask));
    localStorage.setItem("completeTask", JSON.stringify(completeTask));

    submit();

  }, 300);


}

// ******************** delete a task***********************************************************************

function cleantask(index) {

  let deleteTask = JSON.parse(localStorage.getItem("usertask")) || [];

  deleteTask.splice(index, 1);

  localStorage.setItem("usertask", JSON.stringify(deleteTask));

  submit();

};


// ************************** edit a task **************************************************************************

function edittask(index) {


  let Editor = JSON.parse(localStorage.getItem("usertask")) || [];

  let editcard = document.getElementById("inputfield")

  editcard.style.display = "flex";

  document.getElementById("Get-task").value = Editor[index];

  editindex = index;

}
// *************************************************** delete complete task ********************************************************

function deletecompleteTask(index) {

  let DeletecompleteTask = JSON.parse(localStorage.getItem("completeTask")) || [];

  DeletecompleteTask.splice(index, 1);
  localStorage.setItem("completeTask", JSON.stringify(DeletecompleteTask));

  submit();
}

window.onload = submit;