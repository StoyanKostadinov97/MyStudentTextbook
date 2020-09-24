import { postTask } from '../data.js';

export default async function () {
    // get the data from input
    const fromInput = document.getElementById('fromInput');
    const toInput = document.getElementById('toInput');
    const dateInput = document.getElementById('dateInput');
    const taskNameInput = document.getElementById('clazzInput');

    postTask(fromInput.value,
        toInput.value,
        taskNameInput.value,
        dateInput.value)

    fromInput.value='';
    toInput.value='';
    taskNameInput.value='';
    dateInput.value='';

}