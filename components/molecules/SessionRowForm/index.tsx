import React from 'react';
import {Row, Col, RowProps} from 'antd';

type SessionRowFormProps = {
    readonly rowProps : RowProps;
    readonly items : Array<{span?: number, content: any }>
};

const SessionRowForm: React.FC<SessionRowFormProps> = ({rowProps, items}) => {
    return <Row {...rowProps}>
    {
        items.map((item: any, idx: number) =>
            <Col span={item['span']} key={idx}>
                {item['content']}
            </Col>)
    }
</Row>
};

export default SessionRowForm;
