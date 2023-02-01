import { useEffect, useState } from 'react';

import Launch from '../Launch';
import Button from '../Button';

import { LAUNCHES_API_URL } from './Launches.config';
import { LaunchesType, LaunchType } from '../../types/Launches/Launches.type';

import styles from './Launches.module.css';

export default function Launches() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [launches, setLaunches] = useState<LaunchesType>([]);

    useEffect(() => {
        requestLaunches();
    }, []);

    async function getData() {
        const res = await fetch(LAUNCHES_API_URL);

        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }

        return res.json();
    }

    const requestLaunches = async () => {
        setError('');
        setIsLoading(true);

        try {
            const data: LaunchesType = await getData();
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
