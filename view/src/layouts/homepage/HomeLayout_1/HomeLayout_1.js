import './HomeLayout_1.css';
import React from 'react';
import Widget from '../../../hoc/Widget';
import SectionSidebar from '../../../components/UI/sections/SectionSidebar/SectionSidebar';
import SectionPrimary from '../../../components/UI/sections/SectionPrimary/SectionPrimary';

const HomeLayout_1 = (props) => {
    return (
        <div className="rw-home-1">

            {props.top && (
                <div className="rw-home-1__top">
                    {props.top.map(widget => {
                        return (
                            <div className={['rw-home-1__top-item', widget.id].join(' ')} key={widget.id}>
                                <div className="ps-container">
                                    <SectionPrimary title={widget.title}>
                                        <Widget
                                            {...widget}
                                        />
                                    </SectionPrimary>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            <div className="ps-container">
                <div className="rw-home-1__middle">
                    {props.sidebar && (
                        <div className="rw-home-1__sidebar">
                            {props.sidebar.map(widget => {
                                return (
                                    <div className={['rw-home-1__sidebar-item', widget.id].join(' ')} key={widget.id}>
                                        <SectionSidebar title={widget.title}>
                                            <Widget
                                                {...widget}
                                            />
                                        </SectionSidebar>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {props.main && (
                        <div className="rw-home-1__main">
                            {props.main.map(widget => {
                                return (
                                    <div className={['rw-home-1__main-item', widget.id].join(' ')} key={widget.id}>
                                        <SectionPrimary title={widget.title}>
                                            <Widget
                                                {...widget}
                                            />
                                        </SectionPrimary>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>

            <div className="rw-home-1__bottom">

            </div>

        </div>
    );
};

export default HomeLayout_1;