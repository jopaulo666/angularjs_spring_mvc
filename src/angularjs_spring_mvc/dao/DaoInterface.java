package angularjs_spring_mvc.dao;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// Implementação dos metodos padrões da interface de acesso ao banco e operações
@Transactional(noRollbackFor = Exception.class)
@Service
public interface DaoInterface<T> {

	void salvar (T objeto) throws Exception;
	
	void deletar (T objeto) throws Exception;
	
	void atualizar (T objeto) throws Exception;
	
	void salvarOuAtualizar (T objeto) throws Exception;
	
	T merge (T objeto) throws Exception;
	
	List<T> lista() throws Exception;
	
	List<T> lista(String ids) throws Exception;
	
	T loadObjeto(Long codigo) throws Exception;
	
	int quantidadePagina() throws Exception;
	
	List<T> consultaPaginada(String numeroPagina) throws Exception;
}
