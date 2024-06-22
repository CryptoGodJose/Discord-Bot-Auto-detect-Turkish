require('dotenv').config();
async function translateText(messageCont){
    try{
        const res = await fetch(process.env.IPServer, {
            method: "POST",
            body: JSON.stringify({
                q: messageCont,
                source: "auto",
                target: "en"
            }),
            headers: {"Content-Type": "application/json"}
        });

        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        return data;
    } catch (error){
        console.error("Error:", error.message);
    }
}

module.exports = {translateText};