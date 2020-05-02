import * as functions from 'firebase-functions';
import Stripe from 'stripe';

const mkdirp = require('mkdirp-promise');
const admin = require('firebase-admin');
const spawn = require('child-process-promise').spawn;
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const path = require('path');
const os = require('os');
const fs = require('fs');
const SERVICE_ACCOUNT = '../config/number-one-girl-firebase-adminsdk.json';
// const adminConfig = JSON.parse(process.env.FIREBASE_CONFIG);
const serviceAccount = require('../config/number-one-girl-firebase-adminsdk.json');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({keyFilename: SERVICE_ACCOUNT});

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_WIDTH = 384;

// The amount to pay for a vote in XCFA
const VOTE_PRICE = 100;

// The amount paid by contestants in XCFA
const CONTESTANT_PRICE = 5000;

//Uncomment the following line in production
// const STRIPE_SECRET_KEY = 'sk_live_vmIRAd5CWZ6n7RS11ND3fFsc';
const STRIPE_TEST_SECRET_KEY = 'sk_test_aS1UDIuM6Vla6laqLlBJ6u8y';
//const Stripe = require('stripe');
const stripe = new Stripe(STRIPE_TEST_SECRET_KEY, {
  typescript: true,
  apiVersion: "2020-03-02"
});


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://number-one-girl.firebaseio.com'
});
/*
* Utility functions...
* */
function parseName(fileName: string) {
  const file = fileName.split('.');
  return {ext: file[1], name: file[0]};
}

function generateFromVideo(file: any, tempLocalThumbFile: any) {
  return file.getSignedUrl({action: 'read', expires: '05-24-2999'}).then((signedUrl: any) => {
    const fileUrl = signedUrl[0];
    const promise = spawn(ffmpegPath, ['-ss', '0', '-i', fileUrl, '-f', 'image2', '-vframes', '1', '-vf', `scale=${THUMB_MAX_WIDTH}:-1`,
      tempLocalThumbFile]);
    // promise.childProcess.stdout.on('data', (data) => console.info('[spawn] stdout: ', data.toString()));
    // promise.childProcess.stderr.on('data', (data) => console.info('[spawn] stderr: ', data.toString()));
    return promise;
  })
}

function generateFromImage(file: any, tempLocalThumbFile: any, fileName: any) {
  const tempLocalFile = path.join(os.tmpdir(), fileName);

  // Download file from bucket.
  return file.download({destination: tempLocalFile}).then(() => {
    // tslint:disable-next-line:no-console
    console.info('The file has been downloaded to', tempLocalFile);
    // Generate a thumbnail using ImageMagick with constant width and variable height (maintains ratio)
    return spawn('convert', [tempLocalFile, '-thumbnail', THUMB_MAX_WIDTH, tempLocalThumbFile], {capture: ['stdout', 'stderr']});
  }).then(() => {
    fs.unlinkSync(tempLocalFile);
    return Promise.resolve();
  })
}
/*
* cloud functions
* */
exports.onFileUploaded = functions.storage.object().onFinalize((object: any) => {
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePathInBucket = object.name;
  const resourceState = object.resourceState; // The resourceState is 'exists' or 'not_exists' (for file/folder deletions).
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  const contentType = object.contentType; // This is the image MIME type
  const isImage = contentType.startsWith('image/');
  const isVideo = contentType.startsWith('video/');

  // Exit if this is a move or deletion event.
  if (resourceState === 'not_exists') {
    return Promise.resolve();
  }
  // Exit if file exists but is not new and is only being triggered
  // because of a metadata change.
  else if (resourceState === 'exists' && metageneration > 1) {
    return Promise.resolve();
  }
  // Exit if the image is already a thumbnail.
  else if (filePathInBucket.indexOf('.thumbnail.') !== -1) {
    return Promise.resolve();
  }
  // Exit if this is triggered on a file that is not an image or video.
  else if (!(isImage || isVideo)) {
    return Promise.resolve();
  }


  const fileDir            = path.dirname(filePathInBucket);
  const fileName           = path.basename(filePathInBucket);
  const fileInfo           = parseName(fileName);
  const thumbFileExt       = isVideo ? 'jpg' : fileInfo.ext;
  let   thumbFilePath      = path.normalize(path.join(fileDir, `${fileInfo.name}.thumbnail.${thumbFileExt}`));
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);
  const tempLocalDir       = path.join(os.tmpdir(), fileDir);
  const generateOperation  = isVideo ? generateFromVideo : generateFromImage;


  // Cloud Storage files.
  const bucket = storage.bucket(fileBucket);
  const file = bucket.file(filePathInBucket);

  const metadata = {
    contentType: isVideo ? 'image/jpeg' : contentType,
    // To enable Client-side caching you can set the Cache-Control headers here. Uncomment below.
    // 'Cache-Control': 'public,max-age=3600',
  };


  // Create the temp directory where the storage file will be downloaded.
  return mkdirp(tempLocalDir).then(() => {
    return generateOperation(file, tempLocalThumbFile, fileName);
  }).then(() => {
    // tslint:disable-next-line:no-console
    console.info('Thumbnail created at', tempLocalThumbFile);
    // Get the thumbnail dimensions
    return spawn('identify', ['-ping', '-format', '%wx%h', tempLocalThumbFile], {capture: ['stdout', 'stderr']});
  }).then((result: any) => {
    const dim = result.stdout.toString();
    const idx = thumbFilePath.indexOf('.');

    thumbFilePath = `${thumbFilePath.substring(0,idx)}_${dim}${thumbFilePath.substring(idx)}`;
    // tslint:disable-next-line:no-console
    console.info('Thumbnail dimensions:', dim);
    // Uploading the Thumbnail.
    return bucket.upload(tempLocalThumbFile, {destination: thumbFilePath, metadata});
  }).then(() => {
    // tslint:disable-next-line:no-console
    console.info('Thumbnail uploaded to Storage at', thumbFilePath);

    const thumbFilename = path.basename(thumbFilePath);

    // return updateDatabase(fileDir, fileName, thumbFilename);
    return admin.firestore().collection('episodes').doc(fileInfo.name).update({
      thumbnail: thumbFilename
    })
  }).then(() => {
    // tslint:disable-next-line:no-console
    console.info('Thumbnail generated.');

    fs.unlinkSync(tempLocalThumbFile);

    return Promise.resolve();
  })
});

