const { ObjectId } = require('mongodb');
const { getDB } = require('../utils/databaseUtil');

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, _id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDB();
    if (this._id) { // update
      const updateFields = {
        houseName: this.houseName,
        price: this.price,
        location: this.location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description
      };
      // for edit/update
      return db.collection('homes').updateOne({_id: new ObjectId(String(this._id))}, {$set: updateFields});
    } else { // insert
      return db.collection('homes').insertOne(this);
    }
  }
  // to fetch all homes
  static fetchAll() {
    const db = getDB();
    return db.collection('homes').find().toArray();
  }
  // to find home by id
  static findById(homeId) {   
    const db=getDB();
    return db.collection('homes').find({_id: new ObjectId (String(homeId))}).next();
  }
// for delete
  static deleteById(homeId) {
   const db=getDB();
   return db.collection('homes').deleteOne({_id:new ObjectId (String(homeId))});
  }
};
