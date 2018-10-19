package br.acme.resources;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;

import br.acme.domain.Empregado;
import br.acme.domain.EmpregadoBean;

@Stateless
@Path("/empregado")
public class EmpregadoService {

    @EJB
    private EmpregadoBean empregadoBean;
   
    @Path("{id}")
    @GET
    @Produces("application/json")
    public Empregado buscar(@PathParam("id") Long id) {
        return empregadoBean.buscar(id);
        
    }
    
    @GET
    @Produces("application/json")
    public List<Empregado> buscar() {
        return empregadoBean.listar();
        
    }
    
    @POST
	@Consumes("application/json")	
	public void insere(Empregado empregado) {
    	empregadoBean.inserir(empregado);    	
		
	}
    	
    @Path("{id}")
    @DELETE
    @Produces("text/plain")
    public void remove(@PathParam("id") Long id) {
    	empregadoBean.remover(id);
    }


}