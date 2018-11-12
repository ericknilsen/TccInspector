import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Options from './Options';
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
    this.removeEmpregado(optionToRemove)
  };
  
  handleAddOption = (option) => {
    if (!option) {
      return 'Digite um valor válido para adicionar um item';
    } else if (this.state.options.indexOf(option) > -1) {
      return 'Este item já existe';
    }      

    this.adicionaEmpregado(option)
  };

  removeEmpregado(empregadoId) {
    EmpregadoService.remove(empregadoId)
      .then(() => {
        this.listaEmpregados()
      })
      .catch(error => console.log(error))
  }

  adicionaEmpregado(nomeEmpregado) {
    let empregado = {}
    empregado.nome = nomeEmpregado   
    
    EmpregadoService.adiciona(empregado)
      .then(() => {
        this.listaEmpregados();
      })
      .catch(error => console.log(error))   
  }

  listaEmpregados() {
    EmpregadoService.lista()
      .then(response => {
        let empregados = response.data  
        this.setState(() => ({ options: empregados }))
      })
      .catch(error => console.log(error));
  }

  componentDidMount() {
    this.listaEmpregados();    
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
