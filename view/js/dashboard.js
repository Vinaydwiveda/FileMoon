const RecentSharedBox = document.getElementById('RecentSharedBox')
const RecentUpload  = document.getElementById("RecentUpload")

window.onload =()=>{

recentUpload()
recentShared()
}

const recentUpload = async()=>{
    try{

        const recentUploadData = await axios.get(`/api/recentUpload/${User._id}`);
        console.log(recentUploadData.data)

        for(data of recentUploadData.data){
            
            RecentUpload.innerHTML +=`
                                    <div class="flex justify-between"><span>${data.FileName}</span> <span>${moment(data.createdAt).format("DD MMM YYYY")}</span> </div>
            `
        }

    }catch(err){
      console.log(err.response?.data || err.message);
    }
}

const recentShared = async ()=>{
    try{
        const recentSharedData = await axios.get(`/api/recentShared/${User._id}`);
        console.log(recentSharedData.data)

        for(data of recentSharedData.data){
            
            RecentSharedBox.innerHTML +=`

            <div class="flex justify-between"><span>${data.file.FileName}</span> <span>${data.reciver}</span> </div>
                  
            `
        }
    }catch(err){
       console.log(err.response?.data || err.message);
    }
}

