'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Gifts = new Module('gifts');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Gifts.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Gifts.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Gifts.menus.add({
    title: 'Gifts',
    link: 'list gifts',
    roles: ['authenticated'],
    menu: 'main'
  })
  .add({
    title: 'Finder',
    link: 'finder gifts',
    roles: ['authenticated'],
    menu: 'main'
  })
  ;
  
  Gifts.aggregateAsset('css', 'gifts.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Gifts.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Gifts.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Gifts.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Gifts;
});
