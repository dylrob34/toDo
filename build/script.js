// --------------------------------------------
// VARIABLE CALL IN:
// --------------------------------------------
// Text Box variables:
const input = document.querySelector('.input')
// Right side bar variables:
const rightSideBar = document.getElementById('right-side-bar-deactive')
const containerRight = document.querySelector('.container-category')
const categories = document.querySelector('.categories')
const rightSideBar2 = document.getElementById('right-side-bar-active')
// Delete and config icons for categories:
var dels = document.querySelectorAll('.category-delete')
var configs = document.querySelectorAll('.category-move')
// Call in for the Add category button:
const addCategory = document.getElementById('plus')
const deleteCategory = document.querySelectorAll('.category-delete')



// --------------------------------------------
// MAIN JS CODE
// --------------------------------------------
// Styling for the type area of Capture:
input.addEventListener('mouseover', () => {
    input.classList.add("hover")
})
input.addEventListener('mouseleave', () => {
    input.classList.remove("hover")
})
// --------------------------------------------
// Add a category when the font awesome plus is pressed:
addCategory.addEventListener('click', createCategory)
// --------------------------------------------
// Remove a category if the user presses the "x" button:
// deleteCategory.addEventListener('click', removeCategory)
// --------------------------------------------
// Navigation for the right side panel:
rightSideBar.addEventListener('click', () => {
    expandRightSide()
    addShow()
})
rightSideBar2.addEventListener('click', () => {
    collapseRightSide()
    delShow()
})




// --------------------------------------------
// FUNCTIONS:
// --------------------------------------------
// Right side panel functions:
function expandRightSide() {
    containerRight.classList.add('active')
    categories.classList.add('active')
    rightSideBar.classList.add('deactive')
    rightSideBar2.classList.add('active')
}
function collapseRightSide() {
    containerRight.classList.remove('active')
    categories.classList.remove('active')
    rightSideBar.classList.remove('deactive')
    rightSideBar2.classList.remove('active')
}
// --------------------------------------------
// Adds a class of 'show to config and del elements so they can appear when expanded:
function addShow() {
    dels = document.querySelectorAll('.category-delete')
    configs = document.querySelectorAll('.category-move')
    dels.forEach((del) => {
        del.classList.add('show')
    })
    configs.forEach((config) => {
        config.classList.add('show')
    })
}
function delShow() {
    dels = document.querySelectorAll('.category-delete')
    configs = document.querySelectorAll('.category-move')
    dels.forEach((del) => {
        del.classList.remove('show')
    })
    configs.forEach((config) => {
        config.classList.remove('show')
    })
}
// --------------------------------------------
// Function that creates a new category when the plus is pressed:
function createCategory() {
    const categoryList = document.querySelectorAll('.category')
    var elem = document.createElement('ul')
        elem.classList.add('category')
        elem.setAttribute('id',('category' + (categoryList.length + 1)))
        elem.textContent = 'Category ' + (categoryList.length + 1)

    var btnElem1 = document.createElement('button')
        btnElem1.classList.add('category-move')
        btnElem1.draggable = true
        btnElem1.innerHTML = "<i name='config' class='fas fa-bars'></i>"

    var btnElem2 = document.createElement('button')
        btnElem2.classList.add('category-delete')
           btnElem2.innerHTML = "<i name='delete' class='fas fa-times'></i>"

    categories.appendChild(elem)
    elem.appendChild(btnElem1)
    elem.appendChild(btnElem2)
}
// --------------------------------------------
// function removeCategory(){
//     deleteCategory
// }


// --------------------------------------------
// TO DO List:
// --------------------------------------------
// 1. You need to figure out how to make sure that even if a user adds a category when the side panel is active the buttons show.