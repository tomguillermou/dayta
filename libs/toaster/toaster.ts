import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class Toaster {
  private readonly toast = Swal.mixin({
    toast: true,
    animation: false,
    position: 'bottom',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  showSuccess(params: { text: string }): void {
    this.toast.fire({
      background: 'var(--bs-success-bg-subtle)',
      customClass: {
        title: 'text-center text-black',
        timerProgressBar: 'progress-bar bg-success',
      },
      title: params.text,
    });
  }

  showError(params: { text: string }): void {
    this.toast.fire({
      background: 'var(--bs-danger-bg-subtle)',
      customClass: {
        title: 'text-center text-black',
        timerProgressBar: 'progress-bar bg-danger',
      },
      title: params.text,
    });
  }
}
