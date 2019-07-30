package angularjs_spring_mvc.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

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
	
	@RequestMapping(value="salvar", method=RequestMethod.POST)
	@ResponseBody
	public ResponseEntity salvar(@RequestBody String jsonCliente) throws Exception {
		Cliente cliente = new Gson().fromJson(jsonCliente, Cliente.class);
		super.salvarOuAtualizar(cliente);
		return new ResponseEntity(HttpStatus.CREATED);
	}
	
	//intercepta
	@RequestMapping(value="listar/{numeroPagina}", method=RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public byte[] listar(@PathVariable("numeroPagina") String numeroPagina) throws Exception{		
		return new Gson().toJson(super.consultaPaginada(numeroPagina)).getBytes("UTF-8");
	}
	
	@RequestMapping(value="totalPagina", method=RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String totalPagina() throws Exception{		
		return ""+super.quantidadePagina();
	}
	
	@RequestMapping(value="deletar/{codCliente}", method=RequestMethod.DELETE)
	public @ResponseBody String deletar(@PathVariable("codCliente") String codCliente) throws Exception{
//		Cliente objeto = new Cliente();
		super.deletar(loadObjeto(Long.parseLong(codCliente)));
		return "";
	}
	
	@RequestMapping(value="buscarcliente/{codCliente}", method=RequestMethod.GET)
	public @ResponseBody byte[] buscarCliente(@PathVariable("codCliente") String codCliente) throws Exception{
		Cliente objeto = super.loadObjeto(Long.parseLong(codCliente));
		if (objeto == null) {
			return "{}".getBytes("UTF-8");
		}
		return new Gson().toJson(objeto).getBytes("UTF-8");
	}
	
	@RequestMapping(value="buscarnome/{nomeCliente}", method=RequestMethod.GET)
	public @ResponseBody String buscarNome(@PathVariable("nomeCliente") String nomeCliente) throws Exception{
		List<Cliente> clientes = new ArrayList<Cliente>();
		clientes = super.lista("nome", nomeCliente);
 		if (clientes == null || clientes.isEmpty()) {
			return "{}";
		}
		return new Gson().toJson(clientes);
	}

}
