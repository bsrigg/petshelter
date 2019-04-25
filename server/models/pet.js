const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true, "Pet Name is required!"],
        minlength: [3, "Pet Description must be at 3 characters long."],
        // validate: {
        //     validator: function(v, cb) {
        //       Pet.find({name: v}, function(err,docs){
        //          cb(docs.length == 0);
        //       });
        //     },
        //     message: "Pet Name already exists!"
        // }
    },
    type : {
        type: String,
        required: [true, "Pet Type is required!"],
        minlength: [3, "Pet Description must be at 3 characters long."]
    },
    description : {
        type: String,
        required: [true, "Pet Description is required!"],
        minlength: [3, "Pet Description must be at 3 characters long."]
    },
    skill1 : {
        type: String,
        required: [false]
    },
    skill2 : {
        type: String,
        required: [false]
    },
    skill3 : {
        type: String,
        required: [false]
    },
    like: {
        type: Number,
        required: [false],
        default: 0
    },
    liked: {
        type: Boolean,
        default: false
    }
}, {timestamps:true});

mongoose.model('Pet', PetSchema);