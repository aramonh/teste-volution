import { Router } from 'express'
const router = Router();




router.get("/", (req, res) => {
    


    const data = {
      title: "Hola mundo",
      name: "name",
    };
    res.json(data);
  });

export default router;