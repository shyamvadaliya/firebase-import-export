// Firebase collection backup to local machine
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config.js');
const serviceAccount = require('./serviceAccount.json');
var fs = require('fs');
console.log('serviceAccount', serviceAccount)
console.log('firebaseConfig', firebaseConfig)
// Firestore to export
const backup = async () => {
  try {
    
    var collectionName = 'users'; // Collection Name
    var outputFilename = collectionName+'.json';
    console.log('The output file name ' + outputFilename);

    console.log('Initialzing Firebase');
    await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
    console.log('Firebase Initialized');


    var results = await firestoreService.backup(collectionName).then((data) => JSON.stringify(data, null, 4));

    fs.writeFile(outputFilename, results, function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('The output saved to : ' + outputFilename);
    }); 
  }
  catch (error) {
    console.log(error);
  }
};

backup();