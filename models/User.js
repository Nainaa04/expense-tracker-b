const mongoose=require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
    {
    fullName:{
        type: String, 
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default:null
    },
},
{timestamps:true}
);

//hash password before saving

userSchema.pre('save',async function (next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//compare passwords

userSchema.methods.comparePassword = async function (candidatePassword) {
    console.log("Comparing:", candidatePassword, "with", this.password);
    return await bcrypt.compare(candidatePassword, this.password);
  };
  
module.exports = mongoose.model('User',userSchema);