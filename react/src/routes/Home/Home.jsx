import { useNavigate } from "react-router-dom";

export default function Home() {
  document.title = "HOME";
  
  if(sessionStorage.getItem("token-user")){
  return (
    <div>
      <h1>Home - mudar dps</h1>
      

    </div>
  )}else{
    window.location = "/login";
    
  }
}
