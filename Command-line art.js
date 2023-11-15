var figlet = require("figlet");

figlet("HI :D", function (err, data){
    if (err) {
        console.log("New error")
        console.dir(err)
        return;
    }
    console.log(data);
})