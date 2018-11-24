import './Home.scss';
import React from 'react';

const Home = (props) => {
    return (
        <div className="rw-home-1">

            {props.top && (
                <div className="rw-home-1__top">
                    {props.top.map(widget => {
                        return (
                            <div className="rw-home-1__top-item" key={widget.id}>
                                <div className="ps-container">
                                    Section Primary
                                    {/*<SectionPrimary title={widget.title}>
                                        <Widget
                                            {...widget}
                                        />
                                    </SectionPrimary>*/}
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
                                    <div className="rw-home-1__sidebar-item" key={widget.id}>
                                        Section Sidebar
                                       {/* <SectionSidebar title={widget.title}>
                                            <Widget
                                                {...widget}
                                            />
                                        </SectionSidebar>*/}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                    {props.main && (
                        <div className="rw-home-1__main">
                            {props.main.map(widget => {
                                return (
                                    <div className="rw-home-1__main-item" key={widget.id}>
                                        Sectoin Primary
                                        {/*<SectionPrimary title={widget.title}>
                                            <Widget
                                                {...widget}
                                            />
                                        </SectionPrimary>*/}
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

export default Home;