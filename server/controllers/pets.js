const mongoose = require('mongoose'),
      Pet = mongoose.model("Pet");


class Pets{
    getAll(req, res){
        Pet.find({}, (err, pets) => {
            if(err) { console.log(err);}
            res.json({status: 'ok', pets: pets});
        });
    }
    getOne(req, res){
        Pet.findOne({_id: req.params._id}, (err, pet) => {
            if(err) { console.log(err); }
            res.json({status: 'ok', pet: pet});
        })
    }
    create(req, res){
        let p = new Pet(req.body);
        p.save(err => {
            if(err) {
                res.json({status: "not OK", errors: err});
            } else {
                res.json({status: 'OK'});
            }
        });
    }
    addlike(req, res){
        Pet.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators:true} ,err => {
            if(err){
                res.json({status: "not OK", errors: err});
            } else {
                res.json({status: 'OK'});
            }
        });
    }
    update(req, res){
        Pet.findOneAndUpdate({_id: req.params._id}, req.body, {runValidators:true} ,err => {
            if(err){
                res.json({status: "not OK", errors: err});
            } else {
                res.json({status: 'OK'});
            }
        });
    }
    delete(req, res){
        Pet.findOneAndDelete({_id: req.params._id}, err => {
            if(err){
                console.log(err);
            } else {
                res.json({status: 'OK'});
            }
        });
    }
}

module.exports = new Pets();