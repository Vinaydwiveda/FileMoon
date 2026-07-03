const token = sessionStorage.getItem('token')
if(!token){
    localStorage.clear();
    location.href="/login"
}
const User = JSON.parse(localStorage.getItem('user'))
const user = document.getElementById('user');
const email = document.getElementById('userEmail')

user.innerHTML = User.Name;
email.innerHTML=User.Email

const logout = ()=>{

    localStorage.clear();
    sessionStorage.clear();
    location.href="/login"
}
 const toggleSidebar= ()=>{
   
    const sidebar = document.getElementById('sidebar');
    const section = document.getElementById('section');

    if(sidebar.style.width=='0px'){
        sidebar.style.width="300px";
        section.style.marginLeft="300px"
        
    }else{
        sidebar.style.width="0px";
        section.style.marginLeft="0px"
        
    }

}