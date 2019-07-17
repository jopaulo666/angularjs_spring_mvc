package angularjs_spring_mvc.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import angularjs_spring_mvc.dao.DaoImplementacao;
import angularjs_spring_mvc.dao.DaoInterface;
import angularjs_spring_mvc.model.Pedido;

@Controller
@RequestMapping(value="/pedido")
public class PedidoController extends DaoImplementacao<Pedido> implements DaoInterface<Pedido>{
	
	@Autowired
	private ItemPedidoController itemPedidoController;
	
	public PedidoController(Class<Pedido> persistenceClass) {
		super (persistenceClass);
	}
	
	@RequestMapping(value = "listar", method = RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String listar() throws Exception {
		return new Gson().toJson(super.lista());
	}

}
