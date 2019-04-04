package angularjs_spring_mvc.hibernate;

import java.io.Serializable;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

//Responsável por estabelecer a coexão hibernate 
public class HibernateUtil implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private static SessionFactory sessionFactory = buildSessionFactory();
	
	// responsável por ler o arquivo de configuração hibernate.cfg.xml
	private static SessionFactory buildSessionFactory() {
		try {
			if (sessionFactory == null) {
				sessionFactory = (new Configuration()).configure().buildSessionFactory();
			}
			return sessionFactory;
		} catch (Exception e) {
			e.printStackTrace();
			throw new ExceptionInInitializerError("Erro ao criar conexão com banco de dados");
		}
	}

	public static SessionFactory getSessionFactory() {
		return sessionFactory;
	}
}
