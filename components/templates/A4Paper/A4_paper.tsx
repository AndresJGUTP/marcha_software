import React, {ReactNode, forwardRef} from 'react';
import styles from './style.module.css';

export interface IA4PaperProps {
    children : ReactNode,
    ref : any
}

const A4Paper: React.FC<IA4PaperProps> = forwardRef( (props, ref : React.LegacyRef<HTMLDivElement>) => {
    return(
    <div className={styles.paperParent}>
        <div className={styles.paperPrint} ref={ref}>
            {props.children}
        </div>
    </div>
    )
})

A4Paper.displayName = 'A4Paper';

export default A4Paper;