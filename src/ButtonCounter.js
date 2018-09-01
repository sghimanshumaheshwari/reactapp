import React,{Component} from 'react';

class Button extends React.Component{
  
    handleButtonClick=()=>{
        this.props.clickFunction(this.props.incrementValue);
    };
    
    render(){
        return(
              <button onClick={this.handleButtonClick}>
              +{this.props.incrementValue}
              </button>
        );
    }; //end render
  };
  
  const Result=(props)=>{
    return(
        <div>{props.counterResult}</div>
    );
  };
  
  class ButtonCounter extends React.Component{
          constructor(props){
          super(props);
        this.state={counter:0};
      }
      handleClick=(incrementBy)=>{
        this.setState((prevState)=>{
          return({counter:prevState.counter+incrementBy});
      
      });
    
    };
  
          render(){
              return(
              <div style={{marginTop:20, marginLeft:20}}>
                <Button clickFunction={this.handleClick} incrementValue={1} />
                <Button clickFunction={this.handleClick} incrementValue={5} />
                <Button clickFunction={this.handleClick} incrementValue={10} />
                <Result counterResult={this.state.counter} />
              </div>
          );
      };
  };
  
  export default ButtonCounter;