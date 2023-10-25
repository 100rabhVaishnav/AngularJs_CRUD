angular.module('myApp', [])
    .controller("api", function ($scope,$window) {
        // $scope.students=[{name:'saurabh',age:23},{name:"sss",age:11}];
        $scope.data = [];
        $scope.newUser = {
            name: '',
            email: '',
            age: 0,
            gender:''
        };

        // CREATE USER
        $scope.showAddUserModal = function () {
            $('#createUserModal').modal('show');
        }
        $scope.hideAddUserModal = function () {
            $('#createUserModal').modal('hide');
        }

        $scope.createUser = async function (user) {
            try {
                const response = await axios.post('https://65322fee4d4c2e3f333dbb4b.mockapi.io/user', user);
                console.log(response);
                window.alert("data added successfully")
                $scope.hideAddUserModal();
                $window.location.href = 'List.html';
                fetchData(); // Refresh the data after creation
            } catch (error) {
                console.error('Error creating user:', error);
            }
        }


        // GET USER
        async function fetchData() {
            try {
                const response = await axios.get('https://65322fee4d4c2e3f333dbb4b.mockapi.io/user');
                $scope.$apply(function () {
                    $scope.data = response.data;
                });
                console.log($scope.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        // DELETE USER
        $scope.confirmDelete = function (userId) {
            const confirmed = window.confirm('Are you sure you want to delete this user?');
            if (confirmed) {
                $scope.deleteUser(userId);
            }
        }

        $scope.deleteUser = async function (userId) {
            try {
                const response = await axios.delete('https://65322fee4d4c2e3f333dbb4b.mockapi.io/user/' + userId);
                console.log(response);
                console.log("id:", $scope.data.id);
                fetchData(); // Refresh the data after deletion
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }

         // EDIT USER
         $scope.editUser = function (user) {
            $scope.updatedUser = angular.copy(user); // Create a copy of the user for editing
            $('#editUserModal').modal('show');
        }

        $scope.updateUser = async function (user) {
            try {
                const response = await axios.put('https://65322fee4d4c2e3f333dbb4b.mockapi.io/user/' + user.id, user);
                console.log(response);
                window.alert("Data updated successfully");
                $('#editUserModal').modal('hide');
                fetchData(); // Refresh the data after update
            } catch (error) {
                console.error('Error updating user:', error);
            }
        }
        fetchData();
    })


