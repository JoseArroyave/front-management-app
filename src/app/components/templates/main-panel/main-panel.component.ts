import { UserLocalService } from "@services/user-local.service";
import { environment } from "@environments/environment";
import { IUsers } from "@interfaces/services.interface";
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";

@Component({
  selector: "management-panel",
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: "./main-panel.component.html",
  styleUrl: "./main-panel.component.scss",
})
export class MainPanelComponent {
  private userLocalService = inject(UserLocalService);

  public user$: Observable<IUsers | null> = this.userLocalService.user$;
  public readonly storageFront = environment.storageFront;

  logout() {
    this.userLocalService.logout();
  }
}
