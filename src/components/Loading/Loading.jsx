import { LoaderPinwheel } from 'lucide-react';
import PropTypes from 'prop-types';

import styles from './Loading.module.css';

import { Placement } from '@/constants';


export default function Loading({ placement }) {

    let placementClassName;
    switch (placement) {
        case Placement.TOP:
            placementClassName = styles.container_top;
            break;
        case Placement.BOTTOM:
            placementClassName = styles.container_bottom;
            break;
        default:
            placementClassName = styles.container_center;
    }

    return (
        <div className={`${placementClassName}`}>
            <LoaderPinwheel className={styles.loading} />
        </div>
    )
}

Loading.propTypes = {
    placement: PropTypes.oneOf([Placement.TOP, Placement.CENTER, Placement.BOTTOM]),
};