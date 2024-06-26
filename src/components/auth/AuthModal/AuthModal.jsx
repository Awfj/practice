import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './AuthModal.module.css';
import { closeAuthModal } from '../../../state/app/appSlice';
import AuthForm from '../AuthForm';
import ActionButton from '../../buttons/ActionButton';
import TabButton from '../../buttons/TabButton';

export default function AuthModal() {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState('Sign In');

    return (
        <>
            <div className={styles.backdrop}></div>
            <div className={styles.modal}>
                <div className={styles.tabs}>
                    <TabButton name="Sign In" activeTab={activeTab} setActiveTab={setActiveTab} />
                    <TabButton name="Sign Up" activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                <div className={styles.tabContent}>
                    <AuthForm type={activeTab === 'Sign In' ? 'Sign In' : 'Sign Up'} />
                </div>

                <ActionButton onClick={() => dispatch(closeAuthModal())}>Close</ActionButton>
            </div>
        </>
    );
}