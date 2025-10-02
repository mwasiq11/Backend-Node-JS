const moongose=require('mongoose');
const favouriteSchema=new moongose.Schema({
  houseId:{
    type:moongose.Schema.Types.ObjectId,
    reuired:true,
    unique:true,
    ref:'Home',
  }
})
module.exports=moongose.model('Favourite',favouriteSchema);
