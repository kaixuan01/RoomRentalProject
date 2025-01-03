import { useCallback } from 'react';
import Cookies from "js-cookie";
import { showErrorAlert } from '../utils/helpers/alertHelpers';
import { useLoading } from '../components/shared/Loading/LoadingContext';

const handleResponseErrors = (
  response,
  customHandlers = {}
) => {
  const isBlocked = Cookies.get("isBlocked");

  if (!response.ok) {
    if (customHandlers[response.status]) {
      customHandlers[response.status](response);
    } else {
      switch (response.status) {
        case 401:
          if (isBlocked === "true") {
            showErrorAlert(
              "Your account has been blocked, please contact admin to proceed."
            );
          } else {
            showErrorAlert("Your session is expired. Please login again.");
          }
          break;

        case 403:
          showErrorAlert("You have no permission on this function!");
          break;

        default:
          showErrorAlert(
            "Service temporarily not available. Please try again later."
          );
          break;
      }
    }
    return false;
  }
  return true;
};
export const useHTTPReq = () => {
  const { setLoading } = useLoading();

  const HTTPReq = useCallback(
    ({
      method = 'GET',
      url,
      baseUrl = 'https://localhost:7032',
      data = null,
      credentials = 'include',
      headers = {},
      responseType = 'json',
      onSuccess,
      onError,
      customHandlers = {},
      hideLoading = false
    }) => {
      (async () => {
        if (!hideLoading) {
          setLoading(true);
        }

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

          if (!hideLoading) {
            setLoading(false);
          }

          if (!handleResponseErrors(response, customHandlers)) {
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
          if (!hideLoading) {
            setLoading(false);
          }
          showErrorAlert(error.message || "An error occurred.");
          onError?.(error);
        }
      })();
    },
    [setLoading, handleResponseErrors]
  );

  return { HTTPReq };
};

