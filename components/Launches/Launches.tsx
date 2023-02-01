import { useEffect, useState } from 'react';

import Launch from '../Launch';
import Button from '../Button';

import { SPACEXDATA_API_V5_LAUNCHES } from './Launches.config';
import { LaunchesType, LaunchType } from '../../types/Launches/Launches.type';

import styles from './Launches.module.css';

export default function Launches() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [launches, setLaunches] = useState<LaunchesType>([]);

    useEffect(() => {
        requestLaunches();
    }, []);

    const requestLaunches = async () => {
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(SPACEXDATA_API_V5_LAUNCHES);
            const data: LaunchesType = await response.json();
            setLaunches(data);
            setIsLoading(false);
        } catch (responseError) {
            setError(responseError.message);
            setIsLoading(false);
        }
    }

    if (error) {
        return (
            <div className={ styles.error }>
                <h2>Oops, something went wrong!</h2>
                <p>Error: { error }</p>
                <Button onClick={ requestLaunches }>Try loading again</Button>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className={ styles.loading }>
                <div className={ styles.loadingSpinner }></div>
                <p>Loading launch data...</p>
            </div>
        );
    }

    if (!launches.length) {
        return (
            <div className={ styles.empty }>
                <p>No launch data to show, empty result.</p>
            </div>
        );
    }

    return (
        <div className={ styles.grid }>
            { launches.slice(0, 10).map((launch: LaunchType, key) => <Launch key={ key } launch={ launch } />) }
        </div>
    );
}
