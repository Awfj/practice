import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword, doSignOut } from "@/firebase/auth";
import { auth, db } from '@/firebase/firebaseConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const restoreAuthState = createAsyncThunk(
    'auth/restoreAuthState',
    async (_, { dispatch }) => {
        return new Promise((resolve, reject) => {
            const unsubscribe = onAuthStateChanged(auth, user => {
                if (user) {
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    };
                    dispatch(signIn.fulfilled(userData));
                    resolve(userData);
                } else {
                    dispatch(signOut.fulfilled({}));
                    resolve({});
                }
                unsubscribe();
            }, reject);
        });
    }
);

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