const { Schema } = require('mongoose');

const guide = new Schema({
    state: Schema.Types.String,
    city: Schema.Types.String,
    name: String,
    mobile: String,
    language: String
});

const cityAndDescription = new Schema({
    state: String,
    city: Schema.Types.String,
    description: Schema.Types.String,
    imageUrl: Schema.Types.String,
    url: String,
    date: Schema.Types.Date
});

const gallery = new Schema({
    imageUrl: String,
    description: String,
    date: Schema.Types.Date
});

const tourContact = new Schema({
    name: String,
    email: String,
    mobile: String,
    address: String,
    msg: String,
    date: Schema.Types.Date
});

const hotels = new Schema({
    city: String,
    hotelName: String,
    hotelId: String,
    imageUrl: String,
    address: String,
    description: String,
    //hotelImgUrl:[String],
    date: Schema.Types.Date
});

// const hotel=new Schema({
//     hotelName:String,
//     address:String,
//     description:String,
//     hotelImgUrl:[String],
//     hotelId:Schema.Types.ObjectId,
//     date:Schema.Types.Date
// });

const rooms = new Schema({
    hotelId: String,
    roomId: String,
    roomType: String,
    roomImgUrl: String,
    priceSingle: Number,
    priceDouble: Number,
    totalRoom: Number,
    availableRoom: Number,
    checkIn: Schema.Types.Date,
    checkOut: Schema.Types.Date,
    isAvailable:Schema.Types.Boolean,
});

const signUp = new Schema({
    name: String,
    mobile: String,
    email: String,
    address: String,
    password: String,
    createdOn: Schema.Types.Date
});

const bookNow = new Schema({
    hotelName:String,
    hotelId:String,
    roomId:String,
    userId:String,
    name: String,
    guestName: String,
    mobile: String,
    emailId: String,
    address: String,
    roomType: String,
    price: Number,
    noOfRoom: Number,
    checkIn: Schema.Types.Date,
    checkOut: Schema.Types.Date,
    bookedOn: Schema.Types.Date,
    isCheckOut:Boolean
});

const support = new Schema({
    name: String,
    mobile: String,
    emailId: String,
    query: String,
    submittedOn: Schema.Types.Date
});

const hotelContact = new Schema({
    city: String,
    hotelName: String,
    contactNo: String,
    landlineNo: String,
    emailId: String,
    address: String
});
exports.guide = guide;
exports.cityAndDescription = cityAndDescription;
exports.gallery = gallery;
exports.tourContact = tourContact;
exports.hotels = hotels;
exports.rooms = rooms;
exports.signUp = signUp;
exports.bookNow = bookNow;
exports.support = support;
exports.hotelContact = hotelContact;
