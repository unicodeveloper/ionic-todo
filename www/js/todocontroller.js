angular.module('todo')

.controller('TodoCtrl', function($scope, $timeout, $ionicModal, Projects, $ionicSideMenuDelegate) {

  /**
   *  An utility function for creating a new project with the given projectTitle
   * @param  projectTitle
   * @return void
   */
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length - 1);
  }

  /*
   * Load or Initialize projects
   */
  $scope.projects = Projects.all();

  /*
   * Grab the last active, or the first project
   */
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];
  console.log( $scope.activeProject.tasks);

  /**
   * Called to create a new project
   * @return void
   */
  $scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };

  /**
   * Called to select the given project
   * @param  project
   * @param  index
   * @return void
   */
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  $scope.tasks = [];

  // Error message if there are no tasks present
  $scope.message = 'No tasks Listed yet';

  /*
   * Create and load the Modal
   */
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope
  });

  /**
   * Called when the form is submitted
   * @param  task
   * @return void
   */
  $scope.createTask = function(task) {
    if(!$scope.activeProject || !task) {
      return;
    }
    $scope.activeProject.tasks.push({
      title: task.title
    });
    $scope.taskModal.hide();

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
  };

  /**
   * Open our new task modal
   * @return void
   */
  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  /**
   * Close the new task modal
   * @return void
   */
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };

  /**
   *  Toggle Projects sidebar
   * @return void
   */
  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  /**
   * Try to create the first project, make sure to defer this by
   * using $timeout so everything is initialized properly
   */
  $timeout(function() {
    if($scope.projects.length == 0) {
      while(true) {
        var projectTitle = prompt('Your first project title:');
        if(projectTitle) {
          createProject(projectTitle);
          break;
        }
      }
    }
  });
});