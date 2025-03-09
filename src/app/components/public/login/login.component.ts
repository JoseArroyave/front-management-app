import { ReactiveFormsModule, Validators, FormGroup, FormControl } from "@angular/forms";
import { PublicService } from "@services/web-services/public.service";
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
  private publicService = inject(PublicService);
  private toast = inject(SwalPopupService);
  private router = inject(Router);

  public loginForm: FormGroup = new FormGroup({
    password: new FormControl({ value: "", disabled: false }, [Validators.required, Validators.minLength(6)]),
    username: new FormControl({ value: "", disabled: false }, [Validators.required]),
  });

  login() {
    if (this.loginForm.invalid) {
      this.toast.setToastPopup("Por favor, completa correctamente los campos.", "error");
      return;
    }

    this.toast.showModalLoading();
    this.publicService.login(this.loginForm.value).subscribe({
      next: async response => {
        this.toast.setToastPopup("Datos correctos", "success");
        this.userLocalService.saveToken(response.message);
        this.router.navigate(["/management/home"]);
      },
      error: async () => {
        this.toast.setToastPopup("Ha ocurrido un error, contacta un asesor", "error");
      },
    });

    this.toast.setToastPopup("¡Inicio de sesión exitoso!", "success");
  }
}
