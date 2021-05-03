// Service provider namespace
var ToDoServiceProvider = ToDoServiceProvider || {};

/**
 * ToDoServiceProvider module
 */
ToDoServiceProvider.Service = (function () {
    // service
    /**
     * exposes methods to consume backend REST API resources
     */
    var service = function () {
        /**
         * calls the endpoint to return a list of tasks from the database
         * @returns object
         */
        this.list = function () {
            var result = $.Deferred();

            $.ajax({
                url: '/api/tasks',
                type:'GET',
                dataType: 'json',
                success: function (response) {
                    result.resolve(response);
                },
                error: function(error) {
                    result.reject(error.responseJSON);
                }
            });

            return result.promise();
        }

        /**
         * calls the endpoint to return one task from the database
         * @param {integer} id
         * @returns object
         */
        this.show = function (id) {
            var result = $.Deferred();

            $.ajax({
                url: '/api/tasks/' + id,
                type: 'GET',
                contentType: 'application/json; charset=UTF-8',
                dataType: 'json',
                success: function (response) {
                    result.resolve(response);
                },
                error: function(error) {
                    result.reject(error.responseJSON);
                }
            });

            return result.promise();
        }

        /**
         * calls the endpoint to insert a task in the database
         * @param {object} task
         */
        this.insert = function (task) {

            return $.ajax({
                url: '/api/tasks',
                type: 'POST',
                contentType: 'application/json; charset=UTF-8',
                dataType: 'json',
                data: JSON.stringify(task)
            });
        }

        /**
         * calls the endpoint to update a task in the database
         * @param {object} task
         */
        this.update = function (task) {
            return $.ajax({
                url: '/api/tasks/' + id,
                type: 'PUT',
                contentType: 'application/json; charset=UTF-8',
                dataType: 'json',
                data: JSON.stringify(task)
            });
        }

        /**
         * calls the endpoint to delete a task from the database
         * @param {int} id
         */
        this.delete = function (id) {
            return $.ajax({
                url: '/api/tasks/' + id,
                type: 'DELETE',
                contentType: 'application/json; charset=UTF-8',
                dataType: 'json',
                data: JSON.stringify(task)
            });
        }
    }

    // private
    /**
     * returns a new instance of the service
     * @returns object
     */
    function getService() {
        return new service();
    }

    // public
    /**
     * exposes the getService method so the client can instantiate the service
     */
    return {
        getInstance: getService
    }
})();

export default ToDoServiceProvider;
