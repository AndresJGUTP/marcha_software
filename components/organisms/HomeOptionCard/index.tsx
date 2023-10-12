import React, { ReactElement } from 'react';
import styles from './style.module.css';
import { Card, Typography } from 'antd'
import { useRouter } from 'next/router';

const { Title } = Typography;
const { Meta } = Card;

interface HomeOptionCardProps {
    readonly cardTitle: string;
    readonly content: ReactElement
}

const HomeOptionCard: React.FC<HomeOptionCardProps> = ({cardTitle, content}) => {
    const router = useRouter();

    return (
        <>
            <div className={styles.OptionCard}>
                <div className={styles.OptionCard_Title}>
                    <Title level={3}> {cardTitle} </Title>
                </div>
                <div className={styles.OptionCard_Content}>
                    {content}
                </div>
            </div>
        </>
    );
};

export default HomeOptionCard;
