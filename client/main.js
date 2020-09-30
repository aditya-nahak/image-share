import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import '../imports/ui/templates.html'
import './main.html';
import '../lib/collections.js'
import '../imports/api/body.js'
import '../imports/api/template_task.js'

Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  this.render('welcome', {
    to:"main"
  });
});

Router.route('/images', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('images', {
    to:"main"
  });
});

Router.route('/bigImage/:_id', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('bigImage', {
    to:"main",
    data:function(){
      return Images.findOne({_id:this.params._id})
    }
  });
});






  

