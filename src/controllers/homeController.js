const { json } = require('express');
const connection = require('../models/database')
const fs = require('fs')
const path = require('path')

const { 
    getAllUsers , getOneUser , updateUser , deleteUser
} = require('../services/CRUBService')


const getHomePage = ( req , res ) => {

    res.render('home')
        
}

const addUser = async (req , res) => {

    try {

        let {email , name , city } = req.body

        console.log(req.file)

        let avatar_name = req.file.filename 

        const [result,fields] = await connection.query('INSERT INTO Users (email,name,city,avatar) VALUES (?,?,?,?)',[email,name,city,avatar_name]);

        // res.status(201).json({message: 'Thêm thành công'})

        res.redirect('/show-user')

    } catch (error) {
        
        console.log(error)

    }

    
}

const showUser = async (req , res) => {

    let users = await getAllUsers()
    
    res.render('show',{users})
    
}

const mothodDeleteUser = async (req,res) => {

    try {

        const idUser = req.params.id;

        deleteUser(idUser)

        res.redirect('/show-user')

    } catch (error) {
        
        console.log(error)

    }

}

const pageEdit = async ( req , res ) => {

    try {
        const idUser = req.params.id;

        let product = await getOneUser(idUser)

        res.render('edit',{ product })

    } catch (error) {

        console.log(error)
        
    }
    
}


const postUpdateUser = async (req , res) => {

    try {

        let {email , name , city , id } = req.body

        let avatar_name = req.file ? req.file.filename : undefined

        let productOld = await getOneUser(id)

        if(!avatar_name){

            avatar_name = productOld.avatar 

        }else{

            fs.unlink(path.join(__dirname,'../public/upload/'+productOld.avatar,),(err) => {
                if(err){
                    console.error('Lỗi khi xóa file:', err);
                    return
                }
                console.error('Xóa thành công');
            })

        }

        updateUser(id,email,name,city,avatar_name)

        // res.status(201).json({message: 'Thêm thành công'})

        res.redirect('/show-user')

    } catch (error) {
        
        console.log(error)

    }

    
}

const getABC = (req , res) => {
    res.send('check ABC')
}
module.exports = {
    getHomePage,
    getABC,
    addUser,
    showUser,
    mothodDeleteUser,
    pageEdit,
    postUpdateUser
}