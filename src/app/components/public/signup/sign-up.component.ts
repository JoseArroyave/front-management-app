import {
  ReactiveFormsModule,
  ValidationErrors,
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators,
  FormGroup,
} from "@angular/forms";
import { UsersService } from "@services/web-services/users.service";
import { SwalPopupService } from "@services/swal-popup.service";
import { Router, RouterLink } from "@angular/router";
import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "management-signup",
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent {
  private usersService = inject(UsersService);
  private toast = inject(SwalPopupService);
  private router = inject(Router);

  public signupForm: FormGroup = new FormGroup(
    {
      password: new FormControl("", [Validators.required, Validators.minLength(8)]),
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      email: new FormControl("", [Validators.required, Validators.email]),
      confirmPassword: new FormControl("", [Validators.required]),
    },
    { validators: this.passwordMatchValidator() }
  );

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get("password")?.value;
      const confirmPassword = control.get("confirmPassword")?.value;
      return password === confirmPassword ? null : { mismatch: true };
    };
  }

  createUser() {
    if (this.signupForm.invalid) {
      this.toast.setToastPopup("Por favor, revisa el formulario y corrige los errores", "error");
      return;
    }

    this.toast.showModalLoading();
    this.usersService.createUser(this.signupForm.value).subscribe({
      next: async () => {
        this.toast.setToastPopup("Usuario creado exitosamente", "success");
        this.router.navigate(["/public/login"]);
      },
    });
  }
}
