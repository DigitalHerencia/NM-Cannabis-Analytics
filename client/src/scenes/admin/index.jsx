import AddIcon from "@mui/icons-material/Add"
import { Box, Button, useTheme } from "@mui/material"
import { useState } from "react"
import ChartConfigModal from "../../components/ChartConfigModal.jsx"
import ChartGeneration from "../../components/ChartGeneration.jsx"
import Header from "../../components/Header.jsx"
import ProjectManagementModal from "../../components/ProjectManagementModal.jsx"

const ChartGenerator = () => {
    const theme = useTheme()
    const [isConfigModalOpen, setIsConfigModalOpen] = useState(false)
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false)
    const [selectedProjectId, setSelectedProjectId] = useState(null)

    const handleOpenConfigModal = (projectId = null) => {
        setSelectedProjectId(projectId)
        setIsConfigModalOpen(true)
    }

    const handleCloseConfigModal = () => {
        setIsConfigModalOpen(false)
        setSelectedProjectId(null)
    }

    const handleOpenProjectModal = () => {
        setIsProjectModalOpen(true)
    }

    const handleCloseProjectModal = () => {
        setIsProjectModalOpen(false)
    }

    return (
        <Box m="1.5rem 2.5rem">
            <Header
                title="Chart Generator"
                subtitle="Generate and Manage Charts"
            />
            <Box display="flex" justifyContent="flex-start" mb={2} gap={2}>
                <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenConfigModal()}
                >
                    Create Project
                </Button>
                <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenProjectModal}
                >
                    Load Project
                </Button>
            </Box>

            <ChartConfigModal
                open={isConfigModalOpen}
                handleClose={handleCloseConfigModal}
                projectId={selectedProjectId}
            />
            <ProjectManagementModal
                open={isProjectModalOpen}
                handleClose={handleCloseProjectModal}
            />
            <ChartGeneration />
        </Box>
    )
}

export default ChartGenerator
