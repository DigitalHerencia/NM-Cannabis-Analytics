import AddIcon from "@mui/icons-material/Add"
import DeleteIcon from "@mui/icons-material/Delete"
import SaveIcon from "@mui/icons-material/Save"
import {
    Box,
    Button,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography,
    useTheme,
} from "@mui/material"
import { DataGrid } from "@mui/x-data-grid"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveLine } from "@nivo/line"
import { ResponsivePie } from "@nivo/pie"
import { saveAs } from "file-saver"
import { toPng } from "html-to-image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addProject, updateProject } from "../state/index"

const ChartConfigModal = ({ open, handleClose, projectId }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.chart.projects)
    const existingProject = projects.find((project) => project.id === projectId)

    const [projectName, setProjectName] = useState(existingProject?.name || "")
    const [chartType, setChartType] = useState(existingProject?.type || "line")
    const [xAxisName, setXAxisName] = useState(existingProject?.xAxis || "")
    const [yAxisName, setYAxisName] = useState(existingProject?.yAxis || "")
    const [columns, setColumns] = useState(existingProject?.columns || [])
    const [rows, setRows] = useState(existingProject?.rows || [])
    const [chartSettings, setChartSettings] = useState(
        existingProject?.settings || {}
    )
    const [chartElement, setChartElement] = useState(null)

    useEffect(() => {
        if (chartType === "pie") {
            setColumns([
                { field: "id", headerName: "ID", flex: 1, editable: true },
                {
                    field: "value",
                    headerName: "Value",
                    flex: 1,
                    editable: true,
                },
            ])
        } else if (chartType === "line" || chartType === "bar") {
            setColumns([
                { field: "x", headerName: "X Axis", flex: 1, editable: true },
                { field: "y", headerName: "Y Axis", flex: 1, editable: true },
            ])
        }
    }, [chartType])

    const handleAddRow = () => {
        const id = Math.random().toString(36).substr(2, 9)
        setRows([...rows, { id, x: "", y: "" }])
    }

    const handleDeleteRow = () => {
        setRows(rows.slice(0, -1))
    }

    const handleSaveProject = () => {
        const projectData = {
            id: projectId || Math.random().toString(36).substr(2, 9),
            name: projectName,
            type: chartType,
            xAxis: xAxisName,
            yAxis: yAxisName,
            columns,
            rows,
            settings: chartSettings,
        }

        if (projectId) {
            dispatch(updateProject(projectData))
        } else {
            dispatch(addProject(projectData))
        }

        handleClose()
    }

    const handleRenderChart = () => {
        if (chartElement) {
            toPng(chartElement)
                .then((dataUrl) => {
                    saveAs(dataUrl, `${projectName}.png`)
                })
                .catch((err) => {
                    console.error(err)
                })
        }
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "70vw",
                    height: "auto",
                    maxHeight: "90vh",
                    overflow: "auto",
                    p: 4,
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: 24,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    margin: "auto",
                    gap: 2,
                }}
            >
                <Typography variant="h6">Configure Project</Typography>
                <TextField
                    label="Project Name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    fullWidth
                />
                <Select
                    value={chartType}
                    onChange={(e) => setChartType(e.target.value)}
                    fullWidth
                >
                    <MenuItem value="pie">Pie</MenuItem>
                    <MenuItem value="line">Line</MenuItem>
                    <MenuItem value="bar">Bar</MenuItem>
                </Select>

                <TextField
                    label="X Axis"
                    value={xAxisName}
                    onChange={(e) => setXAxisName(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Y Axis"
                    value={yAxisName}
                    onChange={(e) => setYAxisName(e.target.value)}
                    fullWidth
                />

                <Box display="flex" flexDirection="column" gap={2} mt={2}>
                    <Typography variant="h6">Manage Data</Typography>
                    <Button
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleAddRow}
                    >
                        Add Row
                    </Button>
                    <Button
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        onClick={handleDeleteRow}
                    >
                        Delete Row
                    </Button>
                    <Box height="400px">
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            editMode="row"
                            processRowUpdate={(newRow) => {
                                setRows((prevRows) =>
                                    prevRows.map((row) =>
                                        row.id === newRow.id ? newRow : row
                                    )
                                )
                                return newRow
                            }}
                        />
                    </Box>
                </Box>

                <Box ref={setChartElement} sx={{ height: "400px", mt: 2 }}>
                    {chartType === "pie" && (
                        <ResponsivePie
                            data={rows.map((row) => ({
                                id: row.id,
                                value: row.value,
                            }))}
                        />
                    )}
                    {chartType === "bar" && (
                        <ResponsiveBar data={rows} keys={["y"]} indexBy="x" />
                    )}
                    {chartType === "line" && (
                        <ResponsiveLine
                            data={[
                                {
                                    id: projectName,
                                    data: rows.map((row) => ({
                                        x: row.x,
                                        y: row.y,
                                    })),
                                },
                            ]}
                        />
                    )}
                </Box>

                <Button
                    color="primary"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSaveProject}
                >
                    Save Project
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleRenderChart}
                >
                    Save Chart as Image
                </Button>
            </Box>
        </Modal>
    )
}

export default ChartConfigModal
