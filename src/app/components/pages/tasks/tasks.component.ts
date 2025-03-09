import { Component, ElementRef, inject, OnInit, ViewChild } from "@angular/core";
import { TaskService } from "../../../services/web-services/task.service";
import { TaskFormComponent } from "./task-form/task-form.component";
import { SwalPopupService } from "@services/swal-popup.service";
import { Task } from "@interfaces/tasks.interface";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Observable } from "rxjs";

@Component({
  selector: "app-tasks",
  standalone: true,
  imports: [CommonModule, TaskFormComponent, FormsModule],
  templateUrl: "./tasks.component.html",
  styleUrl: "./tasks.component.scss",
})
export class TasksComponent implements OnInit {
  @ViewChild("editTaskModal") editTaskModal!: ElementRef;
  @ViewChild("taskFormComponent") taskFormComponent!: TaskFormComponent;

  private taskService = inject(TaskService);
  private toast = inject(SwalPopupService);

  public totalPages$: Observable<number> = this.taskService.totalPages$;
  public tasks$: Observable<Task[]> = this.taskService.tasks$;
  public currentPage: number = 1;
  public pageSize: number = 10;

  public selectedTask: Task | null = null;
  public selectedStatus: string = "";

  ngOnInit(): void {
    this.getTasks();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.getTasks();
  }

  getTasks() {
    this.toast.showModalLoading();
    this.taskService.getTasks(this.currentPage, this.selectedStatus);
  }

  filterTasks() {
    this.currentPage = 1;
    this.getTasks();
  }

  openEditModal(task: Task) {
    this.selectedTask = task;
  }

  closeModal() {
    this.selectedTask = null;
    this.taskFormComponent.resetForm();
  }

  deleteTask(task: Task) {
    this.toast.showModalConfirm("¿Estás seguro de eliminar esta tarea?", response => {
      if (response.isConfirmed) {
        this.taskService.deleteTask(task).subscribe(() => {
          this.toast.setToastPopup("Tarea eliminada correctamente.", "success");
          this.getTasks();
        });
      }
    });
  }

  changeTaskStatus(task: Task) {
    const newStatus = task.status === "pending" ? "completed" : "pending";

    this.taskService.changeTaskStatus(task.id, { status: newStatus }).subscribe(() => {
      this.toast.setToastPopup(
        `Tarea marcada como ${newStatus === "completed" ? "completada" : "pendiente"}.`,
        "success"
      );
      this.getTasks();
    });
  }
}
