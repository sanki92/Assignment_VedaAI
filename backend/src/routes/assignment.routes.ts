import { Router } from "express";
import { createAssignmentSchema } from "../schemas/assignment.dto";
import { validateBody } from "../middleware/validate";
import {
  createAssignment,
  getAssignment,
  listAssignments,
  resetForRegeneration,
} from "../services/assignment.service";
import { enqueueGeneration } from "../queues/generation.queue";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const docs = await listAssignments();
    res.json(docs.map((d) => ({ ...d, id: String(d._id) })));
  } catch (err) {
    next(err);
  }
});

router.post("/", validateBody(createAssignmentSchema), async (req, res, next) => {
  try {
    const doc = await createAssignment(req.body);
    await enqueueGeneration(doc.id);
    res.status(202).json({ id: doc.id, status: doc.status });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const doc = await getAssignment(req.params.id);
    if (!doc) return res.status(404).json({ error: "NotFound" });
    res.json({ ...doc, id: String(doc._id) });
  } catch (err) {
    next(err);
  }
});

router.post("/:id/regenerate", async (req, res, next) => {
  try {
    const doc = await getAssignment(req.params.id);
    if (!doc) return res.status(404).json({ error: "NotFound" });
    await resetForRegeneration(req.params.id);
    await enqueueGeneration(req.params.id);
    res.status(202).json({ id: req.params.id, status: "queued" });
  } catch (err) {
    next(err);
  }
});

export default router;
