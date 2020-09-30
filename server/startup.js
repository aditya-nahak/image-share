import { Meteor } from 'meteor/meteor';
import '../lib/collections.js';

Meteor.startup(function(){
    if(Images.find().count()==0){
        for(var i=1;i<23;i++){
          Images.insert(
            {
                img_src: "img_"+i+".jpg",
                img_alt:"Image"+i
              }
          );
    
            }//for closed
          }//if closed
    
    });
  console.log(Images.find().count());