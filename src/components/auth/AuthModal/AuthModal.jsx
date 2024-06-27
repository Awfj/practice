import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './AuthModal.module.css';
import { closeAuthModal } from '../../../state/app/appSlice';
import AuthForm from '../AuthForm';
import ActionButton from '../../buttons/ActionButton';
import TabButton from '../../buttons/TabButton';
import { Auth } from '../../../constants';

export default function AuthModal() {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(Auth.SIGN_IN);

    return (
        <>
            <div className={styles.backdrop}></div>
            <div className={styles.modal}>
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

                <ActionButton onClick={() => dispatch(closeAuthModal())}>Close</ActionButton>
            </div>
        </>
    );
}