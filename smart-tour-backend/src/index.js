const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bcrypt=require('bcrypt');
const session=require('express-session');
const multer=require('multer');
const fileUpload = require('express-fileupload');
const session_secret="projectDb";
const nodemailer = require('nodemailer');

const app=express();
app.use(express.json()); //added body key to req
app.use(fileUpload());
app.use(
    session({
        secret:session_secret,
        cookie:{maxAge:1*60*60*1000}
    })
);

//app.use(cors());
app.use(cors({
    credentials: true,
    origin:"http://localhost:3000"
    //origin: "https://smart-tour-app.herokuapp.com"
    
}));

app.use(express.static('public'));
const {guideModel,tourPlaceDetailsModel,galleryModel,tourContactModel,hotelsModel,roomsModel,signUpModel,bookNowModel,supportModel, hotelContactModel}=require('./connector');

const isNullOrUndefined=(value)=>value===null || value===undefined;

app.post("/guide", async (req,res)=>{
    const state=req.body.state;
    const city=req.body.city;
    const name=req.body.name;
    const mobile=req.body.mobile;
    const language=req.body.language;
    //console.log(req.body);
    const insertGuide=new guideModel({state:state,city:city,name:name,mobile:mobile,language:language});
    await insertGuide.save();
    res.status(201).send(insertGuide);
});

app.get("/guide", async (req,res)=>{
    const state=req.body.state;
    const getGuide=await guideModel.find();
    if(isNullOrUndefined(getGuide)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getGuide);
    }
});
app.get("/guide/:state/:city", async (req,res)=>{
    const {state,city}=req.params;
    //console.log(state,city);
    const getGuide=await guideModel.find({state:state, city:city});
    //console.log(getGuide);
    if(isNullOrUndefined(getGuide)){
        res.sendStatus(404);
    }else{
        //console.log(getGuide);
    res.status(201).send(getGuide);
    }
});
app.delete("/guide/:id", async (req,res)=>{
    const {id}=req.params;
    const getGuideDetails=await guideModel.deleteMany({_id:id});
    if(isNullOrUndefined(getGuideDetails)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getGuideDetails);
    }
});
app.post("/tourPlaceDetails", async (req,res)=>{
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }    
        const file = req.files.file;
        const state=req.body.state;
        const city=req.body.city;
        const desc=req.body.desc;
        //const imgUrl=req.body.imageUrl;
        const url=req.body.url;
        const date=new Date();
        const imgName=Date.now();
        const imageUrl=`${imgName}_${file.name}`;
        file.mv(`F:/FullStack/React/smart-tour-app/public/tour-place/${imgName}_${file.name}`, async err => {
        if (err) {
          //console.error(err);
          return res.status(500).send(err);
        }
        const insertPlaceDetails=new tourPlaceDetailsModel({state:state,city:city,description:desc,imageUrl:imageUrl,url:url,date:date});
        await insertPlaceDetails.save();
        res.status(201).send(insertPlaceDetails);
        //res.json({ fileName: file.name, filePath: `/uploads/${imgName}_${file.name}` });
      });
});
app.get("/tourPlaceDetails/:state/:city", async (req,res)=>{
    const {state,city}=req.params;
    const getTourPlaceDetails=await tourPlaceDetailsModel.find({state:state,city:city});
    if(isNullOrUndefined(getTourPlaceDetails)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getTourPlaceDetails);
    }
});
app.get("/tourPlaceDetails", async (req,res)=>{
    //const {state,city}=req.params;
    const getTourPlaceDetails=await tourPlaceDetailsModel.find();
    if(isNullOrUndefined(getTourPlaceDetails)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getTourPlaceDetails);
    }
});
app.delete("/tourPlaceDetails/:id", async (req,res)=>{
    const {id}=req.params;
    const getTourPlaceDetails=await tourPlaceDetailsModel.deleteMany({_id:id});
    if(isNullOrUndefined(getTourPlaceDetails)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getTourPlaceDetails);
    }
});
app.post("/gallery", async (req,res)=>{
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }    
      const file = req.files.file;
      const description=req.body.title;
      const imgName=Date.now();
      const imageUrl=`${imgName}_${file.name}`;
    //file.mv(`${__dirname}/public/uploads/${file.name}`, err => {F:/FullStack/React/smart-tour-app
        file.mv(`F:/FullStack/React/smart-tour-app/public/gallery/${imgName}_${file.name}`, async err => {
        if (err) {
          //console.error(err);
          return res.status(500).send(err);
        }
        const date=new Date();
        const insertGallery=new galleryModel({imageUrl:imageUrl,description:description,date:date});
        await insertGallery.save();
        res.status(201).send(insertGallery);
        //res.json({ fileName: file.name, filePath: `/Images/gallery/${imgName}_${file.name}` });
      });
 })


