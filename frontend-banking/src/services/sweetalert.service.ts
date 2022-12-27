import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetalertService {

  private default: any = {
    error: {
        title: 'Whoops. That didn\'t work.',
        description: 'Please try again later.',
    },
    success: {
        title: 'Success!',
        description: '',
    },

}

  constructor() { }

  success(title: string, description:string) {
    title = title || this.default.success.title;
    description = description || this.default.success.description;
    Swal.fire( "Success", description, 'success');
  }

  error(title:string, description:string) {
    title = title || this.default.error.title;
    description = description || this.default.error.description;
    Swal.fire(title, description, 'error');
  }

  alertConfirmation() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Con',
      cancelButtonText: 'No, let me think',
    }).then((result) => {
      if (result.value) {
        Swal.fire('Removed!', 'Product removed successfully.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product still in our database.)', 'error');
      }
    });
  }
}
