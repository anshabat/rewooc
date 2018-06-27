import './HomeLayout_1.css';
import React from 'react';
import Card from '../../../components/UI/Card/Card';
import Widget from '../../../hoc/Widget';

const HomeLayout_1 = (props) => {
    return (
        <div className="rwl-home-1">
            {props.widgets.map(widget => {
                return (
                    <div className={['rwl-home-1__widget', widget.id].join(' ')} key={widget.id}>
                        <div className="ps-container">
                            <Card title={widget.title}>
                                <Widget
                                    {...widget}
                                    onAddToCart={props.onAddToCart}
                                />
                            </Card>
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default HomeLayout_1;