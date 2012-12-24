"use strict";

// create a namespace/root obj for the app
window.EST = window.EST || {};

// add the BB event system to the namespace/root obj
_.extend(EST, Backbone.Events);