import { createAsyncThunk } from '@reduxjs/toolkit';
import { doSignInWithEmailAndPassword, doCreateUserWithEmailAndPassword, doSignOut } from "../../firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';

export const signIn = createAsyncThunk(
    'auth/signIn',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await doSignInWithEmailAndPassword(email, password);
            const userData = {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
            };
            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signUp = createAsyncThunk(
    'auth/signUp',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredential = await doCreateUserWithEmailAndPassword(email, password);
            const userData = {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
            };

            const userRef = doc(db, 'users', userData.uid);
            await setDoc(userRef, { email: userData.email }, { merge: true });

            return userData;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const signOut = createAsyncThunk(
    'auth/signOut',
    async (_, { rejectWithValue }) => {
        try {
            await doSignOut();
            return {};
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);