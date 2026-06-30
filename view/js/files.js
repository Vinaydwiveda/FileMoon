const drawer =document.getElementById('drawer');
const btn = document.getElementById('btn');
const closeBtn = document.getElementById('closeBtn');



window.toggleUploadForm=()=>{
    if(drawer.style.display=='none'){
        drawer.style.display='block';
    }else{
        drawer.style.display='none';
    }
}

window.closeUploadForm=()=>{
    
    if(drawer.style.display=='block'){
        drawer.style.display='none';
    }
    

}