app.get("/gallery",async (req,res)=>{
    const getGallery=await galleryModel.find();
    if(isNullOrUndefined(getGallery)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getGallery);
    }
});

app.delete("/gallery/:id", async (req,res)=>{
    const {id}=req.params;
    const getGallery=await galleryModel.deleteMany({_id:id});
    if(isNullOrUndefined(getGallery)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getGallery);
    }
});

app.post("/tourContact",async (req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const mobile=req.body.mobile;
    const address=req.body.address;
    const msg=req.body.message;
    const date=new Date();
    const insertTourContact=new tourContactModel({name:name,email:email,mobile:mobile,address:address,msg:msg,date:date});
    await insertTourContact.save();
    res.status(201).send(insertTourContact);
});
app.get("/tourContact",async (req,res)=>{
    const getTourContact=await tourContactModel.find();
    if(isNullOrUndefined(getTourContact)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getTourContact);
    }
});

app.post("/hotels",async (req,res)=>{
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      }    
      const file = req.files.file;
      const city=req.body.city;
    const hotelName=req.body.hotelName;
    const hotelId=req.body.hotelId
    const address=req.body.address;
    const description=req.body.desc;
    const date=new Date();
    const imgName=Date.now();
      const imageUrl=`${imgName}_${file.name}`;
        file.mv(`F:/FullStack/React/smart-tour-app/public/hotel-img/${imgName}_${file.name}`, async err => {
        if (err) {
          //console.error(err);
          return res.status(500).send(err);
        }
        const insertHotels=new hotelsModel({city:city,hotelName:hotelName,hotelId:hotelId,imageUrl:imageUrl,address:address,description:description,date:date});
        await insertHotels.save();
        res.status(201).send(insertHotels);
      });
});

app.get("/hotels",async (req,res)=>{
    const getHotels= await hotelsModel.find();
    res.status(201).send(getHotels);
    
});
app.get("/hotel/:Id",async (req,res)=>{
    const id=req.params.Id;
    const getHotels= await hotelsModel.findOne({_id:id});
    //console.log("/hotels/:Id1", id);
    //console.log("/hotels/:Id2", getHotels);
    res.status(201).send(getHotels);
    
});
app.get("/hotels/:city",async (req,res)=>{
    const city=req.params.city;
    const getHotels= await hotelsModel.find({city:city});
    //console.log(city);
    res.status(201).send(getHotels);
    
});

app.delete("/hotels/:id", async (req,res)=>{
    const {id}=req.params;
    const getHotels=await hotelsModel.deleteMany({_id:id});
    if(isNullOrUndefined(getHotels)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getHotels);
    }
});

app.post("/rooms",async (req,res)=>{
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
      } 
    const hotelId=req.body.hotelId;
    const roomId=req.body.roomId;
    const roomType=req.body.roomType;
    const file=req.files.file;
    const priceSingle=req.body.priceSingle;
    const priceDouble=req.body.priceDouble;
    const totalRoom=req.body.totalRoom;
    const availableRoom=req.body.totalRoom;//error
    const checkIn="";
    const checkOut="";
    const isAvailable=true;
    const imgName=Date.now();
      const imageUrl=`${imgName}_${file.name}`;
        file.mv(`F:/FullStack/React/smart-tour-app/public/room-img/${imgName}_${file.name}`, async err => {
        if (err) {
          //console.error(err);
          return res.status(500).send(err);
        }
    const insertrooms=new roomsModel({hotelId:hotelId,roomId:roomId,roomType:roomType,roomImgUrl:imageUrl,priceSingle:priceSingle,
    priceDouble:priceDouble,totalRoom:totalRoom,availableRoom:availableRoom,checkIn:checkIn,checkOut:checkOut,isAvailable:isAvailable});
    await insertrooms.save();
    //console.log("Save in DB", insertrooms);
    res.status(201).send(insertrooms);
        });
});
app.get("/rooms",async (req,res)=>{
    
    const getrooms=await roomsModel.find();
   
    if(isNullOrUndefined(getrooms)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getrooms);
    }
});
app.get("/rooms/:id",async (req,res)=>{
    const id=req.params.id;
    //console.log("roomsId  ",id);
    const getrooms=await roomsModel.find({hotelId:id});
    //console.log("rooms  ",getrooms);
    if(isNullOrUndefined(getrooms)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getrooms);
    }
});

