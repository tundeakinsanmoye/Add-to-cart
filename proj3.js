import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://minimart-a2f4d-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function appendShoppingList(item) {
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.append(newEl)
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

onValue(shoppingListInDB, function(snapshot) {
    if(snapshot.exists()){
        let itemArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for (let i = 0; i < itemArray.length; i++) {
            let currentItem = itemArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendShoppingList(currentItem)
        }
    
    } else{
        shoppingListEl.innerHTML = "No items here... yet"
    }
    
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
})