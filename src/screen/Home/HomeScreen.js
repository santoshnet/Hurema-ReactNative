import React, {Component} from 'react';
import AppBar from '../../components/AppBar';
import ToolBar from '../../components/ToolBar';
import RelativeLayout from '../../components/RelativeLayout';
import Column from '../../components/Column';

class HomeScreen extends Component {
    render() {
        const {navigation} = this.props;

        return (
            <RelativeLayout>
                <Column>
                    <AppBar/>
                    <ToolBar title='' icon="menu"  onPress={() => navigation.openDrawer()}/>
                    
                </Column>
            </RelativeLayout>
        );
    }
}

export default HomeScreen;