app.get("/rooms/:hotelId/:roomId",async (req,res)=>{
    const {hotelId,roomId}=req.params;
    ////console.log("roomsId  ",id);
    const getrooms=await roomsModel.find({hotelId:hotelId, roomId:roomId});
    //console.log("rooms  ",getrooms);
    if(isNullOrUndefined(getrooms)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getrooms);
    }
});

app.put("/rooms",async (req,res)=>{
    const {hotelId,roomId,roomType,noOfRoom,isAvailable}=req.body;
	//console.log(hotelId, roomId, noOfRoom);
    try{
    const getrooms=await roomsModel.findOne({hotelId:hotelId, roomId:roomId, roomType:roomType});
    if(isNullOrUndefined(getrooms)){
	//console.log("Null");
        res.sendStatus(404);
    }else{
	getrooms.availableRoom=noOfRoom;
	getrooms.isAvailable=isAvailable;
      await getrooms.save();
    res.status(201).send(getrooms);
    }
   }catch(e){
	//console.log("Catch");
	res.sendStatus(404);
	}
});
app.delete("/rooms/:id", async (req,res)=>{
    const {id}=req.params;
    const getRooms=await roomsModel.deleteMany({_id:id});
    if(isNullOrUndefined(getRooms)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getRooms);
    }
});

app.post("/signup", async(req,res)=>{
    const {name,mobile,email,address,password}=req.body;
    const createdOn=new Date();
    const existingUser=await signUpModel.findOne({email:email});
    if(isNullOrUndefined(existingUser)){
        const hashPwd=bcrypt.hashSync(password,7);
        const newUser=new signUpModel({name:name,mobile:mobile,email:email,address:address,password:hashPwd,createdOn:createdOn});
        await newUser.save();
        //console.log(name,mobile,email,address,password);
        req.session.userId=newUser._id;
        res.status(201).send({Success:"Signed up"});
    }else{
        res.status(404).send({err:`UserName ${email} already exist. Please choose another.`})
    }
});

app.get("/signup",async (req,res)=>{
    const getSignupUser=await signUpModel.find();
    if(isNullOrUndefined(getSignupUser)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getSignupUser);
    }
});

app.delete("/signup/:id", async (req,res)=>{
    const {id}=req.params;
    const getUser=await signUpModel.deleteMany({_id:id});
    if(isNullOrUndefined(getUser)){
        res.sendStatus(404);
    }else{
    res.status(201).send(getUser);
    }
});
app.post("/signin", async (req,res)=>{
    const {userName,password}=req.body;
    const existingUser=await signUpModel.findOne({email:userName});
    if(isNullOrUndefined(existingUser)){
        res.status(404).send({err:'Username/Password Incorrect'});
    }else{
        const hashPwd=existingUser.password;
        if(bcrypt.compareSync(password,hashPwd)){
            req.session.userId=existingUser._id;
            res.status(201).send({success:'Logged In'});
        }else{
            res.status(404).send({err:'Username/Password Incorrect'});
        }
    }
});

// app.get("/loginUser", async (req,res)=>{
//     if(isNullOrUndefined(req.session.userId)){
//         res.status(404).send({err:'Not Logged In'});
//     }
//     else{
//         res.status(201).send(req.session.userId);
//     }
// })

const AuthMiddleware=async (req,res,next)=>{
    if(isNullOrUndefined(req.session)||isNullOrUndefined(req.session.userId)){
        res.status(404).send({err:'Not Logged In'});
    }
    else{
        next();
    }
}

app.post("/bookNow", AuthMiddleware, async (req,res)=>{
    const bookedRoom=req.body;
    bookedRoom.bookedOn=new Date();
    //bookedRoom.checkIn="";
    //bookedRoom.checkOut="";
    bookedRoom.isCheckOut=false;
    bookedRoom.userId=req.session.userId;
    const newBookedRoom=new bookNowModel(bookedRoom);
    await newBookedRoom.save();
    res.status(201).send(newBookedRoom);
});

