import styles from "./ListContainer.module.css"
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import project_img from "../../assets/project-img.jpeg";
import React from "react";
import useProject from "../../componenets/ProjectListComponent/ProjectListComponent";

const ListContainer = () => {
    const currentProject = useProject();

    return (
        <>
        {currentProject ? (
        <div className={styles.content}>
            <h3>Projects</h3>
            <div className={styles.list}>
                {currentProject.map(project => (
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
                            <p>CONTIKI</p>
                        </div>
                        <div className={styles.item}>2023</div>
                    </div>
                ))}
            </div>
            <div className={styles.addContainer}>
                <div className={styles.line}></div>
                <div className={styles.bttnGroup}>
                    <div className={styles.btn}>+</div>
                    <p>Add project</p>
                </div>
            </div>

        </div> ) : (
            <p>Loading...</p> // Render a loading message while userData is being fetched
        )}
            </>
    );

}

export default ListContainer;