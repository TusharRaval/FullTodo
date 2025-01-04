const express = require("express");
const cors = require("cors");
const { tasksCollection } = require("./firebaseAdmin");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// 📌 Get All Tasks
app.get("/tasks", async (req, res) => {
  try {
    const snapshot = await tasksCollection.get();
    const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  }
});

// 📌 Add Task
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTaskRef = await tasksCollection.add({ title, completed: false });
    res.json({ id: newTaskRef.id, title, completed: false });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ error: "Error adding task" });
  }
});

// 📌 Update Task
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    await tasksCollection.doc(id).update({ title, completed });
    res.json({ id, title, completed });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Error updating task" });
  }
});

// 📌 Delete Task
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await tasksCollection.doc(id).delete();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Error deleting task" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
