package br.acme.domain;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Stateless
public class EmpregadoBeanImpl implements EmpregadoBean {
	
	@PersistenceContext
    private EntityManager manager;

    public void inserir(Empregado empregado) {    	
        manager.persist(empregado);
    }

	@Override
	public Empregado buscar(Long id) {		
		return manager.find(Empregado.class, id);
	}

	@Override
	public List<Empregado> listar() {
		
		return manager.createQuery("SELECT e FROM Empregado e").getResultList();		
		
	}

	@Override
	public void remover(Long id) {
		Empregado empregado = manager.find(Empregado.class, id);
		manager.remove(empregado);		
		
	}

}
