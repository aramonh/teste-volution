import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Task } from './../shared/models/task.interface';
import { async } from '@angular/core/testing';
import { ApiServiceExample } from './../services/api/api.example.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { HttpResponse } from '@angular/common/http';
import { User } from '../shared/models/user.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  public user$=this.authSvc.user;

 
 day = new Date().getDate();
 month = new Date().getMonth()+1;
 year = new Date().getFullYear();

hoy  = new Date();

  TaskForm = new FormGroup({
    name: new FormControl('',Validators.required),
    priority: new FormControl('',Validators.required),
    expiration_date: new FormControl('',Validators.required),
  });

public task:Task;

  constructor(private apiRest: ApiServiceExample,private authSvc: AuthService) {}
  
  ngOnInit() {
    this.getAll();
    
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    this.user$.email=localStorage.getItem('email');
    this.user$.name=localStorage.getItem('name')
  }

  async onSendTask() {
    try{
      const { name, priority, expiration_date } = this.TaskForm.value;
      const dateinput= new Date(expiration_date);
      console.log("Hoy",this.hoy);
      console.log("Fechha Tarea",dateinput);
      const task = {
        name:name,
        priority:priority,
        expiration_date:dateinput
      }
      if(this.hoy>dateinput){
        alert("Date are too old");
      }else {
        alert("Task saved");
        this.createTask(task);
        console.log("SENDED-OK")
        window.location.reload();
      }
    
   
      
    }catch(err){
      console.log(err);
    }
    
   
  }


  async getById(idTask:String):Promise<any> {
    try {
      const result = await this.apiRest.getById(idTask)
      .subscribe((data: Task) => {
        this.task=data;
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }



  async getAll():Promise<any> {
    try {
      const result = await this.apiRest.getAll()
      .subscribe((data: Task) => {
        this.task=data;
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async createTask( task:Task):Promise<any>{
    try{
     
      const result = await this.apiRest.createTask(task).subscribe();
      return result;
    }catch (error) {
      console.log(error);
    }
  }

  async updateTask(id:string, task:Task){
    try{
      
      const result = await this.apiRest.updateById(id,task).subscribe();
      return result;
    }catch (error) {
      console.log(error);
    }
  }

  async deleteTask(idTask:String){
    try{
      const result = await this.apiRest.deleteById(idTask).subscribe();
      
      window.location.reload();
      alert("Task Deleted")
      return result;
      
    }catch (error) {
      console.log(error);
    }
  }
 


}


