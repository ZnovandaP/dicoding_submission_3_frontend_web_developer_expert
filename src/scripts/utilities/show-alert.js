import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  customClass: {
    container: 'toast-container',
  },
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const showAlertAndToast = {
  alertSuccess(message) {
    Swal.fire({
      title: '<h2 class="title-alert">Berhasil</h2>',
      html: `<b class="text-alert">${message}</b>`,
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#043a2d',
      customClass: {
        confirmButton: 'alert-button',
      },
    });
  },

  alertError(message) {
    Swal.fire({
      title: '<h2 class="title-alert-error">Gagal</h2>',
      html: `<b class="text-alert">${message}</b>`,
      icon: 'error',
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Kembali',
      cancelButtonColor: '#e11d48',
      customClass: {
        cancelButton: 'alert-button',
      },
    });
  },

  alertQuestion(callback) {
    Swal.fire({
      title: '<h2 class="title-alert-question">Izin Konfirmasi</h2>',
      html: '<b class="text-alert">Apakah anda yakin untuk menghapus restoran ini dari favorit?</b>',
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      confirmButtonColor: '#e11d48',
      cancelButtonText: 'Kembali',
      cancelButtonColor: '#0284c7',
      customClass: {
        cancelButton: 'alert-button',
        confirmButton: 'alert-button confirm-button-unlike',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        callback();
      }
    });
  },

  toastSuccess(message) {
    Toast.fire({
      icon: 'success',
      title: `<b class="text-alert">${message}</b>`,
    });
  },
};

export default showAlertAndToast;
