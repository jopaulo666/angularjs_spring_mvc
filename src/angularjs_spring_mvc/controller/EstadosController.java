package angularjs_spring_mvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import angularjs_spring_mvc.dao.DaoImplementacao;
import angularjs_spring_mvc.dao.DaoInterface;
import angularjs_spring_mvc.model.Estados;

@Controller
@RequestMapping(value="/estados")
public class EstadosController extends DaoImplementacao<Estados> implements 
	DaoInterface<Estados> {

	public EstadosController(Class<Estados> persistenceClass) {
		super(persistenceClass);
	}
	
	//intercepta
	@RequestMapping(value="listar", method=RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String listar() throws Exception{		
		return new Gson().toJson(super.lista());
	}

}
