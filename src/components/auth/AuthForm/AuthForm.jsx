import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import styles from './AuthForm.module.css';
import { User, KeyRound } from 'lucide-react';
import ActionButton from '../../buttons/ActionButton';
import { signIn, signUp } from '../../../state/auth/authActions';
import { resetError } from '../../../state/auth/authSlice';
import { closeAuthModal } from '../../../state/app/appSlice';
import { Auth } from '@/constants';

export default function AuthForm({ type }) {
    const dispatch = useDispatch();
    const { isAuthenticating, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            await dispatch(signIn({ email, password })).unwrap();
            dispatch(closeAuthModal());
        } catch (error) {
            console.error('Sign in failed:', error);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await dispatch(signUp({ email, password })).unwrap();
            setSuccessMessage("Account created successfully. You've been signed in.");
        } catch (error) {
            console.error('Sign up failed:', error);
        }
    };

    useEffect(() => {
        dispatch(resetError());
        setSuccessMessage('');
        setEmail('');
        setPassword('');
    }, [type, dispatch]);

    return (
        <form className={styles.form} onSubmit={type === Auth.SIGN_IN ? handleSignIn : handleSignUp}>
            <div className={styles.input_fields}>
                <div className={styles.input_group}>
                    <User />
                    <input
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
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Password'
                        required
                        autoComplete={type === Auth.SIGN_IN ? "current-password" : "new-password"}
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}
                {successMessage && <p className={styles.success_message}>{successMessage}</p>}
            </div>

            <ActionButton disabled={isAuthenticating} type="submit">{type}</ActionButton>
        </form>
    )
}

AuthForm.propTypes = {
    type: PropTypes.string.isRequired,
};