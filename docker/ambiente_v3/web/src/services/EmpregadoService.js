import axios from 'axios';

export default class EmpregadoService {

    API = 'http://localhost:3000/empregados'
    empregados = []
    options = []     

    lista() {        
        axios.get(this.API)
            .then(response => {               
                this.empregados = response.data                
                            
                 for (let i = 0; i < this.empregados.length; i++) {                       
                    this.options.push(this.empregados[i].nome)  
                } 

                

                console.log(this.options)
               
            })
            .catch(error => console.log(error));  

           
        return this.options;    
    }
}