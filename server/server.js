import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "./models/projects.js";
import Client from "./models/clients.js";
import Quote from "./models/quotes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())


//Home route
app.get("/", (req, res) => {
    res.json({
        message : "PrintFlow API is running"

    })
})



//Connect to mongoDB and start the server
const startServer = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing from the .env file");
        }

        await mongoose.connect(process.env.MONGO_URI);
        
        console.log("MongoDB connected Successfully");

        app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
});
    }catch (error) {
        console.error("failed to start PrintFlow:", error.message);
        process.exit(1);
    }
};



app.post("/api/projects", async (req, res) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating project",
      error: error.message,
    });
  }
});


app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find();

    res.status(200).json({
      count: projects.length,
      projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching projects",
      error: error.message,
    });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          ...(req.body.name !== undefined && {
            name: req.body.name
          }),
          ...(req.body.status !== undefined && {
            status: req.body.status
          })
        }
      },
      { new: true, runValidators: true }
    );

    if(!updatedProject) {
      return res.status(404).json({
        message: "Project not found"
      });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating project",
      error: error.message
    });
  }
})

app.delete("/api/projects/:id", async (req,res ) => {
  try { 
    const deletedProject = await Project.findByIdAndDelete(
      req.params.id
    );
    
     if(!deletedProject) {
      return res.status(404).json({
        message: "Project not found"
      });
     }
    res.status(200).json({
      message: "Project deleted successfully",
      project: deletedProject
    });
  } catch (error) {
    res.status(400).json({
      message: "Error deleting project",
      error: error.message
    });
  }
})
 
 app.put("/api/projects/:id", async (req, res) =>  {
   try {
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

      if(!project) {
        return res.status(404).json({

        })
      }

      res.status(200).json({
        message: "Project updated successfully",
        project
      });

    } catch (error) {
      res.status(400).json({
        message: "Error updating project",
        error: error.message
      });
    }

 });

 app.post ("/api/clients", async (req, res ) => {
  try {
    const client = await Client.create(req.body);

    res.status(201).json({
      message: "Client created successfully",
      client
      
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating client",
      error: error.message
    });
  }
 })

 app.get("/api/clients", async (req, res) => {
   try {
    const clients = await Client.find();

    res.status(200).json({
      count : clients.length,
      clients
    });
   } catch (error) {
    res.status(500).json({
      message: "Error fetching clients",
      error: error.message
    });
   }
    });

    app.put("/api/clients/:id", async(req, res) => {
      try {
        const client = await Client.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new:true,
            runValidators: true
          }
        );

        if (!client) {
          return res.status(400).json({
            message : "Client not found"
          });
        }

        res.status(200).json({
          message: "Client updated successfully",
          client
        });

      } catch (error) {
        res.status(400).json({
          message: "Error updating client",
          error: error.message
        });
      }
    })

    app.delete("/api/clients/:id", async (req,res) => {
      try {
        const client = await Client.findByIdAndDelete(req.params.id);

        if (!client) {
          return res.status(404).json({
            message: "Client not found"
          
          });
        }

        res.status(200).json({
          message: "Client deleted Successfully",

        });
      } catch (error) {
        res.status(500).json({
          message: "Error deleting client",
          error: error.message
        });
      }
    });

    app.post("/api/quotes", async (req, res) => {
      try {

        const quote = await Quote.create(req.body);

        res.status(201).json({
          message: "Quote created successfully",
          quote
        });

      } catch (error) {
        res.status(400).json({
          message: "Error creating quote",
          error: error.message
        });

      }
    });

    app.get("/api/quotes", async (req, res) => {
      try {
        const quotes = await Quote.find();

        res.status(200).json({
          count: quotes.length,
          quotes
        });
      } catch (error) {
        res.status(500).json({
          message: "Error fetching quotes",
          error: error.message
        });
      }
    });

    app.put("/api/quotes/:id", async (req, res) => {
      try {
        const quote = await Quote.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
            runValidators: true
          }
        );

        if (!quote) {
          return res.status(404).json({
            message: "Quote not found"
          });
        }

        res.status(200).json({
          message: "Quote updated successfully",
          quote
        });

      } catch (error) {
        res.status(400).json({
          message: "Error updating quote",
          error: error.message
        });
      }
    });

    app.delete("/api/quotes/:id", async (req, res) => {
      try {
        const quote = await Quote.findByIdAndDelete(req.params.id);

        if (!quote) {
          return res.status(404).json({
            message: "Quote not found"
          });
        }

        res.status(200).json({
          message: "Quote deleted successfully"
        });
      } catch (error) {
        res.status(500).json({
          message: "Error deleting quote",
          error: error.message
        });
      }
    });

    app.post("/api/quotes", async (req, res) => {
      try {

        const quote = await Quote.create(req.body);

        res.status(201).json({
          message: "Quote created successfully",
          quote
        });

      } catch (error) {
        res.status(400).json({
          message: "Error creating quote",
          error: error.message
        });

      }
    });
  
    app.put("/api/quotes/:id", async ( req, res) => {
      try {
        const quote = await Quote.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true, runValidators: true }
          );

          if (!quote) {
            return res.status(404).json({
              message: "Quote not found"
            });
          }

          res.status(200).json({
            message: "Quote updated successfully",
            quote
          });

          } catch (error) {
            res.status(400).json({
              message: "Error updating quote",
              error: error.message
            });
          }      
      
    });

    app.delete("/api/quotes/:id", async (req, res) => {
  try {
    const quote = await Quote.findByIdAndDelete(req.params.id);

    if (!quote) {
      return res.status(404).json({
        message: "Quote not found"
      });
    }

    res.status(200).json({
      message: "Quote deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting quote",
      error: error.message
    });
  }
});
  
startServer();




