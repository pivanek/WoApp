import { GoogleSignin } from '@react-native-google-signin/google-signin';

import React from 'react';
import { Button } from 'react-native';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import auth from '../src/auth';

GoogleSignin.configure({
  webClientId: '74787447481-tho16kk7sqlh6ks1q12o4r95f9g5ul8o.apps.googleusercontent.com',
});

async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: false });
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = GoogleAuthProvider.credential(idToken);

    return signInWithCredential(auth, googleCredential).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
}