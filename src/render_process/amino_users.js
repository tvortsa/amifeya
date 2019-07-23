const { ipcRenderer } = require('electron')

const asyncUsersBtn = document.getElementById('get_users')

asyncUsersBtn.addEventListener('click', () => {
    ipcRenderer.send('amino_users_get', 'Sakuraso397')
})

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    const message = `Asynchronous message reply: ${arg}`
    document.getElementById('async-reply').innerHTML = message
})

// функция отрисовки и отображения списка пользователей 
ipcRenderer.on('amino-users-list-make', (event, arg) => {
    const curr_amino_users = arg;
    document.getElementById('dialog_users_list').users_list = curr_amino_users;
})