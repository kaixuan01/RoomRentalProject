import Swal from 'sweetalert2';
// import { useDispatch } from 'react-redux';
// import { updateData } from '../Redux/actions';
// import { useAuthHandlers } from '../Hook/AuthHandlers';
// import Cookies from 'js-cookie';
// Basic alert
export const showBasicAlert = (title, text, icon = 'info') => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: 'OK',
  });
};

// Success alert
export const showSuccessAlert = (title = 'Success', text = '', onConfirm) => {
  Swal.fire({
    title,
    text,
    icon: 'success',
    confirmButtonText: 'Great!'
  }).then((result) => {
    if (typeof onConfirm === 'function') {
      onConfirm();
    }
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

export const buildQueryString = (params) => {
  return new URLSearchParams(params).toString();
};