const calculatePrice = function(item: string): number{
  if (item == 'vote')
    return VOTE_PRICE;
  else (item == 'contestant')
    return CONTESTANT_PRICE;
}

const generateResponse = (intent: Stripe.PaymentIntent): 
| { clientSecret: string | null, requiresAction: boolean }
| { clientSecret: string | null }
| { error: string } => {
  // Generate response based on intent's status
  switch (intent.status){
    case "requires_action":
      return {
        clientSecret: intent.client_secret,
        requiresAction: true
      };
    
    case "requires_payment_method":
      return {
        error: "Your card was denied, please provide a new payment method"
      };

    case "succeeded":
      // Payment is complete authentication is not required 
      // To cancel the payment, you will need to issue a Refund
      console.log('Payment Recieved');
      return { clientSecret: intent.client_secret}

    default: 
      return {error: "Intent status should be either 'requires_action', 'requires_payment_method' or 'succeeded'"};
  }
}

exports.createPaymentIntent = functions.https.onCall((data, context) => {
  let amount = calculatePrice(data.item);

  stripe.paymentIntents.create({
    amount: amount,
    currency: 'xaf',
    // Verify your integration in this guide by including this parameter
    metadata: {integration_check: 'accept_a_payment'},
  }).then((paymentIntent) => {
      return admin.firestore().collection('payments').doc(paymentIntent.id).set({...paymentIntent, type: data.item}).then(()=>{
        return paymentIntent.client_secret;
    });
  });

});

exports.updatePaymentIntent = functions.https.onCall((data, context) => {
  let amount = calculatePrice(data.item);

  stripe.paymentIntents.update(data.id, {amount: amount}).then((paymentIntent) => {
    return admin.firestore().collection('payments').doc(paymentIntent.id).set({...paymentIntent, type: data.item}).then(() => {
      return paymentIntent.client_secret;
    });
  });
});

exports.pay = functions.https.onCall(async (data, context) => {
  const {
    paymentMethodId,
    paymentIntentId,
    item,
    currency,
    useStripeSdk
  }: {
    paymentMethodId: string,
    paymentIntentId: string,
    item: string,
    currency: string,
    useStripeSdk: boolean
  } = data;

  const amount : number = calculatePrice(item);

  try{
    let intent: Stripe.PaymentIntent;
    if (paymentMethodId){
      const params: Stripe.PaymentIntentCreateParams = {
        amount: amount,
        confirm: true,
        confirmation_method: "manual",
        currency: currency,
        payment_method: paymentMethodId,
        use_stripe_sdk: useStripeSdk
      };

      intent = await stripe.paymentIntents.create(params);
      return generateResponse(intent);
      //After create if the paymentIntent's status is succeeded, fulfill the order
    } else if (paymentIntentId) {
      // Confirm the paymentIntent to finalize payment after handling a required action
      // on the client
      intent = await stripe.paymentIntents.confirm(paymentIntentId);
      return generateResponse(intent);
    } else {
      throw new functions.https.HttpsError("invalid-argument", "You must submit either paymentIntentId or paymentMethodId" );
    }
  } catch (e) {
    throw e;
  }
});
