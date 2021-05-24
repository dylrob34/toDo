const usernameLabel = document.querySelector('.username-label')
const username = document.querySelector('.username')
const password = document.querySelector('.password')
const passwordLabel = document.querySelector('.password-label')
const login = document.querySelector('.login-btn')


usernameLabel.addEventListener('click', () => {
    usernameLabel.classList.toggle('active')
    if(usernameLabel.classList.contains('active')) {
        username.focus()
    }
})

username.addEventListener('click', () => {
    usernameLabel.classList.toggle('active')
})


passwordLabel.addEventListener('click', () => {
    passwordLabel.classList.toggle('active')
    if(passwordLabel.classList.contains('active')) {
        password.focus()
    }
})

password.addEventListener('click', () => {
    passwordLabel.classList.toggle('active')
})

login.addEventListener('click', () => {
    console.log('test')
})



// TODO List:
// - You need to figure out how to get the Username and Password to go back down if there is no text content and the user clicks
// somewhere else.
