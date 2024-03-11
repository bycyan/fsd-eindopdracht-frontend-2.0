import styles from "./ListContainer.module.css"
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
// import project_img from "../../assets/project-img.jpeg";
import React, {useEffect, useState} from "react";
import useProject from "../../componenets/ProjectListComponent/ProjectListComponent";
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import {Link} from "react-router-dom";
import {getProjectImage} from "../../services/userApi";

const ListContainer = ({ onAddProjectClick }) => {
    const currentProject = useProject();
    const sortedProjects = currentProject ? currentProject.sort((a, b) => b.projectId - a.projectId) : [];
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
            setProjectImages(images);
        };

        fetchProjectImages();
    }, [sortedProjects]);


    return (
        <>
            {sortedProjects.length > 0 ? (
                <div className={styles.content}>
                    <h3>Projects</h3>
                    <div className={styles.list}>
                        {sortedProjects.map(project => (
                            <Link
                                to={{
                                    pathname: `/project/${project.projectId}`
                                }}
                                className={styles.link}
                                key={project.projectId}
                            >
                            <div className={styles.container} key={project.projectId}>

                                <div className={styles.item}>
                                    <ImageComponent
                                        src={projectImages[project.projectId] || project.projectCoverImage} // Use the fetched image URL or default cover image
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
                    <div className={styles.addContainer}>
                        <div className={styles.line}></div>


                        <div onClick={onAddProjectClick}>
                            <ActionButton text="Add project" />
                        </div>
                    </div>

                </div> ) : (
                <p>Loading...</p>
            )}
        </>
    );

}

export default ListContainer;
