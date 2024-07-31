import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import FileCopyIcon from "@mui/icons-material/FileCopy"
import { Box, Button, Modal, Typography, useTheme } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { deleteProject, updateProject } from "../state"

const ProjectManagementModal = ({ open, handleClose }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const projects = useSelector((state) => state.chart.projects)

    const handleLoadProject = (projectId) => {
        // Logic to load the selected project (depends on your implementation)
        handleClose()
    }

    const handleDuplicateProject = (project) => {
        const newProject = {
            ...project,
            id: Math.random().toString(36).substr(2, 9),
            name: `${project.name} (Copy)`,
        }
        dispatch(updateProject(newProject))
    }

    const handleDeleteProject = (projectId) => {
        dispatch(deleteProject(projectId))
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: 24,
                    borderRadius: 2,
                    maxWidth: "25%",
                    maxHeight: "auto",
                    overflow: "auto",
                    margin: "auto",
                    mt: "10%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <Typography variant="h6">Manage Projects</Typography>
                {projects.map((project) => (
                    <Box
                        key={project.id}
                        display="flex"
                        alignItems="center"
                        gap={2}
                    >
                        <Typography variant="body1">{project.name}</Typography>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => handleLoadProject(project.id)}
                        >
                            Load
                        </Button>
                        <Button
                            color="secondary"
                            variant="outlined"
                            startIcon={<FileCopyIcon />}
                            onClick={() => handleDuplicateProject(project)}
                        >
                            Duplicate
                        </Button>
                        <Button
                            color="error"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            onClick={() => handleDeleteProject(project.id)}
                        >
                            Delete
                        </Button>
                    </Box>
                ))}
            </Box>
        </Modal>
    )
}

export default ProjectManagementModal
