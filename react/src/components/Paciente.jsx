import { useState } from "react";
import "./ModalAction.scss"
import { useNavigate } from "react-router-dom";

export default function Paciente() {

    const navigation = useNavigate();

    //Realizando uma consulta para determinar o último ID do paciente.
    let id;
    
    fetch("http://localhost:5000/pacientes")
    .then((response)=> response.json())
    .then((response)=>{
        id = response[response.length-1].id+1
    })
    .catch(error=> console.log(error));
    
    const[paciente,setpaciente] = useState({
        id:id,
        nome:'',
        email:'',
        desc:''
    });
    
    const handleChange = (e)=>{
        //Destructuring
        const {name,value} = e.target;
      //Setando os dados diretamente no objeto atravé de SPREAD
        setpaciente({...paciente,[name]:value});
      }


      const handleSubmit = (e) =>{
        e.preventDefault();
     
          fetch("http://localhost:5000/pacientes/",{
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify(paciente)
          })
          .then((response)=> console.log("Dados cadastrados com sucesso - STATUS CODE : " + response.status))
          .catch(error=> console.log(error));

          //Redirect
          navigation("/pacientes");
      }


    
        return (
            <div>
            <h1>Cadastrar pacientes</h1>
              <div>
                <form onSubmit={handleSubmit}>
                  <fieldset>
                    <span className="closeModal" onClick={()=> props.setClose(false)}>X</span>
                    <legend>Paciente Selecionado</legend>
                    <div>
                      <label htmlFor="">Nome:</label>
                      <input type="text" name="nome" placeholder="Digite o nome do paciente." value={paciente.nome} onChange={handleChange}/>
                    </div>
                    <div>
                      <label htmlFor="">Descrição:</label>
                      <input type="text" name="desc" placeholder="Digite a descrição do paciente." value={paciente.desc} onChange={handleChange}/>
                    </div>
                    <div>
                      <label htmlFor="">Preço:</label>
                      <input type="text" name="preco" placeholder="Digite o preço do paciente." value={paciente.preco} onChange={handleChange}/>
                    </div>
                    <div>
                      <button>CADASTRAR</button>
                    </div>
                  </fieldset>
                </form>
              </div>
    
        </div>
        )
  }