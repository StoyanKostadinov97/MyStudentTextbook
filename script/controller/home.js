import Clock from '../clock.js';
import { getUserTasks } from '../data.js';
import addTask from './createTask.js';

const currentDay = new Date();

let choosenDay = currentDay.getDate() < 10
    ? '0' + currentDay.getDate()
    : currentDay.getDate() + '';

let choosenMonth = (currentDay.getMonth() + 1) < 10
    ? '0' + (currentDay.getMonth() + 1)
    : (currentDay.getMonth() + 1) + '';

let choosenYear = currentDay.getFullYear();

let userTasks = undefined;

export default async function home() {

    if (this.app.userData == undefined) {
        this.app.userData = {};
        if (localStorage.email != undefined) {
            this.app.userData.loggedIn = true;
        }
    }

    this.app.userData.tasks = [];
    userTasks = await getUserTasks();
    this.app.userData.tasks = reduceTasks(choosenDay, choosenMonth, choosenYear, userTasks);

    this.loadPartials({
        header: '../template/header.hbs',
        taskContainer: '../template/taskContainer.hbs'
    }).then(function () {
        this.partial('../template/home.hbs', this.event_context.app.userData);
    });

    initTheGadjets();

    addEvents(this);

}

function initTheGadjets() {
    // init the calendar
    setTimeout(() => {
        const vanillaCalendar = new VanillaCalendar(
            {
                selector: "#myCalendar",
                months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                shortWeekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                onSelect: (data, elem) => {
                    const choosenDate = new Date(data.date);
                    choosenDay = choosenDate.getDate() < 10
                        ? '0' + choosenDate.getDate()
                        : choosenDate.getDate() + '';
                    choosenMonth = (choosenDate.getMonth() + 1) < 10
                        ? '0' + (choosenDate.getMonth() + 1)
                        : (choosenDate.getMonth() + 1) + '';
                    choosenYear = choosenDate.getFullYear();
                }
            });
    }, 500);


    //init the clock
    setTimeout(() => {
        const clock = new Clock('clock');
        clock.run();
    });
}

async function addEvents(sammy) {
    setTimeout(() => {

        // add notification info block 
        document.getElementById('tasks-ul').addEventListener('mouseover', () => {
            const info = document.getElementById('info-task-note');
            info.style.display = 'block';
            setTimeout(() => { info.style.display = 'none' }, 2000);
        });

        //add dbclick listener for the editor
        document.getElementById('tasks-ul').addEventListener('dblclick', (e) => {
            console.log(e.target);
            const splitted = e.target.innerHTML.split('|');

            const from = splitted[0].split(':')[0].trim();
            console.log(from);

            const taskName = splitted[1].trim();
            console.log(taskName);

            const taskToMod = userTasks.find(
                task => task.task_name == taskName && task.from.split(':')[0] == from
            );
            if (sammy.app.userData.taskToModify == undefined) {
                sammy.app.userData.taskToModify = {};
                sammy.app.userData.taskToModify = taskToMod;
            } else sammy.app.userData.taskToModify = taskToMod;
            console.log(sammy);
            sammy.redirect('#/notes');
        });

        //post a new task
        document.getElementById('add-event-button').addEventListener('click', () => {
            addTask();
            setTimeout(() => {
                sammy.app.refresh();
            }, 200)
        });

        //change the date
        document.querySelector("#myCalendar > div.vanilla-calendar-body").addEventListener('click', () => {
            // console.log(choosenDate.date.getMonth());
            sammy.app.userData.tasks = reduceTasks(choosenDay, choosenMonth, choosenYear, userTasks);
            setTimeout(() => {
                sammy.app.refresh();
            }, 200)
        })

    }, 500)
}

function reduceTasks(day, month, year, array) {
    if (array === undefined) return;
    const toReturn = [];

    //reduce the tasks for today
    array.forEach(task => {
        const data = task.task_date.split('-');
        if (data[0] == year
            && data[1] == month
            && data[2] == day) {
            toReturn.push(task)
        }
    });

    //sort the tasks by hour
    toReturn.sort((a, b) => {
        const first = a.from.split(':');
        const second = b.from.split(':');

        if (parseInt(first[0]) < parseInt(second[0])) return -1;
        else if (parseInt(first[0]) == parseInt(second[0])) {
            if (parseInt(first[1]) < parseInt(second[1])) return -1;
            else return 1
        } else return 1;
    });

    return toReturn;
}