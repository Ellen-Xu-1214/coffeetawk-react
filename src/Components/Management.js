import React, { Component } from 'react';
import { Card, Label } from 'semantic-ui-react';

class Management extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Card>
                    <Label basic size='big'>{this.props.label}</Label>
                    <div className='data-table-box' dangerouslySetInnerHTML={{__html: this.props.values.join('<br />')}}/>
                </Card>
            </div>
        );
    }
}

export default Management;