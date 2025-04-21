import Swal from 'sweetalert2';

export const showBasicAlert = (title, text, icon = 'info') => {
  return new Promise((resolve) => {
    Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(); // Resolve the promise when the alert is confirmed
      }
    });
  });
};

export const showSuccessAlert = (title = 'Success', text = '') => {
  return new Promise((resolve) => {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'Great!',
    }).then((result) => {
      if (result.isConfirmed) {
        resolve();
      }
    });
  });
};


// Error alert
export const showErrorAlert = (title = 'Error', text = '') => {
  return new Promise((resolve) => {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(); // Resolve the promise when the alert is confirmed
      }
    });
  });
};

// Warning/Confirmation alert with confirmation and cancel callbacks
export const showConfirmAlert = ({
  title = 'Are you sure?',
  text = '',
  confirmButtonText = 'Yes, do it!',
  cancelButtonText = 'No, cancel!',
  onConfirm = () => {},
  onCancel = () => {},
} = {}) => {
  Swal.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      onCancel();
    }
  });
};

