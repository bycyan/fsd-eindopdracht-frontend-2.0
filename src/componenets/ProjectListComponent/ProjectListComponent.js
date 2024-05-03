import { useEffect, useState } from "react";
import { getProject } from '../../services/api';
import useUser from "../../componenets/UserComponent/UserComponent";

const useProject = () => {
    const currentUser = useUser();
    const [currentProject, setCurrentProject] = useState(null);

    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                if (currentUser) {
                    const projectIds = currentUser.authorities.map(authority => authority.projectId);
                    const projectsData = await Promise.all(projectIds.map(projectId => getProject(projectId, localStorage.getItem('token'))));
                    setCurrentProject(projectsData);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjectData();
        return () => {
        };
    }, [currentUser]);

    return currentProject;
};

export default useProject;
