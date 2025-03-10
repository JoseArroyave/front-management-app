import { PaginatedTasks, Task } from "@interfaces/tasks.interface";
import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SwalPopupService } from "@services/swal-popup.service";
import { IResponse } from "@interfaces/services.interface";
import { environment } from "@environments/environment";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private toast = inject(SwalPopupService);
  private http = inject(HttpClient);

  private readonly url = `${environment.apiUrl}tasks/`;

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  public tasks$ = this.tasksSubject.asObservable();

  private totalPagesSubject = new BehaviorSubject<number>(1);
  public totalPages$ = this.totalPagesSubject.asObservable();

  private selectedTaskSubject = new BehaviorSubject<Task | null>(null);
  public selectedTask$ = this.selectedTaskSubject.asObservable();

  private platformId = inject(PLATFORM_ID);

  private currentPage = 1;
  private limit = 10;

  private getHeaders(): HttpHeaders {
    if (!isPlatformBrowser(this.platformId)) return new HttpHeaders({ Authorization: "Bearer " });
    return new HttpHeaders({ Authorization: "Bearer " + window.localStorage.getItem("accessToken") });
  }

  public getTasks(page: number = 1, status: string = ""): void {
    let url = `${this.url}getTasks?page=${page}&limit=${this.limit}`;
    if (status) url += `&status=${status}`;

    this.http
      .get<PaginatedTasks>(url, { headers: this.getHeaders() })
      .pipe(
        map(response => {
          this.totalPagesSubject.next(response.totalPages);
          return response.data;
        })
      )
      .subscribe(tasks => {
        this.tasksSubject.next(tasks);
        this.toast.closeModalLoading();
      });
  }

  public updateTask(taskId: string, taskData: Partial<Task>): Observable<IResponse<Task>> {
    return this.http
      .put<IResponse<Task>>(`${this.url}updateTask/${taskId}`, taskData, {
        headers: this.getHeaders(),
      })
      .pipe(
        map(response => {
          this.getTasks(this.currentPage);
          return response;
        })
      );
  }

  public changeTaskStatus(taskId: string, taskData: Partial<Task>): Observable<IResponse<Task>> {
    return this.http
      .put<IResponse<Task>>(`${this.url}changeTaskStatus/${taskId}`, taskData, {
        headers: this.getHeaders(),
      })
      .pipe(
        map(response => {
          this.getTasks(this.currentPage);
          return response;
        })
      );
  }

  public setSelectedTask(task: Task | null) {
    this.selectedTaskSubject.next(task);
  }

  public getSelectedTask(): Task | null {
    return this.selectedTaskSubject.getValue();
  }

  deleteTask(task: Task): Observable<IResponse<Task>> {
    return this.http
      .delete<IResponse<Task>>(`${this.url}deleteTask/${task.id}`, {
        headers: this.getHeaders(),
      })
      .pipe(
        map(response => {
          this.getTasks(this.currentPage);
          return response;
        })
      );
  }

  public getCurrentPage(): number {
    return this.currentPage;
  }

  public createTask(task: Task): Observable<IResponse<Task>> {
    return this.http
      .post<IResponse<Task>>(`${this.url}createTask`, task, {
        headers: this.getHeaders(),
      })
      .pipe(
        map(response => {
          this.getTasks(this.currentPage);
          return response;
        })
      );
  }

  public setCurrentPage(page: number): void {
    this.currentPage = page;
    this.getTasks(page);
  }
}
