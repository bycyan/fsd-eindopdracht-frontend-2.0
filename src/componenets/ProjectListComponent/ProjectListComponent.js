import { useEffect, useState } from "react";
import { getProject } from '../../services/userApi';
import useUser from "../../componenets/UserComponent/UserComponent";

const useProject = () => {
    const currentUser = useUser();
    const [currentProject, setCurrentProject] = useState(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                if (currentUser) {
                    // Extract project IDs from currentUser
                    const projectIds = currentUser.authorities.map(authority => authority.projectId);
                    // Fetch project data for each project ID
                    const projectsData = await Promise.all(projectIds.map(projectId => getProject(projectId, localStorage.getItem('token'))));
                    // Set the fetched project data
                    setCurrentProject(projectsData);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjectData();

        // Clean up any resources (if needed) when the component unmounts
        return () => {
            // Clean-up logic here (if any)
        };
    }, [currentUser]);

    return currentProject;
};

export default useProject;
