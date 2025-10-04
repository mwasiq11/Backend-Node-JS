const moongose = require("mongoose");
const favourite = require("./favourite");
const HomeSchema = new moongose.Schema({
  houseName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  photoUrl: String,
  description: String,
});

HomeSchema.pre('findOneAndDelete',async function(next){
  const homeId=this.getQuery()._id;
  await favourite.deletemany({houseId:homeId})
  next();
})

module.exports = moongose.model("Home", HomeSchema);
