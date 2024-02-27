import React from "react";
import { useLocation } from "react-router-dom";
import useProject from "../../componenets/ProjectListComponent/ProjectListComponent";
import {ImageComponent} from "../../componenets/PageComponents/ImageComponent/ImageComponent";
import project_img from "../../assets/project-img.jpeg";
import ProjectListComponent from "../../componenets/ProjectListComponent/ProjectListComponent";
import styles from './ProjectPage.module.css'
import ListContainer from "../../containers/ListContainer/ListContainer";
import SongListContainer from "../../containers/ListContainer/SongListContainer";
import ContributorListContainer from "../../containers/ListContainer/ContributorListContainer";

export default function ProjectPage() {
    const location = useLocation();
    const currentProject = useProject();
    console.log(currentProject)

    // Ensure that currentProject is not null before trying to find the matching project
    if (!currentProject) {
        return <div>Loading...</div>; // or any other loading indicator
    }

    // Extract projectId from pathname
    const projectIdFromPath = parseInt(location.pathname.split("/").pop());

    // Find the project with matching projectId
    const matchedProject = currentProject.find(project => project.projectId === projectIdFromPath);

    // Render project details if project is defined
    return (
        <div>
            {matchedProject && (
                <>
                    <ImageComponent
                        src={project_img}
                        alt="logo"
                        className="project-header"
                    />
                    <main>
                        <div className={styles.projectHeader}>
                            <ImageComponent
                                src={project_img}
                                alt="logo"
                                className="project-image-img"
                            />
                            <div className={styles.headerInfo}>
                                <div>
                            <h3>{matchedProject.projectName}</h3>
                            <p>{matchedProject.projectArtist}</p>
                                </div>
                            <p>{matchedProject.projectRelease}</p>
                            </div>
                        </div>

                        <section>
                            <SongListContainer projectId={matchedProject.projectId} />
                        </section>

                        <section>
                            <ContributorListContainer projectId={matchedProject.projectId} />
                        </section>
                    </main>
                </>
            )}
        </div>
    );
}