import mongoose from 'mongoose';

//backend/data.js'deki users dizisindeki verilerin tanımlanması için kullanılan kod satırı.

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    isAdmin: {type:Boolean, default:false,required:true}
}, {
    timestamps:true //oluşturulma ve güncelleme tarihi için true işaretlendi.
}
);
const User = mongoose.model("User",userSchema);
export default User;