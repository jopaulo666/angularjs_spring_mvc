package angularjs_spring_mvc.dao;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import angularjs_spring_mvc.hibernate.HibernateUtil;

@Transactional(noRollbackFor = Exception.class)
@Service
public abstract class DaoImplementacao<T> implements DaoInterface<T>{

	private Class<T> persistenceClass;
	
	private SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
	
	public DaoImplementacao (Class<T> persistenceClass) {
		super();
		this.persistenceClass = persistenceClass;
	}
	
	@Override
	public void salvar(T objeto) throws Exception {
		sessionFactory.getCurrentSession().save(objeto);
		sessionFactory.getCurrentSession().flush();
	}
	
	@Override
	public void deletar(T objeto) throws Exception {
		sessionFactory.getCurrentSession().delete(objeto);		
		sessionFactory.getCurrentSession().flush();
	}
	
	@Override
	public void atualizar(T objeto) throws Exception {
		sessionFactory.getCurrentSession().update(objeto);
		sessionFactory.getCurrentSession().flush();//retira imediatamente do banco de dados apos delete
		
	}
	
	@Override
	public void salvarOuAtualizar(T objeto) throws Exception {
		sessionFactory.getCurrentSession().saveOrUpdate(objeto);
		sessionFactory.getCurrentSession().flush();
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public T merge(T objeto) throws Exception {
		T t = (T) sessionFactory.getCurrentSession().merge(objeto);
		sessionFactory.getCurrentSession().flush();
		return t;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<T> lista() throws Exception {
		return sessionFactory.getCurrentSession().createCriteria(persistenceClass).list();
	}
	
	@Override
	public T loadObjeto(Long codCliente) throws Exception {
		return (T) sessionFactory.getCurrentSession().get(persistenceClass, codCliente);
	}
}
