package angularjs_spring_mvc.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import angularjs_spring_mvc.dao.DaoImplementacao;
import angularjs_spring_mvc.dao.DaoInterface;
import angularjs_spring_mvc.model.Cliente;

@Controller
@RequestMapping(value="/cliente")
public class ClienteController extends DaoImplementacao<Cliente> implements 
	DaoInterface<Cliente> {

	public ClienteController(Class<Cliente> persistenceClass) {
		super(persistenceClass);
	}
	
	//intercepta
//	@RequestMapping(value = "listar", method=RequestMethod.GET)
//	public ResponseEntity<List<Cliente>> listar(){
//		Cliente cliente = new Cliente();
//		cliente.setId(1L);
//		cliente.setNome("João Paulo Mendes");
//		cliente.setEndereco("Av Roberto Camelier");
//		cliente.setEmail("jp_cbc@hotmail.com");
//		cliente.setTelefone("91 981464025");
//		
//		List<Cliente> clientes = new ArrayList<Cliente>();
//		clientes.add(cliente);
//		return new ResponseEntity<List<Cliente>>(clientes, HttpStatus.OK);
//	}

}
