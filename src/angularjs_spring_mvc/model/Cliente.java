package angularjs_spring_mvc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ForeignKey;

@Entity
public class Cliente{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String nome;
	
	private String endereco;
	
	private String numero;
	
	private String bairro;
	
	private String telefone;
	
	private String celular;
	
	private String email;
	
	private String sexo;
	
	private Boolean ativo;
	
	private String interesse;
	
	private String cpf;
	
	private String rg;
	
	private String nascimento;
	
	private String complemento;
	
	private String cep;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@ForeignKey(name="estados_fk")
	private Estados estados = new Estados();
	
	@ManyToOne(fetch=FetchType.EAGER)
	@ForeignKey(name="cidades_fk")
	private Cidades cidades = new Cidades();
	
	@Column(columnDefinition="text")
	private String foto;
	
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	
	public String getCpf() {
		return cpf;
	}
	
	public void setRg(String rg) {
		this.rg = rg;
	}
	
	public String getRg() {
		return rg;
	}
	
	public void setFoto(String foto) {
		this.foto = foto;
	}
	
	public void setCidades(Cidades cidades) {
		this.cidades = cidades;
	}
	
	public String getFoto() {
		return foto;
	}
	
	public Cidades getCidades() {
		return cidades;
	}
	
	public void setEstados(Estados estados) {
		this.estados = estados;
	}
	
	public Estados getEstados() {
		return estados;
	}
	
	public void setInteresse(String interesse) {
		this.interesse = interesse;
	}
	
	public String getInteresse() {
		return interesse;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getEndereco() {
		return endereco;
	}

	public void setEndereco(String endereco) {
		this.endereco = endereco;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email.toLowerCase();
	}
	
	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	
	public boolean getAtivo() {
		return ativo;
	}

	public void setAtivo(Boolean ativo) {
		if (ativo == null)
			this.ativo = false;
		this.ativo = ativo;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Cliente other = (Cliente) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	public String getNascimento() {
		return nascimento;
	}

	public void setNascimento(String nascimento) {
		this.nascimento = nascimento;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public String getNumero() {
		return numero;
	}

	public void setNumero(String numero) {
		this.numero = numero;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}
}
