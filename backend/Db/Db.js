

const mongoose = require("mongoose")



function Dbconnect() {
    mongoose.connect("mongodb+srv://itz98104:CJuVNe2f8nTFEpLC@ai-prompt-save.byhyt5j.mongodb.net/", {
        dbName: "PromptSave",
    }).then(
        (success) => {
            console.log("Db connection successful")
        }
    ).catch(
        (err) => {
            console.log("Db connection failed")
            console.log(err)
        }
    )
}

module.exports = Dbconnect 