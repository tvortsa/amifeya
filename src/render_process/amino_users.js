const { ipcRenderer } = require('electron')

const asyncUsersBtn = document.getElementById('get_users')
const my_dialog = document.getElementById('dialog_users_list');
const my_tab = document.getElementById('my_tab');

var users_list = set_users_list();

function get_users_list() {
    console.log('   -> get_users_list()');
    aa = ['user10', 'user20', 'user30', 'user40', 'user50', 'user60', 'user70', 'user80', 'user90'];
    return aa
}

function set_users_list() {
    console.log('   -> set_users_list()');
    my_dialog.users_list = get_users_list();
};

asyncUsersBtn.addEventListener('click', () => {
    console.log('кнопка asyncUsersBtn - нажата!');
    elem = document.getElementById('my_tab');
    elem.users_list = [1111, 2222, 3333, 4444, 5555]
        //set_users_list();
    ipcRenderer.send('amino_users_get', 'Sakuraso397')
})

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    const message = `Asynchronous message reply: ${arg}`
    document.getElementById('async-reply').innerHTML = message
})

// функция отрисовки и отображения списка пользователей 
ipcRenderer.on('amino-users-list-make', (event, arg) => {
    const curr_amino_users = arg;
    // document.getElementById('dialog_users_list').users_list = curr_amino_users;
    my_dialog.users_list = ['user111', 'user222', 'user333', 'user444', 'user555', 'user666', 'user777', 'user888', 'user999'];
})