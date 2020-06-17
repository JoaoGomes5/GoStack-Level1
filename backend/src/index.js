const  express = require('express') ;
const { uuid , isUuid } = require('uuidv4');
const { request, response } = require('express');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(express.json());


const projects = [];

function logRequests(req, res , next)  {

    const {method , url } = req;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.time(logLabel);

    next();

    console.timeEnd(logLabel);
    
    
}

function validateProjectid(req, res , next) {
    const { id } = req.params;

    if(!isUuid(id)){
        return res.status(400).json({error: "Invalid Id"});
    }

    return next();
}

app.use(logRequests);
app.use('/projects/:id' , validateProjectid);

app.get('/projects' , (req, res) => {
    const { title } = req.query;

    const results = title ? projects.filter(project => project.title.includes(title)) : projects;

    return res.json(results);

})


app.post('/projects' ,(req, res) => {

    const { title , author } = req.body;

    const project = {
        id : uuid(),
        title,
        author
    }

    projects.push(project);

    
    

    return res.json(project);

})


app.put('/projects/:id' , (req, res) => {

    const { id } = req.params;
    const { title , author } = req.body;

    const projectIndex = projects.findIndex(project => project.id === id);
    

    if(projectIndex < 0 ){

            return res.status(400).json({ error: "Project not found" })
    }

    const project = {
        id,
        title,
        author
    };

    projects[projectIndex] = project;


    return res.json(project);

});



app.delete('/projects/:id' , (req, res) => {

    const { id } = req.params;

    const projectIndex = projects.findIndex(project => project.id === id);
    

    if(projectIndex < 0 ){

            return res.status(400).json({ error: "Project not found" })
    }

    projects.splice(projectIndex , 1)
    return res.status(204).send();

})



app.listen(3333, () => {
    console.log("🚀 Server Running on port 3333 🚀" );
    
})