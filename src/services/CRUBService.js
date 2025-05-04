const connection = require('../models/database')

const getAllUsers = async (req , res) => {
    
    try {
        
        let [users] =  await connection.query('SELECT * FROM Users')

        return users;

    } catch (error) {
        
        console.log(error)

    }
    
}

const getOneUser = async (idUser) => {

    let [results,fields] = await connection.query('SELECT * FROM Users WHERE id = ?',[idUser])

    let users = results && results.length > 0 ? results[0] : {} ;

    return users

}

const updateUser = async (id,email,name,city,avatar) => {

    try {
        
        let [results,fields] = await connection.query('UPDATE Users SET email = ? , name = ? , city = ? , avatar = ? WHERE id = ?',[email,name,city,avatar,id]);

    } catch (error) {
        
        console.log(error)

    }

}

const deleteUser = async (idUser) =>{

    let [results,fields] = await connection.query('DELETE FROM Users WHERE id = ?',[idUser])

}



module.exports = {
    getAllUsers,getOneUser,updateUser,deleteUser
}