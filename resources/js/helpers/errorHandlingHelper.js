import { toast } from 'react-toastify';

/**
 * Class helper that provides methods for errors handling
 */
class ErrorHandlingHelper {
    /**
     * shows a notification toast for each error in the responseJSON
     * @param {json} responseJson
     */
    static handleAll(responseJson) {
        let errors = responseJson['errors'];

        if (errors.length) {
            errors.forEach(message => {
                toast.error(message);
            });
        }
    }
}

export default ErrorHandlingHelper;
