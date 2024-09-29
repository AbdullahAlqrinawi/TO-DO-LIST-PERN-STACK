import db from "../config/db.js";

async function getNotes(req, res) {
  const { user_id } = req.params;

  if (!user_id) {
    return res.status(400).send("User ID is required.");
  }

  try {
    const result = await db.query("SELECT * FROM notes WHERE user_id = $1", [user_id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createNote(req, res) {
  const { user_id } = req.params;
  const { title, content, due_date } = req.body;

  if (!title || !content || due_date === undefined || !user_id) {
    return res.status(400).send("All required data must be provided.");
  }

  try {
    const userCheck = await db.query("SELECT id FROM users WHERE id = $1", [user_id]);
    if (userCheck.rowCount === 0) {
      return res.status(404).send("User not found.");
    }

    const result = await db.query(
      "INSERT INTO notes (title, content, user_id, due_date) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, content, user_id, due_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updateNote(req, res) {
  const { id } = req.params;
  const { title, content, is_star, due_date } = req.body;

  try {
    const result = await db.query(
      "UPDATE notes SET title = $1, content = $2, is_star = $3, due_date = $4 WHERE id = $5 RETURNING *",
      [title, content, is_star, due_date, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function deleteNote(req, res) {
  const { id } = req.params;
  try {
    const result = await db.query("DELETE FROM notes WHERE id = $1 RETURNING *", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function patchIsStar(req, res) {
  const { id } = req.params;
  const { is_star } = req.body;

  if (typeof is_star !== 'boolean') {
    return res.status(400).json({ error: "Invalid data type for is_star. It should be boolean." });
  }

  try {
    const result = await db.query(
      "UPDATE notes SET is_star = $1 WHERE id = $2 RETURNING *",
      [is_star, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating is_star field:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



export { getNotes, createNote, updateNote, deleteNote, patchIsStar, };
