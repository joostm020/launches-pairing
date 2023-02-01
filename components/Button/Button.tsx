import styles from './Button.module.css';

export default function Button(props: {
    onClick?: (event: React.MouseEvent<HTMLElement>) => void,
    children?: React.ReactNode
}) {
    const {
        children,
        ...filteredAttributes
    } = props;

    const attributes = {
        ...filteredAttributes
    };

    return <button className={ styles.button } { ...attributes }>{ props.children }</button>;
}
