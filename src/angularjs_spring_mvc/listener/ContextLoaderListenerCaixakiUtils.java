package angularjs_spring_mvc.listener;

import java.io.Serializable;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public class ContextLoaderListenerCaixakiUtils extends org.springframework.web.context.ContextLoaderListener 
	implements Serializable {
	
		private static final long serialVersionUID = 1L;
		
		private static WebApplicationContext getWac() {
			return WebApplicationContextUtils.getWebApplicationContext(getCurrentWebApplicationContext()
					.getServletContext());
		}
		
		//retorna um objeto do contexto Spring de acordo com seu nome
		public static Object getBean(String idNomeBean) {
			return getWac().getBean(idNomeBean);
		}
		
		public static Object getBean(Class<?> classe) {
			return getWac().getBean(classe);
		}
}
