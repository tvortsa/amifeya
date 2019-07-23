const { app, BrowserWindow } = require("electron");
const locals = {
    /* ...*/
};

// require('./src/main_process/amino_users.js')

const glob = require('glob');
const path = require('path');
const setupPug = require("electron-pug");
const amino_login = "ivakho@gmail.com";
const amino_pass = "prostota-18";

// Mongo/mongoose DB init and connect
const mongoose = require("mongoose");

const AminoModel = require("./models/amino");
const aminoModel = new AminoModel({
    name: "Bill",
    age: 41
});

//Require каждый JS файл в папке main - process

function loadDemos() {
    const files = glob.sync(path.join(__dirname, 'src/main_process/**/*.js'))
    files.forEach((file) => { require(file) })
}

loadDemos()

// подключение
mongoose.connect("mongodb://localhost:27017/aminojs_db", function(err) {
    if (err) throw err;

    console.log(" - Mongoose > Successfully connected !");
});

//  - - - Amino - - -
var Amino = require("amino.js"); // задействуем библиотеку Amino.js api
let aminos;

// (async function() {
//     const sid = await Amino.login('ivakho@gmail.com', 'prostota18');
//     // console.log(`SID: ${sid}`);
//     const yourCommunitys = await Amino.getJoinedComs();
//     _feyaSetAminos(yourCommunitys.coms);
//     const firstCommunity = yourCommunitys.coms[0];
//     const users = await Amino.getComUsers(firstCommunity.id);
//     const user = users.users[2];
//     const ext = user.extensions[0];
//     //console.log(user);
//     //console.log("Оля ext: " + ext);
//     yourCommunitys.coms.map(comminity => {
//         console.log(`${comminity.name} | ${comminity.link}| ${comminity.id}`);
//     });
//     //console.log('== Raw response ==');
//     //console.log(JSON.stringify(yourCommunitys, null, 2));
// })();

// const sid = await Amino.login('ivakho@gmail.com', 'prostota18');
// Помните, что эти функции являются асинхронными, поэтому вам нужно использовать их в асинхронном контексте
// Кроме того, вы должны ловить исключения самостоятельно

// Framework - вариант подключения (позволяет синхронный контекст)
const AminoAPI = new Amino.AminoAPI();
const env = require('./aminoEnv');
// Логинимся
AminoAPI.proccessAction(
    //Amino.login("ivakho@gmail.com", "prostota18"),
    Amino.login(env.email, env.password),

    function(data) {
        // Here is the success handler
        console.log("AMINO LOGIN SUCCESSFULL !");
        // Извлекаем Амины
        AminoAPI.proccessAction(
            Amino.getJoinedComs(),
            function(data) {
                data.coms.map(comminity => {
                    console.log(`${comminity.name} | ${comminity.link} | ${comminity.id}`);
                });
            },
            function(error) {
                // Here is the error handler
                console.log("AMINOS FETCH ERROR !");
                throw new Error(error);
            }
        );
    },
    function(error) {
        // Here is the error handler
        console.log("AMINO LOGIN ERROR !");
    }
);

// - - - Amino end - - -

//Обработка создания / удаления ярлыков в Windows при установке / удалении.
if (require("electron-squirrel-startup")) {
    // eslint-disable-line global-require
    app.quit();
}

// --- Pug init ---
app.on("ready", async() => {
    try {
        let pug = await setupPug({ pretty: true }, locals);
        pug.on("error", err => console.error("electron-pug error", err));
    } catch (err) {
        // Could not initiate 'electron-pug'
    }
});
// -- end

// хранит глобальную ссылку на объект window, если вы этого не сделаете, окно будет
// автоматически закрываться, когда объект JavaScript собирается мусором.
let mainWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${__dirname}/index.pug`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
};

// Этот метод будет вызван, когда Электрон закончил
// инициализацию и готов к созданию окон браузера.
// Некоторые API можно использовать только после этого события.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

// В этом файле вы можете включить остальную часть кода основного процесса вашего приложения
// Вы также можете поместить их в отдельные файлы и импортировать их здесь.

// feya code
// get list of aminos

// app.on('ready', async() => {
//     try {
//         const sid = await Amino.login(amino_login, amino_pass);
//         // console.log(`SID: ${sid}`);
//         const yourCommunitys = await Amino.getJoinedComs();
//         //const firstCommunity = yourCommunitys.coms[0];
//         var my_aminos = [];
//         //const coms = yourCommunitys.coms;
//         for (const my_amino in yourCommunitys.coms) {
//             my_aminos.push(my_amino);
//         }
//         console.log(" execute function - feyaGetAminos() -> /n in aminos exist: " + aminos.length + "aminos");
//         my_aminos;
//     } catch (err) {
//         // Could not connect to Amino servers
//         console.log("не могу соединиться с амино сервером!");
//         console.log(err);

//     }
// });