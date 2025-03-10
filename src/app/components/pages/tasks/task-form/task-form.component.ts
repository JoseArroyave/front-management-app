import {
  SimpleChanges,
  EventEmitter,
  Component,
  OnChanges,
  OnDestroy,
  inject,
  OnInit,
  Input,
  Output,
} from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { UsersService } from "@services/web-services/users.service";
import { TaskService } from "@services/web-services/task.service";
import { TaskStatus, Task } from "@interfaces/tasks.interface";
import { SwalPopupService } from "@services/swal-popup.service";
import { UserLocalService } from "@services/user-local.service";
import { IUsers } from "@interfaces/services.interface";
import { CommonModule } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: "app-task-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./task-form.component.html",
  styleUrl: "./task-form.component.scss",
})
export class TaskFormComponent implements OnInit, OnChanges, OnDestroy {
  @Output() closeModalTask = new EventEmitter<void>();

  private userLocalService = inject(UserLocalService);
  private usersService = inject(UsersService);
  private taskService = inject(TaskService);
  private toast = inject(SwalPopupService);

  private taskSubscription: Subscription | null = null;
  private userSubscription: Subscription | null = null;
  public currentUser: IUsers | null = null;
  public selectedUsers: any[] = [];
  public task: Task | null = null;
  public users: any[] = [];

  public taskForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(3)]),
    status: new FormControl(TaskStatus.PENDING, Validators.required),
    description: new FormControl("", Validators.maxLength(500)),
    owners: new FormControl([], Validators.required),
    searchTerm: new FormControl(""),
  });

  ngOnInit() {
    this.taskSubscription = this.taskService.selectedTask$.subscribe(task => {
      this.task = task;
      if (task) {
        this.taskForm.patchValue(task);
        this.selectedUsers = task.owners.filter((owner: any) => owner.idUser !== this.currentUser?.idUser);
        this.ensureCurrentUserInOwners();
      } else {
        this.resetForm();
      }
    });

    this.userSubscription = this.userLocalService.user$.subscribe(user => {
      this.currentUser = user;
      this.ensureCurrentUserInOwners();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["task"] && this.task) {
      this.taskForm.patchValue(this.task);
      this.selectedUsers = this.task.owners.filter((owner: any) => owner.idUser !== this.currentUser?.idUser);
      this.ensureCurrentUserInOwners();
    }
  }

  ensureCurrentUserInOwners() {
    if (this.currentUser?.idUser) {
      const currentOwners = this.taskForm.get("owners")?.value || [];
      if (!currentOwners.includes(this.currentUser.idUser)) {
        this.taskForm.patchValue({ owners: [this.currentUser.idUser, ...currentOwners] });
      }
    }
  }

  searchUsers() {
    if (this.taskForm.get("searchTerm")?.value.trim() === "") {
      this.users = [];
      return;
    }

    this.usersService.searchUsers(this.taskForm.get("searchTerm")?.value).subscribe(users => {
      this.users = users.message.filter((user: any) => user.idUser !== this.currentUser?.idUser);
    });
  }

  toggleUserSelection(user: any) {
    if (this.isSelected(user)) {
      this.selectedUsers = this.selectedUsers.filter(u => u.idUser !== user.idUser);
    } else {
      this.selectedUsers.push(user);
    }
    this.updateOwners();
  }

  removeUser(user: any) {
    if (user.idUser !== this.currentUser?.idUser) {
      this.selectedUsers = this.selectedUsers.filter(u => u.idUser !== user.idUser);
    }
    this.updateOwners();
  }

  updateOwners() {
    if (this.currentUser?.idUser) {
      this.taskForm.patchValue({ owners: [this.currentUser.idUser, ...this.selectedUsers.map(user => user.idUser)] });
    }
  }

  isSelected(user: any): boolean {
    return this.selectedUsers.some(u => u.idUser === user.idUser);
  }

  saveTask() {
    if (this.taskForm.invalid) {
      this.toast.setToastPopup("Por favor, completa correctamente los campos.", "error");
      return;
    }

    const taskData = {
      ...this.taskForm.value,
      owners: [this.currentUser?.idUser, ...this.selectedUsers.map(user => user.idUser)],
    };

    if (this.task) {
      this.taskService.updateTask(this.task.id, taskData).subscribe(() => {
        this.toast.setToastPopup("Tarea actualizada correctamente.", "success");
        this.closeModalTask.emit();
        this.resetForm();
      });
    } else {
      this.taskService.createTask(taskData).subscribe(() => {
        this.toast.setToastPopup("Tarea creada correctamente.", "success");
        this.closeModalTask.emit();
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.selectedUsers = [];
    this.users = [];
    this.taskForm.reset({
      owners: [this.currentUser?.idUser],
      status: TaskStatus.PENDING,
      description: "",
      searchTerm: "",
      title: "",
    });
  }

  ngOnDestroy() {
    this.taskSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
}
