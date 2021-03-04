const mongoURI = "mongodb://localhost:27017" + "/tourDB"
//const mongoURI ="mongodb+srv://Todo_Db:TodoDb@123@mongocluster.afpgg.mongodb.net/smartTourDatabase?retryWrites=true&w=majority";
let mongoose = require('mongoose');
const { guide,cityAndDescription,gallery,tourContact,hotels,rooms, signUp, bookNow, support,hotelContact } = require('./schema')

const tourDb=mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    tourDb.then(() => { console.log("connection established with mongodb server online"); })
    tourDb.catch(err => {
        console.log("error while connection", err)
    });




const guideModel = tourDb.model('guide', guide);
const tourPlaceDetailsModel=tourDb.model("cityAndDescription",cityAndDescription);
const galleryModel=tourDb.model("gallery",gallery);
const tourContactModel=tourDb.model("tourContact",tourContact);
const hotelsModel=tourDb.model("hotels",hotels);
const roomsModel=tourDb.model("rooms",rooms);
const signUpModel=tourDb.model("signUp",signUp);
const bookNowModel=tourDb.model("bookNow",bookNow);
const supportModel=tourDb.model("support",support);
const hotelContactModel=tourDb.model("hotelContact",hotelContact);

exports.guideModel = guideModel;
exports.tourPlaceDetailsModel=tourPlaceDetailsModel;
exports.galleryModel=galleryModel;
exports.tourContactModel=tourContactModel;
exports.hotelsModel=hotelsModel;
exports.roomsModel=roomsModel;
exports.signUpModel=signUpModel;
exports.bookNowModel=bookNowModel;
exports.supportModel=supportModel;
exports.hotelContactModel=hotelContactModel;