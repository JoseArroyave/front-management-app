import { environment } from "src/environments/environment";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { Injectable, OnInit } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SwalPopupService implements OnInit {
  public attribute!: Attr;

  public readonly storageFront = environment.storageFront;

  ngOnInit() {
    setTimeout(() => this.initAttribute(), 0);
  }

  public setToastPopup = (title: string, status: SweetAlertIcon, timer: number = 2500) => {
    Swal.fire({
      html: `<p style="text-align: center;font-size: 1.25rem;line-height: 1.75rem;font-weight: 500;">${title}</p>`,
      showConfirmButton: false,
      color: "#000000",
      icon: status,
      timer,
    });
  };

  public showModalConfirm = (
    title = "",
    text = "",
    callback: (response: { isConfirmed: boolean }) => any,
    onlyAccept = false,
    confirmButtonColor = "#5370a8"
  ) => {
    Swal.fire({
      html: `<div id="lottie-container-confirm" style="width: 150px; height: 150px; margin: 0 auto;"></div>
      <p style="text-align: center;font-size: 1.25rem;line-height: 1.75rem;font-weight: 500;">
      ${title}
      </p>
      <p style="margin-top: 1rem;text-align: center;font-size: 1rem;line-height: 1.5rem;font-weight: 400;">
      ${text}
      </p>
      `,
      confirmButtonColor: confirmButtonColor,
      showCancelButton: !onlyAccept,
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      background: "#f1f1f1",
      color: "#000000",
    }).then(response => callback(response));
  };

  public showModalLoading = () => {
    setTimeout(() => {
      Swal.fire({
        position: "center",
        html: `
          <div class="spinner-container">
            <div class="spinner"></div>
          </div>
        `,
        showConfirmButton: false,
        allowOutsideClick: false,
        background: "transparent",
      });
    }, 0);
  };

  public closeModalLoading = () => Swal.close();

  public initAttribute = () => {
    const element = document.querySelector(".page-content") as HTMLElement;
    this.attribute = Array.from(element.attributes)[0];
  };
}
