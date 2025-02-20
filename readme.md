CC19-Facebook-API
===
### env guide
PORT = 8899  
DATABASE_URL = ***  
JWT_SECRET =***  

---  
### service
|path |method |authen |params |query | body | 
|:--- |:--- |:---|:--- |:---|:--- |
|/auth/register|post|-|-|-|{ identity, firstname, lastname, password, confirmPassword }  
|/login/auth|post|-|-|-|{ identity, firstname, password }  
|/auth/me|get|y|-|-|-|
|/post|get|y|-|-|-|
|/post|post|y|-|-|{message, image(file)}
|/post|put|y|:id|-|{message, image(file),removePic}
|/post|delete|y|:id|-|-
|/comment|post|y|-|-|{message, postId} 
|/like|post|y|-|-|{postId}
|/like|delete|y|:id|-|-  
---

CLOUDINARY_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET