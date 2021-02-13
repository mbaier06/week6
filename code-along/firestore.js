document.addEventListener('DOMContentLoaded', async function(event) {

  let db = firebase.firestore()

  // Step 1: Make the world's tiniest to-do app
  let form = document.querySelector('form')
  form.addEventListener('submit', async function(event) {
  event.preventDefault()
  // console.log('todo submitted')

  let todoText = document.querySelector('#todo').value
  console.log(todoText)

  let docRef = await db.collection('todos').add({
    text: todoText
  })
  // gives access to new ID of records (or docs) created in Firestore collection
  let todoID = docRef.id
  console.log(`new todo created: ${todoID}`)

  if (todoText.length > 0 ) {
    let todoList = document.querySelector('.todos')
    todoList.insertAdjacentHTML('beforeend', `
    <div class = "todo-${todoID} py-4 text-xl border-b-2 border-purple-500">
      <a href = "#" class="done p-2 text-sm bg-green-400 text-white">✓</a>
      ${todoText}
    </div>
    `)

      // Step 4: Add code to allow completing todos (along with added HTML to 52-54)
    let todoLink = document.querySelector(`.todo-${todoID} .done`)
    // console.log(todoLink)
    todoLink.addEventListener('click', async function(event){
    event.preventDefault()
    console.log(`${todoID} was clicked`)

    document.querySelector(`.todo-${todoID}`).classList.add('opacity-20')

    await db.collection('todos').doc(todoID).delete()
  })


  }
  // watch 7:40 onwards for order mattering - moving todoLink etc!!
  // clearing submit form
  document.querySelector('#todo').value = ''
  })
  // Step 2: Read existing to-dos from Firestore
  let querySnapshot = await db.collection('todos').get()
  console.log(querySnapshot.size)

  let todos = querySnapshot.docs
  console.log(todos)

  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i]
    console.log(todo)
    let todoID = todo.id 
    console.log(todoID)
    let todoData = todo.data()
    console.log(todoData)
    let todoText = todoData.text

  let todoList = document.querySelector('.todos')
  todoList.insertAdjacentHTML('beforeend', `
  <div class = "todo-${todoID} py-4 text-xl border-b-2 border-purple-500">
    <a href = "#" class="done p-2 text-sm bg-green-400 text-white">✓</a>
    ${todoText}
  </div>
  `)


  }
  // Step 3: Add code to Step 1 to add todo to Firestore
  // up above lines 22-27 i think

})