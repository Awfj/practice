import { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './AuthModal.module.css';

import AuthForm from '@/components/auth/AuthForm';
import ActionButton from '@/components/buttons/ActionButton';
import TabButton from '@/components/buttons/TabButton';
import { Auth } from '@/constants';
import { closeAuthModal } from '@/state/app/appSlice';

export default function AuthModal() {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(Auth.SIGN_IN);

    return (
        <>
            <div className={styles.backdrop}></div>
            <div data-testid="auth-modal" className={styles.modal}>
                <div className={styles.tabs}>
                    {[Auth.SIGN_IN, Auth.SIGN_UP].map((authType) => (
                        <TabButton
                            key={authType}
                            name={authType}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    ))}
                </div>

                <div className={styles.tabContent}>
                    <AuthForm type={activeTab} />
                </div>

                <ActionButton data-testid="auth-close-btn" onClick={() => dispatch(closeAuthModal())}>Close</ActionButton>
            </div>
        </>
    );
}