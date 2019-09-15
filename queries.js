/* Add all the required libraries*/

var fs = require('fs'),
    mongoose = require('mongoose'), 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/

mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);


/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
  Listing.findOne({ code: 'LBW' }, (err, doc) => {
    if(err) throw err;
    console.log('Found Library West:\n', doc);
  })
};

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  Listing.findOne({ code: 'CABL' }, (err, doc) => {
    if(err)
      throw err;
    else if(doc == null){
      console.log('No CABL to remove');
      return;
    }

    console.log('Found CABL:\n', doc);

    doc.remove((err) =>{
      if(err) throw err;
      console.log('Successfully removed CABL');
    })
  })
};

var updatePhelpsLab = function() {
  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
    
    Correct Address: 1953 Museum Rd, Gainesville, FL 32603

   */
  let correctAddr = '1953 Museum Rd, Gainesville, FL 32603';
  Listing.findOneAndUpdate({ code: 'PHL' }, { address: correctAddr }, (err, doc) => {
    if(err) throw err;
    console.log('Updated Phelps Lab address to', correctAddr+'\n', doc);
  })
};

var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
  Listing.find((err, docs) => {
    if (err) throw err;
    console.log('All listings('+docs.length+'):', docs);
  });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
