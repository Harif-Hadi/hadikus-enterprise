import { database } from "@/firebase";
import { ref, set, get, remove } from "firebase/database";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, data } = JSON.parse(req.body);

    try {
      const dbRef = ref(database, `cart/${id}`);
      await set(dbRef, data);
      res.status(200).json({ messsage: "Data saved" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const dbRef = ref(database, "cart");
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        res.status(200).json({ data: snapshot.val() });
      } else {
        res.status(404).json({ error: "No data found" });
      }
    } catch (error) {
      console.log("Error");
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      const itemRef = ref(database, `cart/${id}`);
      await remove(itemRef);
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      console.error("Error deleting item:", error);
      res.status(500).json({ error: "Failed to delete item" });
    }
  }
}
