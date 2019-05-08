import './Home.scss';
import React, {Component} from 'react';
import SectionPrimary from '../../components/UI/sections/SectionPrimary/SectionPrimary';
import SectionSidebar from '../../components/UI/sections/SectionSidebar/SectionSidebar';
import Widget from '../../components/Widget/Widget';
import axios from 'axios';

class Home extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            appData: null
        }
    }
    
    componentDidMount() {
        axios.get('http://rewooc.loc/server/wp').then(({data}) => {
            this.setState({
                appData: data
            });
        })
    }

    render() {
        return this.state.appData ? (
            <div className="rw-home">
                <div className="rw-home__container">
                    <div className="rw-home__middle">
                        {this.state.appData.widgets.homepage_sidebar && (
                            <div className="rw-home__sidebar">
                                {this.state.appData.widgets.homepage_sidebar.map(widget => {
                                    return (
                                        <div className="rw-home__sidebar-item" key={widget.id}>
                                            <SectionSidebar title={widget.title}>
                                                <Widget
                                                    {...widget}
                                                    onAddToCart={this.props.onAddToCart}
                                                />
                                            </SectionSidebar>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                        {this.state.appData.widgets.homepage_main && (
                            <div className="rw-home__main">
                                {this.state.appData.widgets.homepage_main.map(widget => {
                                    return (
                                        <div className="rw-home__main-item" key={widget.id}>
                                            <SectionPrimary title={widget.title}>
                                                <Widget
                                                    {...widget}
                                                    onAddToCart={this.props.onAddToCart}
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
        ) : (
            <div>Loading home...</div>
        );
    }
}

export default Home;