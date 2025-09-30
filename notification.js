export function showNotification(message) {
  let note = document.createElement("div")
  note.className = "notification"
  note.innerText = message

  document.body.appendChild(note)

  setTimeout(() => {
    note.remove()
  }, 3000)
}
