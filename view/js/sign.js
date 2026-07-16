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
  duration: 8000,
  gravity: "top",
  position: "center",
  close: true,
  stopOnFocus: true,
  style: {
    background: "#22c55e",
    width: "300px",
    padding: "8px",
    textAlign: "center",
    borderRadius: "10px"
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


