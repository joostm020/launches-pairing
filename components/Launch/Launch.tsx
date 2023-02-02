import Image from 'next/image';

import { LaunchType } from '../../types/Launches/Launches.type';

import styles from './Launch.module.css';

export default function Launch(props: {
    launch: LaunchType
}) {
    const {
        launch: {
            name,
            date_utc,
            cores: [
                firstCore
            ],
            payloads,
            links: {
                patch: {
                    small: smallImage
                }
            },
            success,
            failures
        }
    } = props;

    const { core: firstCoreSerialName } = firstCore;

    const renderPayloads = () => {
        if (!payloads.length) {
            return <span data-testid='launch-payloads'>None</span>;
        }

        return (
            <ul data-testid='launch-payloads'>
                { Array.prototype.map.call(payloads, (payload, key) => <li key={ key }>{ payload }</li>) }
            </ul>
        );
    }

    const renderImage = () => {
        if (!smallImage) {
            return null;
        }

        return (
            <Image
                data-testid='launch-image'
                className={ styles.image }
                src={ smallImage }
                alt={ `${name} logo` }
                width="256"
                height="256"
            />
        );
    };

    const renderFailuresList = () => {
        if (!failures.length) {
            return null;
        }

        return (
            <ul data-testid='launch-failures-list' className={ styles.failuresList }>
                { Array.prototype.map.call(failures, (failure, key) => <li key={ key }>{ failure.reason }</li>) }
            </ul>
        )
    };

    const renderStatus = () => {
        if (success) {
            return (
                <div data-testid='launch-succeeded' className={ styles.success }>
                    <div>SUCCEEDED</div>
                </div>
            )
        }

        return (
            <div data-testid='launch-failed' className={ styles.failure }>
                <div>FAILED</div>
            </div>
        );
    };

    const getCardClasses = () => {
        const cardClasses = [
            styles.card,
        ]

        success ? cardClasses.push(styles.cardSuccess) : cardClasses.push(styles.cardFailure);

        return cardClasses.join(' ');
    };

    return ( // className={styles.card}
        <div data-testid='launch' className={ getCardClasses() }>
            <h2 data-testid='launch-name' className={ styles.name }>{ name || 'Unknown' }</h2>
            <div className={ styles.date }>
                <strong>Launch date</strong>
                <span data-testid='launch-date'>{ date_utc || 'Not specified' }</span>
            </div>
            <div className={ styles.firstCoreSerialName }>
                <strong>First core serial</strong>
                <span data-testid='launch-first-core-serial'>{ firstCoreSerialName || 'n/a' }</span>
            </div>
            <div className={ styles.payloads }>
                <strong>Payloads</strong>
                { renderPayloads() }
            </div>
            { renderImage() }
            { renderFailuresList() }
            { renderStatus() }
        </div>
    );
}
