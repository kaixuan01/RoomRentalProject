import Swal from 'sweetalert2';

export const showBasicAlert = (title, text, icon = 'info') => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'OK',
  });
};

export const showSuccessAlert = (title = 'Success', text = '') => {
  return Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonText: 'Great!',
  });
};

// Error alert
export const showErrorAlert = (title = 'Error', text = '') => {
  Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: 'OK',
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

