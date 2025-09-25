// Core Modules
const db = require("../utils/databaseUtil");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    if (this.id) { // update
      return db.execute('UPDATE home SET houseName=?, price=?, location=?, rating=?, photoUrl=?, description=? WHERE id=?', [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description, this.id]);

    } else { // insert
      return db.execute('INSERT INTO home (houseName, price, location, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)', [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description]);
    }
  }

  static fetchAll() {
    return db.execute('SELECT * FROM home');
  }

  static findById(homeId) {
    return db.execute('SELECT * FROM home WHERE id=?', [homeId]);
  }

  static deleteById(homeId) {
    return db.execute('DELETE FROM home WHERE id=?', [homeId]);
  }
};
