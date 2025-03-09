import { Component, inject, OnInit, Input, SimpleChanges, OnChanges } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { UsersService } from "@services/web-services/users.service";
import { TaskService } from "@services/web-services/task.service";
import { TaskStatus, Task } from "@interfaces/tasks.interface";
import { SwalPopupService } from "@services/swal-popup.service";
import { UserLocalService } from "@services/user-local.service";
import { IUsers } from "@interfaces/services.interface";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-task-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./task-form.component.html",
  styleUrl: "./task-form.component.scss",
})
export class TaskFormComponent implements OnInit, OnChanges {
  private userLocalService = inject(UserLocalService);
  private usersService = inject(UsersService);
  private taskService = inject(TaskService);
  private toast = inject(SwalPopupService);

  @Input() task: Task | null = null;

  public currentUser: IUsers | null = null;
  public selectedUsers: any[] = [];
  public users: any[] = [];

  public taskForm: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(3)]),
    status: new FormControl(TaskStatus.PENDING, Validators.required),
    description: new FormControl("", Validators.maxLength(500)),
    owners: new FormControl([], Validators.required),
    searchTerm: new FormControl(""),
  });

  ngOnInit() {
    this.currentUser = this.userLocalService.getUser();
    if (this.currentUser && this.currentUser.idUser) {
      this.taskForm.patchValue({ owners: [this.currentUser.idUser] });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["task"] && this.task) {
      this.taskForm.patchValue(this.task);
      this.selectedUsers = this.task.owners.filter((owner: any) => owner.idUser !== this.currentUser?.idUser);
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
    this.taskForm.patchValue({ owners: this.selectedUsers.map(user => user.idUser) });
  }

  isSelected(user: any): boolean {
    return this.selectedUsers.some(u => u.idUser === user.idUser);
  }

  removeUser(user: any) {
    this.selectedUsers = this.selectedUsers.filter(u => u.idUser !== user.idUser);
    this.taskForm.patchValue({ owners: this.selectedUsers.map(user => user.idUser) });
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
        this.resetForm();
      });
    } else {
      this.taskService.createTask(taskData).subscribe(() => {
        this.toast.setToastPopup("Tarea creada correctamente.", "success");
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
}
