import styles from "./ListContainer.module.css"
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import project_img from "../../assets/project-img.jpeg";
import React from "react";
import useProject from "../../componenets/ProjectListComponent/ProjectListComponent";
import SubmitButton from "../../componenets/ButtonComponents/SubmitButton/SubmitButton";
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";

const ListContainer = ({ onAddProjectClick }) => {
    const currentProject = useProject();

    // Sort projects by projectId in descending order
    const sortedProjects = currentProject ? currentProject.sort((a, b) => b.projectId - a.projectId) : [];

    return (
        <>
            {sortedProjects.length > 0 ? (
                <div className={styles.content}>
                    <h3>Projects</h3>
                    <div className={styles.list}>
                        {sortedProjects.map(project => (
                            <div className={styles.container} key={project.projectId}>
                                <div className={styles.item}>
                                    <ImageComponent
                                        src={project_img} // Replace with project cover image if available
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
                        ))}
                    </div>
                    <div className={styles.addContainer}>
                        <div className={styles.line}></div>


                        <div onClick={onAddProjectClick}>
                            <ActionButton text="Add project" />
                        </div>
                    </div>

                </div> ) : (
                <p>Loading...</p> // Render a loading message while userData is being fetched
            )}
        </>
    );

}

export default ListContainer;
