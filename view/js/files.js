const drawer =document.getElementById('drawer');
const btn = document.getElementById('btn');
const closeBtn = document.getElementById('closeBtn');
const fileCreatedBy = JSON.parse(localStorage.getItem('user'))

window.onload =()=>{
    fetchFiles();   
}



const toggleUploadForm=()=>{
    if(drawer.style.display=='none'){
        drawer.style.display='block';
    }else{
        drawer.style.display='none';
    }
}

const closeUploadForm=()=>{
    
    if(drawer.style.display=='block'){
        drawer.style.display='none';
    }
    

}


const uploadform = async (e) => {

    e.preventDefault();
    btn.disabled = true;
    const form = e.target;
    const progressBar = document.getElementById("progressBar");

    const payload = new FormData(form);
    payload.append("fileCreatedBy", fileCreatedBy._id);

    try {

        const { data } = await axios.post("/api/file", payload, {
            onUploadProgress: (progressEvent) => {

                const percent = Math.floor(
                    (progressEvent.loaded * 100) / progressEvent.total
                );

                progressBar.style.width = percent + "%";
                progressBar.innerText = percent + "%";
            }
        });

       
        form.reset();
        btn.disabled = false;

        setTimeout(() => {
            progressBar.style.width = "0%";
            progressBar.innerText = "0%";
        }, 2000);

        alert("File uploaded successfully!");

        fetchFiles();
       
        closeUploadForm();


    } catch (err) {
        console.log(err.response?.data || err.message);
    }finally{
        btn.disabled = false;
    }

};


const calculateFileSizeInMB = (sizeInBytes) => {
    return (sizeInBytes / (1024 * 1024)).toFixed(2);
};

const fetchFiles = async () => {

    try {
        console.log(fileCreatedBy._id)
        const { data } = await axios.get(`/api/file/${fileCreatedBy._id}`);
        console.log(data);
        
        const filetable = document.getElementById("fileTable");
        filetable.innerHTML = "";

        for(const file of data.files){
            filetable.innerHTML +=`
                             
                      <tr class="border-b border-gray-200 hover:bg-gray-100 text-gray-600">
            <td class="py-4 px-6">
               ${file.FileName}
            </td>

            <td class="py-4 px-4 text-center">
                ${calculateFileSizeInMB(file.Size)} MB
            </td>

            <td class="py-4 px-4 text-center">
                ${file.Type}
            </td>

            <td class="py-4 px-4 text-center">
                ${new Date(file.createdAt).toLocaleDateString()}
            </td>

            <td class="py-4 px-4">
                <div class="flex justify-center gap-2">
                    <button class="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" onclick="downloadFile('${file._id}', '${file.FileName}','${file.Type}',this)">
                        <i class="ri-download-line"></i>
                    </button>

                    <button class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"onclick="shareFile('${file._id}' ,this ,'${file.FileName}','${file.Type}',${calculateFileSizeInMB (file.Size)})">
                        <i class="ri-share-line"></i>
                    </button>

                    <button class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" onclick="deleteFile('${file._id}' ,this)">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </td>
        </tr>
        
        `
        }

    }catch(err){
        console.log(err.response?.data || err.message);
    }
}


const downloadFile = async (fileId, fileName,filetype,button) => {
    try {
        console.log(button)
        button.innerHTML = `<i class="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>`
        button.disabled = true;
        const { data } = await axios.get(`/api/file/download/${fileId}`, {
            responseType: "blob",
        });
        console.log(data);

        const url = URL.createObjectURL(data);
        console.log(url)

        const link = document.createElement("a");
        link.href = url;

        const extension = data.type.split("/")[1];
        link.download = `${fileName}.${filetype.split("/")[1]}`; 

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
         button.innerHTML ="<i class='ri-download-line'></i>"
        button.disabled = false;

    } catch (err) {
        console.log(err.response?.data || err.message);
    }finally{
        button.innerHTML ="<i class='ri-download-line'></i>"
        button.disabled = false;
    }
};

const deleteFile = async(id,button)=>{
    try{
          button.innerHTML = `<i class="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>`
          button.disabled = true;

        await axios.delete(`/api/file/${id}`)

        alert("File deleted sucessfully");

        fetchFiles();

    }catch(err){

        console.log(err.response?.data || err.message);
    }finally{
        button.innerHTML ="<i class='ri-download-line'></i>"
        button.disabled = false;
    }
}

const shareFile = async(id,button,fileName,fileType,fileSize)=>{
    try{
        console.log(button)
        button.innerHTML = `<i class="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>`
        button.disabled = true;

 Swal.fire({
  title: "Share File",
  html: `
    <form class="flex flex-col gap-2"
      onsubmit="shareFileSubmit(event,'${id}',this,'${fileName}','${fileType}',${fileSize})">

      <label>User Email:</label>
      <input type="email" name="user"
        class="border border-gray-300 rounded px-2 py-1 w-full" required>

      <label>Receiver Email:</label>
      <input type="email" name="receiver"
        class="border border-gray-300 rounded px-2 py-1 w-full" required>

      <button type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded" className="submit-button">
        Submit
      </button>

    </form>

    <small><strong>File:</strong> ${fileName}</small>
  `,
  showConfirmButton: false,  
  showCancelButton: false,
  allowOutsideClick: false
});
        
    }
    catch(err){
        console.log(err.response?.data || err.message);
    }finally{
        button.innerHTML ="<i class='ri-share-line'></i>"
        button.disabled = false;
    }
}


async function shareFileSubmit(e, id, form, fileName, fileType, fileSize) {
    e.preventDefault();

    const formData = new FormData(form);
   const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin fa-spin-reverse"></i>`;

    const user = formData.get("user");
    const receiver = formData.get("receiver");

    try {
        

      const response =  await axios.post("/api/file/share", {
            user,
            userId:localStorage.getItem('user')? JSON.parse(localStorage.getItem('user'))._id : null,
            reciver: receiver,
            _id:id,
            filename:fileName,
            filetype:fileType,
            size:fileSize
        });
       
        console.log(response.data);

        Swal.close();
        Toastify({
             text: `${response.data.message}`,
             duration: 3000,
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


    } catch (err) {
        Toastify({
       text: `${err.response ? err.response.data.message : err.message}`,
       duration: 3000,
       gravity: "top",
       position: "center",
       close: true,
       stopOnFocus: true,
       style: {
          background: "#ef4444",
          width: "300px",
          padding: "8px",
          textAlign: "center",
          borderRadius: "10px"
       }
}).showToast();
    }finally{
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = false;
        submitButton.innerHTML = "Submit";
    }
}