import { UserLocalService } from "@services/user-local.service";
import { environment } from "@environments/environment";
import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "management-panel",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./main-panel.component.html",
  styleUrl: "./main-panel.component.scss",
})
export class MainPanelComponent {
  private userLocalService = inject(UserLocalService);

  public readonly storageFront = environment.storageFront;

  logout() {
    this.userLocalService.logout();
  }
}
