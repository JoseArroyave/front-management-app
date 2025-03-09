import { RouterLink } from "@angular/router";
import { Component } from "@angular/core";

/* Environments */
import { environment } from "src/environments/environment";

/* Services */

/* Interfaces */

/* Pipes */

/* Components */

@Component({
  selector: "management-not-found",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./not-found.component.html",
  styleUrl: "./not-found.component.scss",
})
export class NotFoundComponent {
  public readonly storageFront = environment.storageFront;
}
