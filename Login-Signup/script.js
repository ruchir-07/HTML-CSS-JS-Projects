let dataPro = [];
if (localStorage.User != null) {
    dataPro = JSON.parse(localStorage.User);
} else {
    
    let admin = {
            Username:"admin",
            Email:"ahmed14massoud2021@gmail.com",
            Password: "admin142021",
        };
        dataPro.push(admin);
        localStorage.setItem("User", JSON.stringify(dataPro))
}




function totxt(e) {
    e = e.value.trim();
    return e;
}




function validation(input, inputName, re, label) {

    function Rfalse() {
        input.style = "border-bottom:1px solid red;background-image: linear-gradient(0deg, rgba(255,0,0,.3) 0%, rgba(0,0,0,0) 30%);";

    }

    function Rtrue() {
        input.style = "border-bottom:1px solid green;background-image: linear-gradient(0deg, rgba(0,255,0,.3) 0%, rgba(0,0,0,0) 30%);";
    }

    function content() {
        swal("Noticeable", `The ${inputName} must Contains only letters and numbers for easy memorization`, "error");
    }

    function number(less, more) {
        if (totxt(input).length < less || totxt(input).length > more) {
            swal("Noticeable", `the ${inputName} Not less than ${less} and not more than ${more}.`, "error");

        } else {
            content()
        }
    }

    function empty() {
        swal("Noticeable", `You should not leave the  ${inputName} field blank .`, "error");

    }

    function incorrect() {
        swal("Noticeable", `The ${inputName} is in correct.`, "error");
    }

    if (re.test(totxt(input))) {
    
    
    
        if (inputName == "username") {
        
            for (let i = 0; i < dataPro.length; i++) {
    
             if (dataPro[i].Username == totxt(username)) {
                
                
                    swal("Noticeable", "The account has been created, please choose another", "error");


                    Rfalse();
                    return false;
                    
                    
                } else {
                
                    if (dataPro.length - i == 1) {
                    
                        Rtrue();
                        return true;
                     
                    
              }
            }
            }
            
            
        } else {
        
            Rtrue();
            return true;
        }
        
        
    } else {


        if (totxt(input) == "") {
            empty();
        } else {




            if (inputName == "username") {
                number(5, 15)
            } else if (inputName == "password") {
                number(7, 14)
            } else {
                if (inputName == "email") {
                    incorrect()
                } else {
                    content()
                }

            }




        }

        Rfalse();
        return false
    }
}




function check() {




    let usernameRe = /^[A-Za-z0-9]{5,15}$/;
    let emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let passwordRe = /^[A-Za-z0-9]{7,14}$/;
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let button = document.getElementById("button");
    let usernameLabel = document.getElementById("usernameLabel");
    let emailLabel = document.getElementById("emailLabel");
    let passwordLabel = document.getElementById("passwordLabel");




    let passwordCorrect = validation(password, "password", passwordRe);
    let emailCorrect = validation(email, "email", emailRe);
    let usernameCorrect = validation(username, "username", usernameRe);
    console.log(usernameCorrect);
    console.log(emailCorrect);
    console.log(passwordCorrect);
    console.log("###########");

    if (usernameCorrect == true && emailCorrect == true && passwordCorrect == true) {
        let newUser = {
            Username: totxt(username),
            Email: totxt(email),
            Password: totxt(password),
        };
        dataPro.push(newUser);
        localStorage.setItem("User", JSON.stringify(dataPro))


        username.value = "";
        email.value = "";
        password.value = "";

        username.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";

        email.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";

        password.style = "border-bottom:1px solid #fff;background-image: rgba(0,0,0,0);";



        swal("Account creation succeeded", "The account has been created, please login", "success");

        let chk = document.getElementById("chk");
        chk.checked = true;
        console.log("added")


    }



}




let userIcon = document.getElementById("userIcon");
let emailIcon = document.getElementById("emailIcon");
let passIcon = document.getElementById("passIcon");


userIcon.onclick = function() {

    swal(`Username must be 
          # Contains only letters and numbers for easy memorization.
          # Not less than 5 and not more than 15.
          #Not be already used before.`);
}
emailIcon.onclick = function() {

    swal(`The email must be valid to communicate with you in case of sending a confirmation code.`);
}
passIcon.onclick = function() {

    swal(`Password must be
         # Contains only letters and numbers for easy memorization.
         # Not less than 7 and not more than 14. `);
}




function login() {
    let username = document.getElementById("username2");

    let password = document.getElementById("password2");
    let button = document.getElementById("button2");


    for (let i = 0; i < dataPro.length; i++) {
        if (dataPro[i].Username == totxt(username)) {
            if (dataPro[i].Password == totxt(password)) {
                swal("Login succeeded", "", "success");
            } else {
                swal("Incorrect Passowrd", "Please check your passowrd", "error");
                break;
            }
        } else {
            if (dataPro.length - i == 1) {
                swal("Login failed", "We can't find your username", "error");
            }
        }
    }
}
