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
            return <span>None</span>;
        }

        return (
            <ul>
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
            <ul className={ styles.failuresList }>
                { Array.prototype.map.call(failures, (failure, key) => <li key={ key }>{ failure.reason }</li>) }
            </ul>
        )
    };

    const renderStatus = () => {
        if (success) {
            return (
                <div className={ styles.success }>
                    <span>SUCCEEDED</span>
                </div>
            )
        }

        return (
            <div className={ styles.failure }>
                <span>FAILED</span>
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
        <div className={ getCardClasses() }>
            <h2 className={ styles.name }>{ name }</h2>
            <div className={ styles.date }>
                <strong>Date</strong>
                <span>{ date_utc }</span>
            </div>
            <div className={ styles.firstCoreSerialName }>
                <strong>First core serial</strong>
                <span>{ firstCoreSerialName }</span>
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
