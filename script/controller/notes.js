import { exec, init } from '../../node_modules/pell/src/pell.js';
import {updateNote} from '../data.js';

let editor;
export default async function () {
    console.log(this);
    this.loadPartials({
        header: '../template/header.hbs'
    }).then(function () {
        this.partial('../template/notes.hbs', this.event_context.app.userData);
    });
    initEditor();
    setTimeout(()=>{
        
        //print the date
        document.getElementById('date').innerHTML=this.app.userData.taskToModify.task_date;
        
        //print the task name
        document.getElementById('task_name').innerHTML=this.app.userData.taskToModify.task_name;
        
        //print the description if has
        if(this.app.userData.taskToModify.task_description!=null){
            document.querySelector("#editor > div.pell-content").innerText=this.app.userData.taskToModify.task_description;
        }

        //add event listener to save btn
        document.getElementById('editor-save-button').addEventListener('click',()=>{
            updateNote(document.querySelector("#editor > div.pell-content").innerText,this.app.userData.taskToModify);
            this.app.userData.taskToModify={};
            this.redirect('#/home');
        })

    },600);
}

function initEditor() {
    setTimeout(()=>{
        editor = init({
            element: document.getElementById('editor'),
            onChange: html => {
                const output = document.getElementById('html-output');
                output.style.display = 'none';
                output.textContent = html
            },
            defaultParagraphSeparator: 'p',
            styleWithCSS: true,
            actions: [
                'bold',
                'underline',
                {
                    name: 'italic',
                    result: () => exec('italic')
                },
                {
                    name: 'backColor',
                    icon: '<div style="background-color:pink;">A</div>',
                    title: 'Highlight Color',
                    result: () => exec('backColor', 'pink')
                },
                {
                    name: 'image',
                    result: () => {
                        const url = window.prompt('Enter the image URL')
                        if (url) exec('insertImage', url)
                    }
                },
                {
                    name: 'link',
                    result: () => {
                        const url = window.prompt('Enter the link URL')
                        if (url) exec('createLink', url)
                    }
                }
            ],
            classes: {
                actionbar: 'pell-actionbar',
                button: 'pell-button',
                content: 'pell-content',
                selected: 'pell-button-selected'
            }
        });
    },500);

}