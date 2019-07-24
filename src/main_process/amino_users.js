const { ipcMain } = require("electron");
ipcMain.on("amino_users_get", (event, arg) => {
    console.log('   -> amino_users_get ');
    event.sender.send("amino-users-list-make", "pong");
});
console.log('   -> подгружен файл: ../main_process/amino_user.js');

//module.exports.amino_users_get = <имя функции или переменной>;