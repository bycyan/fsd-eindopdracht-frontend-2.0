import styles from "./ListContainer.module.css"
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import project_img from "../../assets/project-img.jpeg";
import React from "react";
import useProject from "../../componenets/ProjectListComponent/ProjectListComponent";
import ActionButton from "../../componenets/ButtonComponents/ActionButton/ActionButton";
import {Link} from "react-router-dom";

const ListContainer = ({ onAddProjectClick }) => {
    const currentProject = useProject();
    const sortedProjects = currentProject ? currentProject.sort((a, b) => b.projectId - a.projectId) : [];

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
                                        src={project_img}
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
