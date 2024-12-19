import { showErrorAlert  } from "../Common/Common";
import { useFuncHTTPReq } from "../Hook/FuncHttpReq";
const HTTPReq = ({
    method = 'GET',
    url,
    baseUrl = 'http://localhost:5128',
    data = null,
    credentials = 'include',
    headers = {},
    responseType = 'json',
    onSuccess,
    onError,
    children,
    ...props
}) => {
    const { FuncHTTPReq } = useFuncHTTPReq();
    const sendRequest = async () => {
        try {
            await FuncHTTPReq({
                method,
                url,
                baseUrl,
                data,
                credentials,
                headers,
                responseType,
                onSuccess: (data, message) => {
                    if (onSuccess) {
                        onSuccess(data, message);
                    }
                },
                onError: (error) => {
                    if (onError) {
                        onError(error);
                    }
                }
            });
        } catch (error) {
            console.error('HTTP Request Failed:', error);
            showErrorAlert(error.message || "An error occurred");
        }
    };

    return children({ sendRequest });
};

export default HTTPReq;