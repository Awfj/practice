/**
 * Formats Firebase error messages for display.
 * @param {string} firebaseError - The error message from Firebase.
 * @returns {string} - The formatted error message.
 */
export default function formatFirebaseError(firebaseError) {

    if (typeof firebaseError !== 'string' || !firebaseError) {
        return 'An unknown error occurred.';
    }

    const errorCodeMatch = firebaseError.match(/\(auth\/(.+)\)/);
    if (!errorCodeMatch) {
        return firebaseError;
    }

    const errorCode = errorCodeMatch[1];

    switch (errorCode) {
        case 'invalid-email':
            return 'The email address is not valid.';
        case 'weak-password':
            return 'The password is too weak. It should be at least 6 characters.';
        case 'user-disabled':
            return 'This user has been disabled.';
        case 'user-not-found':
            return 'No user found with this email.';
        case 'wrong-password':
            return 'Incorrect password. Please try again.';
        case 'email-already-in-use':
            return 'This email is already in use by another account.';
        case 'operation-not-allowed':
            return 'This operation is not allowed. Please contact support.';
        case 'too-many-requests':
            return 'We have detected too many requests from your device. Please try again later.';
        case 'invalid-credential':
            return 'The provided credential is invalid. Please try again.';
        default:
            return `An error occurred: ${firebaseError}`;
    }
}