import { Workbox } from 'workbox-window';
import showAlertAndToast from './show-alert';

const swRegister = async () => {
  if (!('serviceWorker' in navigator)) {
    console.log('Browser yang anda pakai tidak suport dengan fitur service worker');
    showAlertAndToast.alertError('Browser yang anda pakai tidak suport dengan fitur service worker');
    return;
  }

  const wb = new Workbox('./sw.bundle.js');

  try {
    await wb.register();
    console.log('service worker berhasil diregistrasi');
  } catch (error) {
    console.log('service worker gagal diregistrasi', error);
  }
};

export default swRegister;
