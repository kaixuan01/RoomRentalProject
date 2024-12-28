import { useCallback } from 'react';
import Cookies from "js-cookie";
import { showErrorAlert } from '../../Common';

// Define the handleResponseErrors function outside of the hook to avoid dependency issues
const handleResponseErrors = (response, handleLogout) => {
  const isBlocked = Cookies.get('isBlocked');

  if (!response.ok) {
    if (response.status === 401) {
      if (isBlocked === 'true') {
        showErrorAlert("Your account has been blocked, please contact admin to proceed.");
      } else {
        showErrorAlert("Your session is expired. Please login again.");
      }
      // handleLogout();
    } else if (response.status === 403) {
      showErrorAlert("You have no permission on this function!");
    } else {
      showErrorAlert("Service temporary not available. Please try again later.");
    }
    return false;
  }
  return true;
};

export const useFuncHTTPReq = () => {
  const FuncHTTPReq = useCallback(({
    method = 'GET',
    url,
    baseUrl = 'https://localhost:7032',
    data = null,
    credentials = 'include',
    headers = {},
    responseType = 'json',
    onSuccess,
    onError
  }) => {
    (async () => {
      try {
        const options = {
          method,
          credentials,
          headers: {
            'Content-Type': 'application/json',
            ...headers,
          },
          ...(['POST', 'PUT', 'PATCH'].includes(method.toUpperCase()) && data && { body: JSON.stringify(data) }),
        };

        const response = await fetch(`${baseUrl}${url}`, options);

        if (!handleResponseErrors(response)) {
          return;
        }

        let result;
        switch (responseType) {
          case 'json':
            result = await response.json();
            break;
          case 'text':
            result = await response.text();
            break;
          default:
            result = await response.blob();
            break;
        }

        if (responseType === 'json' && result.success) {
          onSuccess?.(result.data, result.message);
        } else {
          showErrorAlert(result.message);
          onError?.(result.message);
        }
      } catch (error) {
        showErrorAlert(error.message || "An error occurred.");
        onError?.(error);
      }
    })();
  }, []);

  return { FuncHTTPReq };
};
