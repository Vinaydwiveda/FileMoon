const token = sessionStorage.getItem('token')
if(!token){
    localStorage.clear();
    location.href="/login"
}

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