app.put("/bookNow",async (req,res)=>{
    const {hotelId,roomId,isCheckOut}=req.body;
	//console.log(hotelId, roomId, isCheckOut);
    try{
    const bookedRoom=await bookNowModel.findOne({hotelId:hotelId, roomId:roomId, isCheckOut:false});
    if(isNullOrUndefined(bookedRoom)){
	//console.log("Null");
        res.sendStatus(404);
    }else{
	bookedRoom.isCheckOut=isCheckOut;
      await bookedRoom.save();
    res.status(201).send(bookedRoom);
    }
   }catch(e){
	//console.log("Catch");
	res.sendStatus(404);
	}
});

 app.get("/bookNow", async (req,res)=>{
   //console.log(req.session.userId);
    //const bookedRoom=await bookNowModel.find({isCheckOut:false});
const bookedRoom=await bookNowModel.find();
//console.log("filter //consoles",bookedRoom);
    res.status(201).send(bookedRoom);
});

 app.get("/getbookNow", AuthMiddleware, async (req,res)=>{
    //app.get("/bookNow", async (req,res)=>{
        const bookedRoom=await bookNowModel.find({userId:req.session.userId});
        //const bookedRoom=await bookNowModel.find();
        res.status(201).send(bookedRoom);
    });

app.post("/support", AuthMiddleware, async (req,res)=>{
    const support=req.body;
    support.submittedOn=new Date();
    const newSupport=new supportModel(support);
    await newSupport.save();
    res.status(201).send(newSupport);
});

app.get("/support",async (req,res)=>{
    const support=await supportModel.find();
    if(isNullOrUndefined(support)){
        res.status(404).send({err:'Not Found!'});
    }else{
    res.status(201).send(support);
    }
});

app.post("/hotelContact", async (req,res)=>{
    const hotelContact=req.body;
    //console.log(hotelContact);
    const newHotelContact=new hotelContactModel(hotelContact);
    await newHotelContact.save();
    res.status(201).send(newHotelContact);
})

app.get("/hotelContact",async (req,res)=>{
    const hotelContact=await hotelContactModel.find();//{_id:req.session.userId}
    if(isNullOrUndefined(hotelContact)){
        res.status(404).send({err:'Not Found!'});
    }else{
        //console.log(hotelContact);
    res.status(201).send(hotelContact);
    }
});

app.get("/logout",(req,res)=>{
    if(!isNullOrUndefined(req.session)){
        req.session.destroy(()=>{
            res.sendStatus(201);
        });
        //console.log("logout");
    }else{
        res.sendStatus(201);
    }
});

app.get('/userinfo', AuthMiddleware, async (req, res) => {
    const user = await signUpModel.findById(req.session.userId);
    res.status(200).send({ userName : user.email });
});


app.post('/sendmail',async(req,res)=>{
    //console.log(req.body);
    const {name,guestName,mobile,address,price,email,noOfRoom, roomCat,days}=req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'smarttourhelps@gmail.com',
          pass: 'Atulverma@123'
        }
      });
      
      var mailOptions = {
        from: 'smarttourhelps@gmail.com',
        //to: 'scriet01@gmail.com',
        to: email,
        subject: 'Smart tour booked room details!',
        //text: `Welcome, ${name}`,
        html:`<b>Welcome, ${name}!</b><br>Name : ${name}<br> Guest Name : ${guestName}<br>Mobile : ${mobile}<br>Address : ${address}<br> No Of Room : ${noOfRoom}<br>Room Type : ${roomCat}<br>No Of Days : ${days}<br>Price : ${price}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          //console.log(error);
        } else {
          //console.log('Email sent: ' + info.response);
        }
      });
})

app.post('/admin-mail',async(req,res)=>{
    //console.log(req.body);
    const {password}=req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'smarttourhelps@gmail.com',
          pass: 'Atulverma@123'
        }
      });
      
      var mailOptions = {
        from: 'smarttourhelps@gmail.com',
        to: 'smarttourhelps@gmail.com',
        subject: 'Smart tour admin login!',
        text: `Admin Password : ${password}`,
       
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.status(404).send({err:error});
        } else {
            res.status(201).send({
                msg:'success',
                info:info.response
            })
          //console.log('Email sent: ' + info.response);
        }
      });
})

app.get('/',async(req,res)=>{
    res.send("Server running...")
})
app.listen(9999, () => console.log(`App listening on port 9999!`))
module.exports = app;