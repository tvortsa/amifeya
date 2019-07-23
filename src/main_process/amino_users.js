const { ipcMain } = require("electron");
ipcMain.on("amino_users_get", (event, arg) => {
    event.sender.send("amino-users-list-make", "pong");
});