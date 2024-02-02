import { Injectable } from "@angular/core";
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})

export class AlertService {

    public question(
        tittle: string,
        subTitle: string,
        showConfirmButton: boolean,
        showCancelButton: boolean,
        btnConfirmText: string,
        btnCancelText: string,
        image = 'assets/icons/library.svg'
    ): Promise<any> {
        return new Promise((resolve) => {
            const swalPersonalizado = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-confirmation mr-2',
                    cancelButton: 'btn btn-cancel',
                },
                buttonsStyling: false,
            });
            swalPersonalizado
                .fire({
                    html: `<p>${tittle}.</p> `,
                    imageUrl: image,
                    text: subTitle,
                    showConfirmButton: showConfirmButton,
                    showCloseButton: false,
                    showCancelButton: showCancelButton,
                    focusConfirm: true,
                    confirmButtonText: btnConfirmText,
                    cancelButtonText: btnCancelText,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    width: 312,
                })
                .then((result) => {
                    console.log(result);
                    if (result.isConfirmed) {
                        resolve(true);
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel ||
                        result.dismiss === Swal.DismissReason.close
                    ) {
                        resolve(false);
                    }
                });
        });
    }

    public question2(
        title: string,
        text: string,
        confirmButtonText: string,
        cancelButtonText: string,
        icon: SweetAlertIcon = 'warning' // Asegúrate de establecer el tipo adecuado aquí
    ): Promise<boolean> {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });

        return swalWithBootstrapButtons.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            reverseButtons: false 
        }).then((result) => {
            return result.isConfirmed;
        });
    }

    public notification(title: string, text: string, icon: SweetAlertIcon = 'success') {
        return Swal.fire({
            title: title,
            text: text,
            icon: icon
        });
    }

    public notificationError(title: string, text: string, icon: SweetAlertIcon = 'error') {
        return Swal.fire({
            title: title,
            text: text,
            icon: icon
        });
    }


    public close(): void {
        Swal.close();
    }
}