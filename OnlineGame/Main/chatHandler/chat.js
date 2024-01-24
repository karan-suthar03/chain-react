const FDatabase = app.firestore();

function initiateChat(Pdata,roomCode){
    let chatContainer = document.getElementsByClassName("chatArea")[0];
    let sendmsg = ()=>{
        if(document.getElementById("msg").value !== "") {
            FDatabase.collection(roomCode).add({
                Id: myID,
                name: Pdata[myID].Id,
                msg: document.getElementById("msg").value,
                timeStamp: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                console.log("Document successfully written!");
            }).catch((error) => {
                console.error("Error writing document: ", error);
            });
        }
    }
    document.getElementById("msg").addEventListener("keydown",(event)=>{
        if(event.key === "Enter"){
            sendmsg();
            document.getElementById("msg").value = "";
        }
    })
    document.getElementById("sendB").addEventListener('click',sendmsg)
    FDatabase.collection(roomCode).orderBy('timeStamp', 'asc').onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if(change.type === "added"){
                data = change.doc.data();
                let msgCD = document.createElement("div");
                msgCD.className = "msgC"
                msgCD.innerText = data.msg;

                if (chatContainer.lastElementChild) {
                    if (chatContainer.lastElementChild.firstChild.firstChild.classList.contains(Pdata[data.Id].color)) {
                        chatContainer.lastElementChild.lastElementChild.lastElementChild.appendChild(msgCD);
                        chatContainer.scrollTop = chatContainer.scrollHeight
                        return
                    }
                }
                let msgD = document.createElement("div");
                msgD.className = "msg";
                msgD.appendChild(msgCD);
                let CnameD = document.createElement("div");
                CnameD.className = "Cname";
                CnameD.innerText = data.name;
                let msgContainer = document.createElement("div");
                msgContainer.className = "msgContainer"
                msgContainer.appendChild(CnameD)
                msgContainer.appendChild(msgD)
                let colorCD = document.createElement("div");
                colorCD.className = `colorC ${Pdata[data.Id].color}`;
                let PFPD = document.createElement("div");
                PFPD.className = "PFP";
                PFPD.appendChild(colorCD)
                let messageD = document.createElement("div")
                if(data.Id === myID){
                    messageD.className = "message sent"
                }else{
                    messageD.className = "message rec"
                }
                messageD.appendChild(PFPD)
                messageD.appendChild(msgContainer)
                chatContainer.appendChild(messageD);
                chatContainer.scrollTop = chatContainer.scrollHeight
            }
        })
    })

}
