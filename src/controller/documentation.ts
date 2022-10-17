import { userRouteDoc, serverRouteDoc, } from "../routes/userRoutes";

const swaggerDocumentation = {
    openapi: "3.0.0",
    info: {
        title: "Squazzle App",
        version: "1.0.0",
        description: "Stutern Housemanship SQUAZZLE Project A squatting platform This platform allows people to accommodate others for an agreed period of time..This will provide api endpoint to the corresponding frontend app"
    },
    servers: [
        {
            url: "http://localhost:442",
            description: "Local Dev"
        },
        {
            url: "https://gallery-one-app.herokuapp.com/",
            description: "Production Dev"
        },
    ],
    tags: [
        {
            name: "Server",
            description: "Server routes"
        },
        {
            name: "User",
            description: "User routes"
        },
        
        
    ],
    paths: {
        ...serverRouteDoc,
        ...userRouteDoc,
       
        
    },
    
};

export default swaggerDocumentation;