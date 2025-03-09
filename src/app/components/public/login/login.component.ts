import { ReactiveFormsModule, Validators, FormGroup, FormControl } from "@angular/forms";
import { LoginService } from "@services/web-services/login.service";
import { SwalPopupService } from "@services/swal-popup.service";
import { UserLocalService } from "@services/user-local.service";
import { Router, RouterLink } from "@angular/router";
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "management-login",
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  private userLocalService = inject(UserLocalService);
  private loginService = inject(LoginService);
  private toast = inject(SwalPopupService);
  private router = inject(Router);

  public loginForm: FormGroup = new FormGroup({
    password: new FormControl({ value: "", disabled: false }, [Validators.required, Validators.minLength(6)]),
    email: new FormControl({ value: "", disabled: false }, [Validators.email, Validators.required]),
  });

  login() {
    if (this.loginForm.invalid) {
      this.toast.setToastPopup("Por favor, completa correctamente los campos.", "error");
      return;
    }

    this.toast.showModalLoading();
    this.loginService.login(this.loginForm.value).subscribe({
      next: async response => {
        this.toast.closeModalLoading();
        this.userLocalService.saveToken(response.message);
        this.router.navigate(["/pages/management"]);
      },
    });
  }
}
