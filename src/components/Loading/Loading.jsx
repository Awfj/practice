import PropTypes from 'prop-types';

import styles from './Loading.module.css';

import { Placement } from '@/constants';


export default function Loading({ placement }) {

    let placementClassName;
    switch (placement) {
        case Placement.TOP:
            placementClassName = styles.loading_top;
            break;
        case Placement.BOTTOM:
            placementClassName = styles.loading_bottom;
            break;
        default:
            placementClassName = styles.loading_center;
    }

    return (
        <div className={`${styles.loading} ${placementClassName}`}>Loading...</div>
    )
}

Loading.propTypes = {
    placement: PropTypes.oneOf([Placement.TOP, Placement.CENTER, Placement.BOTTOM]),
};