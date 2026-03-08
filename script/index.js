

const logIn = () => {
    const userNameInput = document.getElementById("userName-input")
    const userName = userNameInput.value
    const passwordInput = document.getElementById("password-input")
    const password = passwordInput.value
    if(userName === "admin" && password === "admin123"){
        window.location.assign("./home.html")
    }
    else{
        alert("please enter correct credential")
    }
}
