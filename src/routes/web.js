const express = require('express')
const multer = require('multer');
const path = require('path')

//config folder lưu trữ and filename
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, path.join(__dirname,'../public/upload'));
    },
    filename: function(req, file, cb) {
      cb(null,Date.now()+'-'+file.originalname);
    },
});

// config điều kiện lọc của filefile
const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif/;
      const ext = path.extname(file.originalname).toLowerCase(); // Lấy đuôi file, ví dụ .jpg
      const mime = file.mimetype; // Kiểu MIME, ví dụ image/jpeg
  
      if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
        cb(null, true); // Cho phép upload
      } else {
        cb(new Error('Chỉ cho phép file ảnh!')); // Từ chối file không hợp lệ
      }
    }
  });

  // config nhiều trường file, mỗi trường file được tối đa bao nhiêu file
const mutilFile = upload.fields([
    {name : 'avatar' , maxCount : 10 }
])
// confile chỉ lấy 1 trường file
const oneFile = upload.single('avatar')

const {
    getHomePage,
    getABC,
    addUser,
    showUser,
    mothodDeleteUser,
    pageEdit,
    postUpdateUser
} = require('../controllers/homeController')

const router = express.Router();

router.get('/',getHomePage);

router.get('/abc',getABC)

router.get('/user-edit/:id',pageEdit)

router.post('/update-user',oneFile,postUpdateUser)
  
router.post('/add-user',oneFile,addUser)

router.get('/show-user',showUser)

router.get('/user-delete/:id',mothodDeleteUser)
  
// router.listen(port,() => {
//     console.log(`Example app listening on port ${port}`)
// })

module.exports = router