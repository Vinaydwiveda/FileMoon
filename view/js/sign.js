console.log("JavaScript file loaded successfully!");

const signing = async (e) => {
  try {
    console.log("signing() called");
    e.preventDefault();

    const form = e.target;
    const elements = form.elements;

    const payload = {
      Email: elements.Email.value,
      Password: elements.Password.value,
    };

    console.log("Submitting payload:", payload);

    const response = await axios.post(
      '/api/login',
      payload
    )
 
    Toastify({
           text: "Login Successfully ✅",
           duration: 3000,
           gravity: "top",       // top ya bottom
           position: "center",    // left, center, right
          close: true,
           stopOnFocus: true,
           style: {
           background: "#22c55e",
           width:"300px",
           position:"absolute",
           padding:"8px",
           textAlign:"center",
           borderRaddius:"10px",
           left:"55%"
         }
}).showToast();

localStorage.setItem('user',JSON.stringify(response.data.user))
sessionStorage.setItem('token',response.data.token)

setTimeout(()=>{
  location.href = "/dashboard";
},2000)


   
  } catch (err) {
    Toastify({
     text: `${err.response? err.response.data.message:err.message}`,
     duration: 3000,
     gravity: "top",
     position: "right",
     close: true,
     style: {
      background: "#ef4444"
    } 
   }).showToast();
  }
};


