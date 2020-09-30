import '../../lib/collections.js'
import '../ui/templates.html'

Accounts.ui.config({
  passwordSignupFields: "USERNAME_AND_EMAIL"
});


Session.set("imageLimit" , 8);
lastScrollTop = 0; 
$(window).scroll(function(event){
  // test if we are near the bottom of the window
  if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    // where are we in the page? 
    var scrollTop = $(this).scrollTop();
    // test if we are going down
    if (scrollTop > lastScrollTop){
      // yes we are heading down...
     Session.set("imageLimit", Session.get("imageLimit") + 4);
    }

    lastScrollTop = scrollTop;
  }
      
});
/*
Template.welcome.helpers({username:function(){
  if(Meteor.user()){
    return Meteor.user().username;
    //return Meteor.user().emails[0].address;
  }else{
    return "Stranger"
  }
}
})
*/

Template.bigImage.helpers({
  getUser:function(user_id){
    var user = Meteor.users.findOne({_id:user_id});
    if(user){
      return user.username;
    }else{
      return "Anonymous";
    }
  }
});

Template.images.helpers({
  images:function(){
    if(Session.get("userFilter")){
      return Images.find({createdBy : Session.get("userFilter")} , {sort:{createdOn:-1, rating:-1}});
    }
    else{
      return Images.find({} , {sort:{createdOn:-1, rating:-1} , limit: Session.get("imageLimit")});
    }
  },

  filtering:function(){
    if(Session.get("userFilter")){
     return true;
    }else{
      return false;
    }
  },

  filterUser:function(){
    if(Session.get("userFilter")){
      var user = Meteor.users.findOne({_id:Session.get("userFilter")});
      return user.username;
    }else{
      return false;
    }
  },
  
  
  getUser:function(user_id){
    var user = Meteor.users.findOne({_id:user_id});
    if(user){
      return user.username;
    }else{
      return "Anonymous";
    }
  }

});





Template.images.events({

  'click .js-show-image-form':function(event){
    console.log("showing the modal...");
  $("#image_add_form").modal('show');
},

  'click .js-del':function(event){
    var image_id = this._id;
    $("#"+image_id).hide('slow' , function(){
      Images.remove({"_id":image_id});
    });
  },

  'click .js-image-rating':function(event){
    var rating = $(event.currentTarget).data("userrating");
    console.log(rating);
    var image_id = this.id;
    console.log(image_id);

    Images.update({_id:image_id},
                  {$set: {rating:rating}});
  },

  'click .js-img-filter':function(event){
    Session.set("userFilter", this.createdBy);
  },

  'click .js-remove-filter':function(event){
    Session.set("userFilter" , null)
  }
 
});




Template.image_add_form.events({
  'submit .js-add-image':function(event){
    var img_src, img_alt;

    img_src = event.target.img_src.value;
    img_alt = event.target.img_alt.value;

    console.log("source:"+img_src+"Alt:"+img_alt);

    if(Meteor.user()){
    Images.insert({
        img_src:img_src,
        img_alt:img_alt,
        createdOn:new Date(),
        createdBy: Meteor.user()._id
    });
  }
  $("#image_add_form").modal('hide');
    return false;
  }
});