// Restore
const firestoreService = require('firestore-export-import');
const firebaseConfig = require('./config.js');
const serviceAccount = require('./serviceAccount.json');

// JSON To Firestore
const restore = async () => {
  try {
    // if (process.argv.length <= 2) {
    //   console.log('Usage : ' + process.argv[0] + ' ' + process.argv[1] + ' ' + 'json_file');
    //   process.exit(1)
    // }
    const collectionName = 'users';
    var inputFilename = collectionName + '.json';
    console.log('The input file name ' + inputFilename);

    console.log('Initialzing Firebase');
    await firestoreService.initializeApp(serviceAccount, firebaseConfig.databaseURL);
    console.log('Firebase Initialized');

    await firestoreService.restore(inputFilename);
    console.log('Upload Success for ' + inputFilename);
  }
  catch (error) {
    console.log(error);
  }
};

restore();
