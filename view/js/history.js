const tablecontent = document.getElementById("fileTable")

const fetchhistory = async()=>{
  const user =JSON.parse(localStorage.getItem('user'))
  console.log(user._id)

  const historydata = await axios.get(`api/history/${user._id}`)

  const history =historydata.data.history
  console.log(history)
 console.log(tablecontent)

 if(history.length==0){
    tablecontent.innerHTML = `
                
             <h1 class="absolute top[50%] left[50%]" > <strong>Not file share At !</strong> </h1>
    `
    return
 }

  for(const data of history){

    tablecontent.innerHTML += `
                            <tr class="border-b border-gray-200 hover:bg-gray-100 text-gray-600">
            <td class="py-4 px-6">
               ${data.file.FileName}
            </td>

            <td class="py-4 px-4 text-center">
                ${data.reciver}
            </td>

            <td class="py-4 px-4 text-center">
              ${ moment(data.createdAt).format("DD MMM YYYY")}
            </td>

        </tr>
        
    
    `
    
  }
}
            
fetchhistory()

