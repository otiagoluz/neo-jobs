import express, { Request, Response } from "express";
import Job from "../models/job";
import jobsRepository from "../repositories/jobs-repository";

export const jobsRouter = express.Router();

// POST items
jobsRouter.post("/jobs", async (req: Request, res: Response) => {
  const job: Job = req.body;
  try {
    jobsRepository.create(job, (id) => {
      id ? 
      res.status(201).location(`/jobs/${id}`).send() :
      res.status(400).send;
    })
  } catch (e) {
    res.status(500).send(e);
  }
});

jobsRouter.get('/jobs', (req: Request, res: Response) => {
  try {
    jobsRepository.index(jobs => res.json(jobs));
  } catch (e) {
    res.status(500).send(e);
  }
});

jobsRouter.get('/jobs:id', (req: Request, res: Response) => {
  const id: number = +req.params.id;
  try {
    jobsRepository.show(id, job => 
      job ? 
      res.json(job) : 
      res.status(400).send()
    );
  } catch (e) {
    res.status(500).send(e);
  }
});

jobsRouter.put('/jobs:id', (req, res) => {
  const id: number = +req.params.id;
  try {
    jobsRepository.update(id, req.body, (notFound) => {
      notFound ? res.status(404).send() : res.status(204).send()
    });
  } catch (e) {
    res.status(500).send(e);
  }
});

jobsRouter.delete('/jobs:id', (req, res) => {
  const id: number = +req.params.id;
  try {
    jobsRepository.delete(id, (notFound) => {
      notFound ? res.status(404).send() : res.status(204).send()
    })
  } catch (e) {
    res.status(500).send(e);
  }
})




// // GET items
// jobsRouter.get("/", async (req: Request, res: Response) => {
//   try {
//     const items: Job[] = await ItemService.findAll();
//     res.status(200).send(items);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// // GET items/:id
// jobsRouter.get("/:id", async (req: Request, res: Response) => {
//   const id: number = parseInt(req.params.id, 10);

//   try {
//     const item: Job = await ItemService.find(id);

//     if (item) {
//       return res.status(200).send(item);
//     }

//     res.status(404).send("item not found");
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// // PUT items/:id
// jobsRouter.put("/:id", async (req: Request, res: Response) => {
//   const id: number = parseInt(req.params.id, 10);

//   try {
//     const itemUpdate: Job = req.body;

//     const existingItem: Job = await ItemService.find(id);

//     if (existingItem) {
//       const updatedItem = await ItemService.update(id, itemUpdate);
//       return res.status(200).json(updatedItem);
//     }

//     const newItem = await ItemService.create(itemUpdate);

//     res.status(201).json(newItem);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });

// // DELETE items/:id
// jobsRouter.delete("/:id", async (req: Request, res: Response) => {
//   try {
//     const id: number = parseInt(req.params.id, 10);
//     await ItemService.remove(id);

//     res.sendStatus(204);
//   } catch (e) {
//     res.status(500).send(e);
//   }
// });