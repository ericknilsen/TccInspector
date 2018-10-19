package br.acme.domain;

import java.util.List;

public interface EmpregadoBean {

	public Empregado buscar(Long id);
	
	public void inserir(Empregado empregado);
	
	public void remover(Long id);
	
	public List<Empregado> listar();

}
