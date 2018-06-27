import './HomeLayout_1.css';
import React from 'react';
import Card from '../../../components/UI/Card/Card';
import Widget from '../../../hoc/Widget';

const HomeLayout_1 = (props) => {
    return (
        <div className="rw-home-1">

            {props.top && (
                <div className="rw-home-1__top">
                    {props.top.map(widget => {
                        return (
                            <div className={['rw-home-1__top-item', widget.id].join(' ')} key={widget.id}>
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
            )}

            <div className="ps-container">
                <div className="rw-home-1__middle">
                    <div className="rw-home-1__sidebar">
                        {props.sidebar.map(widget => {
                            return (
                                <div className={['rw-home-1__sidebar-item', widget.id].join(' ')} key={widget.id}>
                                    <Widget
                                        {...widget}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="rw-home-1__main">

                    </div>
                </div>
            </div>

            <div className="rw-home-1__bottom">

            </div>

        </div>
    );
};

export default HomeLayout_1;