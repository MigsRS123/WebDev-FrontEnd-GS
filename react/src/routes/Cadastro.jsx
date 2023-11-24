import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./Cadastro.scss"

export default function Cadastro() {

    //Criando o Redirecionador!
    const navigate = useNavigate();

    //Gerar um msg de feedBack para o usuário:
    const [msgStatus, setMsgStatus] = useState("");
    
    //USE-STATE QUE VAI ARMAZENAR OS DADOS DO FORM.
    const [usuario,setUsuario] = useState({
        nome:"",
        email: "",
        senha: ""
    })

    //PREENCHIMENTO DO FORM
    const handleChange = (e)=>{
        //DESTRUCTURING NOS CAMPOS DO FORM(NAME,INPUT).
        const {name,value} = e.target;
        //PREENCHENDO O USE-STATE COM OS VALORES DA DESESTRUTURAÇÃO, UTILIZANDO O OPERADOR SPREAD.
        setUsuario({...usuario,[name]:value});
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/usuarios",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(usuario)
            });

            if(response.ok){
                //limpando os campos do form:
                setUsuario({
                    nome:"",
                    email:"",
                    senha:""
                });

                setMsgStatus("Cadastro realizado com sucesso!");

                setTimeout(()=>{
                    navigate("/login");
                },5000);
            }
            
        } catch (error) {
            console.error(error);
            setMsgStatus("Ocorreu um erro ao tentar realizar o registro!");
        }

    }

  return (
    <div>
        <h1>Cadastrar</h1>

        <h2>{msgStatus}</h2>

        <div className="form-cad">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>User Information:</legend>
                    <div>
                        <label htmlFor="idNome">Nome:</label>
                        {/*Para o prenchimento é obrigatório adicionar o atributo value e o evento onChange */}
                        <input type="text" name="nome" id="idNome" placeholder="Digite seu nome." value={usuario.nome} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="idEmail">Email:</label>
                        {/*Para o prenchimento é obrigatório adicionar o atributo value e o evento onChange */}
                        <input type="email" name="email" id="idEmail" placeholder="Digite seu email." value={usuario.email} onChange={handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="idSenha">Senha:</label>
                        <input type="password" name="senha" id="idSenha" placeholder="Digite sua senha." value={usuario.senha} onChange={handleChange}/>
                    </div>
                    <div>
                        <button>CADASTRAR</button>
                    </div>
                    <div>
                        <p>Se você já é registrado. <Link to="/login">CLIQUE AQUI</Link></p>
                    </div>
                </fieldset>
            </form>
        </div>

    </div>
  )
}

