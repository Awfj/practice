import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { KeyRound, User } from 'lucide-react';
import PropTypes from 'prop-types';

import styles from './AuthForm.module.css';

import ActionButton from '@/components/buttons/ActionButton';
import { Auth } from '@/constants';
import { closeAuthModal } from '@/state/app/appSlice';
import { signIn, signUp } from '@/state/auth/authActions';
import { resetError, userIsLoggedIn } from '@/state/auth/authSlice';
import formatFirebaseError from '@/utils/formatFirebaseError';

export default function AuthForm({ type }) {
    const dispatch = useDispatch();
    const { isAuthenticating, error } = useSelector((state) => state.auth);
    const isLoggedIn = useSelector(userIsLoggedIn);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = (e) => {
        e.preventDefault();
        dispatch(signIn({ email, password }));
    };

    const handleSignUp = (e) => {
        e.preventDefault();
        dispatch(signUp({ email, password }));
    };

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(closeAuthModal());
        }
    }, [dispatch, isLoggedIn]);

    useEffect(() => {
        dispatch(resetError());
        setEmail('');
        setPassword('');
    }, [type, dispatch]);

    useEffect(() => {
        dispatch(resetError());
    }, [email, dispatch]);

    useEffect(() => {
        dispatch(resetError());
    }, [password, dispatch]);

    return (
        <form className={styles.form} onSubmit={type === Auth.SIGN_IN ? handleSignIn : handleSignUp}>
            <div className={styles.input_fields}>
                <div className={styles.input_group}>
                    <User />
                    <input
                        data-testid="email-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email Address'
                        required
                        autoComplete="email"
                    />
                </div>

                <div className={styles.input_group}>
                    <KeyRound />
                    <input
                        data-testid="password-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                        autoComplete={type === Auth.SIGN_IN ? "current-password" : "new-password"}
                    />
                </div>

                {error && <p className={styles.error}>{formatFirebaseError(error)}</p>}
            </div>

            <ActionButton
                data-testid={`sign-${type === Auth.SIGN_IN ? 'in' : 'up'}-btn`}
                disabled={isAuthenticating}
                type="submit">
                {type}
            </ActionButton>
        </form>
    )
}

AuthForm.propTypes = {
    type: PropTypes.string.isRequired,
};