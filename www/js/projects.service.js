/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
app.factory('Projects', function() {
  return {
    /**
     * [all description]
     * @return {[type]} [description]
     */
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    /**
     * [save description]
     * @param  {[type]} projects [description]
     * @return {[type]}          [description]
     */
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    /**
     * Add a new project
     * @param  {[type]} projectTitle [description]
     * @return {[type]}              [description]
     */
    newProject: function(projectTitle) {
      return {
        title: projectTitle,
        tasks: []
      };
    },
    /**
     * [getLastActiveIndex description]
     * @return {[type]} [description]
     */
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    /**
     * [setLastActiveIndex description]
     * @param {[type]} index [description]
     */
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
});