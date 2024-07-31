import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import { Box, Button, Typography } from "@mui/material"
import { ResponsiveBar } from "@nivo/bar"
import { ResponsiveLine } from "@nivo/line"
import { ResponsivePie } from "@nivo/pie"
import { useDispatch, useSelector } from "react-redux"
import { deleteProject } from "../state/index"

const ChartGeneration = () => {
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.chart.projects)

    const handleDeleteProject = (id) => {
        dispatch(deleteProject(id))
    }

    if (!projects || projects.length === 0) {
        return <Typography variant="h6">No projects available.</Typography>
    }

    return (
        <Box mt={4}>
            <Typography variant="h5">Projects</Typography>
            {projects.map((project) => (
                <Box key={project.id} mb={4}>
                    <Typography variant="h6">{project.name}</Typography>
                    <Button
                        color="secondary"
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteProject(project.id)}
                    >
                        Delete Project
                    </Button>
                    <Box height="400px" mt={2}>
                        {project.type === "pie" && (
                            <ResponsivePie
                                data={project.rows.map((row) => ({
                                    id: row.id,
                                    value: row.value,
                                }))}
                            />
                        )}
                        {project.type === "bar" && (
                            <ResponsiveBar
                                data={project.rows}
                                keys={["y"]}
                                indexBy="x"
                            />
                        )}
                        {project.type === "line" && (
                            <ResponsiveLine
                                data={[
                                    {
                                        id: project.name,
                                        data: project.rows.map((row) => ({
                                            x: row.x,
                                            y: row.y,
                                        })),
                                    },
                                ]}
                            />
                        )}
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default ChartGeneration
