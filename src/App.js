import React, { Component } from 'react';
import { Statistic, Header, Segment, Form, Grid, Divider, Button} from 'semantic-ui-react';
import './App.css'

import Management from './Components/Management';

// function for changing seconds to min:sec

const formattedSeconds = (sec) =>
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)


class App extends Component {
    
    state = { 
    baristas: '', 
    beverage: '', 

    Baristas: '', 
    Beverage: '', 

    records: {
        baristas: [],
        beverage: [],
    },

    time: 0,
    log: [],
  }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    //submit inputs
    handleSubmit = () => {
        const { baristas, beverage } = this.state
    
        this.setState({ Baristas: baristas, Beverage: beverage })
    }

    // Push one element into the array of data collection
    // Also clear the input and time display for next sample
    handleSave = e => {
      e.preventDefault();

      if (!this.state.baristas || !this.state.beverage) {
          return;
      }

      this.state.records.baristas.push(this.state.baristas);
      this.state.records.beverage.push(this.state.beverage);

      this.setState(() => ({
          baristas: "",
          beverage: ""
      }));

      this.setState({time:0});
  }

  // The following three funcitons are for stopwatch running
  handleStart = () => {
    this.timer = setInterval(() => {
      this.setState({time: ++this.state.time})
    }, 1000)
  }

  // The end time is processed and pushed to the array of average pick-up time
  handleEnd = () => {
    clearInterval(this.timer);
    this.state.log.push(this.state.time / this.state.beverage);
    console.log(this.state.time + 's');
  }


  handleReset =  ()=> {
    this.setState({time:0});
    clearInterval(this.timer);
  }

    render() { 
        const { baristas, beverage } = this.state

        return (
        
        <div className='App'>

        {/*Header for Data Collection*/}
            <Segment padded basic >
            <Header as='h1'>
                <Statistic  value='1'/>
                <Header.Content>
                Data Collection
                <Header.Subheader>Add Customer Samples</Header.Subheader>
                </Header.Content>
            </Header>
            </Segment>

            <Segment basic>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group widths='equal'>
                    <Form.Field padded>
                        <Header className='left'>Number of Baristas</Header>
                        <Form.Input
                        className='halfWidth'
                        icon='grey user'
                        name='baristas'
                        value={baristas}
                        onChange={this.handleChange}
                        />
                    </Form.Field>
                
                    <Form.Field >
                        <Header className='left'>Number of Beverages</Header>
                        <Form.Input
                        className='halfWidth'  
                        icon='grey coffee'
                        name='beverage'
                        value={beverage}
                        onChange={this.handleChange}
                        />
                    </Form.Field>
                </Form.Group>
                <Segment padded basic>
                    <Header size='medium'>
                    Record Pick-up Time
                    <Header.Subheader>
                    From getting the receipt to picking up beverages
                    </Header.Subheader>
                    </Header>
                </Segment>
            
          <Grid container columns={3}>
          <Grid.Column>
            <Button circular color='orange' size='large' onClick={this.handleStart}>Start</Button>
          </Grid.Column>
          <Grid.Column>
            <Button circular inverted secondary size='large' onClick={this.handleReset}>Reset</Button>
          </Grid.Column>
          <Grid.Column>
            <Button circular color='violet' size='large' onClick={this.handleEnd}>Stop</Button>
          </Grid.Column>
          </Grid>
          <br/>
          <h1 className="stopwatch-timer">{formattedSeconds(this.state.time)}</h1>
          <br/><br/>

                <Form.Button 
                    basic 
                    color='violet' 
                    size='large'
                    onClick={this.handleSave}>
                    Save and Add another sample
                </Form.Button>
            </Form>
            </Segment>

            <Divider/>
            <Segment padded basic >
            <Header as='h1'>
                <Statistic  value='2'/>
                <Header.Content>
                Data Table
                <Header.Subheader>Check Data Collected</Header.Subheader>
                </Header.Content>
            </Header>
            </Segment>

          <Grid className='centeredgrid'>
            <Grid.Column width={7}>
              <Management label="Number of Baristas:" values={this.state.records.baristas}/> 
            </Grid.Column>
            <Grid.Column width={7}>
              <Management label="Average Pick-up Time (sec):" values={this.state.log}/>
            </Grid.Column>
          </Grid>

        </div>
        );
    }
}

export default App;
