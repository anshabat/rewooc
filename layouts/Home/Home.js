import './Home.scss';
import React from 'react';
import SectionPrimary from '../../components/UI/sections/SectionPrimary/SectionPrimary';
import SectionSidebar from '../../components/UI/sections/SectionSidebar/SectionSidebar';
import Widget from '../../components/Widget/Widget';

const Home = (props) => {
    return (
        <div className="rw-home">

            {props.top && (
                <div className="rw-home__top">
                    {props.top.map(widget => {
                        return (
                            <div className="rw-home__top-item" key={widget.id}>
                                <div className="rw-home__container">
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

            <div className="rw-home__container">
                <div className="rw-home__middle">
                    {props.sidebar && (
                        <div className="rw-home__sidebar">
                            {props.sidebar.map(widget => {
                                return (
                                    <div className="rw-home__sidebar-item" key={widget.id}>
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
                        <div className="rw-home__main">
                            {props.main.map(widget => {
                                return (
                                    <div className="rw-home__main-item" key={widget.id}>
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

            <div className="rw-home__bottom">

            </div>

        </div>
    );
};

export default Home;