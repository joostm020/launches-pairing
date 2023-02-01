import Launch from '../Launch';

import { launchesTestData } from './Launches.testData';

import styles from './Launches.module.css';

export default function Launches() {
    return (
        <div className={styles.grid}>
            { launchesTestData.slice(0, 10).map(launch => <Launch launch={ launch } />) }
        </div>
    );
}
