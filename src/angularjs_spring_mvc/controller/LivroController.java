package angularjs_spring_mvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import angularjs_spring_mvc.dao.DaoImplementacao;
import angularjs_spring_mvc.dao.DaoInterface;
import angularjs_spring_mvc.model.Livro;

@Controller
@RequestMapping(value="/livro")
public class LivroController extends DaoImplementacao<Livro> implements 
	DaoInterface<Livro> {

	public LivroController(Class<Livro> persistenceClass) {
		super(persistenceClass);
	}
	
	@RequestMapping(value="salvar", method=RequestMethod.POST)
	@ResponseBody
	public ResponseEntity salvar(@RequestBody String jsonLivro) throws Exception {
		Livro livro = new Gson().fromJson(jsonLivro, Livro.class);
		super.salvarOuAtualizar(livro);
		return new ResponseEntity(HttpStatus.CREATED);
	}
	
	//intercepta
	@RequestMapping(value="listar/{numeroPagina}", method=RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String listar(@PathVariable("numeroPagina") String numeroPagina) throws Exception{		
		return new Gson().toJson(super.consultaPaginada(numeroPagina));
	}
	
	@RequestMapping(value="totalPagina", method=RequestMethod.GET, headers = "Accept=application/json")
	@ResponseBody
	public String totalPagina() throws Exception{		
		return ""+super.quantidadePagina();
	}
	
	@RequestMapping(value="deletar/{codLivro}", method=RequestMethod.DELETE)
	public @ResponseBody String deletar(@PathVariable("codLivro") String codLivro) throws Exception{
		Livro objeto = new Livro();
		super.deletar(loadObjeto(Long.parseLong(codLivro)));
		return "";
	}
	
	@RequestMapping(value="buscarlivro/{codLivro}", method=RequestMethod.GET)
	public @ResponseBody String buscarLivro(@PathVariable("codLivro") String codLivro) throws Exception{
		Livro objeto = super.loadObjeto(Long.parseLong(codLivro));
		if (objeto == null) {
			return "{}";
		}
		return new Gson().toJson(objeto);
	}
	
	@RequestMapping(value="autenticar", method=RequestMethod.GET)
	public @ResponseBody String autenticar() throws Exception{		
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("permissao", true);
		map.put("user", authentication.getName());
		
		List<String> permissoes = new ArrayList<String>();
		
		Iterator<GrantedAuthority> iterator = (Iterator<GrantedAuthority>) authentication.getAuthorities().iterator();
		while (iterator.hasNext()) {
			permissoes.add(iterator.next().getAuthority());
		}
		
		map.put("permissoes", permissoes);
		
		return new Gson().toJson(map);
	}

}
