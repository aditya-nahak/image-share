import { Mongo } from 'meteor/mongo';

Images = new Mongo.Collection("images");

Images.allow({

    update:function(userId, doc){
		console.log("testing security on image update");
		if (Meteor.user()){// they are logged in
			return true;
		} else {// user not logged in - do not let them update  (rate) the image.
			return false;
		}
    },
    
    insert:function(userId, doc){
        //console.log("Testing Insert");
        if (Meteor.isClient){ 
            console.log("insert on client"); }
        if(Meteor.user()){// Is user logged in?
            if(userId != doc.createdBy){//user is messing 
                return false;
            }else{//user is logged in and userId matches the database
                return true;
            }
        }else{//user not logged in 
            return false;
        }
    },

    remove:function(userId, doc){
     if(userId){
        return true;
     }else{
         return false;
     }
        
    },
})