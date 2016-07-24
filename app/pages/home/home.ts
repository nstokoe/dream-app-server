import {Component} from "@angular/core";
import {NavController, Alert} from 'ionic-angular';
import {Todos} from '../../providers/todos/todos';
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  todos: any;

  constructor(private nav: NavController, private todoService: Todos) {

  }

  ionViewLoaded(){
    this.todoService.getTodos().then((data) => {
        this.todos = data;
    });
  }

  logout(){
    this.todoService.logout();
    this.todos = null;
    this.nav.setRoot(LoginPage);
  }

  createTodo(){

    let prompt = Alert.create({
      title: 'Add',
      message: 'What do you need to do?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.createTodo({title: data.title});
          }
        }
      ]
    });

    this.nav.present(prompt);

  }

  updateTodo(todo){

    let prompt = Alert.create({
      title: 'Edit',
      message: 'Change your mind?',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.todoService.updateTodo({
                _id: todo._id,
                _rev: todo._rev,
                title: data.title
            });
          }
        }
      ]
    });

    this.nav.present(prompt);
  }

  deleteTodo(todo){
    this.todoService.deleteTodo(todo);
  }

}
