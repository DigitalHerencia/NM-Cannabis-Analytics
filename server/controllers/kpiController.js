import KPI from "../models/KPI.js";

// Create a new KPI data entry
export const createKPI = async (req, res) => {
  try {
    const kpiData = new KPI(req.body);
    await kpiData.save();
    res.status(201).json(kpiData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a KPI data entry by ID
export const deleteKPI = async (req, res) => {
  try {
    const { id } = req.params;
    const kpiData = await KPI.findByIdAndDelete(id);
    if (!kpiData) {
      return res.status(404).json({ message: "KPI data not found" });
    }
    res.status(200).json({ message: "KPI data deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get KPI
export const getKPI = async (_req, res) => {
  try {
    const kpi = await KPI.find();
    if (!kpi || kpi.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }
    return res.status(200).json(kpi);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      error: { name: error.name, message: error.message, stack: error.stack },
    });
  }
};
