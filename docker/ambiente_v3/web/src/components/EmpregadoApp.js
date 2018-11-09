import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Options from './Options';
import axios from 'axios';
import EmpregadoService from '../services/EmpregadoService'

export default class EmpregadoApp extends React.Component {
  
  state = {
    options: [],
    selectedOption: undefined
  };
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };
  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => optionToRemove !== option)
    }));
  };
  handleAddOption = (option) => {
    if (!option) {
      return 'Digite um valor válido para adicionar um item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Este item já existe';
    }

    this.setState((prevState) => ({
      options: prevState.options.concat(option)
    }));
  };

  componentDidMount() {
    let empregadoService = new EmpregadoService();

    let options = empregadoService.lista()    
        
    this.setState(() => ({ options: options }))  
    

 
/* 
    axios.get('http://localhost:3000/empregados')
              .then(response => {
                  let empregados = response.data
                  let options_response = []
                    
                  for (let i = 0; i < empregados.length; i++) {                       
                    options_response.push(empregados[i].nome)  
                  }                    

                  this.setState(() => ({ options: options_response}))
               })
              .catch(error => console.log(error));          
     */

  }

  render() {
    const subtitle = 'Tela de cadastro de empregados';

    return (
      <div>
        <Header subtitle={subtitle} />
        <div className="container">         
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption
              handleAddOption={this.handleAddOption}
            />
          </div>
        </div>
      </div>
    );
  }
}
