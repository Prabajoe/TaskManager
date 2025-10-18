
// loginpage
document.addEventListener("DOMContentLoaded" ,()=>{
//  default user name
const Username = "prabagaran";
// default user password 
const Userpassword = "123456";

const Login = document.getElementById("Login")


// check the userid and passwword function

Login.addEventListener("click", (event) => {

  event.preventDefault();

  var Userid = document.getElementById("user-id").value.trim();
  var Userpass = document.getElementById("pwd").value.trim();

  if (Username === Userid) {
    if (Userpassword === Userpass) {

        localStorage.setItem("isLogined", "true");

        localStorage.setItem("loginuser",Userid);

        window.location.replace("homepage.html")


    } else {
      alert("invalid password")
    }
  } else {

    alert("username is invalid")
  }

})


const next=document.getElementById("next");
 let image=document.getElementById("image");
 let logincard=document.getElementById("login-card")

next.addEventListener("click",(event)=>{
  // console.log("print")

  if(window.getComputedStyle(image).display === "flex"){
      image.style.display="none"
    logincard.style.display="flex"
  }else{
    image.style.display="flex"
     logincard.style.display="none"
  }
})


// update image*********************************************************************************

function updateimage(){

 const image=document.getElementById("image");

 if(window.innerWidth<=500){

  image.src = "./images/small_inner_content.png";
 }else{
  image.src = "./images/reduced_inner_content.png";
 }
}

updateimage()

window.addEventListener("resize",(updateimage));


})




