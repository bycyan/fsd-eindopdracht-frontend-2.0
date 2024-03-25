import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjectImage } from "../../services/userApi";
import { ImageComponent } from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import useProject from "../../componenets/ProjectListComponent/ProjectListComponent";
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import styles from "./ListContainer.module.css";

const ListContainer = ({ onAddProjectClick }) => {
    const currentProject = useProject();
    const sortedProjects = currentProject ? [...currentProject].sort((a, b) => b.projectId - a.projectId) : [];
    const [projectImages, setProjectImages] = useState({});

    useEffect(() => {
        const fetchProjectImages = async () => {
            const images = {};
            for (const project of sortedProjects) {
                if (project) {
                    const imageData = await getProjectImage(project.projectId, localStorage.getItem('token'));
                    if (imageData) {
                        const blob = new Blob([imageData], { type: 'image/jpeg' });
                        const url = URL.createObjectURL(blob);
                        images[project.projectId] = url;
                    }
                }
            }

            // Update projectImages state only if there are new images
            if (Object.keys(images).length > 0) {
                setProjectImages(prevState => ({
                    ...prevState,
                    ...images
                }));
            }
        };

        fetchProjectImages();
    }, [sortedProjects]); // Dependency array includes sortedProjects

    // Cleanup function to revoke object URLs
    useEffect(() => {
        return () => {
            for (const projectId in projectImages) {
                URL.revokeObjectURL(projectImages[projectId]);
            }
        };
    }, [projectImages]);


    return (
        <>
            <div className={styles.content}>
                <h3>Projects</h3>
                {sortedProjects.length > 0 ? (
                    <div className={styles.list}>
                        {sortedProjects.map(project => (
                            <Link
                                to={{ pathname: `/project/${project.projectId}` }}
                                className={styles.link}
                                key={project.projectId}
                            >
                                <div className={styles.container} key={project.projectId}>
                                    <div className={styles.item}>
                                        <ImageComponent
                                            src={projectImages[project.projectId] || project.projectCoverImage}
                                            alt="project image"
                                            className="project-image"
                                        />
                                    </div>
                                    <div className={styles.item}>
                                        <h4>{project.projectName}</h4>
                                        <p>{project.projectArtist}</p>
                                    </div>
                                    <div className={styles.item}>{project.projectRelease}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>There are no projects to display..</p>
                )}
                <div className={styles.addContainer}>
                    <div className={styles.line}></div>
                    <div onClick={onAddProjectClick}>
                        <ActionButton text="Add project" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListContainer;
