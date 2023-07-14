import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Observable } from 'rxjs';
import { HttpClient ,HttpParams} from '@angular/common/http';

const AUTH_API = 'http://127.0.0.1:8000/api/';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private tasks: Task[] = [];

  constructor(private http: HttpClient) { }

  // getTasks(): Task[] {
  //   return this.tasks;
  // }

  getTasks(): Observable<any> {
    return this.http.get(AUTH_API +'Task_get_post/');
  }
  getemp_name(): Observable<any> {
    return this.http.get(AUTH_API +'emp_name/');
  }
  das_user_count(): Observable<any> {
    return this.http.get(AUTH_API +'dash_user_count/');
  }
  getemp_task(email:any): Observable<any> {
    console.log("gggggggggggggggggggggggggggggg")
    const params = new HttpParams()
    .set('email', email);
    return this.http.get(AUTH_API +'emp_uni_task/',{ params });
  }

  getNotifications(email:any): Observable<any> {
    const params = new HttpParams()
    .set('email', email);
    return this.http.get(AUTH_API +'sheculeTASK/',{ params });
  }

  addTask(task:Task): Observable<any> {
    return this.http.post(AUTH_API +'Task_get_post/',task);
  }
  deleteTask(id:any): Observable<any> {
    console.log("jjjjjjjjjjjjjjj",id)
    return this.http.delete<Task>(`${AUTH_API + 'Task_upt_dlt'}/${id}`);

  }

  updateTask(id: any, taskData: any): Observable<any> {
    return this.http.put<Task>(`${AUTH_API + 'Task_upt_dlt'}/${id}`, taskData);  
  }
  
}
