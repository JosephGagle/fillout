import { Router } from 'express';
const router = Router();
import { getFilteredResponses } from '../services/filloutAPI.js';

router.get('/:formId/filteredResponses', async (req, res) => {
  const formId = req.params.formId;

  if(!formId) {
    res.status(400).send("formId is required");
  }
  const filters = req.query.filters ? JSON.parse(req.query.filters) : [];

  try {
    const filteredResponses = await getFilteredResponses(formId, filters);
    res.json(filteredResponses);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

export default router;
