const Student = require('../models/Student');
const mongoose = require('mongoose'); 

exports.homepage = async (req,res) =>{
 
    const messages = await req.consumeFlash('info');
    const locals ={
        title:"NodeJs",
        description:"Students-mentors-managements"
    }
    let perPage = 10;
    let page = req.query.page||1;

    try {
       const students = await Student.aggregate( [ { $sort:{ createdAt: -1 } } ])
       .skip(perPage * page - perPage) 
       .limit(perPage)
       .exec();

       const count = await Student.count();

        res.render('index', {
         locals, 
         students,
         current: page,
         pages: Math.ceil(count/perPage),
         messages });
    } catch (error) {
        console.log(error);
    }

}

// exports.homepage = async (req,res) =>{
 
//     const messages = await req.consumeFlash('info');
//     const locals ={
//         title:"NodeJs",
//         description:"Students-mentors-managements"
//     }
    
//     try {
//         const studentlist = await Student.find({}).limit(10);
//         res.render('index', {locals, messages,studentlist});
//     } catch (error) {
//         console.log(error);
//     }

// }

exports.addnewstudent = async (req,res) =>{
    const locals ={
        title:"add new student",
        description:"Students-mentors-managements"
    }

    res.render('students/addstudent',locals);
}

exports.poststudent = async (req,res) =>{   
   //console.log(req.body);
  
   const newStudent = new Student({
                     firstname: req.body.firstname,
                     lastname: req.body.lastname,
                     telephone: req.body.telephone,
                     email: req.body.email,
                     details: req.body.details
                    });
   
    try {
      await Student.create(newStudent);
       await req.flash('info','New student added')
       res.redirect('/');
        
    } catch (error) {
        console.log(error);
    }

    
}

exports.view = async(req,res) => {
     try {
        const  student = await Student.findOne({_id: req.params.id})
        
        const locals = {
            title: "view student data",
            description:"Free nodejs students Management"
        };
        res.render('students/view', {
            locals,
            student
        });

     } catch (error) {
        console.log("view error:",error);
     }
}

exports.edit = async(req,res) => {
    try {
       const  student = await Student.findOne({_id: req.params.id})
       
       const locals = {
           title: "edit student data",
           description:"Free nodejs user Management"
       };
       res.render('students/edit', {
           locals,
           student
       });

    } catch (error) {
       console.log("edit error:",error);
    }
}

exports.editPost = async (req, res) => {
    try {
      await Student.findByIdAndUpdate(req.params.id,{
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        telephone: req.body.telephone,
        email: req.body.email,
        details: req.body.details,
        updatedAt: Date.now()
      });
      await res.redirect(`/edit/${req.params.id}`);
      
      console.log('redirected');
    } catch (error) {
      console.log(error);
    }
  }

exports.deleteStudent = async(req,res) => {
    try {

        await Student.deleteOne({_id:req.params.id});
        res.redirect('/');

    } catch (error) {
       console.log("Delete Err:",error)   
    }
}

exports.searchStudent = async(req,res) => {
    const locals = {
        title: "search student data",
        description:"Free nodejs student Management"
    };
    
  try {

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g,"");

    const students = await Student.find({
        $or:[
            {firstname:{ $regex: new RegExp(searchNoSpecialChar,"i") }},
            {lastname:{ $regex: new RegExp(searchNoSpecialChar,"i") }}
            ]
    })

    res.render("search",{
        students,
        locals
    });
    
   } catch (error) {
      console.log("search Err:", error);
   }
   

}