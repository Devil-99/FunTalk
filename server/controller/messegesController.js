const messegeModel = require("../model/messegeModel");

module.exports.addMessege = async (req,res,next)=>{
    try{
        const {from , to , messege} = req.body;
        const data = await messegeModel.create({
            messege: {text: messege},
            users : [from,to],
            sender : from
        });
        if(data)
            return res.json({msg: "Messege added successfully"})
        else
            return res.json({msg: "Failed to add messege to the database"})
    }
    catch(exc){
        next(exc);
    }
};


module.exports.getAllMessege = async (req,res,next)=>{
    try{
        const {from,to} = req.body;
        const messeges =await messegeModel.find({
            users:{
                $all: [from, to],
            },
        }).sort({updatedAt:1});
        const projectedMesseges = messeges.map((msg)=>{
            const timestamp=msg.createdAt.toString();
            const day = timestamp.slice(8,10);
            const month = timestamp.slice(4,7);
            const year = timestamp.slice(11,15);
            const time = timestamp.slice(16,25);
            const date = `${day} ${month} ${year} ${time}`;
            return {
                fromSelf: msg.sender.toString() === from,
                messege: msg.messege.text,
                messegeId: msg._id,
                date: date
            };
        });
        res.json(projectedMesseges);
    }catch(exc){
        next(exc);
    }
};
