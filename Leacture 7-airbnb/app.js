const express=require('express');
const app=express();
const userRoutes=require('./routes/userRoutes')
const hostRoutes=require('./routes/hostRoutes')
// encoded the values
app.use(express.urlencoded({extended:true}))
app.use(userRoutes)
app.use("/host",hostRoutes)
//core module
const path=require('path')
const rootDir=require('./utils/pathUtils')

app.use((req,res,next)=>{
 
res.status(404).sendFile(path.join(rootDir,'views','404.html'))
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
